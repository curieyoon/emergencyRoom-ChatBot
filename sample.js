const fetch = require('node-fetch')
Request = fetch.Request

const addrJson = `{
  "current_address" : { "address" : "현재 위치 주소", "x" : 127.1058342, "y" : 37.359708},
  "number" : 2,
  "hospital_data" :[
      {"name" : "병원명", "address" : "병원 주소", "x" : 129.075986, "y" : 35.179470, "distance" : 0, "duration" : 0},
      {"name" : "병원명", "address" : "병원 주소", "x" : 127.1058342, "y" : 37.359708, "distance" : 0, "duration" : 0}
  ]
}`

const addrData = JSON.parse(addrJson);

const ID = '12rhzhzq7g';
const KEY = 'FhD45P91TxG2820MadrsiPOUjI6bQMJhddnHZIeI';

const data = {
  cur: addrData["current_address"],
  dist: addrData["hospital_data"].map((e)=> {return {x: e.x, y: e.y}})
}

const fetchAPI = async () => {    
  const baseOption = {
      'method': 'GET',
      'headers': {
      'X-NCP-APIGW-API-KEY-ID': '12rhzhzq7g',
      'X-NCP-APIGW-API-KEY': 'FhD45P91TxG2820MadrsiPOUjI6bQMJhddnHZIeI'
      },
  };

  const promiseList = data.dist.map(async (dist, idx)=> {
      const url = `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${data.cur.x},${data.cur.y}&goal=${dist.x},${dist.y}&option=trafast`;
      

      let request = new Request(url, baseOption);

      return fetch(request).then(async res => {
          const data = await res.json();
          if(data.route != undefined){
          const distance = data.route.trafast[0].summary.distance;
          const duration = data.route.trafast[0].summary.duration;
          addrData["hospital_data"][idx].distance = distance;
          addrData["hospital_data"][idx].duration = duration;}
      });
  })   

  Promise.all(promiseList).then(()=> {
      console.log("fetch end");
      console.log(addrData);
  });
}

fetchAPI();