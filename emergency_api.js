const { query } = require('express');
const express = require('express');
const app = express();
const request = require('request');
const convert = require("xml-js");

var url = 'http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmRltmUsefulSckbdInfoInqire';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=52tXHgaW46YUpGn9k0r3IQrduIl6kBOl3Ta8Idra1%2BpPMYhL4qVCDu9itW8FVbDtMF4f9LAT9NJXEx7pvEJv%2FQ%3D%3D'; /* Service Key*/

queryParams += '&' + encodeURIComponent('STAGE1') + '=' + '%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C'; /* */
queryParams += '&' + encodeURIComponent('STAGE2') + '=' + '%EA%B0%95%EB%82%A8%EA%B5%AC'; /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */

console.log(url+queryParams);

request({
    url: url + queryParams,
    method: 'GET'
}, function (err, res, body) {
    if(err){
        console.log(`err => ${err}`)
    }
    else{
        var result = body
        console.log(`body data => ${result}`)
        var xmlTojson = convert.xml2json(result, {compact: true, spaces:4});
        console.log(`xml to json => ${xmlTojson}`)
    }

    }
);