const app = require('./app')
const port = 4000;

//Server
app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});