const { response } = require('express');
const express = require('express');
const app = express();
const request = require('request');
const convert = require("xml-js");

var url = 'http://apis.data.go.kr/B552657/ErmctInfoInqireService/getSrsillDissAceptncPosblInfoInqire';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=52tXHgaW46YUpGn9k0r3IQrduIl6kBOl3Ta8Idra1%2BpPMYhL4qVCDu9itW8FVbDtMF4f9LAT9NJXEx7pvEJv%2FQ%3D%3D'; /* Service Key*/

/* 함수 만들기

function getspot(cap, city){
    
    1. 주소(시도) - cap (cities and provinces)
    2. 주소(시군구) - city

}
*/

async function getspot(cap, city){

    queryParams += '&' + encodeURIComponent('STAGE1') + '=' + encodeURIComponent(cap); /* */
    queryParams += '&' + encodeURIComponent('STAGE2') + '=' + encodeURIComponent(city); /* */
    queryParams += '&' + encodeURIComponent('SM_TYPE') + '=' + encodeURIComponent(''); /* */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */

    await request({
        url: url + queryParams,
        method: 'GET'
    }, function (err, res, body) {
        if(err){
            console.log(`err => ${err}`)
        }
        else{
            var result = body
            var xmlTojson = convert.xml2json(result, {compact: true, spaces:0}); // xml 파일 json 변환
        
            const test = JSON.parse(xmlTojson)
            const items = test.response.body.items
            
            var emergencys = []
            var i;
            for(i = 0; i < items.item.length; i++){ // 병원 이름과 응급실 가능여부 확인 반복
                const item = items.item[i]
                const hospitalname = item.dutyName._text
                const emergency = item.MKioskTy25._text
                
                emergencys.push({"병원이름": hospitalname, "가용여부":emergency});
                
            }
            console.log(emergencys)
            return emergencys;
            console.log("----------------------")          
            /* const test = JSON.stringify(xmlTojson) // json => 문자열
            console.log(test)
            let words = test.split(','); // ','를 기준으로 분리
            console.log(words) */
/*
            console.log("----------------------")
            console.log(test.response.body.items);
            */
        }
        }
    );
}
module.exports = {getspot};
// 함수 동작 test
