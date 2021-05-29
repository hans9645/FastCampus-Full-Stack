const { prependTo } = require('cheerio/lib/api/manipulation');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      headless:false
  });
  const page = await browser.newPage();
  await page.goto('https://brunch.co.kr/search');
  await page.click('input.txt_search');
  await page.keyboard.type('IT');
  await page.keyboard.press('Enter');
//   await page.screenshot({ path: 'brunch.png' });

  //검색완료
  //마우스를 스크롤해서 밑으로 내린다.
  // 키보드 화살표 아래를 눌러서 화면을 아래로 내린다.
  //=> 무한 스크롤 게시글 데이터가 들어오지 않을까?
  //입력장치를 사용하지 말고, 자바스크립트 내장함수를 이용해서 뷰포트의 heigth를 계속해서 내리면 될 것.
  await page.waitForNavigation();
  let infiniteScrollInterval = setInterval(async()=>{
       await page.evaluate(()=>{
    window.scrollBy(0,window.innerHeight);  
  });//현재는 굳이 따지자면 node.js 즉 서버이기때문에 바로 window를 호출할 수 없다. 
  //따라서 page내의 evaluate 함수를 통해서 
  },1000);

  setTimeout(async()=>{
    clearInterval(infiniteScrollInterval);
    console.log("done");
    await browser.close();
  },1000*10);

})();