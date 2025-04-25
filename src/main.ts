import { AppDataSource } from "./data-source";
import app from "./app";
import "dotenv/config";
import { Role } from "./models/role.entity";
import { roleRepo } from "./repositories/role.repository";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => console.log("Server started on port 3000"));
    initDefaultRoles();
  })
  .catch((err) => console.error(err));

const initDefaultRoles = async () => {
  const existing = await roleRepo.find();
  if (existing.length === 0) {
    await roleRepo.save([{ name: "manager" }, { name: "developer" }]);
    console.log("Default roles seeded");
  }
};
