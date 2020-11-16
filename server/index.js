require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const noteRouter = require("./routes/noteRouter");

const PORT = process.env.EXPRESS_PORT || 5000;

server.use(cors());
server.use(express.json());

server.use("/api/notes", noteRouter);

server.get("/", async (req, res) => {
  return res.status(419).json({ error: "Teapot" });
});

server.use("/", async (req, res) => {return res.status(419).json({ error: "Something Broke! NOOOOO!!!, NOT THE TEAPOT!!!!"})});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
