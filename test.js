const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { userId: "64f7d3a9e73428ab189c924e" },
  "e7c60c738da4dbf43ff89e5127e4a264f17be1f0c71ed729d66348c95ff2e4fc",
  { expiresIn: "30d" }
);

console.log(token);
