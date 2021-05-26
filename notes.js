const chalk = require("chalk");
const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken."));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  const notesAfterRemoval = notes.filter((note) => note.title !== title);

  if (notesAfterRemoval.length !== notes.length) {
    saveNotes(notesAfterRemoval);
    console.log(chalk.green.inverse("Note removed!"));
  } else {
    console.log(chalk.red.inverse("No Note found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.blue.inverse.bold("Your notes"));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();

  const noteToRead = notes.find((note) => note.title === title);

  if (noteToRead) {
    console.log(chalk.blue.inverse.bold(noteToRead.title));
    console.log(noteToRead.body);
  } else {
    console.log(chalk.red.inverse.bold("Specified note not found"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
