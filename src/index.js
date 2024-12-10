const express = require("express");

const app = express();

const connectToDb = require("./config/connect");
const { PORT } = require("./Utils/constant");

const SpaceModel = require("./Models/space");

const cors = require('cors');
const { createSpaceValidator, validateObjectId } = require("./Utils/validate");

app.use(express.json());
app.use(cors({
  origin:"*"
}))



// creating new space with proper JSON format and error message
app.post("/api/v1/spaces", async (req, res) => {
  try {
    const { type, capacity, pricePerUnit , spaceName } = req.body;

    console.log(req.body)

    if (!type  || !spaceName) {
      return res.status(400).json({
        error: "Bad Request",
        message:
          "One or more required fields are missing. Please provide all the necessary details.",
      });
    }

    createSpaceValidator(req);

    const space = await SpaceModel({
      ...req.body,
    });

    await space.save();

    res.status(201).json({
      message: "Space created successfully",
      data: space,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// delete a space
app.delete("/api/v1/spaces/:spaceId", async (req, res) => {
  try {
    const { spaceId } = req.params;

    const isValid = validateObjectId(spaceId);

    if (!isValid) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid space ID",
      });
    }
    const space = await SpaceModel.findById(spaceId);

    if (!space) {
      return res.status(404).json({
        error: "Not Found",
        message: "Space not found",
      });
    }

    await SpaceModel.findByIdAndDelete(spaceId);

    res.status(200).json({
      message: "Space deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/v1/spaces/:spaceId", async (req, res) => {
  try {
    const { spaceId } = req.params;

    const isValid = validateObjectId(spaceId);

    if (!isValid) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid space ID",
      });
    }
    const space = await SpaceModel.findById(spaceId);

    if (!space) {
      return res.status(404).json({
        error: "Not Found",
        message: "Space not found",
      });
    }

    res.status(200).json({
      message: "Space deleted successfully",
      data:space
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// update a space
app.put("/api/v1/spaces/:spaceId", async (req, res) => {
  try {
    const { spaceId } = req.params;

    const isValid = validateObjectId(spaceId);

    if (!isValid) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid space ID",
      });
    }
    const space = await SpaceModel.findById(spaceId);

    if (!space) {
      return res.status(404).json({
        error: "Not Found",
        message: "Space not found",
      });
    }

    await SpaceModel.findByIdAndUpdate(spaceId, {
      ...req.body,
    });

    res.status(200).json({
      message: "Space updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// get all space
app.get("/api/v1/spaces", async (req, res) => {
  try {
    const { selectedCategory } = req.query;
    if(!selectedCategory){
      return res.status(400).json(
        {
          message:"invalid category provided"
        },
      )
    }

    const filter = selectedCategory === "all" ? { } : {type: selectedCategory};

    const allSpaces = await SpaceModel.find(filter);
    res.status(200).json({
      message: "Spaces retrieved successfully",
      data: allSpaces,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDb();
});
