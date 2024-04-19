const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send({ "msg": "This has CORS enabled 🎈" })
  })

app.listen(9000, () => console.log("App is served at: http://localhost:9000"));


