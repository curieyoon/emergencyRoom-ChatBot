<br></br><br></br>
<p align="center"> <img src="assets/logo.png" alt="2_place" width='300' /></p>

# EmergencyRoom-ChatBot


[![KHU_group9](https://img.shields.io/badge/KHU--OSS-Group9-blueviolet)](https://www.javascript.com) [![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com) [![made-with-express](https://img.shields.io/badge/Made%20with-Express-orange.svg)](https://www.javascript.com)

[![LINE](https://img.shields.io/badge/API-LINE-06c755)](https://developers.line.biz/en/docs/messaging-api/overview/) [![KAKAO](https://img.shields.io/badge/API-KAKAO--LOCAL-fee500)](https://developers.kakao.com/docs/latest/ko/local/common) [![MAP](https://img.shields.io/badge/API-NAVER--MAP-1ic800)](https://api.ncloud-docs.com/docs/ai-naver-mapsdirections-driving) [![HOSPITAL](https://img.shields.io/badge/API-KR--HOSPITAL-0b70b9)](https://www.data.go.kr/data/15057684/openapi.do)


EmergencyRoom-ChatBot is a chatbot service delivered on line-messenger platform.

## For End Users

#### Getting Started
 * Add the ChatBot's LINE channel to your friends' list
You can start by adding out channel at https://liff.line.me/1645278921-kWRPP32q/?accountId=330zpmoc .


#### Find Emergency Room near you
1. send any message to activate the EmergencyRoom-ChatBot.

<img src="assets/1_activate.jpg" alt="1_activate" width="500"/>


2. send your current location

<img src="assets/2_place.jpg" alt="2_place" width="500"/>
-


## For Developers
### Installation

#### Requirements
This project was built on ```Amazon Linux 2``` on ```ec2``` instance of aws. 
Following instructions will be compatible on ```Amazon Linux 2``` and other linux distributions. 

#### Install From Source
```bash
git clone git@github.com:curieyoon/emergencyRoom-ChatBot.git
cd emergencyRoom-ChatBot
npm install --save
npm install -g yarn
yarn add dotenv
```

#### Add your private keys
Under the root repository ```emergencyRoom-ChatBot```, create your ```.env``` file containing private keys for the APIs this project depends on. 
Your ```.env``` file should look like this:
```bash
CHANNEL_ACCESS_TOKEN="Your_Line_Messenger_Access_Token"
KAKAO_KEY="KakaoAK Your_Kakao_API_Private_Key"
MY_DOMAIN="Your_server_domain_which_this_service_runs_on"
EMERGENCY_KEY="Your_Hospital_API_Key"
DIR_ID = "Your_Naver_Map_API_ID"
DIR_KEY = "Your_Naver_Map_API_KEY"
```

To import ```.env``` file properly in each module, make sure the line ```require("dotenv").config( {path: "/path/to/.env"} );``` contains the absolute path of your ```.env``` file on your server.

 * ```CHANNEL_ACCESS_TOCKEN```: 
 * ```KAKAO_KEY```:
 * ```MY_DOMAIN```:
 * ```EMERGENCY_KEY```:
 * ```DIR_ID``` :
 * ```DIR_KEY```:

