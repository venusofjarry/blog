const { _selectAll } = require("../../model/handleUser");

module.exports = async (req, res) => { // 这里必须要先设置get方式获取到user界面才能进行跳转行为
    req.app.locals.currentLink = 'user';

    // 这里的message是由app.js出过来的，app.js有一个use中间件，专门用于处理  验证用户修改（添加）信息  的中间件，验证规则写在了mysql.js中，被引用到了add-user.js中
    const { message, id } = req.query;
    if (id) {
        const userInfo = (await _selectAll(`select * from user1 where _id=${id}`))[0]
        // console.log(userInfo);
        res.render('admin/user-edit', {
        message: message,
        id: id,
        // 我把这里注释之后，页面上还是会获取到超级管理员的所有信息，不知道为什么
        userInfo: userInfo,
        // 注意，当使用form表单，采用post提交数据时，post是不会管地址栏的数据的，如果你需要传递get参数，而且当前页面的地址栏也有参数，但是，但是，你没有将地址栏的参数放入即将跳转的连接路由上，此时跳转过去的页面是拿不到你的get参数的。就像下面的link，如果你在link后面没有添加id字段，那么跳转过去的页面中是拿不到id数值的。
        link: '/admin/user-modify?id=' + id,
        button: '修改'
        })
    } else {
        res.render('admin/user-edit', {
            link: '/admin/user-edit',
            button: '添加',
            message: message
        })
    }
}