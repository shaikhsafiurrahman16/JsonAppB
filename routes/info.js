var express = require("express");
var router = express.Router();
const Info = require("../models/database/CommInfo");

router.post("/add", async (req, res) => {
  try {
    const jsonData = req.body;
    console.log("Received JSON:", jsonData);
    const newInfo = new Info(jsonData);
    await newInfo.save();

    res.json({
      message: "Data inserted successfully",
      data: newInfo,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allInfo = await Info.find()
      .sort({ order: 1 })
      .select("-order");
    res.json({
      message: "Data fetched successfully",
      data: allInfo,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Info.findByIdAndDelete(id);

    if (!deleted) {
      return res.json({ message: "Record not found" });
    }

    res.json({
      message: "Record deleted successfully",
      data: deleted,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Info.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.json({ message: "Record not found" });
    }

    res.json({
      message: "Record updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/reorder", async (req, res) => {
  const { orderedIds } = req.body;
  try {
    for (let i = 0; i < orderedIds.length; i++) {
      await Info.updateOne({ _id: orderedIds[i] }, { order: i });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
});

module.exports = router;
