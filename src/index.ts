import express, { Express } from "express";
import routes from "./Routes/routes";
import notesRouters from "./Routes/notesRouters";
const app: Express = express();
const port = 3100;

app.use(express.json());
app.use("/", routes);
app.use("/notes", notesRouters);

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
