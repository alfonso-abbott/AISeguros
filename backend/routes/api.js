const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.post("/register", (req, res) => {
  const { username } = req.body;
  // In a real app you would save the user to a database
  res.json({ message: "User registered", user: { username } });
});

router.post("/login", (req, res) => {
  const { username } = req.body;
  // Normally you'd validate the password and generate a token
  res.json({ message: "Logged in", token: "dummy-token", user: { username } });
});

router.get("/insurances", (req, res) => {
  const { query } = req.query;
  const baseList = [
    { id: 1, name: "Seguro Básico" },
    { id: 2, name: "Seguro Premium" },
    { id: 3, name: "Seguro Familiar" },
  ];
  const filtered = query
    ? baseList.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
    : baseList;
  res.json(filtered);
});

router.get("/recommendations", (req, res) => {
  // Would normally use the user's profile to generate recommendations
  res.json([
    { id: 101, name: "Seguro Recomendado 1" },
    { id: 102, name: "Seguro Recomendado 2" },
  ]);
});

router.post("/upload", (req, res) => {
  // Simulate file upload handling
  res.json({ message: "Policy uploaded" });
});

module.exports = router;
