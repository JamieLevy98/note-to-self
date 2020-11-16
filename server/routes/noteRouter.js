const express = require("express");
const pool = require("../db");
const noteRouter = express.Router();

//Add a new note to the DB
noteRouter.post("/", async (req, res, next) => {
  try {
    const { title, colour } = req.body;
    const newNote = await pool.query(
      "INSERT INTO notes (title, colour) VALUES($1, $2) RETURNING *",
      [title, colour]
    );
    return res.status(201).json(newNote.rows[0]);
  } catch (e) {
    next(e);
  }
});

//Add a single item to a note.
noteRouter.post("/add", async (req, res, next) => {
  try {
    const {} = req.body;
    const newNoteEntry = await pool.query(
      "INSERT INTO note_item (noteid_id, description, isChecked) VALUES($1, $2, $3) RETURNING *",
      [noteid_id, description, isChecked]
    );
    return res.status(201).json(newNoteEntry.rows[0]);
  } catch (e) {
    next(e);
  }
});

//Get all notes from the DB
noteRouter.get("/", async (req, res, next) => {
  try {
    const allNotes = await pool.query("SELECT * FROM notes");
    return res.status(200).json(allNotes.rows);
  } catch (e) {
    next(e);
  }
});

//Get a single note by its id
//Maybe use this to load the contents of a note?
//ALSO possibly use put route to update a list item
noteRouter.get("/:id", async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

//Update a list items checked status from false to true/ vi ve
noteRouter.put("/item/:id", async (req, res, next) => {
try {
  
} catch (e) {
  next(e);
}
});

//Put route to hopefully update a note title.
noteRouter.put("/:id", async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

//Delete a note
noteRouter.delete("/:id", async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

//delete a list item
noteRouter.delete("/item/:id", async (req, res, next) => {
  try {
    
  } catch (e) {
    next(e);
  }
})
module.exports = noteRouter;
