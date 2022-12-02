const address = require('./Address.js');
const express = require('express');
const request = require('request');


const fetch = () => import('node-fetch').then(({default: fetch}) => fetch());
require("dotenv").config( {path: "/home/ec2-user/prj/emergency_room_ChatBot/.env"} );
const KAKAO_KEY = process.env.KAKAO_KEY;
const TOKEN = process.env.CHANNEL_ACCESS_TOKEN;;
const domain = process.env.MY_DOMAIN;
const EMERGENCY_KEY = process.env.EMERGENCY_KEY;

const KAKAO_URL = "https://dapi.kakao.com/v2/local/search/address.json?"
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const sslport = 23023;
const bodyParser = require('body-parser');
const app = express();
var event_time = 1
var add_list = new Array();

var add_index = 0;
var confirmed = new Boolean(false);

function main(eventObj,res){
  request.post(
    {   
       
        url: TARGET_URL,
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
        },
        json: {
            "replyToken":eventObj.replyToken, //eventObj.replyToken
            "messages":[
                {
                  "type": "text", // ①
                  "text": "응급 상황인가요?"},
                  {"type": "text",
                  "text": "현재있는 위치의 주소나 보이는 곳을 입력하세요."},
                  
            
                ],
        }
    },(error, response, body) => {

    });

res.sendStatus(200);
}

async function findme(eventObj, res) {

  await request.get(
    {
      url: KAKAO_URL + new URLSearchParams(
        {query: eventObj.message.text}
      ),
      headers: {
          "Authorization": KAKAO_KEY
      }

    }, (error, response, body) =>{
      if(!error && response.statusCode == 200) {
        jbody = JSON.parse(body);
        add_list = jbody.documents.map(({road_address})=>({road_address}));
        
        find_current(eventObj, res);  
        
      }

  
  }, ()=>{
    // console.log("findme")
    res.sendStatus(200);
  }
  )
}


async function find_current(eventObj,res){ 

  await request.post(
    {
        url: TARGET_URL,
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
        },
        json: {
            "replyToken":eventObj.replyToken, //eventObj.replyToken
            "messages":[
              {
                "type": "location",
                "title": "현재위치",
                "address": add_list[add_index].road_address.address_name,
                "longitude": parseFloat(add_list[add_index].road_address.x),
                "latitude": parseFloat(add_list[add_index].road_address.y),
              },
              {
                "type": "template",
                "altText": "This is a buttons template",
                "template": {
                  "type": "buttons",
                  "text": "이곳이 맞나요?",
                  "defaultAction": {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                  },
                  "actions": [
                    {
                      "type": "postback",
                      "label": "네",
                      "data": "action=buy&itemid=123"
                    },
                    {
                      "type": "postback",
                      "label": "아니요",
                      "data": "action=add&itemid=123"
                    },
                  ]
                }
              }
                  
            
                ],
        }
        
      },(error, response) => {
      console.log(error);
      console.log(response.statusCode);
      console.log(response.statusMessage);
    }
    
    );
  
// console.log("findcurr");
res.sendStatus(200);
}

app.use(bodyParser.json());
app.post('/hook', function (req, res) {
    var eventObj = req.body.events[0];
    var headers = req.headers;
    console.log('======================', new Date() ,'======================');
    console.log("event_time: ", event_time);
    console.log(headers);
    console.log(eventObj);
    if(event_time==1){
      main(eventObj,res)
      event_time=2
    }
    else if (event_time == 2) {
      findme(eventObj, res);
      event_time = 3;
    }
    else if (event_time == 3){
      
    }
    else if (event_time == 4){
      
    }

});






try {
    const option = {
        ca: fs.readFileSync('/etc/letsencrypt/live/' + domain +'/fullchain.pem'),
        key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/privkey.pem'), 'utf8').toString(),
        cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/cert.pem'), 'utf8').toString(),
    };
  
    HTTPS.createServer(option, app).listen(sslport, () => {
      console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
  } catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
  }