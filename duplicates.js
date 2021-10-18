const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Dups = require("./dupsModel");
const app = express();
const Exam = require("./Exam");
const Patient = require("./Patient");

// corse header
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// parsing request body
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());

mongoose
  .connect(, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected!");
  })
  .catch((err) => {
    console.log(err);
  });
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function remove(x) {
  patient_id = x._id.patient;
  exam_id = x.dups[1];
  await Patient.updateOne(
    { _id: patient_id },
    {
      $pull: {
        exams: exam_id,
      },
    }
  );
  // Patient.save();
  await Exam.deleteOne({ _id: exam_id });
}
const dups = Exam.aggregate([
  {
    $group: {
      _id: {
        patient: "$patient",
        examDate: "$examDate",
      },
      dups: {
        $addToSet: "$_id",
      },
      count: {
        $sum: 1,
      },
    },
  },
  {
    $match: {
      count: {
        $gt: 1,
      },
    },
  },
]).exec(async (err, locations) => {
  console.log(locations);
  // console.log(locations.length);
  if (err) throw err;
  for (i = 0; i < locations.length; i++) {
    await delay(100);
    remove(JSON.parse(JSON.stringify(locations[i])));
  }
});

// const users = []
// for(const userId of event.registeredUsers) {
//     User.findOne({ _id: userId }).then(user => {
//        console.log(user) // logs a valid user
//        users.push(user)
//      });
//  }

// console.log(users)
// console.log(ObjectId("612bee349e06ea0021e4f41a").equals(ObjectId("612bee349e06ea0021e4f41a")));
