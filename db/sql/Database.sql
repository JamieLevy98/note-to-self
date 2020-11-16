CREATE DATABASE note_to_self;
\c note_to_self;
CREATE TABLE notes(
  note_id SERIAL PRIMARY KEY,
  title VARCHAR(50),
  colour VARCHAR(32)
);
CREATE TABLE note_item(
  note_item_id SERIAL PRIMARY KEY,
  noteid_id INT,
  description VARCHAR(50),
  isChecked BOOLEAN,
  FOREIGN KEY (noteid_id) REFERENCES notes (note_id)
);