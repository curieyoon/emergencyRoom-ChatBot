
<p align="center"> <img src="assets/logo.png" alt="2_place" width='300'></p>
# <p align="center">EmergencyRoom-ChatBot


[![KHU_group9](https://img.shields.io/badge/KHU--OSS-Group9-blueviolet)](https://www.javascript.com) [![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com) [![made-with-express](https://img.shields.io/badge/Made%20with-Express-orange.svg)](https://www.javascript.com)

</p>

EmergencyRoom-ChatBot is a chatbot service delivered on line-messenger platform.

## For End Users

#### Getting Started
**Add the ChatBot's line channel**


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



