<br></br>
<p align="center"> <img src="assets/logo.png" alt="2_place" width='300' /></p>

# <p align="center">EmergencyRoom-ChatBot</p>
<p align="center">
<img src='https://img.shields.io/badge/KHU--OSS-Group9-blueviolet' /></p>
<p align="center">
 <a  href='https://nodejs.org/en/'><img src='https://img.shields.io/badge/Made%20with-NodeJS-68a063.svg' /> </a><a  href='https://expressjs.com/'> <img src='https://img.shields.io/badge/Made%20with-Express-259dff.svg'/></a></a><a  href='https://aws.amazon.com'> <img src='https://img.shields.io/badge/Made%20with-AWS-FF9900.svg'/></a></p>
<p align="center">
 <a href='https://developers.line.biz/en/docs/messaging-api/overview/'><img src='https://img.shields.io/badge/API-LINE-06c755'  /> </a> <a href='https://developers.kakao.com/docs/latest/ko/local/commo'><img src='https://img.shields.io/badge/API-KAKAO--LOCAL-fee500' /></a> <a href='https://api.ncloud-docs.com/docs/ai-naver-mapsdirections-driving'> <img src='https://img.shields.io/badge/API-NAVER--MAP-1ic800'  />  </a> <a href='https://www.data.go.kr/data/15057684/openapi.do'><img src='https://img.shields.io/badge/API-DATA.GO.KR-0b70b9' /> </a>




</p>

## Overview

Searching for available emergency room in a straightforward manner is a multi-step process which includes 1) searching for nearby hospitals that may have any ER 2) confirming the ER availability via phone calls or websites, etc. until you find one that accommodates to your need. (if there's any)<br />EmergencyRoom Chatbot provides you with a much more efficient and faster solution; drop your address and the Chatbot will have rest of the work done for you on the fly. 

<img src="assets/chatbot_architecture.png" alt="1_activate" />


## For End Users

#### Getting Started
 * Add the ChatBot's LINE channel to your friends' list
You can start by adding out channel at https://liff.line.me/1645278921-kWRPP32q/?accountId=330zpmoc .<br />


#### Find Emergency Room near you
1. send any message to activate the EmergencyRoom-ChatBot.

<img src="assets/1_activate.jpg" alt="1_activate" width="500"/>


2. enter your current address (e.g 서천동, 덕영대로) or name of the place near you (e.g 경희대학교)

<img src="assets/2_address.jpg" alt="2_place" width="500"/>


3. confirm your location by tapping '네'
<br />

4. ChatBot will then check ER availability of nearby hospitals. If there's any, it will send the list of the hospitals in ascending order of estimated time to get there from your current location.

<img src="assets/3_.jpg" alt="3" width="500"/> <img src="assets/4_.jpg" alt="4" width="500"/>
    <br />Note that the hospitals are sorted by estimated time instead of absolute distance from your location, which adds even more reliability for your urgency. <br />
To reactivate the ChatBot, enter any chat. 

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

Each key in the ```.env``` indicates:
 * ```CHANNEL_ACCESS_TOCKEN```: Channel access token on<a href='https://developers.line.biz/en/docs/messaging-api/overview'> LINE MESSENGER API</a>.
 * ```KAKAO_KEY```: REST API Key on <a href='https://developers.kakao.com/'>KAKAO DEVELOPERS</a>. 
 * ```MY_DOMAIN```: Your server domain or IPv4 address.
 * ```EMERGENCY_KEY```: Service Key on data.go.kr
 * ```DIR_ID``` : API ID on <a href='https://developers.naver.com/main/'>NAVER OPEN API</a>.
 * ```DIR_KEY```: API KEY on <a href='https://developers.naver.com/main/'>NAVER OPEN API</a>.


## License
Distributed under the MIT License. See <a href='License.txt'>License.txt</a> for more information.


## Contact 
 * Yerim Hong : hongyeee@khu.ac.kr
 * Sihwan Kim : vkn123@naver.com
 * Daeyeon Kim : rego0723@khu.ac.kr
 * Jueun Shin : wnslcosltimo12@khu.ac.kr
 * Curie Yoon : curieyoon@khu.ac.kr

