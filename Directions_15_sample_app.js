const express= require('express');
const app = express();
const request = require('request')

const ID = '12rhzhzq7g';
const KEY = 'FhD45P91TxG2820MadrsiPOUjI6bQMJhddnHZIeI';

app.post('/direction',function(req,res){
    let data_body = req.body;
    var num = data_body.number;
    let count = 0;
    

    while (count<num){
            const _url = 'https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start='+data_body.address.current_address.x+','
                +data_body.address.current_address.y+'&goal='+data_body.hospital_data[count].x+','+data_body.hospital_data[count].y+'&option=trafast';
        }
        request.post(
            {
                method : 'GET',
                url : _url,
                headers : {
                    'X-NCP-APIGW-API-KEY-ID': ID,
                    'X-NCP-APIGW-API-KEY': KEY
                }
            },(error, res, body) => {
                let body = JSON.parse(res.body);
                var distance = body.route.trafast[0].summary.distance/1000; // km 단위
                var duration = body.route.trafast[0].summary.duration/1000/60; // 분 단위dy
                data_body.hospital_data[count].distance = distance;
                data_body.hospital_data[count].duration = duration;
            }
        );
        count += 1;
    res.send(data_body)
    }
)
