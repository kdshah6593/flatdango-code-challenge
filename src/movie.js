class Movie {
    
    static all = []
    
    constructor(movie) {
        this.id = movie.id;
        this.title = movie.title;
        this.runtime = movie.runtime;
        this.filmInfo = movie.description;
        this.showtime = movie.showtime;
        this.ticketsSold = movie.tickets_sold;
        this.capacity = movie.capacity;
        this.ticketNum = movie.capacity - movie.tickets_sold;

        Movie.all.push(this);
    }

    static findById = (num) => {
        return Movie.all[num-1]
    }

    static buyTicket = () => {
        const theMovie = Movie.findById(currentMovieId)

        if (theMovie.ticketsSold === theMovie.capacity) {
            alert("No more tickets")
            Movie.newMovieInfo(theMovie)
        } else {
            let inputData = {id: theMovie.id, title: theMovie.title, runtime: theMovie.runtime, poster: theMovie.poster, description: theMovie.filmInfo, showtime: theMovie.showtime, tickets_sold: theMovie.ticketsSold + 1}
    
            fetch(baseUrl + `/${currentMovieId}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(inputData)
            })
            .then(resp => resp.json())
            .then(movie => Movie.newMovieInfo(movie))
        }
        
    }

    static newMovieInfo = (movie) => {
        let theMovie = Movie.findById(movie.id)
        currentMovieId = parseInt(movie.id)
        poster.src = movie.poster
        title.innerText = movie.title
        runtime.innerText = `${movie.runtime} minutes`
        filmInfo.innerText = movie.description
        showtime.innerText = movie.showtime
        ticketNum.innerText = movie.capacity - movie.tickets_sold
    }

}