import { Request, Response } from "express";
import { store } from "../Store/store";
import operationWithNotes from "../Repositories/notes";
import { noteSchemaName } from "../Repositories/noteSchema";
import { ValidationError } from "yup";
//import { TempNote } from "../Store/types";

class Controller {
  async postNotes(req: Request, res: Response) {
    try {
      //type
      const note: any = await noteSchemaName.validate(await req.body);

      await operationWithNotes.createNote(note);
      return res.json({ message: "Note was created successfully" });
    } catch (err) {
      //console.error(err,err.name,err.errors);
      return res.status(400).json({ message: "Something goes wrong :(" });
    }
  }

  async deleteNotes(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const checkId = store.notes.findIndex((n) => n.id === +id);
      if (checkId === -1) {
        return res.status(400).json({ message: "Can't find ID, check plz" });
      }
      await operationWithNotes.removeNote(checkId);
      return res.json({ message: "Note was deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Something goes wrong whith delete id :(" });
    }
  }

  async patchNotes(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const checkId = store.notes.findIndex((n) => n.id === +id);
      if (checkId === -1) {
        return res.status(404).json({ message: "Can't find ID, check plz" });
      }
      const note: any = await noteSchemaName.validate(await req.body);

      await operationWithNotes.patchNote(checkId, note);
      return res.json({ message: "Note was edited successfully" });
    } catch (error) {
      let code = 500;
      if (error instanceof ValidationError) {
        code = 400;
      }
      console.error(error);
      return res.status(code).json({ message: "Something goes wrong whith edit note :(" });
    }
  }

  async getNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const checkId = store.notes.findIndex((n) => n.id === +id);
      if (checkId === -1) {
        return res.status(400).json({ message: "Can't find ID, check plz" });
      }
      return res.json(await operationWithNotes.getNote(checkId));
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Something goes wrong whith find note :(" });
    }
  }

  async getNotes(req: Request, res: Response) {
    try {
      return res.json(store);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Something goes wrong whith find note :(" });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      return res.json(await operationWithNotes.getStats());
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Something goes wrong whith find stats :(" });
    }
  }
}

export default new Controller();
