import { Category } from "../Store/types";
import { object, string, boolean } from "yup";

export const noteSchemaCreate = object({
  name: string().required(),
  category: string()
    .oneOf(Object.values(Category))
    .default(() => "Task"),
  content: string().default(() => ""),
  archive: boolean().default(() => true),
});

export const noteSchemaEdit = object({
  name: string().optional(),
  category: string().oneOf(Object.values(Category)),
  content: string(),
  archive: boolean(),
});
