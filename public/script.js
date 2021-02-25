const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const main = document.querySelector('main');
const form = document.getElementById('form');
const search = document.getElementById('search')

getMovies(APIURL)

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();


    console.log(respData);

    showMovies(respData.results)
// displaying img in body
    // respData.results.forEach(movie =>{
    //     const img = document.createElement('img')
    //     img.src = IMGPATH + movie.poster_path;

    //     document.body.appendChild(img)
    // })


}
function showMovies(movies) {
    main.innerHTML = ''
    movies.forEach(movie =>{
        const    {poster_path, title, vote_average, overview} = movie

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
        <img
         alt="${title}" 
         src="${IMGPATH + poster_path}" 
         class="w-full "/>
        <div 
        class="movie-info bg-white dark:bg-gray-800  px-4 py-2 flex justify-between items-center">
        <h3 class=" text-gray-800 dark:text-white text-lg font-medium mb-1">
        ${title}
            </h3>
            <span class="${getClassByRate(vote_average)} px-2  rounded  font-bold text-md">
            ${vote_average}
            </span>
        </div>
        <div class="overview  ">
        <h3 class="text-lg font-semibold mb-3">
        Overview:
        </h3>

        ${overview}
        </div>
        
        `;

        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if(vote >= 5){
        return 'orange'
    }
    else {
        return 'red'
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault()
   
    const searchTerm = search.value;
if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm)
    search.value= ''

}

})