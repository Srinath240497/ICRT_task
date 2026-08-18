import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { authenticateToken, checkRoleAccess } from "./auth.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config({ quiet: true });

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3000;

app.get("/api", (req, res) => {
  res.json({
    message: "Successfully Connected",
  });
});

app.post("/api/auth/switch-role", (req, res) => {
  const { role } = req?.body;
  const validRoles = ["basic", "premium", "enterprise"];

  if (!role || !validRoles.includes(role.toLowerCase())) {
    return res.status(400).json({ error: "Invalid role specified" });
  }

  const userPayload = {
    userId: 1,
    username: "test",
    role: role.toLowerCase(),
  };

  const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "1h" });

  res.json({
    message: `Successfully switched to ${role} role`,
    token,
    user: userPayload,
  });
});

app.get(
  "/api/reports/download/:role",
  authenticateToken,
  checkRoleAccess("enterprise"),
  (req, res) => {
    res.json({
      message: 'Download Access Granted',
      downloadUrl: `https://localhost/reports/report.pdf`,
    });
  }
);

app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
