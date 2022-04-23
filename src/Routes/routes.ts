import express, { Router } from "express";
import controller from "./controller";

const router: Router = express.Router();

router.post("/notes", controller.postNotes);
router.get("/notes", controller.getNotes);

export default router;
