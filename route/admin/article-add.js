const formidable = require('formidable');
const path = require('path');
const { addData } = require('../../model/handleUser');

module.exports = (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        await addData(`INSERT INTO article(title,author,cover,publishDate,content) VALUES(?,?,?,?,?)`, [fields.title,fields.author,files.cover.path.split('public')[1],fields.publishDate,fields.content])
        res.redirect('/admin/article');
    })
}