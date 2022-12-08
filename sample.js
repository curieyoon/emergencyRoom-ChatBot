const fetch = require('node-fetch')
const request = require('request');

const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = process.env.CHANNEL_ACCESS_TOKEN;;
Request = fetch.Request
const HTTPS = require('https');
const delay = () => {
  const randomDelay = Math.floor(Math.random() * 4) * 100
  return new Promise(resolve => setTimeout(resolve, randomDelay))
}

require("dotenv").config( {path: "/home/ec2-user/emergencyRoom-ChatBot/.env"} );
const ID = process.env.DIR_ID;
const KEY = process.env.DIR_KEY;



async function yes_status(eventObj,res,addrData){
  
  if (addrData.hospital_data.length==0){
  
    request.post(
      {   
          url: TARGET_URL,
          headers: {
              'Authorization': `Bearer ${TOKEN}`,
          },
          json: {
              "replyToken":eventObj.replyToken, 
              "messages": [{'type':'text','text':'근처에 사용가능한 병원이 없습니다.'}]
          }
      },(error, response, body) => {
  
      });
    
  res.sendStatus(200);
  }
  else{
    addrData.hospital_data=addrData.hospital_data.slice(0,3)
    console.log(addrData.hospital_data)
    let message = []
    await message.push({'type':'text','text':'응급실이 사용가능한 병원중 가까운 순으로 보여드립니다.'})
    await addrData.hospital_data.forEach(element => {
      message.push({"type":"location","title":element.name,"address":String(element.distance)+"KM","longitude":parseFloat(element.x),"latitude":parseFloat(element.y)})
    });
    console.log(message)

    await request.post(

      {   
          url: TARGET_URL,
          headers: {
              'Authorization': `Bearer ${TOKEN}`,
          },
          json: {
              "replyToken":eventObj.replyToken, 
              "messages": message
          }
      },(error, response, body) => {
        console.log(error);
        console.log(response.statusCode);
        console.log(response.statusMessage);
      });
    
  res.sendStatus(200);
}
}

function durationSort(a, b) {
  if(a.duration == b.duration){ return 0} return  a.duration> b.duration? 1 : -1;
}
const fetchAPI = async (addrData,eventObj,res) => {
  
  const data = {
    cur: addrData["current_address"],
    dist: addrData["hospital_data"].map((e)=> {return {x: e.x, y: e.y}})
  }
  const baseOption = {
      'method': 'GET',
      'headers': {
      'X-NCP-APIGW-API-KEY-ID': ID,
      'X-NCP-APIGW-API-KEY': KEY
      },
  };

  const promiseList = data.dist.map(async (dist, idx)=> {
      const url = `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${data.cur.x},${data.cur.y}&goal=${dist.x},${dist.y}&option=trafast`;
      

      let request = new Request(url, baseOption);
      return fetch(request).then(async res => {
          const data = await res.json();
          if(data.route != undefined){
      
          const distance = data.route.trafast[0].summary.distance/1000;
          const duration = data.route.trafast[0].summary.duration/1000/60;
          await delay()
          addrData["hospital_data"][idx].distance = distance;
          addrData["hospital_data"][idx].duration = duration;
          addrData.hospital_data.sort(durationSort);
        }
      });
  })   

  Promise.all(promiseList).then(async ()=> {
      console.log("fetch end");
      await yes_status(eventObj,res,addrData)
  });
}

// fetchAPI();
module.exports ={fetchAPI}