// const { response } = require('express');
// const express = require('express');
// const app = express();
const { resolve } = require('path');
const request = require('request');
const convert = require("xml-js");

var url = 'http://apis.data.go.kr/B552657/ErmctInfoInqireService/getSrsillDissAceptncPosblInfoInqire';
var url2 = 'http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEgytListInfoInqire';


/* 함수 만들기

function getspot(cap, city){
    
    1. 주소(시도) - cap (cities and provinces)
    2. 주소(시군구) - city

}
*/
const emergencys = [];


const getspot = (cap, city) => {
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=52tXHgaW46YUpGn9k0r3IQrduIl6kBOl3Ta8Idra1%2BpPMYhL4qVCDu9itW8FVbDtMF4f9LAT9NJXEx7pvEJv%2FQ%3D%3D'; /* Service Key*/
    queryParams += '&' + encodeURIComponent('STAGE1') + '=' + encodeURIComponent(cap); /* */
    queryParams += '&' + encodeURIComponent('STAGE2') + '=' + encodeURIComponent(city); /* */
    queryParams += '&' + encodeURIComponent('SM_TYPE') + '=' + encodeURIComponent(''); /* */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */

    return new Promise((resolve, reject)=> {
        request({
            url: url + queryParams,
            method: 'GET'
        }, async (err, res, body) => {
            if(err){
                reject(err);
            }
            else{
                var result = body
                var xmlTojson = await convert.xml2json(result, {compact: true, spaces:0}); // xml 파일 json 변환
            
                const test = await JSON.parse(xmlTojson)
                const items = test.response.body.items
                
                var i;
                for(i = 0; i < items.item.length; i++){ // 병원 이름과 응급실 가능여부 확인 반복
                    const item = items.item[i]
                    const hospitalname = item.dutyName._text
                    const emergency = item.MKioskTy25._text
                    
                    emergencys.push({"병원이름": hospitalname, "가용여부":emergency});
                    }
                }
                resolve(emergencys);
            }

        );
    })
};

// const saveData = async (req, res) => {
//     try{
//         getspot("서울", "송파구").then((res)=> {
//             console.log("res", res);
//         })
//     }
//     catch(e){
//         console.log(e);
//     }
// }

// saveData();





const  getspot_xy= (cap, city) =>{
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=52tXHgaW46YUpGn9k0r3IQrduIl6kBOl3Ta8Idra1%2BpPMYhL4qVCDu9itW8FVbDtMF4f9LAT9NJXEx7pvEJv%2FQ%3D%3D'; /* Service Key*/
        queryParams += '&' + encodeURIComponent('Q0') + '=' + encodeURIComponent(cap); /* */
        queryParams += '&' + encodeURIComponent('Q1') + '=' + encodeURIComponent(city); /* */
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
    return new Promise((resolve, reject)=> {
        request({
            url: url2 + queryParams,
            method: 'GET'
        }, async (err, res, body) =>{
            if(err){
                reject(err);
            }
            else{
                var emergency_xy = []
                var result = body
                var xmlTojson = convert.xml2json(result, {compact: true, spaces:0}); // xml 파일 json 변환
            
                const test = await JSON.parse(xmlTojson)
                const items = test.response.body.items
                var i;
                for(i = 0; i < items.item.length; i++){ // 제가 실행을 못해서 item.length가 있는지 확인은 못했습니다ㅠ
                    let address_x = test.response.body.items.item[i].wgs84Lat._text;
                    let address_y = test.response.body.items.item[i].wgs84Lon._text;
                    let address_name = test.response.body.items.item[i].dutyName._text;
                    console.log(address_name,address_x,address_y)
                    emergency_xy.push({"name": address_name, "y":address_x, "x": address_y,"distance":0,"duration":0});
                    
                }
                resolve(emergency_xy);
            }
    })}

)};
    
module.exports = {getspot,getspot_xy}

