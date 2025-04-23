import express, { Router } from "express";
import { errorMiddleware } from "./middlewares/error.middleware";

import router from "./routes";

const app = express();
app.use(express.json());

app.use("/v1/api", router);
app.use(errorMiddleware);

export default app;
