import express, { Router } from "express";
import controller from "./controller";

const notesRouters: Router = express.Router();

notesRouters.delete("/:id", controller.deleteNotes);
notesRouters.get("/stats", controller.getStats);
notesRouters.patch("/:id", controller.patchNotes);
notesRouters.get("/:id", controller.getNote);

export default notesRouters;
