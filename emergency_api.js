const { response } = require('express');
const express = require('express');
const app = express();
const request = require('request');
const convert = require("xml-js");

var url = 'http://apis.data.go.kr/B552657/ErmctInfoInqireService/getSrsillDissAceptncPosblInfoInqire';
var url2 = 'http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEgytListInfoInqire';
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
                if (emergency == 'y'){ // emergeny 값이 'y'가 맞는지 한번 더 확인해주세요!
                    emergencys.push({"병원이름": hospitalname, "가용여부":emergency});
                }
                
            }
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
};

module.exports = {getspot};
//getspot("서울","송파구")
// 함수 동작 test

// 배열 비교 x
async function getspot_xy(cap, city){

    queryParams += '&' + encodeURIComponent('Q0') + '=' + encodeURIComponent(cap); /* */
    queryParams += '&' + encodeURIComponent('Q1') + '=' + encodeURIComponent(city); /* */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */

    request({
        url: url2 + queryParams,
        method: 'GET'
    }, await function (err, res, body) {
        if(err){
            console.log(`err => ${err}`)
        }
        else{
            var result = body
            var xmlTojson = convert.xml2json(result, {compact: true, spaces:0}); // xml 파일 json 변환
        
            const test = JSON.parse(xmlTojson)
            var emergency_xy = []
            var i;
            for(i = 0; i < items.item.length; i++){ // 제가 실행을 못해서 item.length가 있는지 확인은 못했습니다ㅠ
                let address_x = test.response.body.items.item[0].wgs84Lat._text;
                let address_y = test.response.body.items.item[0].wgs84Lon._text;
                let address_name = test.response.body.items.item[0].dutyName._text;
                
                emergency_xy.push({"병원이름": address_name, "x":address_x, "y": address_y});
                
            }
            return emergency_xy;
        }
})}


getspot_xy("서울", "송파구")

