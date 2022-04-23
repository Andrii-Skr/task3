export enum Category {
  Task = "Task",
  Idea = "Idea",
  Random_Thought = "Random Thought",
}

export type Note = {
  dates: string[];
  id: number;
  name: string;
  created: string;
  category: Category;
  content: string;
  archive: boolean;
};

export type TempNote = Omit<Note, "dates" | "id" | "created">;

export type CategoryStat = { [key: string]: { archive: number; active: number; id: number } };

export type Stat = {
  archive: number;
  active: number;
  id: number;
  category: string;
};
