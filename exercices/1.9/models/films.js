const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

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

  function readAllFilms(minimumDuration){
    
    const films = parse(jsonDbPath);

    if (minimumDuration === undefined) return films;
  
    const minimumDurationAsNumber = Number(minimumDuration);
    if (Number.isNaN(minimumDurationAsNumber) || minimumDurationAsNumber < 0) return undefined;
  
    const filmsReachingMinimumDuration = films.filter((film) => film.duration >= minimumDuration);
    return filmsReachingMinimumDuration;
  }
  function oneFilmsReaded(id){
    const idNumber = parseInt(id,10);
    const films = parse(jsonDbPath, defaultFilms);
    const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);
    if(indexOfFilmFound < 0) return undefined;

    return films[indexOfFilmFound];
  }

  function createFilms (title,duration,budget,link){
    const films = parse(jsonDbPath, defaultFilms);
    
    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const createdFilms = {
        id : nextId,
        title,
        duration,
        budget,
        link, 
    }

    films.push(createdFilms)


  
    serialize(jsonDbPath, films);
  }

  module.exports = {
    readAllFilms,
    oneFilmsReaded,
    createFilms,
  };