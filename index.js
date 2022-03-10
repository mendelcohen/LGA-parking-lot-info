const express = require("express");
const app = express();
var cron = require('node-cron');
const fetch = require("cross-fetch");
const PORT = 3001;
// Imports the Google Cloud client library

const { BigQuery } = require('@google-cloud/bigquery');
// Defines the location of the dataset and tables
const location = 'US';

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
  const rows = data.map(lot => ({
    ParkingLot: lot.parkingLot,
    PercentageOccupied: lot.percentageOccupied,
    Time: new Date()
  }));

  // Insert data into a table
  await bigquery
    .dataset(datasetId)
    .table(tableId)
    .insert(rows);
  console.log(`Inserted ${rows.length} rows`);
 
}

cron.schedule('0,30 * * * *', () => {
  console.log('running a task every 30 minutes');
  getLgaParkingInfo();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
