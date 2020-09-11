const { _selectAll } = require('../../model/handleUser')

module.exports = async (req, res) => { // 这里必须要先设置get方式获取到user界面才能进行跳转行为
    req.app.locals.currentLink = 'user';
    let page = req.query.page || 1;
    // console.log(page);
    let start = (page-1) * 5;
    const userLength = await _selectAll(`select * from user1`)
    const count = userLength.length;
    const userData = await _selectAll(`select * from user1 limit ${start},5`)
    // console.log(userData);
    const total = Math.ceil(count/5)
    // console.log(total);
    res.render('admin/user', {
        userData: userData,
        total: total,
        page: page,
        count: count
    })
}

 