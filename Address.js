import fetch from "node-fetch";
globalThis.fetch = fetch;

var AddressList = new Array();


function getAddress(currQuery) {
    fetch('https://dapi.kakao.com/v2/local/search/address.json?' + new URLSearchParams({
     query: currQuery
    }), {
     method: "GET",
     headers: {"Authorization": "KakaoAK c14234ba46c574c73715276c5644f397"}
    })
    .then(response => response.json())
    .then(data => {
        AddressList = data.documents.map(({road_address})=>({road_address}));
        // console.log(currAddress)
        return AddressList
    })
}




/*

  move to Line

var x; var y;
var regions = new Array();


// addressArray <- return value from function getAddress

function selectAddress(addressArray, number) {
	x = addressArray[number].road_address.x
	y = addressArray[number].road_address.y
	regions.region_1depth_name = addressArray[number].road_address.region_1depth_name;
	regions.region_2depth_name = addressArray[number].road_address.region_2depth_name;
	regions.region_3depth_name = addressArray[number].road_address.region_3depth_name;
	
}

*/


// hospitals: array from hospital API
// addNum: index of addressArray

function getXY(hospitals, addNum) {
	var hospitals_xy = new Array();
	hospitals_xy.my_x = AddressList[addNum].road_address.x;
	hospitals_xy.my_y = AddressList[addNum].road_address.y;
	// hopsitals_keyword[i] : name, x, y

	for (let i = 0; i < hospitals.length; i++) {	// iterate through available hospitals...

		fetch('https://dapi.kakao.com/v2/local/search/keyword.json?' + new URLSearchParams({
     		query: hospitals.name,
	 		category_group_code: "HP8"
   		 }), {
     		method: "GET",
     		headers: {"Authorization": "KakaoAK c14234ba46c574c73715276c5644f397"}
		})
    	.then(response => response.json())
    	.then(data => {
			for (let j = 0; j < data.length; j++) {
				if ((data.documents[j].category_name === "의료,건강 > 병원 > 종합병원") || (data.documents[j].category_name === "의료,건강 > 병원 > 대학병원")) {
					hospitals_xy[i].name = data.documents[j].place_name;
        			hospitals_xy[i].x = data.documents[j].x;
					hospitals_xy[i].y = data.documents[j].y;
					break;
				}
			}
			
    	})

	}
	AddressList = null;
    return hospitals_xy;
	/*
	hospitals_xy:
		.my_x, .my_y: user's coordinates (to some precision..)
		[i].name: name of ith hospital
		[i].x, [i].y: coordinates of ith hospital
	
	*/

	// for loop 다 돈 다음에 return하도록 수정해야함 (하실수 있는분?)
}

module.exports = {getAddress, getXY};