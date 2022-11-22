/* NodeJs 12 샘플 코드 */


var request = require('request');

var url = 'http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmRltmUsefulSckbdInfoInqire';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=서비스키'; /* Service Key*/
queryParams += '&' + encodeURIComponent('STAGE1') + '=' + encodeURIComponent('서울특별시'); /* */
queryParams += '&' + encodeURIComponent('STAGE2') + '=' + encodeURIComponent('강남구'); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
});