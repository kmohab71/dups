const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    _id:{
        patient: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Patient",
      },
      examDate: { type: Date }
    },
    dups:[mongoose.Types.ObjectId],
    count:{ type: Number }
})
module.exports = mongoose.model("Dups", examSchema);