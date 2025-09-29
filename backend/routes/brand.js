import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const brands = await prisma.brand.findMany();
      res.json(brands);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch brands" });
    }
  });
  
  export default router;