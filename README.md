# CG4002 Dashboard

## How to start the frontend
### Prerequisite: Install Node.js and NPM
* Go to /root/frontend
* Run `npm install`
* Once installed, run `npm start`
* If the browser is not automatically started. Access the application through `localhost:3000`

## How to start the backend
### Prerequisite: Install MongoDB
* Go to `/root/backend`
* Run `npm install`
* In a separate terminal, run `node evalServer.js` to start the evaluation server 
* In a separate terminal, run `node sensorServer.js` to start the sensor server 
* In a separate terminal, run `node index.js` to start the HTTP Rest endpoints
* Go to /root/backend/socket and run `node dashboardserver.py` to start the dashboard server (after filling up your credentials)

## Initialize the MongoDB database
* Go to `/backend/db/init` and run `node dbInit.js`
* When the sensor data and evaluation data are received, it automatically updates the database.





