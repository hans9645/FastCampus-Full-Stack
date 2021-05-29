const axios = require("axios");
const cheerio = require('cheerio');


axios.get("http://www.google.com").then((response) => {
    const htmlString = response.data;
    const $ = cheerio.load(htmlString);
    //$.html();
    const href=$('a').attr('href');
    console.log(href);
    // $('h2.title').text('Hello there!');
    // $('h2').addClass('welcome');
    //console.log(response);
    // console.log(Object.keys(response));
    // console.log(response.data);
});

//axios와 cheerio를 사용했음 하지만 동적페이지에 약하다.