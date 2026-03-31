const router = require("express").Router();

router.post("/", (req, res) => {
  const { patient_id, location } = req.body;

  console.log("SOS ALERT:", patient_id, location);

  res.json({
    message: "SOS sent successfully",
    data: { patient_id, location }
  });
});

module.exports = router;