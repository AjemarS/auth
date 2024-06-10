import express from "express";
import { registerUser, loginUser, getAllUsers, getUser } from "../controllers/authController";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, admin, (req, res) => {
  res.json(req.body);
});

router.get("/users", protect, admin, getAllUsers);
router.get("/me", protect, getUser);

export default router;
