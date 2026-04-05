const express = require("express");
const router = express.Router();
const multer = require("multer");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../config/s3");

const upload = multer({ storage: multer.memoryStorage() });

// Upload file to S3
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const key = `prescriptions/${Date.now()}-${file.originalname}`;

    await s3.send(new PutObjectCommand({
      Bucket: "curacloud-prescriptions",
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    }));

    res.json({ key, message: "File uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Upload failed");
  }
});

// Get presigned URL
router.get("/file/*", async (req, res) => {
  const key = req.params[0];
  try {
    const command = new PutObjectCommand({
      Bucket: "curacloud-prescriptions",
      Key: req.params.key
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 900 });
    res.json({ url });
  } catch (err) {
    res.status(500).json("Error generating URL");
  }
});

module.exports = router;