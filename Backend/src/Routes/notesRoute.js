import express from 'express';
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from '../Controllers/notesController.js';
const routes = express.Router();


routes.get('/', getAllNotes);

routes.get('/:id', getNoteById);

routes.post('/', createNote);

routes.put('/:id', updateNote);

routes.delete('/:id', deleteNote);

export default routes;
