import ApiFilm from './apiServises';
import refs from './refs';
const onLoadListFilm = new ApiFilm();

const loadTrendingFilm = async () => {
  const { data } = await onLoadListFilm.getTrending();

  return data.results;
};

const loadGenreFilm = async () => {
  const genres = await onLoadListFilm.getGenre();
  localStorage.setItem('allGenres', JSON.stringify(genres));
  return genres;
};

const renderFilm = async () => {
  const markup = await loadTrendingFilm();
  const genre = await loadGenreFilm();

  const allFilms = markup.map(item => {
    //console.log(item);
    let getYear = parseInt(item.release_date);
    return `
     <div class="film" id='${item.id}' data-ids="${item.genre_ids}">
      <img src='https://image.tmdb.org/t/p/w500${item.backdrop_path}'>
      <p class="film-headline">${item.title}</p>
      <p>${getYear}</p>
     </div>
    `;
  });
  return allFilms.join('');
};
renderFilm().then(res => (refs.movieList.innerHTML = res));
