const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'./templates/views');
const partialsPath = path.join(__dirname,'./templates/partials'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));

// set up hbs engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);

// partials
hbs.registerPartials(partialsPath);


// render index.hbs
app.get('',(req,res) =>{
    res.render('index', {
        title:'Weather App',
        name:'Arsene'
    })
})
// render about.hbs
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name:'Arsene'
    });
})
// render help.hbs
app.get('/help',(req, res) => {
    res.render('help',{
        title:'Help',
        message: "Please do not hesitate for any help",
        name:'Arsene'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error :'You must provide an address'
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData, location,
                address: req.query.address
            })
        })
    })

})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    });
})
// 404 handlers
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404 ',
        erroMessage: 'Help  article is not found',
        name: 'Arsene'
    })
})
app.get('*',(req,res) =>{

    res.render('404',{
        title:'404',
        erroMessage: 'Page is not found',
        name:'Arsene'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port '+port+'.')
})

