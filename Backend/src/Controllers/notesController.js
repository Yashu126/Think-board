// export async function name(params) {
  
// }
import Note from '../Models/Note.js';

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
  }
  catch(error) {
    res.status(500).json({message: 'Error retrieving notes', error: error.message});
  }
}

export const getNoteById = async (req, res) => {
  try{
    const {id} = req.params;
    const note = await Note.findOne(id);
    if(!note) {
      return  res.status(404).json({message: 'Note not found'});
    }
    res.status(200).json(note);
  }
  catch(error) {
    res.status(500).json({message: 'Error retrieving note', error: error.message});
  }
}

export const createNote = async (req, res) => {
  try {
    const {title, content} = req.body;
    const newNote = await new Note({title, content});
    await newNote.save();
    res.status(201).json(newNote);
  }
  catch(error) {
    res.status(500).json({message: 'Error creating note', error: error.message});
  }
}

export const updateNote = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(id, {title, content}, {new: true});
    if(!updatedNote) {
      return res.status(404).json({message: 'Note not found'});
    }
    res.status(200).json(updatedNote);
  }
  catch(error) {
    res.status(500).json({message: 'Error updating note', error: error.message});
  }
}

export const deleteNote = async (req, res) => {
  try{
    const {id} = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if(!deletedNote) {
      return res.status(404).json({message: 'Note not found'});
    }
    res.status(200).json({message: 'Note deleted successfully'});
  }
  catch(error) {
    res.status(500).json({message: 'Error deleting note', error: error.message});
  }
}


//yashwanthraj7392_db_user
//XUuPVB2IYtsxQHQg
//mongodb+srv://yashwanthraj7392_db_user:XUuPVB2IYtsxQHQg@notes.hwzac60.mongodb.net/?retryWrites=true&w=majority&appName=Notes