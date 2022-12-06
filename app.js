const address = require('./Address.js');
const express = require('express');
const request = require('request');
const emergency = require('./emergency_api.js')
const sample = require('./sample.js')

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
const { stringify } = require('querystring');
const app = express();
var event_time = 1
var add_list = new Array();

var add_index = 0;
var confirmed = new Boolean(false);
var hospital_list = []
const delay = () => {
  const randomDelay = Math.floor(Math.random() * 4) * 100
  return new Promise(resolve => setTimeout(resolve, randomDelay))
}
const saveData = async (a,b,current_x,current_y,current_address,req, res) => {
  try{
      emergency.getspot_xy(a,b).then(async (res)=> {
          let addrJson ={}
          addrJson["current_address"] = {"address" : current_address, "x" : current_x,"y" : current_y}
          addrJson["hospital_data"] = res 
          sample.fetchAPI(addrJson)


      })
  }
  catch(e){
      console.log(e);
  }
}

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
    console.log('----------------------------------');
    var x = add_list[add_index].x
    var y = add_list[add_index].y
    var address_name = add_list[add_index].address_name
    var string = "yes&&" + String(x) + "&&"+String(y) +"&&" + String(address_name)
    console.log('--------------------------------------');
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
                        "data": string
                      },
                      {
                        "type": "postback",
                        "label": "아니요",
                        "data": "action=no"
                      },
                      {
                        "type": "postback",
                        "label": "다시 입력하기",
                        "data": "action=reset"
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

function yes_status(eventObj,res){
  console.log(hospital_list)




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


app.use(bodyParser.json());
app.post('/hook', async function (req, res) {
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
      let arr = eventObj.postback.data;
      const string = arr.split("&&");
      let action = string[0]
      let current_adress_x = string[1]
      let current_adress_y = string[2]
      let current_address = string[3]

      if(action =='yes'){ 
        let a = current_address.split(' ')[0]
        let b = current_address.split(' ')[1]
        console.log(a,b)
        saveData(a,b,current_adress_x,current_adress_y,current_address);
        console.log(hospital_list);
        event_time=4
        yes_status(eventObj,res)
      }
      else if (action == 'no'){
        
      }
      else{
        main(eventObj,res)
        event_time=2
      }

    }
    else if (event_time == 4){
      console.log(hospital_list);
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

function arr_compare(arr, arr_xy){
  var i;
  var j = 0;
  var hospital_xy_data = []
  var length = arr_xy.length;
  for( i = 0;i<length;i++){
    if(arr[j].병원이름 == arr_xy[i].병원이름){
        hospital_xy_data.push(arr_xy[i]);
        j += 1;
    }
  }
  return hospital_xy_data;
}