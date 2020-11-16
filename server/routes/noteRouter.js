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
    const { noteid_id, description, isChecked } = req.body;
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

//Get a single notes content by its id
noteRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const noteContent = await pool.query(
      "SELECT description, ischecked FROM note_item WHERE noteid_id = $1",
      [id]
    );
    return res.status(200).json(noteContent.rows);
  } catch (e) {
    next(e);
  }
});

//Update a list items checked status true/false
noteRouter.put("/item/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const newStatus = await pool.query(
      "UPDATE note_item SET ischecked = NOT ischecked WHERE note_item_id = $1 RETURNING *",
      [id]
    );
    return res.status(200).json(newStatus.rows[0]);
  } catch (e) {
    next(e);
  }
});

//Put route to hopefully update a note title.
noteRouter.put("/:id", async (req, res, next) => {
  try {
    const { title } = req.body;
    const { id } = req.params;
    const updatedNote = await pool.query(
      "UPDATE notes SET title = $1 WHERE note_id = $2 RETURNING *",
      [title, id]
    );
    return res.status(200).json(updatedNote.rows[0]);
  } catch (e) {
    next(e);
  }
});

//Delete a note
noteRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM note_item WHERE noteid_id = $1", [id]);
    await pool.query("DELETE FROM notes WHERE note_id = $1", [id]);
    return res.status(200).json({ success: "note deleted" });
  } catch (e) {
    next(e);
  }
});

//delete a list item
noteRouter.delete("/item/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM note_item WHERE note_item_id = $1", [id]);
    return res.status(200).json({ success: "note item deleted" });
  } catch (e) {
    next(e);
  }
});
module.exports = noteRouter;
