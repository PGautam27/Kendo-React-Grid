const express = require("express");
const dataSchema = require("../schema/dataSchema");
const router = express.Router();
require("../db/db");

router.get("/", async (req, res) => {
  try {
    const data = await dataSchema.find();
    res.status(200).json(data);
  } catch (e) {
    res
      .status(503)
      .json({ message: "Db is unavalable at the moment. Try again later" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { stdId, srn, name, phoneNo, college } = req.body;
    const exists = await dataSchema.findOne({ srn });

    if (exists != null) {
      res.status(409).json({ message: "Data already exists, try put request" });
    } else {
      const newData = new dataSchema({
        stdId: stdId,
        srn: srn,
        name: name,
        phoneNo: phoneNo,
        college: college,
      });

      const added = await newData.save();
      if (added) {
        res.status(200).json({ message: "Successful" });
      } else {
        res.status(503).json({ message: "Db unavailable. Try again later" });
      }
    }
  } catch (e) {
    res.status(500).json({ message: "Unsuccessful" });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { stdId, srn, name, phoneNo, college } = req.body;
    const findData = await dataSchema.findOne({ srn });
    if (findData != null) {
      findData.name = name;
      findData.phoneNo = phoneNo;
      findData.college = college;
      const save = await findData.save();

      if (save) {
        res.status(200).json({ message: "Successful" });
      } else {
        res.status(509).json({ message: "Insufficent argument in the body" });
      }
    } else {
      res.status(404).json({ message: "Data unavailable" });
    }
  } catch (e) {
    console.log(e.message);
    res
      .status(509)
      .json({ message: "Db unavailable at the moment. Try to get back later" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const wait = await dataSchema.findOneAndDelete({ stdId: req.params.id });
    if (wait) {
      res.status(200).json({ message: "Successfull" });
    }
  } catch (e) {
    res.status(509).json({
      message: "Db unavailable at the moment. Try to get bacck later",
    });
  }
});

module.exports = router;
