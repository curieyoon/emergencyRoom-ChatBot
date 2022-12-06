const fetch = require('node-fetch')
Request = fetch.Request

const addrJson = `{
  "current_address" : { "address" : "현재 위치 주소", "x" : 127.1058342, "y" : 37.359708},
  "number" : 3,
  "hospital_data" :[
      {"name" : "병원명", "address" : "병원 주소", "x" : 129.075986, "y" : 35.179470, "distance" : 0, "duration" : 0},
      {"name" : "병원명", "address" : "병원 주소", "x" : 127.1434, "y" : 37.2724, "distance" : 0, "duration" : 0},
      {"name" : "병원명", "address" : "병원 주소", "x" : 127.1434, "y" : 37.2724, "distance" : 0, "duration" : 0}
  ]
}`

const addrData = JSON.parse(addrJson);
require("dotenv").config( {path: "/home/ec2-user/emergency_room_ChatBot/.env"} );
const ID = process.env.DIR_ID;
const KEY = process.env.DIR_KEY;


function durationSort(a, b) {
  if(a.duration == b.duration){ return 0} return  a.duration> b.duration? 1 : -1;
}
const fetchAPI = async (addrData) => {
  
  const data = {
    cur: addrData["current_address"],
    dist: addrData["hospital_data"].map((e)=> {return {x: e.x, y: e.y}})
  }
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
          console.log(data)
          if(data.route != undefined){
          const distance = data.route.trafast[0].summary.distance/1000;
          const duration = data.route.trafast[0].summary.duration/1000/60;
          addrData["hospital_data"][idx].distance = distance;
          addrData["hospital_data"][idx].duration = duration;
          console.log(distance,duration)
          addrData.hospital_data.sort(durationSort);
        }
      });
  })   

  Promise.all(promiseList).then(()=> {
      console.log("fetch end");
      console.log(addrData);
      return addrData
  });
}

// fetchAPI();
module.exports ={fetchAPI}