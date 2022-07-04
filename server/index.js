const express = require('express');
const cors = require('cors');

const app = express();

const {getMovies, deleteMovie, createMovie, updateMovie} = require("./controller.js");

app.use(express.json());
app.use(cors());

// app.get("/api/movies", (req, res) => {})
app.get("/api/movies", getMovies); 
app.delete("/api/movies/:id", deleteMovie);
app.post("/api/movies", createMovie);
app.put("/api/movies/:id", updateMovie);

app.listen(4004, () => {
    console.log('Running on 4004');
})