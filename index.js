const express = require("express");
const app = express();
// const bodyParser = require('body-parser');

var cron = require('node-cron');

// var cors = require('cors');
const fetch = require("cross-fetch");

// Imports the Google Cloud client library

const { BigQuery } = require('@google-cloud/bigquery');
// Defines the location of the dataset and tables
const location = 'US';
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

const PORT = 3001;

// app.use(express.json());
// app.use(express.urlencoded({ 
//   extended: true
// }));

// app.use(cors());

async function getLgaParkingInfo() {
  
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

  

  // Creates a BigQuery client
  const bigquery = new BigQuery({
    // The relative file path to your Service Account key file
    keyFilename: 'BigQueryKey.json',
    // The GCP project ID we want to work in
    projectId: 'white-collector-343516'
  });

  // async function insertRowsAsStream() {
  // Inserts the JSON objects into my_dataset:my_table.

  const datasetId = '1234';
  const tableId = 'Parking Lots';
  const rows = [
    { ParkingLot: data[0].parkingLot, PercentageOccupied: data[0].percentageOccupied, Time: new Date()},
    { ParkingLot: data[1].parkingLot, PercentageOccupied: data[1].percentageOccupied, Time: new Date()},
    { ParkingLot: data[2].parkingLot, PercentageOccupied: data[2].percentageOccupied, Time: new Date()},
  ];

  // Insert data into a table
  await bigquery
    .dataset(datasetId)
    .table(tableId)
    .insert(rows);
  console.log(`Inserted ${rows.length} rows`);
 
}
getLgaParkingInfo();
cron.schedule('0,30 * * * *', () => {
  console.log('running a task every 30 minutes');
  getLgaParkingInfo();
});

// app.get('/', getLgaParkingInfo);

  
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});