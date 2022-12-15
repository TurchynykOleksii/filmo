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

const findGenreName = ids => {
  const genres = JSON.parse(localStorage.getItem('allGenres'));

  let res = [];
  for (const key of ids) {
    let resItem = genres.find(genre => genre.id === Number(key));

    resItem.name !== 'Science Fiction'
      ? res.push(resItem.name)
      : res.push('Sci-Fi');
  }

  const formattedGenres =
    res.length > 2 ? `${res[0]}, ${res[1]}, Other` : res.join(', ');
  return formattedGenres;
};

const renderFilm = async () => {
  const markup = await loadTrendingFilm();

  const allFilms = markup.map(item => {
    let getYear = parseInt(item.release_date);

    return `
     <div class="film" id='${item.id}' data-ids="${item.genre_ids}">
      <img src='https://image.tmdb.org/t/p/w500${item.backdrop_path}'>
      <p class="film-headline">${item.title}</p>
      <span>${findGenreName(item.genre_ids)}</span>
      <p>${getYear}</p>
     </div>
    `;
  });
  return allFilms.join('');
};
renderFilm().then(res => (refs.movieList.innerHTML = res));
