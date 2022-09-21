var mongoose = require('mongoose')


// Changer le schéma d'articles, pour que les keys correspondent au JSON de newsAPI ... !
var articlesSchema = mongoose.Schema({
    title: String,
    description: String,
    content: String,
    urlToImage: String
})

var usersSchema = mongoose.Schema({
    userName: String,
    userEmail: String,
    userPassword: String,
    userToken: String,
    userArticles: [articlesSchema]
})

var usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel;