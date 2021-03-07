const genres = require("../data/genres.json");

const getAll = () => {
    return genres;
};

const addGenre = (name) => {
    const newGenre = {
        id: genres.length + 1,
        name: name,
    };

    genres.push(newGenre);
    return newGenre;
};

const getOne = (id) => {
    const genre = genres.find((g) => g.id === id);

    return genre;
};

const deleteOne = (id) => {
    const genre = getOne(id);

    if (!genre) return genre;

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    return genre;
};

const updateOne = (id, name) => {
    const genre = getOne(id);

    if (!genre) return genre;

    genre.name = name;

    return genre;
};

module.exports.getAll = getAll;
module.exports.addGenre = addGenre;
module.exports.getOne = getOne;
module.exports.deleteOne = deleteOne;
module.exports.updateOne = updateOne;
