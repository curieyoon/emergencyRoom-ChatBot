const { response } = require('express');
const express = require('express');
const app = express();
const request = require('request');
const convert = require("xml-js");

var url = 'http://apis.data.go.kr/B552657/ErmctInfoInqireService/getSrsillDissAceptncPosblInfoInqire';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=52tXHgaW46YUpGn9k0r3IQrduIl6kBOl3Ta8Idra1%2BpPMYhL4qVCDu9itW8FVbDtMF4f9LAT9NJXEx7pvEJv%2FQ%3D%3D'; /* Service Key*/


/*
1. 주소(시도) - cap (cities and provinces)
2. 주소(시군구) - city
*/
// 함수 만들기

function getspot(cap, city){

    console.log(encodeURIComponent(cap));
    queryParams += '&' + encodeURIComponent('STAGE1') + '=' + encodeURIComponent(cap); /* */
    queryParams += '&' + encodeURIComponent('STAGE2') + '=' + encodeURIComponent(city); /* */
    queryParams += '&' + encodeURIComponent('SM_TYPE') + '=' + encodeURIComponent(''); /* */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */

    request({
        url: url + queryParams,
        method: 'GET'
    }, function (err, res, body) {
        if(err){
            console.log(`err => ${err}`)
        }
        else{
            var result = body
            var xmlTojson = convert.xml2json(result, {compact: true, spaces:2});
            //console.log(xmlTojson)
            console.log(xmlTojson)
            console.log("----------------------")
            const test = JSON.parse(xmlTojson)
            console.log(test)
            console.log("----------------------")
            console.log(test.response.body.items);
        }
        }
    );

}

getspot('서울특별시','강남구');