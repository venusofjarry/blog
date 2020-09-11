const express = require('express');
const home = require('./route/home')
const admin = require('./route/admin')
const bodyParser = require('body-parser');
const session = require('express-session');
const template = require('art-template');
const dateFormat = require('dateformat');
const path = require('path');
const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art');
app.engine('art', require('express-art-template'));
template.defaults.imports.dateFormat = dateFormat;

app.use(session({secret: 'secret key'}));

// 注意，如果要访问静态资源，不用写太多的路径引用，因为这里已经配置了绝对路径，以后
// 在引用静态文件的时候只需要加上对应的路由即可，这里有两个路由：home和admin
// 比如我访问public文件夹下的home文件夹下的images文件夹，那么路径就是：local host:3000/home/images/文件名称
// 注意，这里因为要用到数据库，需要在页面上添加数据，所以html文件就不放在public文件夹下了。
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', require('./middleware/loginGuard'));
app.use('/home', home);
app.use('/admin', admin);
app.use((err, req, res, next) => {
    const result = JSON.parse(err);
    let errArray = [];
    for (let item in result) {
        if (item != 'path') {
            errArray.push(item + '=' + result[item]);
        }
    }
    res.redirect(`${result.path}?${errArray.join('&')}`)
})


app.listen(3000);
console.log('服务器启动成功');