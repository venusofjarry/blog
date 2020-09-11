const { _selectAll } = require('../../model/handleUser');
const bcrypt = require('bcrypt');

const loginPage = (req, res) => {
    res.render('admin/login')
}

const login = async (req, res) => {
    const {email, password} = req.body;
    const result = await _selectAll(`select * from user1 where email='${email}'`);
    const isEqual = await bcrypt.compare(password, result[0].password)
    console.log(isEqual);
    if (result[0].email == email && isEqual) {
        req.session.username = result[0].username;
        // locals属性是全局属性，在全局作用域下都可以访问，现在我们存储了userInfo信息，在全局作用域下都可以拿得到这个数据，也就不用在每次登录之后再手动保存了。
        req.app.locals.userInfo = result[0];
        res.redirect('/home/article'); // 这里能跳转的前提是可以获取到user页面；在没有使用get方式获取user页面时，我们即使设置了跳转，也没有用。
        return
    } else { 
        res.render('admin/login', {msg: '邮箱或密码错误'})
    }
}

module.exports = {
    login,
    loginPage
};