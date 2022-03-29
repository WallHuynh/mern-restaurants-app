import app from './server.js'
import mongodb from 'mongodb'
import 'dotenv/config'
import RestaurantsDAO from './dao/restaurantsDAO.js'
import ReviewDAO from './dao/reviewDAO.js'

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  maxPoolSize: 50,
  waitQueueTimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch(err => {
    console.log(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await RestaurantsDAO.injectDB(client)
    await ReviewDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`app listen on port ${port}`)
    })
  })
