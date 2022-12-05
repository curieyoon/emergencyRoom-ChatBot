const address = require('./Address.js');
const express = require('express');
const request = require('request');


const fetch = () => import('node-fetch').then(({default: fetch}) => fetch());
require("dotenv").config( {path: "/home/ec2-user/emergencyRoom-ChatBot/.env"} );
const KAKAO_KEY = process.env.KAKAO_KEY;
const TOKEN = process.env.CHANNEL_ACCESS_TOKEN;;
const domain = process.env.MY_DOMAIN;
const EMERGENCY_KEY = process.env.EMERGENCY_KEY;

const KAKAO_URL = "https://dapi.kakao.com/v2/local/search/address.json?"
const KAKAO_PLACE_URL = "https://dapi.kakao.com/v2/local/search/keyword.json?"
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
  

async function again(eventObj, res) {
  request.post(
    {   
       
        url: TARGET_URL,
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
        },
        json: {
            "replyToken":eventObj.replyToken,
            "messages":[
                {
                  "type": "text", 
                  "text": "요청하신 주소를 찾을 수 없습니다."},
                  {"type": "text",
                  "text": "정확한 주소 또는 장소 이름을 입력해 주세요. "},
                  
            
                ],
        }
    },(error, response, body) => {
      event_time=2;
      res.sendStatus(200);
    });

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
        add_list = jbody.documents;
        console.log(add_list);
        if (add_list.length == 0) {
          async function findagain(eventObj, res) {
            await request.get(
              {
                url: KAKAO_PLACE_URL + new URLSearchParams(
                  {query: eventObj.message.text}
                ),
                headers: {
                    "Authorization": KAKAO_KEY
                }
          
              }, (error, response, body) =>{
                if(!error && response.statusCode == 200) {
                  jbody = JSON.parse(body);
                  add_list = new Array();
                  add_list = jbody.documents;
                  console.log("addlist PLACE !--- ", add_list)
                  find_current(eventObj, res); 
                }
  
          }, ()=>{
            res.sendStatus(200);
          }
          )
          };
          
          findagain(eventObj, res);

          }
        else {find_current(eventObj, res);  }
        
      }

  
  }, ()=>{
    console.log("sending status in findme");
    res.sendStatus(200);
  }
  )
}


async function find_current(eventObj,res){ 
  if (add_list.length == 0) {
    console.log("no current address");
    await again(eventObj, res);
    
  } else {
    await request.post(
      {
          url: TARGET_URL,
          headers: {
              'Authorization': `Bearer ${TOKEN}`,
          },
          json: {
              "replyToken":eventObj.replyToken, 
              "messages":[
                {
                  "type": "location",
                  "title": "현재 위치",
                  "address": add_list[add_index].address_name,
                  "longitude": parseFloat(add_list[add_index].x),
                  "latitude": parseFloat(add_list[add_index].y),
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
                        "data": "yes"
                      },
                      {
                        "type": "postback",
                        "label": "아니요",
                        "data": "no"
                      },
                      {
                        "type": "postback",
                        "label": "다시 입력하기",
                        "data": "reset"
                      },
                    ]
                  }
                }
                    
              
                  ],
          }
          
        },(error, response) => {
        // console.log(error);
        // console.log(response.statusCode);
        // console.log(response.statusMessage);
      }
      
      );
  }

  
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
      event_time=3;
    }
    else if (event_time == 3){
      if(eventObj.postback.data =='yes'){

      }
      else{

      }
      event_time=4 
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