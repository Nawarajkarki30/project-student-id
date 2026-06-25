import IdCard from "../models/IdCard.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Admin creates a new ID card. Also creates the student's login
//          account if one doesn't exist yet, using the email/password
//          provided in the form, and links them via studentEmail.
// @route   POST /api/idcards
// @access  Private/Admin
export const createIdCard = asyncHandler(async (req, res) => {
  const {
    studentName,
    studentEmail,
    studentPassword,
    studentPhoto,
    rollNumber,
    className,
    section,
    dob,
    bloodGroup,
    address,
    guardianName,
    guardianPhone,
    schoolName,
    schoolLogo,
    schoolAddress,
    schoolContact,
    issueDate,
    expiryDate,
    position,
  } = req.body;

  if (!studentEmail || !studentName || !studentPassword) {
    res.status(400);
    throw new Error("Student name, email, and password are required");
  }

  const existingCard = await IdCard.findOne({ studentEmail });
  if (existingCard) {
    res.status(400);
    throw new Error("An ID card already exists for this student email");
  }

  // Create the student's login account if it doesn't exist yet
  let studentUser = await User.findOne({ email: studentEmail });
  if (!studentUser) {
    studentUser = await User.create({
      name: studentName,
      email: studentEmail,
      password: studentPassword,
      role: "student",
    });
  }

  const idCard = await IdCard.create({
    studentName,
    studentEmail,
    studentPhoto,
    rollNumber,
    className,
    section,
    dob,
    bloodGroup,
    address,
    guardianName,
    guardianPhone,
    schoolName,
    schoolLogo,
    schoolAddress,
    schoolContact,
    issueDate,
    expiryDate,
    position,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, idCard });
});

// @desc    Admin: get all ID cards, optional ?search= by name or roll number
// @route   GET /api/idcards
// @access  Private/Admin
export const getAllIdCards = asyncHandler(async (req, res) => {
  const { search } = req.query;

  let query = {};
  if (search) {
    query = {
      $or: [
        { studentName: { $regex: search, $options: "i" } },
        { rollNumber: { $regex: search, $options: "i" } },
        { studentEmail: { $regex: search, $options: "i" } },
      ],
    };
  }

  const idCards = await IdCard.find(query).sort({ createdAt: -1 });
  res.json({ success: true, count: idCards.length, idCards });
});

// @desc    Admin: get a single ID card by its Mongo _id
// @route   GET /api/idcards/:id
// @access  Private/Admin
export const getIdCardById = asyncHandler(async (req, res) => {
  const idCard = await IdCard.findById(req.params.id);

  if (!idCard) {
    res.status(404);
    throw new Error("ID card not found");
  }

  res.json({ success: true, idCard });
});

// @desc    Admin: update an ID card
// @route   PUT /api/idcards/:id
// @access  Private/Admin
export const updateIdCard = asyncHandler(async (req, res) => {
  const idCard = await IdCard.findById(req.params.id);

  if (!idCard) {
    res.status(404);
    throw new Error("ID card not found");
  }

  const updatableFields = [
    "studentName",
    "studentPhoto",
    "rollNumber",
    "className",
    "section",
    "dob",
    "bloodGroup",
    "address",
    "guardianName",
    "guardianPhone",
    "schoolName",
    "schoolLogo",
    "schoolAddress",
    "schoolContact",
    "issueDate",
    "expiryDate",
    "position",
  ];
  // studentEmail intentionally excluded — changing it would break the
  // student-login link. If it must change, delete and recreate the card.

  updatableFields.forEach((field) => {
    if (req.body[field] !== undefined) idCard[field] = req.body[field];
  });

  const updatedIdCard = await idCard.save();
  res.json({ success: true, idCard: updatedIdCard });
});

// @desc    Admin: delete an ID card
// @route   DELETE /api/idcards/:id
// @access  Private/Admin
export const deleteIdCard = asyncHandler(async (req, res) => {
  const idCard = await IdCard.findById(req.params.id);

  if (!idCard) {
    res.status(404);
    throw new Error("ID card not found");
  }

  await idCard.deleteOne();
  res.json({ success: true, message: "ID card deleted" });
});

// @desc    Student: get their own ID card (matched by logged-in user's email)
// @route   GET /api/idcards/me
// @access  Private/Student
export const getMyIdCard = asyncHandler(async (req, res) => {
  const idCard = await IdCard.findOne({ studentEmail: req.user.email });

  if (!idCard) {
    // Not an error — this is the expected "empty state" case
    return res.json({ success: true, idCard: null });
  }

  res.json({ success: true, idCard });
});