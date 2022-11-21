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

	AddressList = null;
    
}
module.exports = {getAddress, getXY};