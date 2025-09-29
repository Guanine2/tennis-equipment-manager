import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

// POST /player_racquets (creates a new model)
/*
  firebase_uid    String   // must match type of users.firebase_uid
  racquet_id      Int
  string_type     String?
  string_tension  Int?     @db.SmallInt
  tension_unit    String?

  // relation to users via firebase_uid
  user    users   @relation(fields: [firebase_uid], references: [firebase_uid], onDelete: NoAction, onUpdate: NoAction)
  racquet racquet @relation(fields: [racquet_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
*/
// POST /player_racquet - create a player racquet for a logged-in user
router.post("/", async (req, res) => {
    const { firebase_uid, racquet_id, string_type, string_tension, tension_unit } = req.body;
  
    // Reject guest requests
    if (!firebase_uid) {
      return res.status(401).json({ error: "Must be logged in to add a racquet" });
    }
  
    try {
      const newPlayerRacquet = await prisma.playerRacquet.create({
        data: {
          firebase_uid,
          racquet_id,
          string_type: string_type || null,
          string_tension: string_tension || null,
          tension_unit: tension_unit || null,
        }
      });
  
      res.status(201).json(newPlayerRacquet);
    } catch (err) {
      console.error("Error creating player racquet:", err);
      res.status(500).json({ error: "Failed to add player racquet" });
    }
  });
  
// MASTER RACQUET TABLE GET INFO

  router.get("/", async (req, res) => {
    const brandId = req.query.brandId ? parseInt(req.query.brandId) : undefined;
  
    try {
      const where = brandId ? { brand_id: brandId } : {};
      const racquets = await prisma.racquet.findMany({
        where,
        include: { brand: true }
      });
  
      res.json(racquets);
    } catch (err) {
      console.error("Error fetching racquets:", err);
      res.status(500).json({ error: "Failed to fetch racquets" });
    }
  });
  
  // GET INFO
router.get("/users/:firebase_uid", async (req, res) => {
    const playerId = parseInt(req.params.id, 10);
  
    try {
      const playerRacquets = await prisma.playerRacquet.findMany({
        where: { playerId },
        include: { racquet: true }
      });
  
      const cards = playerRacquets.map(pr => ({
        player_racquet_id: pr.player_racquet_id,
        racquet: {
          racquet_id: pr.racquet.racquet_id,
          brand: pr.racquet.brand,
          model: pr.racquet.model,
          head_size: pr.racquet.head_size,
          weight: pr.racquet.weight
        },
        setup: {
          string_type: pr.string_type,
          tension_value: pr.tension_value,
          tension_unit: pr.tension_unit
        }
      }));
  
      res.json(cards);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch racquets" });
    }
  });


// UPDATE


export default router;
