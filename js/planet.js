const params = new URLSearchParams(window.location.search);
console.log("params: ", params);
const planetURL = params.get("url");
console.log("planetURL: ", planetURL);
planetHeader = document.getElementById('planet');
planetDetails = document.getElementById('details');
backButton = document.getElementById('back-button')

backButton.addEventListener('click', () => {
    window.location.href = './index.html';
})

fetch(planetURL).then((res) => {
    if (!res.ok) {
        throw new Error("Error fetching data");
    }
    return res.json();
}).then((data) => {
    for (let propKey in data.result.properties) {
        if (propKey == 'name') {
            planetHeader.innerText = data.result.properties[propKey];
        }
        else {
            let propItem = document.createElement('li');
            propItem.innerText = `${propKey}: ${data.result.properties[propKey]}`;
            planetDetails.appendChild(propItem);
        }
    }
}).catch((err) => {
    console.log(err);
});