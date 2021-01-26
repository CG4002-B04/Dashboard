# CG4002 Dashboard
## Screenshots
<br />
![](./frontend/public/Screenshot1.png)
<br />
![](./frontend/public/Screenshot2.png)
<br />
![](./frontend/public/Screenshot3.png)
## How to start the frontend
### Prerequisite: Install Node.js and NPM
* Go to `/frontend`
* Run `npm install`
* Once installed, run `npm start`
* If the browser is not automatically started. Access the application through `localhost:3000`

## How to start the backend
### Prerequisite: MongoDB and Python
* Go to `/backend`
* Run `npm install`
* In a separate terminal, run `node evalServer.js` to start the evaluation server 
* In a separate terminal, run `node sensorServer.js` to start the sensor server 
* In a separate terminal, run `node index.js` to start the HTTP REST endpoints
* Go to /backend/socket and run `node dashboardserver.py` to start the dashboard server (after filling up your credentials)

## Initialize the MongoDB database
* Go to `/backend/db/init` and run `node dbInit.js`
* When the sensor data and evaluation data are received, it automatically updates the database.

## To simulate streaming 
* Go to `/backend/`
* In a separate terminal, run `node evalServer.js` to start the evaluation server 
* In a separate terminal, run `node sensorServer.js` to start the sensor server 
* In a separate terminal, run `node index.js` to start the HTTP REST endpoints
* Go to `backend/socket`
* In a separate terminal, run `node endpoint.js` to start the simulated endpoint to receive data
* In a separate terminal, run `node dancerClient.js` to initialize dancers in the frontend
* In a separate terminal, run `node sensorClient.js` to simulate streaming of data

## Brief overview of file structure
* Under root directory, the file is divided into `frontend` and `backend`
* under `frontend/src/components` contains all the React components for the frontend
* Under `/backend` contains: 
    * `index.js` to start the HTTP REST endpoints
    * `evalServer.js` to start the evaluation server that receives evaluation data from the dashboard server and send it to the frontend
    * `sensorServer.js` to start the sensor server that receives sensor data from the dashboard server and send it to the frontend
* `/backend/socket` contains:
    * `dashboardserver.py` to start the dashboard server that receives sensor data and evaluation data (not for simulation)
    * `endpoint.js` to simulate a socket endpoint (if want to simulate an endpoint to be sent to the `evalServer.js` and `sensorServer.js`)
    * `dancerClient.js` to initialize the dancers in the frontend
    * `evalClient.js` to simulate sending evaluation data to `endpoint.js`
    * `sensorClient.js` to simualte sending sensor data to `endpoint.js`
* `/backend/routes` contains the routes / endpoint to access the statistics
* `/backend/controllers` contains the controller to access the statistics from MongoDB
* `/backend/db` contains the DB related codes such as init, models and queries
    


