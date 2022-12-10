const axios = require('axios').default;

export default class ApiFilm {
  constructor() {
    this.page = 1;
    this.query = '';
    this.API_KEY = '264653736f70104ec02ac08f6fa6f8de';
  }

  async getGenre() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=en-US`
      );

      return data.genres;
    } catch (error) {
      console.log(error);
    }
  }

  async getTrending() {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.API_KEY}&page=${this.page}&include_adult=false`
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  resetPage() {
    this.page = 1;
  }
  set pageNum(newPage) {
    this.page = newPage;
  }

  get pageNum() {
    return this.page;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
