//Requirements
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const path = require("path")
const express = require("express")
const app = express()
const hbs = require("hbs")
const port = process.env.PORT || 3000

//setting paths directories
const publicpath = path.join(__dirname, "../public")
const viewpath = path.join(__dirname, "../templates/views")
const partialpath = path.join(__dirname, "../templates/partials")


//setup static page directory
app.use(express.static(publicpath))

//setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewpath)
hbs.registerPartials(partialpath)

app.get("", (req, res) => {
    res.render("index", {
        title: "My Weather",
        name: "Kester daniel"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        text: "Hi, My Name is Kester Daniel. I am a web development student. This is my first Official Node Js project.",
        name: "kester daniel"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        text: "Type in your desired location and click the search button...CIAO",
        name: "kester daniel"
    })
})

app.get("/help/*", (req, res) => {
    res.render("void", {
        title: "404",
        pagenotfound: "Help article not found",
        name: "kester daniel"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send("You have to provide an address")
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get("*", (req, res) => {
    res.render("void", {
        title: "404",
        pagenotfound: "Page not found",
        name: "kester daniel"
    })
})



app.listen(port, () => {
    console.log("server up")
})