const Address = require('./Address.js');
const express = require('express');
const request = require('request');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = '채널 토큰으로 변경'
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = "도메인 변경"
const sslport = 23023;
const bodyParser = require('body-parser');
const app = express();


console.log(Address.getAddress('석수동길'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('',(req,res)=> {
    res.send('tset')
})

app.post('/hook', function (req, res) {
  var eventObj = req.body.events[0];
  var source = eventObj.source;
  var message = eventObj.message;
  // request log
  console.log('======================', new Date() ,'======================');
  console.log('[request]', req.body);
  console.log('[request source] ', eventObj.source);
  console.log('[request message]', eventObj.message);
  request.post(
      {
          url: TARGET_URL,
          headers: {
              'Authorization': `Bearer ${TOKEN}`
          },
          json: {
              "replyToken":eventObj.replyToken,
              "messages":[
                  {
                      "type":"text",
                      "text":"Hello, user"
                  },
                  {
                      "type":"text",
                      "text":"May I help you?"
                  }
              ]
          }
      },(error, response, body) => {
          console.log(body)
      });
  
  res.sendStatus(200);
});


app.get('/keyboard', (req, res) => {
  const data = {'type': 'text'}
  res.json(data);
});

app.post('/message', (req, res) => {
  const question = req.body.userRequest.utterance;
  const goMain = '처음으로';
  
  if (question === '테스트') {
    const data = {
      'version': '2.0',
      'template': {
	    'outputs': [{
	      'simpleText': {
	        'text': '테스트'
	      }
	    }],
	    'quickReplies': [{
	      'label': goMain,
	      'action': 'message',
	      'messageText': goMain
	    }]
      }
    }
  }
  res.json(data);
});

app.listen(3000, () => console.log('node on 3000'));