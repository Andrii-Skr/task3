import { TempNote } from "../Store/types";
import { parseDate } from "../Helpers/parseDate";
import { getNext, store } from "../Store/store";
import { getStat } from "../Services/getStat";
// import { Request, Response } from "express";
//import { Note } from "src/Store/types";

class OperationWithNotes {
  async removeNote(id: number) {
    store.notes.splice(id, 1);
  }
  async getNote(id: number) {
    return store.notes[id];
  }

  async createNote(note: TempNote) {
    store.notes.push({
      ...note,
      id: getNext(),
      dates: parseDate(note.content),
      created: new Date().toLocaleDateString(),
    });
    console.log(store);
  }
  async getStats() {
    return getStat(store.notes);
  }
  async patchNote(checkId: number, note: TempNote) {
    store.notes[checkId] = {
      ...store.notes[checkId],
      content: note.content,
      name: note.name,
      archive: note.archive,
      dates: parseDate(note.content),
      created: new Date().toLocaleDateString(),
      category: note.category,
    };
    console.log(store.notes[checkId]);
  }
}

export default new OperationWithNotes();
