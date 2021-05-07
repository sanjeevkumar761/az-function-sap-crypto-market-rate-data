module.exports = async function (context, req) {

    //require all the depedencies
    const https = require("https");
    context.log('JavaScript HTTP trigger function processed a request.');
    const request = require('async-request');
    const util = require('util')
    const requester = require("request");

    //Secrets from the file
    const configData = require("./secret.json");

    //Coinbase request
    context.log("Making coinbase request now");
    var result = await  request('https://api.coinbase.com/v2/prices/BTC-USD/buy', { method: 'GET', headers: {
        Authorization: 'Bearer ' + configData.coinbase_bearer_token
    }});
    context.log(JSON.parse(result.body).data);
    var coinbaseData = JSON.parse(result.body).data;

    //SAP request   
    var options = {
           url: "https://sandbox.api.sap.com/marketratesmanagement/upload/uploadMarketData",
           headers: {
            'Content-Type': 'application/json',
             APIKey: configData.sap_api_key
            },
            method: "POST",
            json: true, 
            body: [
                {
                  "providerCode": "BYOR",
                  "marketDataSource": "COINBASE",
                  "marketDataCategory": "01",
                  "key1": coinbaseData.base,
                  "key2": coinbaseData.currency,
                  "marketDataProperty": "M",
                  "effectiveDate": new Date().toISOString().slice(0, 10),
                  "effectiveTime": "00:00:00",
                  "marketDataValue": coinbaseData.amount,
                  "securityCurrency": "",
                  "fromFactor": 1,
                  "toFactor": 1,
                  "priceQuotation": "",
                  "additionalKey": ""
                }
              ]

       }

       const requestPromise = util.promisify(requester);
       const response = await requestPromise(options);

       //send response to client/browser
       context.log('response code', response.statusCode);
       if(response.statusCode == '201'){
        context.res = {body: coinbaseData.base + ":" + coinbaseData.currency + " rate added/upated successfully"}
       }       
       
}