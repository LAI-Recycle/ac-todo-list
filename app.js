// app.js
const express = require('express')
const bodyParser = require('body-parser')// 引用 body-parser
const exphbs = require('express-handlebars')
// 載入 method-override
const methodOverride = require('method-override')

// 引用路由器
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

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

//記得使用``框起${}
app.listen( PORT , ()=>{
  console.log(`app is running on http://localhost:${PORT}.`) 
})