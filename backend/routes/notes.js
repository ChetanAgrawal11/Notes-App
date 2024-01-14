const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");

// Getting the notes of the user same as the creating the user
router.get("/fetchNotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json({ notes });
});

// Creating the notes for individual user
router.post(
  "/createNotes",
  [
    body("title", "Title must have min of 5 length").isLength({ min: 5 }),

    body("description", "Description must have 5 length ").isLength({ min: 3 }),
  ],
  fetchUser,
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
      }

      // My way by copying the register user
      // const notes = await Notes.create({
      //   user: req.user.id,
      //   title: req.body.title,
      //   description: req.body.description,
      //   tag: req.body.tag,
      // });
      // res.json({ notes });

      // New way--
      const { title, description, tag } = req.body;
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const allnotes = await notes.save();
      res.json(allnotes);
    } catch (error) {
      //  These is the just the checking of the error we can also remove the catch block no issue with it
      res.status(500).json("Some error has been occured");
      console.log(error.message);
    }
  }
);

// Updating the notes in the react web application

router.put("/updateNotes/:id", fetchUser, async (req, res) => {
  const new_notess = {};
  const { title, description, tag } = req.body;
  try {
    if (title) {
      new_notess.title = title;
    }
    if (description) {
      new_notess.description = description;
    }
    if (tag) {
      new_notess.tag = tag;
    }
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not matching");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Sonething went wrong ");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: new_notess },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    //  These is the just the checking of the error we can also remove the catch block no issue with it
    res.status(500).json("Some error has been occured");
    console.log(error.message);
  }
});

// Deleting the notes of the user
router.put("/deleteNotes/:id", fetchUser, async (req, res) => {
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not matching");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(404).send("Sonething went wrong ");
  }

  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted successfully", note });
});

module.exports = router;
