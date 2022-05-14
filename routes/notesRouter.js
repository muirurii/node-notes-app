const express = require('express');
const notesRouter = express.Router();
const notesControllers = require('../controllers/notesControllers');

notesRouter.get('/', notesControllers.allNotesController);

notesRouter.route('/newnote')
    .get(notesControllers.newNoteController)
    .post(notesControllers.addNoteController);

notesRouter.get('/note/:id', notesControllers.noteController);

notesRouter.post('/note/delete/:id', notesControllers.deleteNoteController);

notesRouter.route('/note/update/:id')
    .get(notesControllers.getUpdatePage)
    .post(notesControllers.updateNoteController);

module.exports = notesRouter;