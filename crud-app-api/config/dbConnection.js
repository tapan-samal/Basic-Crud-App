import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "CRUD_APP" })
    .then(() => {
      console.log(`Database is connected!`);
    })
    .catch((error) => {
      console.log(
        `Error occured while connecting to database: ${error.message}`
      );
    });
};


export default connectDb;
