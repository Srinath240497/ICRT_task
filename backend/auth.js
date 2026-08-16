import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });
const JWT_SECRET = process.env.JWT_SECRET;
export function authenticateToken(req, res, next) {
  const authHeader = req?.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: "Forbidden: Invalid or expired token" });
  }
}

export function checkRoleAccess(role) {
  const roles = { basic: 1, premium: 2, enterprise: 3 };

  return (req, res, next) => {
    const userRole = req?.user?.role?.toLowerCase() || "basic";
    if (roles[userRole] < roles[role]) {
      return res.status(403).json({
        error: "Forbidden: Ugrade to Enterprise for Report Download",
      });
    }
    next();
  };
}
