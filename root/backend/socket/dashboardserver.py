import socket
import base64
from Cryptodome.Cipher import AES
from Cryptodome import Random
import threading
import sshtunnel
import time
import sys
import socketio

#import socketio
# Connect to computer localhost which is portforwarded to xilinx localhost
HOST_ADDR = ('127.0.0.1', 8083)
EN_FORMAT = "utf-8"
SECRET_KEY = "0000000000000000"
BUFF_SIZE = 256
SIO_ADDRESS = 'http://localhost:5000'
SUNFIRE_USER = "" # Fill with your own sunfire credentials
SUNFIRE_PASS = "" 
SIO_ADDRESS_EVAL = 'http://localhost:5001'
class DashboardClient():
    def __init__(self, ip_addr, secret_key, sio_address, sio_address_eval, buff_size=256):
        self.ip_addr = ip_addr
        self.buff_size = buff_size
        self.secret_key = secret_key
        self.client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sio = socketio.Client()
        self.sio_address = sio_address           
        self.sio_eval = socketio.Client()
        self.sio_address_eval = sio_address_eval

    def decrypt_message(self, cipher_text):
        decoded_message = base64.b64decode(cipher_text)
        iv = decoded_message[:16]
        secret_key = bytes(str(self.secret_key), encoding="utf8")
        cipher = AES.new(secret_key, AES.MODE_CBC, iv)
        decrypted_message = cipher.decrypt(decoded_message[16:]).strip()
        return decrypted_message.decode('utf8')

    def start_tunnel(self, user, password):
        tunnel1 = sshtunnel.open_tunnel(
            ('sunfire.comp.nus.edu.sg', 22), #host address for ssh, 22
            remote_bind_address=('137.132.86.243', 22), #xilinx address to bind to localhost port
            ssh_username=user,
            ssh_password=password,
            block_on_close=False
            )
        tunnel1.start()
        print('[Tunnel Opened] Tunnel into Sunfire opened' + str(tunnel1.local_bind_port))
        tunnel2 = sshtunnel.open_tunnel(
            ssh_address_or_host=('localhost', tunnel1.local_bind_port), #ssh into xilinx
            remote_bind_address=('127.0.0.1', 8083), #binds xilinx host
            ssh_username='xilinx',
            ssh_password='xilinx',
            local_bind_address=('127.0.0.1', 8083), #localhost to bind it to
            block_on_close=False
            )
        tunnel2.start()
        print('[Tunnel Opened] Tunnel into Xilinx opened')

    def recvall(self, conn):
        received_chunks = []
        remaining = self.buff_size
        while remaining > 0:
            received = conn.recv(remaining)
            if not received:
                return None
            received_chunks.append(received)
            remaining -= len(received)
        return b''.join(received_chunks)

    def listening(self):
        self.client.settimeout(1)
        while True:
            try:
                data = self.recvall(self.client)
                if data:
                    msg = self.decrypt_message(data)
                    msg = msg.strip()
                    print(msg)
                    self.sio.emit('endpointData', msg)
                    self.sio_eval.emit('endpointData', msg)
                    # Upload to DB
                else:
                    raise ConnectionResetError
            except socket.timeout:
                pass
            except ConnectionResetError:
                print("[CONNECTION DROPPED] Connection to ultra96 dropped, trying to reconnect")
                return
            except KeyboardInterrupt:
                self.client.close()
                sys.exit()

    def run(self):
        self.start_tunnel(SUNFIRE_USER, SUNFIRE_PASS)
        print(self.sio_address)
        self.sio.connect(self.sio_address)
        self.sio_eval.connect(self.sio_address_eval)
        while True:
            try:
                self.client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                self.client.connect(self.ip_addr)
                print(f"[ULTRA96 CONNECTED] Dashboard is connected to Ultra96")
                self.listening()
                time.sleep(1)
            except ConnectionRefusedError:
                print("[TRYING] Why u no let me connect?? (┛ಠ_ಠ)┛彡┻━┻")
            except Exception as e:
                print(type(e))
        self.client.close()
        print("[CLOSED] Dashboard socket has closed")

if __name__ == '__main__':
    dashboard_client = DashboardClient(HOST_ADDR, SECRET_KEY, SIO_ADDRESS, SIO_ADDRESS_EVAL, BUFF_SIZE)
    dashboard_client.run()