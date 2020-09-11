const { conn } = require('./mysql');
const Joi = require('joi');

// 这里是创建数据库数据的地方，这里是插入，要换成创建，并让它只能执行一次，否则每次登录都要重新创建数据，以后来解决
// async function createData () {
    // const salt = await bcrypt.genSalt(10);
    // const pass = await bcrypt.hash('123456', salt);
//     // console.log(pass);
//     var  addSql = 'INSERT INTO user1(username,email,password,role,state) VALUES(?,?,?,?,?)';
//     var  addSqlParams = ['iteheima', 'itheima@itcast.cn', pass, 'admin', 0];

//     conn.query(addSql,addSqlParams,function (err, result) {
//         if(err){
//          console.log('[INSERT ERROR] - ',err.message);
//          return;
//         }
//         // console.log(result)
//     });
// };


// createData();


const checkUser = (user) => {
    const schema = {
        username: Joi.string().min(2).max(50).required().error(new Error('用户名输入有误')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,100}$/).required().error(new Error('密码输入有误')),
        email: Joi.string().email().required().error(new Error('邮箱输入有误')),
        role: Joi.string().valid('admin', 'normal').required().error(new Error('角色输入有误')),
        state: Joi.string().valid('0', '1').required().error(new Error('状态输入有误'))
    };
    return Joi.validate(user, schema);
}


// 删除数据
const deleteUser = (sql) => {
    return new Promise((resolve, reject) => {
        conn.query(sql,function (err, result) {
            if(err){
                reject('[DELETE ERROR] - ',err.message);
                return;
            }
            resolve(result);
        });
    })
}


// 更新数据
const updateUser = (sql, value) => {
    return new Promise((resolve, reject) => {
        conn.query(sql,value,function (err, result) {
            if(err){
                reject('[UPDATE ERROR] - ',err.message);
                return;
            }
            resolve(result);
        });
    })
}

// 添加用户
const addData = (sql, value) => {
    return new Promise((resolve, reject) => {
        conn.query(sql,value,function (err, result) {
            if(err){
                reject('[INSERT ERROR] - ',err.message);
                return;
            }
            resolve(result);
        });
    })
}

// 查询客户
const _selectAll = (sql) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
              if (err) {
                reject('[CHECK ERROR] - ',err.message);
              } else {
              resolve(result)
              }
          })
    })
}
module.exports = {
    addData,
    _selectAll,
    checkUser,
    updateUser,
    deleteUser,
    conn
};