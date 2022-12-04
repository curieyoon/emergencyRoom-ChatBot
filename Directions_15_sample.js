const express= require('express');
const app = express();
var request = require('request');
require("dotenv").config( {path: "/home/ec2-user/prj/emergency_room_ChatBot/.env"} );
const ID = process.env.DIR_ID;
const KEY = process.env.DIR_KEY;

//필요한 주소 정보 (data 형식 확정 x )
let address = {
  "current_address" : { "address" : "현재 위치 주소", "x" : 127.1058342, "y" : 37.359708},
  "number" : 10,
  "hospital_data" :[
      {"name" : "병원명", "address" : "병원 주소", "x" : 129.075986, "y" : 35.179470},
      {"name" : "병원명", "address" : "병원 주소", "x" : 127.1058342, "y" : 37.359708},
      {"name" : "병원명", "address" : "병원 주소", "x" : 126.1058342, "y" : 37.359708}
  ] 
}

var options = {
  'method': 'GET',
  'url': 'https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start='+address.current_address.x+','
            +address.current_address.y+'&goal='+address.hospital_data[0].x+','+address.hospital_data[0].y+'&option=trafast',
  'headers': {
    'X-NCP-APIGW-API-KEY-ID':ID,
    'X-NCP-APIGW-API-KEY': KEY
  }
};



request(options, function (error, response) {
  if (error) throw new Error(error);
  let body = JSON.parse(response.body);
  var distance = body.route.trafast[0].summary.distance/1000; // km 단위
  var duration = body.route.trafast[0].summary.duration/1000/60; // 분 단위
  const data = {
    "distance" : distance,
    "duration" : duration
  }
  console.log(data);
});


//duration으로 정렬
function durationSort(a, b) {
  if(a.x == b.x){ return 0} return  a.x > b.x ? 1 : -1;
}
address.hospital_data.sort(durationSort);
console.log(address);



/*
최종 데이터 형식 
{
  "current_address" : { "address" : "현재 위치 주소", "x" : 127.1058342, "y" : 37.359708},
  "number" : 10,
  "hospital_data" :[
      {"name" : "병원명", "address" : "병원 주소", "x" : 129.075986, "y" : 35.179470, "distance" : 377830, "duration" : 15177133},
      {"name" : "병원명", "address" : "병원 주소", "x" : 127.1058342, "y" : 37.359708, "distance" : 377830, "duration" : 15177133}
  ]
}*/




