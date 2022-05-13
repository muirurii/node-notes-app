let data = require('../data/notes.json');

const allNotesController = (req, res) => {
    res.render('index.ejs', { notes: data.notes });
}

const newNoteController = (req, res) => {
    res.render('newnote.ejs', { classname: '' });
}

const addNoteController = (req, res) => {
    const content = req.body.content;
    const title = req.body.title;
    if (!title || !content) return res.render('newnote.ejs', { classname: 'error' });
    const newNote = {
        id: Math.floor(Math.random() * 6 + 599),
        title,
        content
    }
    data = {...data, notes: [...data.notes, newNote] }
    res.redirect('/');
}

const noteController = (req, res) => {
    const note = data.notes.find(note => note.id === +req.params.id);
    if (!note) res.status(404).render('404.ejs');
    res.render('note.ejs', { note });
}

const deleteNoteController = (req, res) => {
    data = {...data, notes: data.notes.filter(note => note.id !== +req.params.id) }
    res.redirect('/');
}

module.exports = {
    allNotesController,
    newNoteController,
    addNoteController,
    noteController,
    deleteNoteController
};