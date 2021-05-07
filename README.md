# Azure Functions example to upload cryptocurrency rates to SAP market data
This example enables to upload market rate for crypto currencies such as BTC, ETH etc. using Azure Functions to SAP.  

It makes use of the following services -  
1) Azure Functions https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node 
2) SAP Market Rates Management, Bring Your Own Rates https://discovery-center.cloud.sap/protected/index.html#/serviceCatalog/market-rates-bring-your-own-rates?region=europe(frankfurt)&service_plan=market-rates,-bring-your-own-rates- and SAP API Business Hub
3) Coinbase market rate API https://developers.coinbase.com/api/v2 . 

# How does it work
The functionality is implemented as Azure Functions using Node.js. The code invokes Coinbase API to fetch rates e.g., for BTC to USD pair. Then it invokes SAP Market Rates Management service on SAP API Business Hub to upload the market rates. The rates from SAP Market Rates Management service can be used in connected systems such as SAP S/4HANA. Primary source code is in uploadsapmarketdata/index.js file in this repository.   

# How to deploy it for testing purpose
1) It needs SAP API Key from SAP API Business Hub and Coinbase bearer token from Coinbase Developer API. You'll need to create a file secret.json and place this file in the project root. The contents of this file need to look like shown below -  
{
    "sap_api_key": "<Your SAP API Business Hub Key>",
    "coinbase_bearer_token": "<Coinbase bearer token>"
}
2) Create a Function App and then a Function in Azure Functions using the example code provided in this repository  
3) Test with the URL provided by Azure Functions app
4) Check the results in SAP API Business Hub with Market Data Download API https://api.sap.com/api/DownloadAPI/resource?tag=Download%20Market%20Data&path=post_downloadMarketData&method=post&opId=post_downloadMarketData

# IMPORTANT DISCLAIMER
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

This source code is just an example, it can not be used in production environments and it does not represent any software or product or service or opinion from my employer Microsoft. It is not endorsed in any way by Microsoft. You should exercise your own judgement and prudence before using it. There is no one who is actively maintaining or supporting this project.

This example open source software is provided for informational and entertainment purposes only.  It is for general informational purposes only and are not intended to provide specific advice or recommendations for any individual or on any specific security or investment product.  It is only intended to provide education for various software programming topics.

Nothing on this software example constitutes investment advice, performance data or any recommendation that any security, portfolio of securities, investment product, transaction or investment strategy is suitable for any specific person. You must not use information provided here to make financial decisions and you need to seek professional advice from someone who is authorised to provide investment advice.
