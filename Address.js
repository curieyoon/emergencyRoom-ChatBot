import fetch from "node-fetch";
globalThis.fetch = fetch;

var currAddress = new Array();
function getAdddress(currQuery) {
    fetch('https://dapi.kakao.com/v2/local/search/address.json?' + new URLSearchParams({
     query: currQuery
    }), {
     method: "GET",
     headers: {"Authorization": "KakaoAK c14234ba46c574c73715276c5644f397"}
    })
    .then(response => response.json())
    .then(data => {
        currAddress = data.documents.map(({road_address})=>({road_address}));
        // console.log(currAddress)
        return currAddress
    })
}

function selectAddress(addressArray, number) {

}

function getXY() {
    
}
module.exports = {getAddress, selectAddress, getXY};