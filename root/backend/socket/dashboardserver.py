import socket
import base64
from Cryptodome.Cipher import AES
from Cryptodome import Random
import threading
import socketio

# WIFI LAN adapter Wi-Fi
HOST_ADDR = ('172.25.96.43' , 8083)
EN_FORMAT = "utf-8"
SECRET_KEY = "0000000000000000"
BUFF_SIZE = 256
SIO_ADDRESS = 'http://localhost:5000'
class DashboardServer():
    def __init__(self, ip_addr, secret_key, sio_address, buff_size=256):
        self.ip_addr = ip_addr
        self.buff_size = buff_size
        self.secret_key = secret_key
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sio = socketio.Client()
        self.sio_address = sio_address

    # @sio.event
    # def connect():
    #     print('connection established')

    # @sio.event
    # def my_message(data):
    #     print('message received with ', data)
    #     sio.emit('my response', {'response': 'my response'})

    # @sio.event
    # def disconnect():
    #     print('disconnected from server')
    
    def decrypt_message(self, cipher_text):
        decoded_message = base64.b64decode(cipher_text)
        iv = decoded_message[:16]
        secret_key = bytes(str(self.secret_key), encoding="utf8")
        cipher = AES.new(secret_key, AES.MODE_CBC, iv)
        decrypted_message = cipher.decrypt(decoded_message[16:]).strip()
        return decrypted_message.decode('utf8')

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

    def handle_client(self, conn, addr, sio):
        while True:
            data = self.recvall(conn)
            if data:
                try:
                    msg = self.decrypt_message(data)
                    msg = msg.strip()
                    print(msg)
                    sio.emit('endpointData', msg)
                    # Parse message do something with the mesasge here, upload to DB?
                except Exception as e:
                    print(e)
            else:
                print("[ERROR] No data recevived")
                break

    def run(self):
        self.server.bind(self.ip_addr)
        self.server.listen()
        self.server.settimeout(5)
        print(self.sio_address)
        self.sio.connect(self.sio_address)
        print(f"[LISTENING] Dashboard server is listening on {self.ip_addr}")
        while True:
            try:
                conn, addr = self.server.accept()
                thread = threading.Thread(
                    target=self.handle_client, args=(conn, addr, self.sio))
                thread.start()
            except socket.timeout:
                pass
            except KeyboardInterrupt:
                self.server.close()
        # self.server.close()
        print("[CLOSED] Dashboard server socket has closed")

if __name__ == '__main__':
    dashboard_server = DashboardServer(HOST_ADDR, SECRET_KEY, SIO_ADDRESS, BUFF_SIZE)
    dashboard_server.run()