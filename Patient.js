const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const timestamps = require("mongoose-timestamp2");

const Cities = require("./enums/cities");
const Genders = require("./enums/genders");
const BirthPlace = require("./enums/birthplace");
const DiabeticStatus = require("./enums/diabetic-status");
const ApprovalStates = require("./enums/approval-states");

/**
 * @swagger
 * definitions:
 *   Patient:
 *     required:
 *        - nationalID
 *        - fullname
 *        - birthplace
 *        - birthdate
 *        - gender
 *     properties:
 *       nationalID:
 *         type: string
 *         example: 20202020202020
 *       fullname:
 *         type: string
 *         example: Demo Patient
 *       birthplace:
 *         type: string
 *         example: alexandria
 *       birthdate:
 *         type: string
 *         example: 02-02-1902
 *       gender:
 *         type: string
 *         example: male
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Patient:
 *        type: object
 *        required:
 *          - personalData
 *          - contactData
 *          - diabeticStatus
 *          - consentFilePath
 *          - nationalIdFilePath
 *          - creator
 *          - site
 *          - exams
 *        properties:
 *          creator:
 *            $ref: "#/components/schemas/User"
 *            description: Operator id who created the patient
 *          site:
 *            $ref: "#/components/schemas/Site"
 *            description: Site id where the patient is created
 *          personalData:
 *            required:
 *              - fullName
 *              - nationalID
 *              - gender
 *            type: object
 *            properties:
 *              fullName:
 *                type: string
 *              nationalID:
 *                type: string
 *                description: NationalID for each patient, needs to be unique.
 *                minLength: 14
 *                maxLength: 14
 *              gender:
 *                type: string
 *              birthPlace:
 *                type: string
 *              jobTitle:
 *                type: string
 *              birthDate:
 *                type: date
 *          contactData:
 *            required:
 *              - mobilePhone
 *              - countryCode
 *            type: object
 *            properties:
 *              mobilePhone:
 *                type: string
 *                minLength: 10
 *                maxLength: 10
 *              countryCode:
 *                type: string
 *                default: "+20"
 *              city:
 *                type: string
 *              address:
 *                type: string
 *              zipCode:
 *                type: string
 *                minLength: 5
 *                maxLenght: 5
 *              areaCode:
 *                type: string
 *              email:
 *                type: string
 *          diabeticStatus:
 *            type: string
 *            description: Status of diabetes whether type 1 or type 2
 *          diabeticDate:
 *            type: date
 *          consentFilePath:
 *            type: string
 *          nationalIdFilePath:
 *            type: string
 *          approvalState:
 *            type: string
 *            description: Indicates whether the patient's data is approved or not
 *          isUpdate:
 *            type: boolean
 *            default: false
 *            description: True if patient's name or national id is updated
 *          comment:
 *            type: string
 *        example:
 *          site: "5fccd896ae6967291c05dd12"
 *          creator: "5fc48f340964c718eadb6933"
 *          personalData:
 *            fullName: New Patient
 *            nationalID: "29604011803255"
 *            birthPlace: "18"
 *            gender: Male
 *            birthDate: "1996-4-1"
 *          contactData:
 *            countryCode: "+20"
 *            city: Alexandria
 *            mobilePhone: "01095758902"
 *          approvalState: NotSet
 *          diabeticStatus: "Type1Diabetes"
 *          diabeticDate: "2000"
 *          consentFilePath: "/home/Documents/cf_file.png"
 *          nationalIdFilePath: "/home/Documents/natid_file.png"
 */

const patientSchema = new mongoose.Schema({
  personalData: {
    nationalID: {
      type: String,
      required: true,
      unique: true,
      minlength: 14,
      maxlength: 14,
      match: /\d{14}/,
    },
    fullName: { type: String, required: true },
    gender: { type: String, required: true, enum: Object.values(Genders) },
    birthDate: { type: Date },
    jobTitle: { type: String },
    birthPlace: {
      type: String,
      required: true,
      enum: Object.values(BirthPlace),
    },
  },

  contactData: {
    city: { type: String, enum: Object.values(Cities) },
    address: { type: String },
    zipCode: { type: String, minlength: 5, maxlength: 5, match: /\d{5,}/ },
    homePhone: { type: String, minlength: 7, maxlength: 7, match: /\d{7,}/ },
    mobilePhone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
      match: /\d{10}/,
    },
    countryCode: { type: String, required: true, default: "+20" },
    areaCode: { type: String },
    email: { type: String },
  },

  diabeticStatus: {
    type: String,
    required: true,
    enum: Object.values(DiabeticStatus),
  },
  diabeticDate: { type: Date },

  consentFilePath: { type: String, required: true, unique: true },
  nationalIdFilePath: { type: String, required: true, unique: true },

  // Operator who created this patient the first time
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  approvedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  site: { type: mongoose.Types.ObjectId, required: true, ref: "Site" },
  // The exams of this patient
  exams: [{ type: mongoose.Types.ObjectId, required: true, ref: "Exam" }],

  approvalState: {
    type: String,
    enum: Object.values(ApprovalStates),
    default: "notset",
  },
  isUpdated: { type: Boolean, default: false },

  comment: { type: String },
});

patientSchema.plugin(timestamps);
// patientSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Patient", patientSchema);
