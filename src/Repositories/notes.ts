import { TempNote } from "../Store/types";
import { parseDate } from "../Helpers/parseDate";
import { getNext, store } from "../Store/store";
import { getStat } from "../Services/getStat";

class OperationWithNotes {
  static removeNote(id: number) {
    store.notes.splice(id, 1);
  }
  static getNote(id: number) {
    return store.notes[id];
  }

  static createNote(note: TempNote) {
    store.notes.push({
      ...note,
      id: getNext(),
      dates: parseDate(note.content),
      created: new Date().toLocaleDateString(),
    });
    console.log(store);
  }
  static getStats() {
    return getStat(store.notes);
  }
  static patchNote(checkId: number, note: TempNote) {
    store.notes[checkId] = {
      ...store.notes[checkId],
      ...note,
      dates: note.content ? parseDate(note.content) : store.notes[checkId].dates,
      created: new Date().toLocaleDateString(),
    };
    console.log(store.notes[checkId]);
  }
}

export default OperationWithNotes;
