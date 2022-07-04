const movies = require("./db.json");

let globalId = 11;

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies);
    },

    deleteMovie: (req, res) => {
        let index = movies.findIndex((movie) => {
            return movie.id === +req.params.id; 
        })
        movies.splice(index, 1);
        res.status(200).send(movies);
    },

    createMovie: (req, res) => {
        console.log(req.body);

        let {title, rating, imageURL} = req.body;

        let newMovie = {
            id: globalId, 
            title, // title: title
            rating: rating, 
            imageURL: imageURL
        }

        //add this movie to our database 
        movies.push(newMovie); //pushing the newMovie obj to the movies array
        res.status(200).send(movies);
        globalId++; // after you complete this function it will increase the globalId count by one for the next one you create
    }, 

    updateMovie: (req, res) => {
        // console.log(req.params);
        // console.log(req.body);
        // Let's desturcture the id and type from params and type respectively
        let {id} = req.params; //let id = req.params.id;
        let {type} = req.body; //let type = req.body.type;

        let index = movies.findIndex((movie) => {
            return movie.id === +id; 
        })
        //check conditions using if statements 
        if(movies[index].rating === 5 && type === "plus") {
            res.status(400).send('Cannot rate above 5');
        } else if(movies[index].rating === 1 && type === "minus") {
            res.status(400).send('Cannot rate below 1')
        } else if(type === "plus") {
            movies[index].rating++;
            res.status(200).send(movies);
        } else if(type === "minus") {
            movies[index].rating--;
            res.status(200).send(movies);
        }
    }
}