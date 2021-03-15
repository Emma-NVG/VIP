module.exports.Photo = function (request, response) {
    response.title = "Administration photos";
    response.render('photos', response);
};
