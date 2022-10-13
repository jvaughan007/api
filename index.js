const PORT = 8000 || process.env.PORT;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');


const app = express();

const articles = [];




app.get('/', (req, res) => {
    res.json(`Welcome to the PLAN web scraper!`)
});

app.get('/live-action-articles/:keyword', (req, res) => {
    const { keyword } = req.params;

    axios.get(`https://www.liveaction.org/news/?s=${keyword}`)
    .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $('a[rel=bookmark]', html).each(function () {
            const title = $(this).attr('title');

            const url = $(this).attr('href');
            articles.push({
                title,
                url
            });
        });

        const uniqueArray = Array.from(new Set(articles.map(JSON.stringify))).map(JSON.parse);
        uniqueArray.pop();
        uniqueArray.pop();
        uniqueArray.pop();

        console.log(uniqueArray);

        res.json(uniqueArray);
    }).catch((err) => console.log(err));
});


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))