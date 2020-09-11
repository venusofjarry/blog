const { conn } = require('./mysql');


// 删除数据
const deleteArticle = (sql) => {
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
const updateArticle = (sql, value) => {
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
const addArticle = (sql, value) => {
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
const selectArticle = (sql) => {
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
    deleteArticle,
    updateArticle,
    addArticle,
    selectArticle
}