const app = require('./app')
const port = 4000;

//The main server to set up the endpoints
app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});