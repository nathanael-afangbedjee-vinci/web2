const express = require('express');
const { readAllFilms,oneFilmsReaded,createFilms } = require('../models/films');


const router = express.Router();




// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {

const allFilmsPotentiallyReaded = readAllFilms(req?.query?.Number);

if (allFilmsPotentiallyReaded === undefined) return res.sendStatus(400);
  
return res.json(allFilmsPotentiallyReaded);
});

// Read a film from its id in the menu
router.get('/:id', (req, res) => {
  const oneFilmsReading = oneFilmsReaded(req.params.id);
  if (!oneFilmsReading) return res.sendStatus(404);

  return res.json(oneFilmsReading);
});

// Create a film
router.post('/', (req, res) => {
  const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  const link = req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
  const duration =
    typeof req?.body?.duration !== 'number' || req.body.duration < 0
      ? undefined
      : req.body.duration;
  const budget =
    typeof req?.body?.budget !== 'number' || req.body.budget < 0 ? undefined : req.body.budget;

  if (!title || !link || !duration || !budget) return res.sendStatus(400);

  

  const createdFilms = createFilms(title,duration,budget,link);

  return res.json(createdFilms);
});

// Delete a film
router.delete('/:id', (req, res) => {
  const films = parse(jsonDbPath, defaultFilms);

  const indexOfFilmFound = films.findIndex((film) => film.id === Number(req.params.id));

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  const itemsRemoved = films.splice(indexOfFilmFound, 1);
  const itemRemoved = itemsRemoved[0];

  serialize(jsonDbPath, films);

  return res.json(itemRemoved);
});

// Update one or more properties of a film identified by its id
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    (title !== undefined && !title.trim()) ||
    (link !== undefined && !link.trim()) ||
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
  )
    return res.sendStatus(400);

  const films = parse(jsonDbPath, defaultFilms);

  const indexOfFilmFound = films.findIndex((film) => film.id === Number(req.params.id));

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  const filmPriorToChange = films[indexOfFilmFound];
  const objectContainingPropertiesToBeUpdated = req.body;

  const updatedFilm = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUpdated,
  };

  films[indexOfFilmFound] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
});

// Update a film only if all properties are given or create it if it does not exist and the id is not existant
router.put('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    !title ||
    !title.trim() ||
    !link ||
    !link.trim() ||
    duration === undefined ||
    typeof req?.body?.duration !== 'number' ||
    duration < 0 ||
    budget === undefined ||
    typeof req?.body?.budget !== 'number' ||
    budget < 0
  )
    return res.sendStatus(400);

  const id = Number(req.params.id);
  const films = parse(jsonDbPath, defaultFilms);
  const indexOfFilmFound = films.findIndex((film) => film.id === id);

  if (indexOfFilmFound < 0) {
    const newFilm = { id, title, link, duration, budget };
    films.push(newFilm);
    serialize(jsonDbPath, films);
    return res.json(newFilm);
  }

  const filmPriorToChange = films[indexOfFilmFound];
  const objectContainingPropertiesToBeUpdated = req.body;

  const updatedFilm = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUpdated,
  };

  films[indexOfFilmFound] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
});

module.exports = router;