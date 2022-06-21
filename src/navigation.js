searchFormBtn.addEventListener('click', ()=>{
    location.hash = "#search=" + searchFormInput.value;
});

trendingBtn.addEventListener('click', ()=>{
    location.hash = "#trends";
});

trendingBtnSeries.addEventListener('click', ()=>{
    location.hash = "#seriesTrend";
})

arrowBtn.addEventListener('click', ()=>{
    history.back();
    location.hash = "#home";
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);


function navigator (){
    console.log({ location });

    if (location.hash.startsWith('#trends')){
        trendPage();
    } else if (location.hash.startsWith('#seriesTrend')){
        seriesPage();
    } else if (location.hash.startsWith('#search=')){
        searchPage();
    } else if (location.hash.startsWith('#movie=')){
        movieDetailPage();
    } else if (location.hash.startsWith('#serie=')){
        serieDetailPage();
    } else if (location.hash.startsWith('#category=')){
        categoyPage();
    } else {
        homePage();
    }
    window.scrollTo(0,0); //para que vuelva a la parte de arriba en cada página que vamos
}

function homePage (){
    console.log('home');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    trendingPreviewSeries.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getTrendingSeriesPreview();
    getCategoriesMoviesPreview();
}

function trendPage(){
    console.log('trends');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    trendingPreviewSeries.classList.add('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias Películas';
    getTrendingMovies();
}

function seriesPage(){
    console.log('seriesTrend');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    trendingPreviewSeries.classList.add('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias Series';
    getTrendingSeries()
}

function categoyPage(){
    console.log('categories');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    trendingPreviewSeries.classList.add('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    headerCategoryTitle.innerHTML = categoryName;
    getMoviesByCategory(categoryId);
}

function movieDetailPage (){
    console.log('detail Movie');

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    trendingPreviewSeries.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    categoriesPreviewList.classList.add('inactive');
    categoryPreviewTitle.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
}

function serieDetailPage (){
    console.log('detail Serie');

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    trendingPreviewSeries.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    categoriesPreviewList.classList.add('inactive');
    categoryPreviewTitle.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    const [_, serieId] = location.hash.split('=');
    getSerieById(serieId);
}

function searchPage (){
    console.log('search');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    trendingPreviewSeries.classList.add('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}
