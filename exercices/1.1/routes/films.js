var express = require('express');
var router = express.Router();

const films = [
  {
    id: 1,
    title: 'A Haunting in Venice ',
    duration: 120,
    budget : 200, 
    link:"https://www.imdb.com/whats-on-tv/september-picks/ls527678168/mediaviewer/rm1320114689?ref_=hm_edcft_eds_pks_sept23_1_i"
  }
];


router.get('/', (req, res, next) => {
console.log("GET /films");
  res.json(films);
});

module.exports = router;

