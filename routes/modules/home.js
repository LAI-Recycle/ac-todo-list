const express = require('express')

const router = express.Router()

// 引用 Todo model
const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  //拿到全部todo的資料
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ name: "asc" }) //排序
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})


// 匯出路由模組
module.exports = router