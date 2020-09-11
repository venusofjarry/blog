const { _selectAll, updateUser, checkUser } = require('../../model/handleUser')
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    const body = req.body;
    const id = req.query.id;
    const result = await _selectAll(`select * from user1 where _id='${id}'`)

    const isValid = await bcrypt.compare(body.password, result[0].password)
    if (isValid) {
        try{
            await checkUser(body)
        }catch(e){
            return res.render('admin/user-edit', {
                message: e.message,
                userInfo: body,
                button: '修改',
                id: id,
                link: '/admin/user-modify?id=' + id
            })
            // return next(JSON.stringify({path: `/admin/user-edit?id=${id}`, message: e.message}))
        }
        const sql = `UPDATE user1 SET username = ?,email = ?,role = ?,state = ? WHERE _id='${id}'`;
        const value = [`${body.username}`,`${body.email}`,`${body.role}`,`${body.state}`]
        await updateUser(sql, value);
        res.redirect('/admin/user');
    } else {
        let obj = { path: '/admin/user-edit', message: '密码输入错误', id: id };
        next(JSON.stringify(obj));
    }
}