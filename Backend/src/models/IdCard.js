import mongoose from "mongoose";

const idCardSchema = new mongoose.Schema(
  {
    // --- Link between login account and ID card ---
    studentEmail: {
      type: String,
      required: [true, "Student email is required"],
      unique: true, // one ID card per student email
      lowercase: true,
      trim: true,
    },

    // --- Student details ---
    studentName: {
      type: String,
      required: [true, "Student full name is required"],
      trim: true,
    },
    studentPhoto: {
      type: String, // Cloudinary URL only, never store image binary
      required: [true, "Student photo is required"],
    },
    rollNumber: {
      type: String,
      required: [true, "Roll number / Student ID is required"],
    },
    className: {
      type: String,
      required: [true, "Class or grade is required"],
    },
    section: {
      type: String,
      required: [true, "Section is required"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    guardianName: {
      type: String,
      required: [true, "Guardian name is required"],
    },
    guardianPhone: {
      type: String,
      required: [true, "Guardian phone number is required"],
    },

    // --- School details ---
    schoolName: {
      type: String,
      required: [true, "School name is required"],
    },
    schoolLogo: {
      type: String, // Cloudinary URL, optional per spec
    },
    schoolAddress: {
      type: String,
      required: [true, "School address is required"],
    },
    schoolContact: {
      type: String,
      required: [true, "School contact is required"],
    },

    // --- Card validity ---
    issueDate: {
      type: Date,
      required: [true, "Issue date is required"],
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    position: {
      type: String,
      default: "Student",
    },

    // --- Track which admin created/owns this card ---
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Speeds up student-dashboard lookups by email and admin search
idCardSchema.index({ studentEmail: 1 });
idCardSchema.index({ studentName: "text", rollNumber: "text" });

const IdCard = mongoose.model("IdCard", idCardSchema);

export default IdCard;