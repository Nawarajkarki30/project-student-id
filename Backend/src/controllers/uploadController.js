import cloudinary from "../config/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Upload an image (student photo or school logo) to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No image file provided");
  }

  const b64 = Buffer.from(req.file.buffer).toString("base64");
  const dataURI = `data:${req.file.mimetype};base64,${b64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "school-id-cards",
    resource_type: "image",
  });

  res.status(201).json({
    success: true,
    url: result.secure_url,
  });
});