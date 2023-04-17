const puppeteer = require('puppeteer');
require('dotenv').config();
const { PAGE } = process.env;



const imgsPokemonsConIa = async (desciption) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();


  await page.setCacheEnabled(false);


  const userAgentList = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:44.0) Gecko/20100101 Firefox/44.0'
  ];
  const randomUserAgent = () => userAgentList[Math.floor(Math.random() * userAgentList.length)];
  await page.setUserAgent(randomUserAgent());

  await page.goto(PAGE);

  const inputSelector = '#prompt';
  const generateButtonSelector = '#sub1';
  const resultImgSelector = '.resimg';

  const prompt = `splash art of un pokemon de ${desciption.prompt}, anime fantasy art, special effects, centered`;
  console.log(prompt);

  await page.type(inputSelector, prompt);
  await page.click(generateButtonSelector);


  const imgHandle = await page.waitForSelector(resultImgSelector);
  const initialSrc = await imgHandle.evaluate(img => img.src);


  await page.waitForFunction(
    newSrc => {
      const img = document.querySelector('.resimg');
      return img && img.src !== newSrc;
    },
    { polling: 'mutation', timeout: 120000 },
    initialSrc
  );

  const imageUrls = await page.$$eval('.resimg', imgs => imgs.map(img => img.src));
  console.log('Generated image urls:', imageUrls);
  return imageUrls;

  await browser.close();
};



module.exports = {
  imgsPokemonsConIa
};




