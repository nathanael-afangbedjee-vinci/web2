var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/films.json';

const defaultFilms = [
  {
    id: 1,
    title: 'Star Wars: The Phantom Menace (Episode I)',
    duration: 136,
    budget: '115',
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_I_%E2%80%93_The_Phantom_Menace',
  },
  {
    id: 2,
    title: 'Star Wars: Episode II – Attack of the Clones',
    duration: 142,
    budget: 115,
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_II_%E2%80%93_Attack_of_the_Clones',
  },
  {
    id: 3,
    title: "Zack Snyder's Justice League",
    duration: 242,
    budget: 70,
    link: 'https://en.wikipedia.org/wiki/Zack_Snyder%27s_Justice_League',
  },
];

router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query
  ? Number(req.query['minimum-duration'])
  : undefined;
  if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.json('Wrong minimum duration'); 
    
    const filmsDB = parse(jsonDbPath,defaultFilms);

    if (!minimumFilmDuration) return res.json(filmsDB);
  
    const filmsReachingMinimumDuration = filmsDB.filter(
    (film) => film.duration >= minimumFilmDuration
  );

  return res.json(filmsReachingMinimumDuration ?? filmsDB);
});

router.get('/:id', (req, res) => {
  const filmsDB = parse(jsonDbPath,defaultFilms);


  const indexOfFilmFound = filmsDB.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.json('Resource not found'); // bad practise (will be improved in exercise 1.5)

  return res.json(filmsDB[indexOfFilmFound]);
});

router.post('/', (req, res) => {
  const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
   const link = req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
   const duration = typeof req?.body?.duration !== 'number' || req.body.duration < 0 ? undefined : req.body.duration;
  const budget = typeof req?.body?.budget !== 'number' || req.body.budget < 0 ? undefined: req.body.budget;

  const filmsDB = parse(jsonDbPath,defaultFilms);


  const filmsExistant = filmsDB.find((film => film.title === title))
  if(filmsExistant) return res.sendStatus(409);

  const lastItemIndex = filmsDB?.length !== 0 ? filmsDB.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? filmsDB[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = { id: nextId, title, link, duration, budget };

  filmsDB.push(newFilm);

  serialize(jsonDbPath,filmsDB);

  return res.json(newFilm);
});

router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const filmsDB = parse(jsonDbPath,defaultFilms);

  const foundIndex = defaultFilms.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);
  const itemsRemovedFromMenu = defaultFilms.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];
 
  serialize(jsonDbPath,defaultFilms);

  res.json(itemRemoved);
});


module.exports = router;
