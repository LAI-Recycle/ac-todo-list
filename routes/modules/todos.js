// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

//新增一筆 To-do
router.get('/new', (req, res) => {
  return res.render('new')
})

//Create 功能：資料庫新增資料
router.post('/', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  
  // const todo = new Todo({ name })
  // return todo.save() 
  //   .then(() => res.redirect('/')) // 新增完成後導回首頁
  //   .catch(error => console.log(error))

  return Todo.create({ name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})


router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})


router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const isDone = req.body.isDone
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === "on"
      // if (isDone === 'on') {
      //   todo.isDone = true
      // } else {
      //   todo.isDone = false
      // }
      return todo.save()
    })
    .then(()=> res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})


router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})




// 匯出路由器
module.exports = router