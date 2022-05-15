let data = require('../data/notes.json');

const allNotesController = (req, res) => {
    res.render('index.ejs', { notes: data.notes });
}

const newNoteController = (req, res) => {
    res.render('newnote.ejs', {
        formError: false,
        content: '',
        title: ''
    });
}

const addNoteController = (req, res) => {
    const content = req.body.content;
    const title = req.body.title;
    if (!title.length || !content.length) {
        return res.status(400).render('newnote.ejs', { formError: true, content, title });
    }
    const newNote = {
        id: Math.floor(Math.random() * 9996 + Math.random() * 599),
        title,
        content: [...content.slice(0, 1).toUpperCase(), ...content.slice(1)].join('')
    }
    data = {...data, notes: [...data.notes, newNote] }
    res.render('note.ejs', { note: newNote });
}

const noteController = (req, res) => {
    const note = data.notes.find(note => note.id === +req.params.id);
    if (!note) return res.status(404).render('404.ejs');
    res.render('note.ejs', { note });
}

const getUpdatePage = (req, res) => {
    const note = data.notes.find((note) => note.id === +req.params.id);
    const { content, title, id } = note;
    res.render('update.ejs', { formError: false, content, title, id });
}

const updateNoteController = (req, res) => {
    const content = req.body.content;
    const title = req.body.title;
    const id = +req.params.id;
    if (!title.length || !content.length) {
        return res.status(400).render('update.ejs', { formError: true, content, title, id });
    }
    data = {...data, notes: data.notes.map(note => note.id === id ? { title, content, id } : note) }
    const updatedNote = data.notes.find((note) => note.id === id);
    res.render('note.ejs', { note: updatedNote });
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
    deleteNoteController,
    getUpdatePage,
    updateNoteController
};