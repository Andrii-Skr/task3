import { Category } from "../Store/types";
import { object, string, boolean } from "yup";

export const noteSchemaName = object({
  name: string().required(),
  category: string()
    .oneOf(Object.values(Category))
    .default(() => "Task"),
  content: string().default(() => ""),
  archive: boolean().default(() => true),
});
