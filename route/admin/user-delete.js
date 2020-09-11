const { deleteUser, conn } = require('../../model/handleUser')

module.exports = async (req, res) => {
    await deleteUser(`delete from user1 where _id=${req.query.id}`);
    // 下面的两条语句用于更新数据库的id值
    await conn.query(`SET @i=0`)
    await conn.query(`UPDATE user1 SET _id=(@i:=@i+1)`);
    res.redirect('/admin/user');
}