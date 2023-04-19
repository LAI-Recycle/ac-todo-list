// app.js
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
 
const bodyParser = require('body-parser')// 引用 body-parser
const exphbs = require('express-handlebars')
// 載入 method-override
const methodOverride = require('method-override')

const Todo = require("./models/todo")

// 引用路由器
const routes = require('./routes')
 
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

mongoose.connect(process.env.MONGODB_URI , { useNewUrlParser: true , useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//主程式啟用 Handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 設定路由
// Todo 首頁
// 將 request 導入路由器
app.use(routes)


app.listen( 3000 , ()=>{
  console.log("app is running on http://localhost:3000.")
})