const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const timestamps = require("mongoose-timestamp2");

/**
 * @swagger
 * definitions:
 *   Exam:
 *     required:
 *        - patient
 *        - operator
 *        - imageTaker
 *        - site
 *        - referralSite
 *        - images
 *     properties:
 *       patient:
 *         type: string
 *         example: 5fc48f340964c718eadb6933
 *       operator:
 *         type: string
 *         example: 5fc48f340964c718eadb6935
 *       imageTaker:
 *         type: string
 *         example: 5fc48f340964c718eadb6935
 *       site:
 *         type: string
 *         example: 5fccd896ae6967291c05dd12
 *       refereealSite:
 *         type: string
 *         example: 5fccd896ae6967291c05dd12
 *       examDate:
 *         type: string
 *         example: 12-02-2021
 *       measures:
 *         type: object
 *         properties:
 *           bloodPressure:
 *             type: object
 *             properties:
 *               minVal:
 *                 type: number
 *                 example: 90
 *               maxVal:
 *                 type: number
 *                 example: 120
 *           bloodSugarLevel:
 *             type: number
 *             example: 320
 *           a1c:
 *             type: number
 *             example: 10
 *       images:
 *            type: object
 *            properties:
 *              maculaLEPath:
 *                type: string
 *                example: 21111111111111/1612874188139/ml_1612874188186.jpeg
 *              papillaLEPath:
 *                type: string
 *                example: 21111111111111/1612874188139/pl_1612874188186.jpeg
 */

/**
 * @swagger
 * definitions:
 *   Result:
 *      properties:
 *        examID:
 *          type: string
 *          example: 5fc48f340964c718eadb6943
 *        quality:
 *          type: string
 *          example: Gradable
 *        grade:
 *          type: string
 *          example: Mild
 *        macularEdeme:
 *          type: string
 *          example: NoMacularEdema
 *        comment:
 *          type: string
 *          example: Laser treatment done
 *        resultDate:
 *          type: string
 *          example: 20-12-2020
 *        type:
 *          type: string
 *          example: examResultLeft
 *        mousePositions:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              x:
 *                type: number
 *                example: 25
 *              y:
 *                type: number
 *                example: 200
 *        imageScale:
 *          type: number
 *          example: 2.21
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Exam:
 *        type: object
 *        required:
 *          - patient
 *          - operator
 *          - imageTaker
 *          - site
 *          - referralSite
 *          - images
 *        properties:
 *          patient:
 *            $ref: "#/components/schemas/Patient"
 *            description: Patient id which the exam belongs to
 *          operator:
 *            $ref: "#/components/schemas/User"
 *            description: Operator id who created the patient
 *          imageTaker:
 *            $ref: "#/components/schemas/User"
 *            description: Image taker id who took the images of patient's eyes
 *          site:
 *            $ref: "#/components/schemas/Site"
 *            description: Site id where the exam is created
 *          referralSite:
 *            $ref: "#/components/schemas/Site"
 *            description: Site id where the patient is referred from
 *          examDate:
 *            type: date
 *          gradedFromAiVision:
 *            type: boolean
 *            default: false
 *            description: Indicates whether the image is graded by aiVision model
 *          images:
 *            type: object
 *            properties:
 *              maculaLEImage:
 *                type: object
 *                properties:
 *                  Path:
 *                    type: string
 *                    nullable: true
 *                    description: The path of left macula image
 *                  AiQuality:
 *                    type: string
 *                  AiGrade:
 *                    type: string
 *                  AiResultDate:
 *                    type: date
 *              maculaREImage:
 *                type: object
 *                properties:
 *                  Path:
 *                    type: string
 *                    nullable: true
 *                    description: The path of right macula image
 *                  AiQuality:
 *                    type: string
 *                  AiGrade:
 *                    type: string
 *                  AiResultDate:
 *                    type: date
 *              papillaLEImage:
 *                type: object
 *                properties:
 *                  Path:
 *                    type: string
 *                    nullable: true
 *                    description: The path of left papilla image
 *                  AiQuality:
 *                    type: string
 *                  AiGrade:
 *                    type: string
 *                  AiResultDate:
 *                    type: date
 *              papillaREImage:
 *                type: object
 *                properties:
 *                  Path:
 *                    type: string
 *                    nullable: true
 *                    description: The path of right papilla image
 *                  AiQuality:
 *                    type: string
 *                  AiGrade:
 *                    type: string
 *                  AiResultDate:
 *                    type: date
 *          measures:
 *            type: object
 *            properties:
 *              weight:
 *                type: number
 *              height:
 *                type: number
 *              age:
 *                type: number
 *              bloodPressure:
 *                type: object
 *                properties:
 *                  minVal:
 *                    type: number
 *                  maxVal:
 *                    type: number
 *              bloodSugarLevel:
 *                type: number
 *              a1c:
 *                type: number
 *          isGradable:
 *            type: boolean
 *            default: true
 *            description: Indicates whether the image is clear enough to be graded or not
 *          comment:
 *            type: string
 *          examResultRight:
 *            type: object
 *            properties:
 *              finalResult:
 *                type: object
 *                description: Final image grade which is set after two graders or an adjudicator grade the image
 *                properties:
 *                  quality:
 *                    type: string
 *                  grade:
 *                    type: string
 *                  resultDate:
 *                    type: date
 *              doctorResult:
 *                type: array
 *                description: Graders result with maximum of two doctors per image
 *                maxItems: 2
 *                items:
 *                  type: object
 *                  properties:
 *                    quality:
 *                      type: string
 *                    grade:
 *                      type: string
 *                    macularEdeme:
 *                      type: string
 *                    comment:
 *                      type: string
 *                    resultDate:
 *                      type: date
 *                    doctorID:
 *                      $ref: "#/components/schemas/User"
 *                      description: Doctor id who graded the image
 *                    mousePositions:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          x:
 *                            type: number
 *                          y:
 *                            type: number
 *                    imageScale:
 *                      type: number
 *              adjudicatorResult:
 *                  type: object
 *                  description: Adjudicator result is shown only if two graders do not agree
 *                  properties:
 *                    quality:
 *                      type: string
 *                    grade:
 *                      type: string
 *                    macularEdeme:
 *                      type: string
 *                    comment:
 *                      type: string
 *                    resultDate:
 *                      type: date
 *                    adjudicatorID:
 *                      $ref: "#/components/schemas/User"
 *                      description: Adjudicator id who graded the image
 *                    mousePositions:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          x:
 *                            type: number
 *                          y:
 *                            type: number
 *                    imageScale:
 *                      type: number
 *              doctorMisMatch:
 *                type: boolean
 *                default: false
 *          examResultLeft:
 *            type: object
 *            properties:
 *              finalResult:
 *                type: object
 *                description: Final image grade which is set after two graders or an adjudicator grade the image
 *                properties:
 *                  quality:
 *                    type: string
 *                  grade:
 *                    type: string
 *                  resultDate:
 *                    type: date
 *              doctorResult:
 *                type: array
 *                description: Graders result with maximum of two doctors per image
 *                maxItems: 2
 *                items:
 *                  type: object
 *                  properties:
 *                    quality:
 *                      type: string
 *                    grade:
 *                      type: string
 *                    macularEdeme:
 *                      type: string
 *                    comment:
 *                      type: string
 *                    resultDate:
 *                      type: date
 *                    doctorID:
 *                      $ref: "#/components/schemas/User"
 *                      description: Doctor id who graded the image
 *                    mousePositions:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          x:
 *                            type: number
 *                          y:
 *                            type: number
 *                    imageScale:
 *                      type: number
 *              adjudicatorResult:
 *                  type: object
 *                  description: Adjudicator result is shown only if two graders do not agree
 *                  properties:
 *                    quality:
 *                      type: string
 *                    grade:
 *                      type: string
 *                    macularEdeme:
 *                      type: string
 *                    comment:
 *                      type: string
 *                    resultDate:
 *                      type: date
 *                    adjudicatorID:
 *                      $ref: "#/components/schemas/User"
 *                      description: Adjudicator id who graded the image
 *                    mousePositions:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          x:
 *                            type: number
 *                          y:
 *                            type: number
 *                    imageScale:
 *                      type: number
 *              doctorMisMatch:
 *                type: boolean
 *                default: false
 *        example:
 *          patient: 5fc48f340964c718eadb6933
 *          operator: 5fc48f340964c718eadb6935
 *          imageTaker: 5fc48f340964c718eadb6935
 *          site: 5fccd896ae6967291c05dd12
 *          refereealSite: 5fccd896ae6967291c05dd12
 *          examDate: 12-02-2021
 *          isGradable: true
 *          gradedFromAiVision: false
 *          measures:
 *            bloodPressure:
 *              minVal: 90
 *              maxVal: 120
 *            bloodSugarLevel: 320
 *            a1c: 10
 *          images:
 *            maculaLE:
 *                path: 21111111111111/1612874188139/ml_1612874188186.jpeg
 *            papillaLE:
 *                path: 21111111111111/1612874188139/pl_1612874188186.jpeg
 *          examResultLeft:
 *            finalResult:
 *              quality: Gradable
 *              grade: Mild
 *              resultDate: 12-02-2021
 *            doctorsResult:
 *              - quality: Gradable
 *                grade: NoDR
 *                macularEdema: NoMacularEdema
 *                resultDate: 10-02-2021
 *                doctorID: 5fc48f340964c718eadb6935
 *              - quality: Gradable
 *                grade: Mild
 *                macularEdema: NoMacularEdema
 *                resultDate: 11-02-2021
 *                doctorID: 5fc48f340964caed535b7794
 *                mousePositions:
 *                  - x: 10
 *                    y: 50
 *                  - x: 11
 *                    y: 50
 *                  - x: 11
 *                    y: 51
 *                  - x: 12
 *                    y: 51
 *                  - x: 13
 *                    y: 51
 *                  - x: 14
 *                    y: 52
 *                imageScale: 2.21
 *            adjudicatorResult:
 *              quality: Gradable
 *              grade: Mild
 *              macularEdema: NoMacularEdema
 *              resultDate: 11-02-2021
 *              doctorID: 5ae37ve50667taeb88336a8e
 *            doctorMismatch: true
 *
 *
 */

const examSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Patient",
  },

  operator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },

  imageTaker: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },

  site: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Site",
  },

  referralSite: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Site",
  },

  examDate: { type: Date },
  gradedFromAiVision: { type: Boolean, default: false },
  images: {
    maculaLEImage: {
      Path: { type: String, unique: true, sparse: true },
      AiQuality: { type: String },
      AiGrade: { type: String },
      AiResultDate: { type: Date },
    },
    papillaLEImage: {
      Path: { type: String, unique: true, sparse: true },
      AiQuality: { type: String },
      AiGrade: { type: String },
      AiResultDate: { type: Date },
    },
    maculaREImage: {
      Path: { type: String, unique: true, sparse: true },
      AiQuality: { type: String },
      AiGrade: { type: String },
      AiResultDate: { type: Date },
    },
    papillaREImage: {
      Path: { type: String, unique: true, sparse: true },
      AiQuality: { type: String },
      AiGrade: { type: String },
      AiResultDate: { type: Date },
    },
  },

  measures: {
    weight: { type: Number },
    height: { type: Number },
    age: { type: Number },
    bloodPressure: {
      minVal: { type: Number },
      maxVal: { type: Number },
    },
    bloodSugarLevel: { type: Number },
    a1c: { type: Number },
  },

  // indicates if this exam will be graded by doctors based on the
  // time period between it and last exam for the same patient
  isGradable: { type: Boolean, default: true },

  isNotified: { type: Boolean, default: false },

  comment: { type: String },

  examResultRight: {
    finalResult: {
      quality: { type: String },
      grade: { type: String },
      resultDate: { type: Date },
    },
    doctorsResult: [
      {
        quality: { type: String },
        grade: { type: String },
        macularEdema: { type: String },
        resultDate: { type: Date },
        comment: { type: String },
        doctorID: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        mousePositions: [
          {
            x: { type: Number },
            y: { type: Number },
          },
        ],
        imageScale: { type: Number },
      },
    ],
    adjudicatorResult: {
      quality: { type: String },
      grade: { type: String },
      macularEdema: { type: String },
      resultDate: { type: Date },
      comment: { type: String },
      adjudicatorID: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      mousePositions: [
        {
          x: { type: Number },
          y: { type: Number },
        },
      ],
      imageScale: { type: Number },
    },
    doctorMismatch: { type: Boolean, default: false },
  },

  examResultLeft: {
    finalResult: {
      quality: { type: String },
      grade: { type: String },
      resultDate: { type: Date },
    },
    doctorsResult: [
      {
        quality: { type: String },
        grade: { type: String },
        macularEdema: { type: String },
        resultDate: { type: Date },
        comment: { type: String },
        doctorID: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        mousePositions: [
          {
            x: { type: Number },
            y: { type: Number },
          },
        ],
        imageScale: { type: Number },
      },
    ],
    adjudicatorResult: {
      quality: { type: String },
      grade: { type: String },
      macularEdema: { type: String },
      resultDate: { type: Date },
      comment: { type: String },
      adjudicatorID: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      mousePositions: [
        {
          x: { type: Number },
          y: { type: Number },
        },
      ],
      imageScale: { type: Number },
    },
    doctorMismatch: { type: Boolean, default: false },
  },
});

examSchema.plugin(timestamps);
examSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Exam", examSchema);
