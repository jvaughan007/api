const PORT = 8000 || process.env.PORT;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');


const app = express();

// const articles = [];





app.get('/', (req, res) => {
    res.json(`Welcome to the Trip Planner web scraper!`)
});

// app.get('/live-action-articles/:keyword', (req, res) => {
//     const { keyword } = req.params;

//     axios.get(`https://www.liveaction.org/news/?s=${keyword}`)
//     .then((response) => {
//         const html = response.data;
//         const $ = cheerio.load(html);

//         $('a[rel=bookmark]', html).each(function () {
//             const title = $(this).attr('title');

//             const url = $(this).attr('href');
//             articles.push({
//                 title,
//                 url
//             });
//         });

//         const uniqueArray = Array.from(new Set(articles.map(JSON.stringify))).map(JSON.parse);
//         uniqueArray.pop();
//         uniqueArray.pop();
//         uniqueArray.pop();

//         console.log(uniqueArray);

//         res.json(uniqueArray);
//     }).catch((err) => console.log(err));
// });

app.get('/flight-prices/all-adult/adultcount=:adultCount&departureDate=:departureDate&destinationAirportCode=:destinationAirportCode&departureAirportCode=:departureAirportCode&returnDate=:returnDate&tripType=:tripType', (req, res) =>{
    const {adultCount, departureDate, destinationAirportCode, departureAirportCode, returnDate, tripType } = req.params;

    let flights = [];

    // Southwest
    axios.get(`https://www.southwest.com/air/booking/select.html?adultPassengersCount=${adultCount}&adultsCount=${adultCount}&clk=GSUBNAV-AIR-BOOK&departureDate=${departureDate}&departureTimeOfDay=ALL_DAY&destinationAirportCode=${destinationAirportCode}&fareType=USD&originationAirportCode=${departureAirportCode}&passengerType=ADULT&returnDate=${returnDate}&returnTimeOfDay=ALL_DAY&tripType=${tripType}`)
    .then((axiosResponse) => {
        const html = axiosResponse.data;
        const $ = cheerio.load(html);
        console.log();

        $('', html)
        .each(function () {
            const airline = 'Southwest';
            const departTime = 'insert here';
            const arrivalTime = 'insert here';
            const price = 'insert here';
            const seatType = 'inster here';
            const url = 'insert here;'
            
            flights.push({
                airline,
                departTime,
                arrivalTime,
                seatType,
                price,
                url,
            });

        });
    }).catch((err) => console.log(err));

    // United
    
    // Delta

    // American

    // Allegiant

    // Frontier

    // Hawaiian

    // JetBlue

    // Spirit

    flights.sort((a, b) => a.price - b.price);

    res.json(flights);
});


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))