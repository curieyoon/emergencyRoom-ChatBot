// 모듈을 읽어 들입니다.
const request = require('request');
// 요청을 위한 상수를 선언합니다: TOKEN은 자신의 것을 입력해주세요.
const TARGET_URL = 'https://notify-api.line.me/api/notify';
const TOKEN = '2lGVtxPmn2VOsRczarnwqvQ6cMFOpCMnk3QHA4Ykd2E';
// 요청합니다.
request.post(
    {
        url: TARGET_URL,
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        },
        form: {
            message: '안녕하세요. LINE Notify 테스트입니다.',
            stickerPackageId: 1,
            stickerId: 1
        }
    },(error, response, body) => {
        console.log(body)
    });