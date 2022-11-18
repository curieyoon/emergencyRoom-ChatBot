const request = require('request');
const convert = require("xml-js");

var url = 'http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmRltmUsefulSckbdInfoInqire';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=52tXHgaW46YUpGn9k0r3IQrduIl6kBOl3Ta8Idra1%2BpPMYhL4qVCDu9itW8FVbDtMF4f9LAT9NJXEx7pvEJv%2FQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('STAGE1') + '=' + encodeURIComponent('서울특별시'); /* */
queryParams += '&' + encodeURIComponent('STAGE2') + '=' + encodeURIComponent('강남구'); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (err, res, body) {
    if(err){
        console.log(`err => ${err}`)
    }
    console.log(convert.xml2js(body));
});