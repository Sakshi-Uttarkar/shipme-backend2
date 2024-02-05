const express = require("express");
const app = express();
const serviceAreaHandler = require("./v1/functions/service-area");
const addAreaHandler = require("./v1/functions/add-area");
const deleteAreaHandler = require("./v1/functions/delete-area");
const cors = require("cors");
const bodyParser = require("body-parser"); // configure the app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/v1/delivery-area", async (req, res) => {
  try {
    const result = await serviceAreaHandler.serviceAreaHandler(req.query, {});
    res.status(result.statusCode).json(JSON.parse(result.body));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/api/v1/add-area", async (req, res) => {
  console.log(req.headers);
  try {
    const result = await addAreaHandler.addAreaHandler(req.body, req.headers);
    res.status(result.statusCode).json(JSON.parse(result.body));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/api/v1/delete-area", async (req, res) => {
  console.log(req.headers);
  try {
    const result = await deleteAreaHandler.deleteAreaHandler(
      req.body,
      req.headers
    );
    res.status(result.statusCode).json(JSON.parse(result.body));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
