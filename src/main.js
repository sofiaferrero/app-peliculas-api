const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
})

//Utils

function createMovies (movies, container){
    container.innerHTML = '';
    movies.forEach(movie => {
        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () =>{
            location.hash = "#movie=" + movie.id;
        });
        
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createSeries (series, container){
    container.innerHTML = '';
    series.forEach(serie => {
        const serieContainer = document.createElement('div');
        serieContainer.classList.add('movie-container');
        serieContainer.addEventListener('click', () =>{
            location.hash = "#serie=" + serie.id;
        });
        
        const serieImg = document.createElement('img');
        serieImg.classList.add('movie-img');
        serieImg.setAttribute('alt', serie.title);
        serieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + serie.poster_path);

        serieContainer.appendChild(serieImg);
        container.appendChild(serieContainer);
    });
}

function createCategory(category, container){
    container.innerHTML = '';
    category.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name);
        categoryTitle.addEventListener('click', () =>{
            // location.hash = '#category=' + category.id + ' - ' + category.name;
            location.hash = `#category=${category.id}-${category.name}`;
        });
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });

}

// Llamados API

async function getTrendingMoviesPreview(){
    const {data} = await api("trending/movie/day");
    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList);
}

async function getTrendingSeriesPreview(){
    const {data} = await api("trending/tv/day");
    const series = data.results;

    createSeries(series, trendingSeriesPreviewList);
}

async function getCategoriesMoviesPreview(){
    const {data} = await api("genre/movie/list");
    const categories = data.genres;

    createCategory(categories, categoriesPreviewList);
}


async function getMoviesByCategory(id){
    const {data} = await api("discover/movie", {
        params: {
            with_genres: id,
        }
    });
    const movies = data.results;

    createMovies(movies, genericSection);
}

async function getMoviesBySearch(query){
    const {data} = await api("search/multi", {
        params: {
            query,
        }
    });
    const search = data.results;

    createMovies(search, genericSection);

}

async function getTrendingMovies(){
    const {data} = await api("trending/movie/day");
    const movies = data.results;

    createMovies(movies, genericSection);
}

async function getTrendingSeries(){
    const {data} = await api("trending/tv/day");
    const series = data.results;

    createMovies(series, genericSection);
}

async function getMovieById(id){
    const {data: movie} = await api("movie/" + id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%) , url(${movieImgUrl})`;


    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategory(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesId(id);
}

async function getserieById(id){
    const {data: serie} = await api("tv/" + id);

    const serieImgUrl = 'https://image.tmdb.org/t/p/w500' + serie.poster_path;
    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%) , url(${serieImgUrl})`;


    movieDetailTitle.textContent = serie.title;
    movieDetailDescription.textContent = serie.overview;
    movieDetailScore.textContent = serie.vote_average;

    createCategory(serie.genres_ids, movieDetailCategoriesList);
    getRelatedSeriesId(id);
}

async function getRelatedMoviesId(id){
    const {data} = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
}

async function getRelatedSeriesId(id){
    const {data} = await api(`tv/${id}/recommendations`);
    const relatedSeries = data.results;

    createSeries(relatedSeries, relatedMoviesContainer);
}