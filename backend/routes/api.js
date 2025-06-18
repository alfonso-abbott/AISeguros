const express = require("express");
const router = express.Router();

let dummyUser = null;

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.post("/register", (req, res) => {
  dummyUser = { id: 1, ...req.body };
  res.json({ message: "registered", user: dummyUser });
});

router.post("/login", (req, res) => {
  if (
    dummyUser &&
    req.body.email === dummyUser.email &&
    req.body.password === dummyUser.password
  ) {
    return res.json({
      message: "login success",
      token: "dummy-token",
      user: dummyUser,
    });
  }
  res.status(401).json({ message: "invalid credentials" });
});

router.get("/insurances", (req, res) => {
  res.json([
    { id: 1, name: "Seguro Básico" },
    { id: 2, name: "Seguro Premium" },
  ]);
});

router.post("/recommendations", (req, res) => {
  res.json([{ id: 2, name: "Seguro Premium" }]);
});

router.post("/policy", (req, res) => {
  res.json({ message: "policy uploaded" });
});

router.get("/profile", (req, res) => {
  if (!dummyUser) return res.status(401).json({ message: "not logged in" });
  res.json({
    user: dummyUser,
    quotes: [{ id: 101, insurance: "Seguro Premium" }],
  });
});

module.exports = router;
