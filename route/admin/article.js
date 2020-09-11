const { _selectAll } = require('../../model/handleUser');

module.exports = async (req, res) => {
    req.app.locals.currentLink = 'article';
    let page = req.query.page || 1;
    // console.log(page);
    let start = (page-1) * 5;
    const articleLength = await _selectAll(`select * from article`);
    const count = articleLength.length;
    const articleData = await _selectAll(`select * from user1 limit ${start},5`)
    // console.log(userData);
    const total = Math.ceil(count/5)
    // console.log(total);
    res.render('admin/user', {
        articleData: articleData,
        total: total,
        page: page,
        count: count
    })
}