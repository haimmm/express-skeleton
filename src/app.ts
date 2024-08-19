import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const port = process.env.PORT;

//global middlewares
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("inside default route");
  //next("custom error");
  res.status(200).send({ data: "hello" });
});

//routes
//app.use("/auth", authRoute);

//error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
