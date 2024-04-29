const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err: string) =>
      console.error("Could not connect to MongoDB...", err)
    );
};
