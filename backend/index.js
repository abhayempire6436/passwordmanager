const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const user = require("./model/user");
require('dotenv').config()

app.use(cors())
app.use(express.json())

const port = 3000;

mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

app.get("/", async (req, res) => {
  const data = await user.find({})
  res.send("hello universe");
});

app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new user(req.body)
    await data.save()
    res.send(data);
});

app.delete("/delete:id", async (req, res) => {
  const id = req.params.id
  console.log(id);
  // const data = await user.findByIdAndDelete(id)
  const data = await user.deleteOne({_id: id})
})

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
