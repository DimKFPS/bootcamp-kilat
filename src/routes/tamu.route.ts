import { Router } from "express";
import TamuController from "../controllers/tamu.controller";
import TamuService from "../services/tamu.service";
import TamuRepository from "../repositories/tamu.repository";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prismaClient = new PrismaClient();
const noteRepository = new TamuRepository(prismaClient);
const noteService = new TamuService(noteRepository);
const noteController = new TamuController(noteService);

router.get("/", (req, res, next) => noteController.getAllTamus(req, res, next));
router.get("/:id", (req, res, next) =>
  noteController.getTamuById(req, res, next)
);
router.post("/", (req, res, next) => noteController.createTamu(req, res, next));
router.put("/:id", (req, res, next) =>
  noteController.updateTamu(req, res, next)
);
router.patch("/:id", (req, res, next) =>
  noteController.softDeleteTamu(req, res, next)
);  

export default router;
