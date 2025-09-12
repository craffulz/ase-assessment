import { seedDatabase } from "./seeders/index.js";

export const connectDB = async (sequelize) => {
  try {
    await sequelize.authenticate();
    console.log("Conexion a SQLite establecida correctamente");

    const tablesExists = await sequelize.getQueryInterface().showAllTables();
    console.log("Tables exists?: ", tablesExists);

    if (tablesExists.length === 0) {
      createAndAssociate(sequelize);
      await sequelize.sync({
        force: false,
        alter: process.env.NODE_ENV !== "production",
      });
      console.log("Modelos y asociaciones sincronizados correctamente");
      //Seedear
      const tables = await sequelize.query(
        "SELECT name FROM sqlite_master WHERE type='table'"
      );
      console.log("Tablas existentes:", tables);
      await seedDatabase(sequelize.models);
    }

    console.log("Modelos sincronizados con la base de datos");
  } catch (error) {
    console.log("Error conectando base de datos: ", error);
    process.exit(1);
  }
};
