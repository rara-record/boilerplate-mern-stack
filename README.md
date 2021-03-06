# React & Node.js boiler-plate ๐
ํ์๊ฐ์, ๋ก๊ทธ์ธ, Auth, ๋ก๊ทธ์์ ๊ธฐ๋ฅ with John Ahn 
## ๋ฌด์์ ์๊ณ  ์ถ์๋?
1. session ๋ฐฉ์๊ณผ, jwt ๋ฐฉ์ ์ฐจ์ด
2. password ์ํธํ ํ๋ ๋ฒ
3. schema ๋ง๋๋๋ฒ
4. mongoose
5. react !!!! ๐พ

## ๐ก ๊ธฐ์ 
- Client : React, Redux, Ant Design
- Server: Express, MongoDB

## ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ ๋ฆฌ
- Client :  react-router-dom, axios, concurrently, http-proxy-middleware, redux, react-redux, redux-promise, redux-thunk
- Server : nodemon, express, mongoose, body-parser, jsonwebtoken, cookie-parser, body-parser

# 0. ์ด๊ธฐ ์ธํ
## Client : React ์ค์น
> npx create-react-app

## Server : Node.js ์ค์น
> node -v : ๋ฒ์ ํ์ธ
>
> npm init => package.json =>
>
> script : โstartโ : โnode index.jsโ

## Global : Concurrently

> npm install concurrently --save 
>
> package.json => 
>
> script :  "dev":  "concurrently \"npm run backend\" \"npm run start --prefix client\""

## 1. Client Setting ๐

## Axios

> npm install axios --save

## Proxy

CORS : ํด๋ผ์ด์ธํธ์ ์๋ฒ๊ฐ ๋ค๋ฅธํฌํธ๋ฅผ ๊ฐ์ง๊ณ  ์์ ๊ฒฝ์ฐ ๋ฐ์ํ๋ ๋ฌธ์ . Proxy๋ก ๋ฌธ์  ํด๊ฒฐ

> npm install http-proxy-middleware --save

```javascript
โญ client/src/setupProxy
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  )
}
```

## Ant Design

: CSS ํ๋ ์์ํฌ

> npm install antd --save

## 2. Sever Setting ๐

## MongoDB

ํด๋ฌ์คํฐ, user ์์ฑ

## Express 

> npm install express --save

```javascript
โญ server/index.js
const express = require('express')
const app = express()
const port = 5000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

## Nodemon

> npm install nodemon --save-dev
>
> package.json =>
>
> script : โbackendโ : โnodemon index.jsโ

## Mongoose & Schema ์์ฑ

> npm install mongoose --save

```javascript
โญ server/model/User.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})
const User = mongoose.model('User', userSchema);
module.exports = { User };

โญ server/index.js
const mongoose = require('mongoose');
mongoose.connect('mongoURI', {
  useUnifiedTopology: true, useNewUrlParser: true
}).then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err))
```

## BodyParser

ํด๋ผ์ด์ธํธ POST ์์ฒญ ๋ฐ์ดํฐ์ body๋ก๋ถํฐ ํ๋ผ๋ฏธํฐ๋ฅผ ํธ๋ฆฌํ๊ฒ ์ถ์ถ

> npm install body-parser --save
>
> ```javascript
> โญ server/index.js
> const bodyParser = require('body-parser');
> const { User } = require("./models/User");
> app.use(express.urlencoded({extended : true}));
> app.use(express.json());
> 
> app.post('/register', (req, res) => {
>     // ํ์ํ ์ ๋ณด๋ค์ cclient์์ ๊ฐ์ ธ์ค๋ฉด
>     // ๊ทธ๊ฒ๋ค์ ๋ฐ์ดํฐ ๋ฒ ์ด์ค์ ๋ฃ์ด์ค๋ค.
>     const user = new User(req.body)
> 
>     user.save((err, userInfo) => {
>         if (err) return res.json({ success: false, err})
>         return res.status(200).json({
>             success: true
>         })
>     })
> })
> // ํฌ์คํธ๋งจ์์ post์์ฒญ
> ```

## Mongoose ์ ๋ณด ๊ด๋ฆฌ

```javascript
โญ server/index.js
const config = require('./config/key');
mongoose.connect(config.mongoURI, ...)
                 
โญ server/config/key.js
module.exports = {
	// MONGO_URI๋ ๋ฐฐํฌ์ ์ด๋ฆ๊ณผ ๋์ผํ๊ฒ
	mongoURI: process.env.MONGO_URI
}

โญ server/config/dev.js
module.exports = {
    mongoURI: 'Mongo Connect URI'
}
```

## SSH๋ฅผ ํตํ GitHub ์ฐ๊ฒฐ

### .gitignore

> node_modules
>
> dev.js

# 1. ํ์๊ฐ์

## Server ๐

## Bctypt ๋น๋ฐ๋ฒํธ ์ํธํ

bcrypt.genSalt : DB์ ์ฅ์ ์ ์ ๋ฌ๋ฐ์ ๋น๋ฐ๋ฒํธ๋ฅผ Salt๋ฅผ ์ด์ฉํด ์ํธํ
saltRounds  : Salt๊ฐ ๋ช ๊ธ์์ธ์ง

> $ npm install bcrypt --save

```javascript
โญ models/User.js
const bcrypt = require('bcrypt');
const saltRounds = 10; 

// pre : ์ ์ฅํ๊ธฐ ์ ์ ํ  ์ผ
userSchema.pre('save', function (next) {
    let user = this; // userSchema๋ฅผ ๊ฐ๋ฆฌํด
 
    // isModified : userSchema์์ ๋น๋ฐ๋ฒํธ ๋ณํ์์๋ง ํ ์ผ
    if(user.isModified('password')) {
       // salt ์์ฑ => salt๋ฅผ ์ด์ฉํด์ ๋น๋ฐ๋ฒํธ๋ฅผ ์ํธํ
       bcrypt.genSalt(saltRounds, (err, salt) => {
          if(err) return next(err)
 
          bcrypt.hash(user.password, salt, (err, hash) => {
          if(err) return next(err)
          user.password = hash 
          next() // next : index.js / user.save ๋ก ๋๋ ค๋ณด๋
          })
       })
    } else { 
       next()
    }
});
```

# 2. ๋ก๊ทธ์ธ

## Server ๐

1. ์์ฒญ๋ ์์ด๋๊ฐ ๋ฐ์ดํฐ ๋ฒ ์ด์ค์ ์๋์ง ์ฐพ๋๋ค. (User.findeOne)

2. ์๋ค๋ฉด, ๋น๋ฐ๋ฒํธ๊ฐ ๋ง๋์ง ํ์ธํ๋ค. (userSchema.methods.comparePassword)

3. ๋ง๋ค๋ฉด ๊ทธ๋ ํ ํฐ์ ์์ฑํ๋ค. 
4. ์ฟ ํค์ ํ ํฐ์ ์ ์ฅํ๋ค.

## Token ์์ฑ (JWT)

> npm install jsonwebtoken --save

```javascript
โญ models/User.js
const jwt = require('jsonwebtoken')

// ๋น๋ฐ๋ฒํธ ๋น๊ต ๋ฉ์๋ ์์ฑ : plainPassword๋ฅผ ์ํธํ ์์ผ์ ๋น๊ตํ๋ค.
userSchema.methods.comparePassword = function(plainPassword, call) {

    // ex) plainPassword 1234567 === hashPassword : $2b$10$smjX/wlIpdOM4 
    bcrypt.compare(plainPassword, this.password, 
        function(err, isMatch) {
            if(err) return call(err), 

            // ์๋ฌ๋ null, ๊ฒฐ๊ณผ๊ฐ : isMatch (์ฑ๊ณต)
            call(null, isMatch)
    })
}

// jsonToken ์์ฑ ๋ฉ์๋
userSchema.methods.generateToken = function(cb) {
    let user = this;
 
    // jwt.sign(์ ์ ์์ด๋, '์๋ช') 
    let token = jwt.sign(user._id.toHexString(), 'secretToken'); // user._id : database / _id
 
    // user._id + 'secretToken' = token
    // input : ์๋ช, output : user._id 
    // ์๋ช'(์์ด๋)๋ฅผ ๊ฐ์ง๊ณ  ๋๊ตฐ์ง ํ๋จ
 
    user.token = token;
    user.save((err, user) => {
       if(err) return cb(err);
       cb(null, user) // ์ฑ๊ณต์ ์๋ฌ null, user ์ ๋ณด ์ ๋ฌ
    })
 }
```

## Cookie ์ ์ฅ

> npm install cookie-parser --save

```javascript
โญ server/index.js
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.post('/api/users/login', (req, res) => {

  // 1. ์์ฒญ๋ ์ด๋ฉ์ผ์ ๋ฐ์ดํฐ ๋ฒ ์ด์ค์์ ์ฐพ๋๋ค
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '์ ๊ณต๋ ์ด๋ฉ์ผ์ ํด๋นํ๋ ์ ์ ๊ฐ ์์ต๋๋ค.'
      })
    }

    // 2. ์์ฒญ๋ ์ด๋ฉ์ผ์ด ๋ฐ์ดํฐ ๋ฒ ์ด์ค์ ์๋ค๋ฉด ๋น๋ฐ๋ฒํธ๊ฐ ๋ง๋ ๋น๋ฐ๋ฒํธ ์ธ์ง ํ์ธ. 
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) // ๊ฒฐ๊ณผ๊ฐ ๋ง์ง ์๋ค๋ฉด
        return res.json({ loginSuccess: false, message: '๋น๋ฐ๋ฒํธ๊ฐ ํ๋ ธ์ต๋๋ค.'})

      // 3. ๋น๋ฐ๋ฒํธ๊ฐ ๋ง๋ค๋ฉด Token ์์ฑ
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)

        // 4. ํ ํฐ์ ์ ์ฅํ๋ค. ์ด๋์? cookie, localStorage, session ๋ฑ.. 
        res.cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})
```

## Auth (์ธ์ฆ)

## Auth models

```javascript
โญ models/User.js

// ํ ํฐ ๋ณตํธํ ๋ฉ์๋ ์์ฑ
userSchema.statics.findByToken = function(token, cb) {
   let user = this; // userSchema๋ฅผ ๊ฐ๋ฆฌํด

   // verify: ํ ํฐ์ decode(๋ณตํธํ) ํจ์
   // decoded = ๋ณตํธํ๋ ์ ์ ์์ด๋
   jwt.verify(token, 'secretToken', function(err, decode) { // ํ ํฐ ๊ฒ์ฆ

      // ์ ์  ์์ด๋๋ฅผ ์ด์ฉํด, ์ ์ ๋ฅผ ์ฐพ๋๋ค.
      user.findOne({ "_id" : decode, "token" : token}, function(err, user) {
         if(err) return cb(err);
         cb(null, user)       
      })
   }) 
}
```

## Auth middleware 

```javascript
const { User } = require('../models/User');

// ์ธ์ฆ์ฒ๋ฆฌ ๋ฏธ๋ค์จ์ด ์์ฑ
let auth = (req, res, next) => {

   // ํด๋ผ์ด์ธํธ ์ฟ ํค์์ ํ ํฐ์ ๊ฐ์ ธ์จ๋ค. (Cookie-parser์ด์ฉ)
   let token = req.cookies.x_auth;

   // token์ decode(๋ณตํธํ) ํ ํ์,
   // token๊ณผ DB์ ๋ณด๊ด๋ ํ ํฐ์ด ์ผ์นํ๋์ง ํ์ธํ๋ค.
   User.findByToken(token, (err, user) => {
      if (err) throw err;
      if (!user)
         return res.json({
         isAuth: false,
         error: true
      });

      req.token = token; // ๋ณตํธํ ๋ token ์ ์ฅ
      req.user = user; // ๋ณตํธํ ๋ user ์ ์ฅ
      next(); // index.js๋ก ๋ฐ์ดํฐ ๊ฐ์ง๊ณ  ๋์๊ฐ๊ธฐ : next ์์ฐ๋ฉด ์ด ๋ฏธ๋ค์จ์ด์ ๊ฐํ๊ฒ ๋๋ค.
   })
}


module.exports = { auth };
```

## Auth server

```javascript
โญ server/index.js

// ์ธ์ฆ ๊ธฐ๋ฅ
const { auth } = require("./middleware/auth");

app.get('/api/users/auth', auth, (req, res) => {
   // ๋ฏธ๋ค์จ์ด ํต๊ณผ ํ ์คํ๋  ์ฝ๋
   // ๋ฏธ๋ค์จ์ด๋ฅผ ํตํํ๋ค => Authentication๊ฐ Ture๋ค.
 
   // ํด๋ผ์ด์ธํธ์ ์๋ต, ์ด๋ค ์ ๋ณด๋ฅผ?
   res.status(200).json({ 
     // auth.js์์ user์ ๋ณด๋ฅผ ๋ฃ์๊ธฐ ๋๋ฌธ์ user._id๊ฐ ๊ฐ๋ฅ
     _id: req.user._id, 
     // cf) role์ด 0 ์ด๋ฉด ์ผ๋ฐ์ ์ , role์ด ์๋๋ฉด ๊ด๋ฆฌ์
     isAdmin: req.user.role === 0 ? false : true,
     isAuth: true,
     email: req.user.email,
     name: req.user.name,
     lastname: req.user.lastname,
     role: req.user.role,
     image: req.user.image,
   })
 });
```

# 3. ๋ก๊ทธ์์

๋ก๊ทธ์์ ํ๋ ค๋ ์ ์ ๋ฅผ ๋ฐ์ดํฐ๋ฒ ์ด์ค์์ ์ฐพ์์ ๊ทธ ์ ์ ์ ํ ํฐ์ ์ง์์ค๋ค.

## server ๐

``` javascript
โญ server/index.js

// auth๋ฅผ ๋ฃ๋ ์ด์ ๋ login์ด ๋์ด์๋ ์ํ์ด๊ธฐ ๋๋ฌธ์
app.get('/api/users/logout', auth, (req, res) => {
  
   // user._id : ๋ฏธ๋ค์จ์ด auth user ๋ฅผ ์ฐพ์ , ๊ทธ ์ ์ ์ ํ ํฐ์ ์ง์์ค๋ค.
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).send({
      success: true,
    })
  })
  
})
```

