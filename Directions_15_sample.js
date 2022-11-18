var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=127.1058342,37.359708&goal=129.075986,35.179470&option=trafast',
  'headers': {
    'X-NCP-APIGW-API-KEY-ID': '12rhzhzq7g',
    'X-NCP-APIGW-API-KEY': 'FhD45P91TxG2820MadrsiPOUjI6bQMJhddnHZIeI'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
