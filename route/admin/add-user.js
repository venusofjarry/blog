const { addData, _selectAll, checkUser, conn } = require('../../model/handleUser')
const bcrypt = require('bcrypt');

// 这里的joi当前版本用不了（今天是2020-9-9），我先用的14.3.1版本
module.exports = async (req, res, next) => {
    try{
        await checkUser(req.body)
    }catch(e){
        return next(JSON.stringify({path: '/admin/user-edit', message: e.message}))
    }
    const result = await _selectAll(`select * from user1 where email='${req.body.email}'`)
    if (result[0]) {
        // console.log(result);
        next(JSON.stringify({path: '/admin/user-edit', message: '您填写的邮箱已存在'}))
    } else {
        const { username,email,password,role,state } = req.body;
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password, salt);
        await addData(`INSERT INTO user1(username,email,password,role,state,__v) VALUES(?,?,?,?,?,?)`, [username,email,pass,role,state,'0'])
        // 下面的两条语句用于更新数据库的id值
        await conn.query(`SET @i=0`)
        await conn.query(`UPDATE user1 SET _id=(@i:=@i+1)`);
        res.redirect('/admin/user');
    }
}