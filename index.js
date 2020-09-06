const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

const config = require('./config/key');

//application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!~'))

app.post('/register', (req, res) => {
    //회원가입페이지 호출, 회원정보를 데이터베이스에 등록
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})