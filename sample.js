const express= require('express');
const app = express();
var request = require('request');
const got = require('got');

//필요한 주소 정보 (data 형식 확정 x )
let addresses = `{
    "current_address" : { "address" : "현재 위치 주소", "x" : 127.1058342, "y" : 37.359708},
    "number" : 2,
    "hospital_data" :[
        {"name" : "병원명", "address" : "병원 주소", "x" : 129.075986, "y" : 35.179470, "distance" : 0, "duration" : 0},
        {"name" : "병원명", "address" : "병원 주소", "x" : 127.1058342, "y" : 37.359708, "distance" : 0, "duration" : 0}
    ]
}`

const address = JSON.parse(addresses)

var options = {
  'method': 'GET',
  'url': 'https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start='+address.current_address.x+','
            +address.current_address.y+'&goal='+address.hospital_data[0].x+','+address.hospital_data[0].y+'&option=trafast',
  'headers': {
    'X-NCP-APIGW-API-KEY-ID': '12rhzhzq7g',
    'X-NCP-APIGW-API-KEY': 'FhD45P91TxG2820MadrsiPOUjI6bQMJhddnHZIeI'
  },
};

const ID = '12rhzhzq7g';
const KEY = 'FhD45P91TxG2820MadrsiPOUjI6bQMJhddnHZIeI';

function direction(data){
    var num = data.number;
    for (let i = 0; i< num;i++){
      const _url = 'https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start='+data.current_address.x+','+data.current_address.y+'&goal='+data.hospital_data[i].x+','+data.hospital_data[i].y+'&option=trafast';
      options.url = _url;
      request(options,function(error, respose){
              var databody = JSON.parse(respose.body);
              if (databody.code !=1){
              console.log(databody)
              var distance = databody.route.trafast[0].summary.distance/1000; // km 단위
              var duration = databody.route.trafast[0].summary.duration/1000/60; // 분 단위dy
              data.hospital_data[i].distance = distance;
              data.hospital_data[i].duration = duration;}
              })
    }

    
    console.log("TTTTTTTTTTTTT")
    return data}
console.log(direction(address))