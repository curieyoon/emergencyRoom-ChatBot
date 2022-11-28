const Address = require('./Address.js');
const express = require('express');
const request = require('request');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = 'YK56BfHFgpILrxRk1FZrdcouFguf5CBA5qxM3zfDH6N9jR/cfPxVdK1P9vZHAk69mZDSlSkXNLy25pzqJbXrn3y76hwmH0Kiuvx3OadFYcuidWSp7VYAj4SqJSljv/q5KoYAOE2il8jmQkf4bQKvXQdB04t89/1O/w1cDnyilFU='
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = "2019102158.oss2022chatbot.tk"
const sslport = 23023;
const bodyParser = require('body-parser');
const app = express();
var event_time =1
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

function find_current(eventObj,res){ //Two
  console.log(Address.getAddress(eventObj.message.text))
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
app.post('/hook', function (req, res) {
    var eventObj = req.body.events[0];
    var headers = req.headers;
    console.log('======================', new Date() ,'======================');
    if(event_time==1){
      main(eventObj,res)
      event_time=2
    }
    else if (event_time ==2){
      find_current(eventObj,res)
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