import { AppDataSource } from "./data-source";
import app from "./app";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => console.log("Server started on port 3000"));
  })
  .catch((err) => console.error(err));
