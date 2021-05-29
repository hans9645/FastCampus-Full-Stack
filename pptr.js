const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const { contents } = require('cheerio/lib/api/traversing');

(async () => {
    const browser = await puppeteer.launch(
        {headless : false }   );
    const page = await browser.newPage();
    await page.setViewport({
        width:1440,
        height:1080
    })
    await page.goto('https://www.tistory.com/category/life');
    // await page.screenshot({
    //     path: 'example.png'
    // });
    const html=await page.content();
    const $=cheerio.load(html);
    let hrefArray=[];
    const article=$('ul.list_tistory>li>a').each((index,element)=>{
        const href=$(element).attr('href');
        const title=$(element).find('.inner_desc_tit').text();
        hrefArray.push({
            title,
            href,
        });
    });
    console.log(hrefArray);
    //console.log(mArticleText);

    //console.log(html);

    //await browser.close();
})();

//즉시실행함수 IIFE, 아래의 코드와 같다.

// const pptr = async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://example.com');
//     await page.screenshot({
//         path: 'example.png'
//     });

//     await browser.close();

// };

// pptr();