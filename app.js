const Address = require('./Address.js');
const express = require('express');
const app = express();


console.log(Address.getAddress('석수동길'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('',(req,res)=> {
    res.send('tset')
})

app.post('/hook', function(request,response){
  var eventObj = request.body.events[0];

  console.log("---------------",new Date(),"-----------------");
  response.sendStatus(200);



})


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