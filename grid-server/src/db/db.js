const mongoose = require("mongoose");

atlas = "mongodb://localhost:27017";

mongoose.Promise = global.Promise;

mongoose
  .connect(atlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((e) => console.log(e.mssage));
