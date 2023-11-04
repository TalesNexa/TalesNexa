import mongoose from 'mongoose';
import app from "./server.js";
import dotenv from "dotenv";
dotenv.config();


//Handling Uncaught Exception
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to unhandeled uncaught exception`);
    process.exit(1);
  });


//Assigning port to server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});


//Connecting to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL)
  .then((data) => {
    console.log(`MongoDB connected with server: ${data.connection.host}`);
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`);
    console.log(`Shutting down server due to unhandeled promise Rejection`);

    server.close(() => {
      process.exit(1);
    });
  });