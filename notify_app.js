// 모듈을 읽어 들입니다.
const request = require('request');
// 요청을 위한 상수를 선언합니다: TOKEN은 자신의 것을 입력해주세요.
const TARGET_URL = 'https://notify-api.line.me/api/notify';
const TOKEN = 'YK56BfHFgpILrxRk1FZrdcouFguf5CBA5qxM3zfDH6N9jR/cfPxVdK1P9vZHAk69mZDSlSkXNLy25pzqJbXrn3y76hwmH0Kiuvx3OadFYcuidWSp7VYAj4SqJSljv/q5KoYAOE2il8jmQkf4bQKvXQdB04t89/1O/w1cDnyilFU=';
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