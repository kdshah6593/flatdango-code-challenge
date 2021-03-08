const baseUrl = "http://localhost:3000/films"
// endpoints
// GET /films/[:id] (start with /films/1)
// PATCH /films/[:id]
// GET /films (for Advanced Deliverables only)



const filmsList = document.getElementById("films")
const poster = document.getElementById("poster")
const title = document.getElementById("title")
const runtime = document.getElementById("runtime")
const filmInfo = document.getElementById("film-info")
const showtime = document.getElementById("showtime")
const ticketNum = document.getElementById("ticket-num")
const buyBtn = document.querySelector(".extra.content")

let currentMovieId = null;

const showMovieInfo = (e) => {
    let theMovie = Movie.findById(e.target.dataset.id)
    currentMovieId = parseInt(e.target.dataset.id)
    fetch(baseUrl + `/${theMovie.id}`)
    .then(resp => resp.json())
    .then(movie => {
        poster.src = movie.poster
        title.innerText = movie.title
        runtime.innerText = `${movie.runtime} minutes`
        filmInfo.innerText = movie.description
        showtime.innerText = movie.showtime
        ticketNum.innerText = movie.capacity - movie.tickets_sold
    })
}

const getMovies = () => {
    fetch(baseUrl)
    .then(resp => resp.json())
    .then(movies => movies.forEach(movie => {
        newMovie = new Movie(movie)
        movieDiv = document.createElement("div")
        movieDiv.className = "film item"
        movieDiv.dataset.id = newMovie.id
        movieDiv.innerText = newMovie.title
        movieDiv.addEventListener("click", showMovieInfo)
        filmsList.append(movieDiv)
        })
    )
}


buyBtn.addEventListener("click", Movie.buyTicket)



getMovies()