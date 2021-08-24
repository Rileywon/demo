const EXPRESS = require ('express')
const {ObjectId, MongoClient} = require('mongodb');

const APP = EXPRESS()
//const URL = 'mongodb://localhost:27017';
const URL = 'mongodb+srv://new-thang-98:27112011@cluster0.xogzz.mongodb.net/test';

APP.use(EXPRESS.urlencoded({extended:true}))
APP.set('view engine', 'hbs')

APP.post('/insert', async (req,res)=>{
    const nameInput = req.body.txtName;
    const pictureInput = req.body.txtPicture;
    const newProduct = {name :nameInput, picture:pictureInput};
    const client = await MongoClient.connect(URL);
    const dbo = client.db("ASM");
    const newS= await dbo.collection("products").insertOne(newProduct);
    console.log(newS);
    res.redirect('/');
})

APP.get('/delete', async(req,res)=>{
    const idInput = req.query.id;
    const client = await MongoClient.connect(URL);
    const dbo = client.db("ASM");
    await dbo.collection("products").deleteOne({_id:ObjectId(idInput)});
    res.redirect('/');
})

APP.post('/search', async (req,res)=>{
    const nameSearch = req.body.txtSearch;
    const client = await MongoClient.connect(URL);
    const dbo = client.db("ASM");
    const allProducts = await dbo.collection("products").find({name:nameSearch}).toArray();
    res.render('index', {data:allProducts})
})

APP.get('/', async (req,res)=>{
    const client = await MongoClient.connect(URL);
    const dbo = client.db("ASM");
    const allProducts = await dbo.collection("products").find({}).toArray();
    res.render('index', {data:allProducts})
})

const PORT = process.env.PORT || 5000;
APP.listen(PORT);