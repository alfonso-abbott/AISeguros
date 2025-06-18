const express = require("express");
const router = express.Router();

// In memory data stores for demo purposes
const users = [];
const insurances = [
  { id: 1, name: "Seguro Vida" },
  { id: 2, name: "Seguro Auto" },
  { id: 3, name: "Seguro Hogar" },
];

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Datos incompletos" });
  }
  const exists = users.find((u) => u.username === username);
  if (exists) {
    return res.status(400).json({ message: "Usuario ya existe" });
  }
  const user = { id: users.length + 1, username, password };
  users.push(user);
  res.json({ user: { id: user.id, username: user.username } });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }
  res.json({ user: { id: user.id, username: user.username } });
});

router.get("/insurances", (req, res) => {
  res.json(insurances);
});

router.get("/recommendations", (req, res) => {
  // Simple recommendation stub
  res.json(insurances.slice(0, 2));
});

module.exports = router;
