const Todo = require('../todo') // 載入 todo model
const db = require('../../config/mongoose')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 連線成功
db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({name:`name-${i}`})
  }
  console.log('done.')
})
