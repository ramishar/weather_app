const express = require('express');
const path = require('path');
const app = express();

const weatherData = require('./utils/weatherData');

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname,'./public');

const viewsPath = path.join(__dirname,'./views');

const partialsPath = path.join(__dirname,'./partials');

app.set('view engine', 'ejs');
app.use(express.static(publicStaticDirPath));

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App'
    })
})

//localhost:3000/weather?address=mumbai
app.get('/weather', (req,res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }
   weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
})

app.get('*', (req,res) => {     
    res.render('404', {
        title: "Page not found"
    })
})

app.listen(port, () => {
    console.log("Server is up and running on port: ", port)
})