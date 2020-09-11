const express = require('express');
const admin = express.Router();
const { login, loginPage } = require('./admin/login')

/*  
    login页面中的css，js文件的路径是相对于请求路径，而不是相对于服务器中的文件路径.
    打开login页面之后，点击当中引用的css文件，会显示文件路径为：http://localhost:3000/admin/css/base.css.千万不要以为这里的admin是publuc文件夹下的admin，这纯属巧合，如果我们在app.js中，将admin路由改为app.use('/abc', admin); 那么我们将访问不到public下的admin文件下的所有文件，如何解决这个问题呢，我们在css，js等文件的引用路径上，先添加上/，这个代表服务器的绝对路径，也就是public文件夹，因为之前已经设置了静态资源文件设置到了public文件夹下获取。这样还不行，因为public文件夹下还有另外的文件夹admin和home，所以在加上/之后，还有加上对应的文件夹路径，之后就是文件的路径了。
    另外注意，在res.render函数中写的路径和res.redirect中写的路径是不一样的，看清楚哦
*/
admin.get('/login', loginPage);

admin.post('/login', login);

admin.get('/user', require('./admin/user'));

admin.get('/user-edit', require('./admin/user-edit'));

admin.post('/user-edit', require('./admin/add-user'));

admin.post('/user-modify', require('./admin/user-modify'));

admin.get('/user-delete', require('./admin/user-delete'));

admin.get('/article', require('./admin/article'));

admin.get('/article-edit', require('./admin/article-edit'));

admin.post('/article-edit', require('./admin/article-add'))

module.exports = admin;
// art文件中的block设置是双向的，在骨架文件中挖坑，block双标签中不需要填入内容在另一方文件中，需要先引入骨架文件, 具体引入方法看例子，这里写了的话模板文件用不了了。然后在block双标签中填入内容