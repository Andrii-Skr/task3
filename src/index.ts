import express, { ErrorRequestHandler, Express } from "express";
import routes from "./Routes/routes";
import notesRouters from "./Routes/notesRouters";
const app: Express = express();
const port = 3100;

const start = () => {
  try {
    app.use(express.json());
    const errorHanler: ErrorRequestHandler = (err, req, res, next): void | any => {
      // @ts-ignore
      if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        console.error(err);
        // @ts-ignore
        return res.status(400).send({ message: err.message }); // Bad request
      }
      next();
    };

    app.use(errorHanler);

    app.use("/", routes);
    app.use("/notes", notesRouters);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
