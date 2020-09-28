const express = require('express')
const bodyParser = require('body-parser');

const password = 'cbe0q3xdAE0Edljp';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://arPolas:cbe0q3xdAE0Edljp@cluster0.sjfoa.mongodb.net/organicdb?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))

app.get('/',(req,res) =>{
   res.sendFile(__dirname + '/index.html')
})


client.connect(err => {

    const ProductCollection = client.db("organicdb").collection("products");
    app.post('/addProduct', (req,res) =>{
      const product = req.body;
      
      ProductCollection.insertOne(product)
      .then(result =>{
        console.log('data send successfully')
        res.send('success')
      })
    
    })
  

  // client.close();
});

app.listen(3000)