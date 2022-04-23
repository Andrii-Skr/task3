import { Request, Response } from "express";
import { store } from "../Store/store";
import OperationWithNotes from "../Repositories/notes";
import { noteSchemaEdit, noteSchemaCreate } from "../Repositories/noteSchema";
import { ValidationError } from "yup";
import { TempNote } from "src/Store/types";

class Controller {
  async postNotes(req: Request, res: Response) {
    try {
      const filds = Object.keys(noteSchemaCreate.fields);
      const noteReq = {};
      for (const key of filds) {
        noteReq[key] = req.body[key];
      }
      console.log(filds, noteReq);
      const note: TempNote = (await noteSchemaCreate.validate(noteReq)) as TempNote;
      OperationWithNotes.createNote(note);

      return res.json({ message: "Note was created successfully" });
    } catch (error) {
      let code = 500;
      let message = "";
      if (error instanceof ValidationError) {
        code = 400;
        message = error.message;
      }

      return res.status(code).json({ message: `Something goes wrong:${message} :(` });
    }
  }

  async deleteNotes(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const checkId = store.notes.findIndex((n) => n.id === +id);
      if (checkId === -1) {
        return res.status(404).json({ message: "Can't find ID, check plz" });
      }
      OperationWithNotes.removeNote(checkId);

      return res.json({ message: "Note was deleted successfully" });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Something goes wrong whith delete id :(" });
    }
  }

  async patchNotes(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const checkId = store.notes.findIndex((n) => n.id === Number(id));
      if (checkId === -1) {
        return res.status(404).json({ message: "Can't find ID, check plz" });
      }

      const filds = Object.keys(noteSchemaEdit.fields);
      const noteReq = {};
      for (const key of filds) {
        if (typeof req.body[key] !== "undefined") noteReq[key] = req.body[key];
      }
      const note: TempNote = (await noteSchemaEdit.validate(noteReq)) as TempNote;
      OperationWithNotes.patchNote(checkId, note);

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
        return res.status(404).json({ message: "Can't find ID, check plz" });
      }

      return res.json({ note: OperationWithNotes.getNote(checkId) });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Something goes wrong whith find note :(" });
    }
  }

  async getNotes(req: Request, res: Response) {
    try {
      return res.json(store);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Something goes wrong whith find note :(" });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      return res.json(OperationWithNotes.getStats());
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Something goes wrong whith find stats :(" });
    }
  }
}

export default new Controller();
