const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// const axios = require("axios");
// const cheerio = require("cheerio");
// const pretty = require("pretty");

// var cors = require('cors');
const fetch = require("cross-fetch");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ 
  extended: true
}));

// app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/", (req, res) => {

});
async function lgaParkingInfo() {
  const response = await fetch("https://avi-prod-mpp-webapp-api.azurewebsites.net/api/v1/parking/LGA", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "Referer": "https://www.laguardiaairport.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });
  
  const data = await response.json();
  console.log(data);
}
lgaParkingInfo();
app.get('/', lgaParkingInfo);
// async function scrapeData1() {
//   const url1 = "https://www.laguardiaairport.com/to-from-airport/parking";
//   await axios.get(url1)
//     .then((response) => {
//       console.log(response);
//     });
//   const $ = cheerio.load(response);
 
//   const list = $("div");
//   const percentages = [];
//   list.each((idx, el) => {
   
//     // Object holding data for each country/jurisdiction
//     const percentage = { name: "", percent: "" };
//     // Select the text content of a and span elements
//     // Store the textcontent in the above object
//     percentage.name = $(el).children("span").text();
//     percentage.percent = $(el).children("label").text();
//     // Populate countries array with country data
//     percentages.push(percentage);
//   });
//   console.log(percentages);
//   console.log(list);
// }
// scrapeData1();


// // URL of the page we want to scrape
// const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";

// // Async function which scrapes the data
// async function scrapeData() {
//   try {
//     // Fetch HTML of the page we want to scrape
//     const { data } = await axios.get(url);
    
//     // Load HTML we fetched in the previous line
//     const $ = cheerio.load(data);
    
//     // Select all the list items in plainlist class
//     const listItems = $(".plainlist ul li");
    
//     // Stores data for all countries
//     const countries = [];
//     // Use .each method to loop through the li we selected
//     listItems.each((idx, el) => {
//       // Object holding data for each country/jurisdiction
//       const country = { name: "", iso3: "" };
//       // Select the text content of a and span elements
//       // Store the textcontent in the above object
//       country.name = $(el).children("a").text();
//       country.iso3 = $(el).children("span").text();
//       // Populate countries array with country data
//       countries.push(country);
//     });
//     // Logs countries array to the console
//     console.dir(countries[0]);
//     // Write countries array in countries.json file
//     // fs.writeFile("coutries.json", JSON.stringify(countries, null, 2), (err) => {
//     //   if (err) {
//     //     console.error(err);
//     //     return;
//     //   }
//     //   console.log("Successfully written data to file");
//     // });
//   } catch (err) {
//     console.error(err);
//   }
// }
// // Invoke the above function
// scrapeData();





app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});