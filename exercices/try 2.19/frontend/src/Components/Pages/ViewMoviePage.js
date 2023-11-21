// import { readAllMovies } from '../../models/movies';

const ViewMoviePage = async () => {
  try{
  const main = document.querySelector('main');
  main.innerHTML = '<div id="movieWrapper"></div>';

  const movieWrapper = document.querySelector('#movieWrapper');

  // const movies = await readAllMovies();
  
  const moviesAsHtmlTable = await getHtmlMovieTableAsString();

    movieWrapper.innerHTML = moviesAsHtmlTable;
  }
  catch (err) {
    console.error('HomePage::error: ', err);
  }
  };

  async function getHtmlMovieTableAsString() {
    try{
      const response = await fetch('/api/films');

      /*
  if (movies?.length === undefined || movies.length === 0) {
    return '<p class="p-5">No movies yet : (</p>';
  } */

  const movies = await response.json();

  let htmlMovieTable = `<div class="table-responsive p-5">
  <table class="table">
<thead>
  <tr>
    <th scope="col">Title</th>
    <th scope="col">Duration (min)</th>
    <th scope="col">Budget (million)</th>    
  </tr>
</thead>
<tbody>`;

  movies.forEach((element) => {
    htmlMovieTable += `
    <tr>
      <td><a href="${element.link}" target="_blank""> ${element.title}</a></td>
      <td>${element.duration}</td>
      <td>${element.budget}</td>
    </tr>
    `;
  });

  htmlMovieTable += '</tbody></table>';

  return htmlMovieTable;
} catch (err) {
  console.error('getAllPizzas::error: ', err);
  throw err;
}
}

export default ViewMoviePage;
