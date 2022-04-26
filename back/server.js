const express = require('express')
const mongoose = require('mongoose')

const usersRoutes = require('./routes/users')
const app = express()
const port = 3001

mongoose.connect('mongodb+srv://Hazreath:zFHBKgxe7ezsBDvl' +
  '@ridemate.2poar.mongodb.net/RideMate?retryWrites=true&w=majority',
        {   useNewUrlParser: true,
            useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((e ) => console.log('Connexion à MongoDB échouée ! : ' + e));



// middlewares
app.use((req,res,next) => { // HEADERS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next()
})

app.use(express.json())// req.body etc
app.use('/api/Users',usersRoutes)




app.get('/', (req, res) => {
  res.send('banjour!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})