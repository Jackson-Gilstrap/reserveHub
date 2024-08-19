const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/signup",  async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Signup successful", data: req.body });
});

app.post("/api/app-create", async (req,res)=> {
  console.log(req.body)
  res.status(200).json({message: "Appointment created successfully", data: req.body})
})
app.post("/api/loc-create", async (req,res)=> {
  console.log(req.body)
  res.status(200).json({message: "Location created successfully", data: req.body})
})

app.listen(5000, () => {
  console.log("app is listening on port 5000");
});
