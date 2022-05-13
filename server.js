const express = require('express');
const app = express();
const notesRouter = require('./routes/notesRouter');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');

app.use(notesRouter);

app.all('*', (req, res) => {
    res.render('404.ejs')
});

app.listen(PORT, () => {
    console.log('SERVER STARTED AT PORT ' + PORT);
});