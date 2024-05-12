require('dotenv').config();
var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
// Connexion à la base de données
const url = process.env.MONGODB_URL;
const client = new MongoClient(url, { useUnifiedTopology: true })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EQFinder' });
});

// Route pour récupérer les données des seismes
router.get('/earthquakes', function(req, res) {
  const db = client.db('earthquake2023');
  console.log('user sur /earthquakes');

  db.collection('earthquakes').find().toArray()
  .then(function(results) {
    console.log('Données des earthquakes transmises à la vue :', results);
    res.render('earthquakes', { earthquakes: results });
  })
  .catch(function(err) {
    console.error(err);
    res.send('Une erreur est survenue.');
  });
});

router.get('/earthquakes/:id', function(req, res) {
  const db = client.db('earthquake2023');
  const id = req.params.id;
  console.log('user sur /earthquakes/' + id);

  db.collection('earthquakes').findOne({id: id})
  .then(function(result) {
    console.log('Données de l\'earthquake transmises à la vue :', result);
    res.render('earthquake_details', { earthquake: result });
  })
  .catch(function(err) {
    console.error(err);
    res.send('Une erreur est survenue.');
  });
});

module.exports = router;
