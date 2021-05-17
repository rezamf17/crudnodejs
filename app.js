const express = require('express')
const flash   = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const app = express()
const db =  require('./config/db')
const User = require('./models/User')
const expressLayouts = require('express-ejs-layouts')

errMessage = () =>{
    console.error(err.message)
    res.status(500).send('server error')
}
app.use(cookieParser('secret'))
app.use(session({ 
    cookie: { 
      maxAge: 60000 
    },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
  }))
  
  app.use(flash())

app.set('view engine', 'ejs');
app.use(expressLayouts)
app.use(express.urlencoded({extended: true}))


app.get('/', (req,res) => {
    res.render('./home', {title: 'Selamat Datang Di CRUD',
    layout: './layouts/main-layout'})
})

app.get('/creating', async(req,res, next) =>{
    res.render('./create', {title: 'Create Data',
    layout: './layouts/main-layout',
    messages: req.flash('info')})
})
app.post('/create', async(req,res, next) =>{
    req.flash('message', 'berhasil');
    let data = User.build({username: req.body.username,
                email: req.body.email,
                password: req.body.password});
    await data.save()
    req.flash('msg', 'Data Berhasil Ditambahkan');
    res.redirect('/reading');
    // let sql = "INSERT INTO user set ?";
    // let query = conn.query(sql, data, (err, results) => {
    //     if (err) throw err;
    //     res.redirect('/');
    // });
})

app.get('/reading', async(req,res) =>{
    const getAllUser = await User.findAll({username: req.body.username,
             email: req.body.email,
             password: req.body.password})
    res.render('./read', { title: 'User List', 
    layout: './layouts/main-layout',
    User: getAllUser,
    msg: req.flash('msg')});
})
app.get('/updating/:id', async(req,res) =>{
    const id = req.params.id
    const getAllUser = await User.findOne({
        where: {id:id}})
    res.render('./update', {title: 'Update Data',
    layout: './layouts/main-layout',
    id,
    User: getAllUser
    })
})

app.post('/update/:id', async(req, res) =>{
    // const getAllUser = ({})
        const id = req.params.id
        const updateUser = await User.update({
            username: req.body.username,
        email: req.body.email,
        password: req.body.password
        },
        {
            where: {id: id}
        })
        await updateUser
        req.flash('msg', 'Data Berhasil Diupdate');
        res.redirect('/reading');
})

app.post('/delete/:id', async(req,res) =>{
    const id = req.params.id
    await User.destroy({
            where: {id: id}
        })
        req.flash('msg', 'Data Berhasil Dihapus');
        res.redirect('/reading');
})

db.authenticate().then(() =>{
    console.log('koneksi database berhasil')
})
app.post('/add', async (req, res) =>{
    try {
        const {username, email, password} = req.body

        const newUser = new User({
            username, email, password
        })

        await newUser.save()
        res.json(newUser)
    } catch (error) {
        errMessage()
    }
})

app.get('/tampil', async (req,res) =>{
    try {
        const getAllUser = await User.findAll()
         res.json(getAllUser);
        //  res.render('./read', {title: 'Read Data',
        //  layout: './layouts/main-layout',
        //  })
    } catch (error) {
        errMessage()
    }
})

app.get('/view/:id', async (req,res) =>{
    try {
        const id = req.params.id
        const getUser = await User.findOne({
            where: {id:id}
        })
        res.json(getUser)
    } catch (error) {
        errMessage()
    }
})

app.delete('/remove/:id', async (req,res) =>{
    try {
        const id = req.params.id
        const deleteUser = await User.destroy({
            where: {id: id}
        })
        await deleteUser
         res.json('data berhasil dihapus');
    } catch (error) {
        errMessage()
    }
})

app.put('/edit/:id', async (req,res) =>{
    try {
        const {username, email, password} = req.body
        const id = req.params.id
        const updateUser = await User.update({
            username, 
            email, 
            password
        },
        {
            where: {id: id}
        })
        await updateUser
         res.json("data berhasil di update");
    } catch (error) {
        errMessage()
    }
})

app.get('/home', (req, res) => {
    res.render('./views/home', {title: 'Selamat Datang Di CRUD',
    layout: '../views/layouts/main-layouts'})
    res.send(error);
})

app.listen(3000, () => {
    console.log(`Server berjalan di port 3000`);
});