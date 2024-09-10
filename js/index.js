const baseURL = "https://www.swapi.tech/api/planets";
const planetsSection = document.getElementById("planets");
const diameterSection = document.getElementById("diameter");

async function fetchRecords() {
    try {
        const response = await fetch(baseURL);
        
        if (!response.ok) {
            throw new Error("Request failed")
        }

        let record = await response.json();
        console.log("record: ", record)
        const recordLength = record.total_pages;
        console.log('Date fetched successfully:', recordLength);

        const pageUrl = baseURL + "?page=";
        const urls = [];
        for (let i = 0; i < recordLength; i++) {
            urls.push(pageUrl + (i + 1) + '&limit=10');
        }
        getAllPages(urls);
    } catch (error) {
        console.error('An error occured:', error);
    }
}
fetchRecords();

async function getAllPages(urls) {
    const promiseList = urls.map(url => fetch(url.then(r => r.json().catch(err => console.log(err)))));
    const finalResult = await Promise.all(promiseList).then(result => {
        let finalList = []
        result.forEach(res => {
            finalList = finalList.concat(res.results);
        });
        console.log("finalList: ", finalList);
        for (let planet of finalList) {
            let planetElt = document.createElement("div");
            let planetURL = planet.url;

            planetElt.className = 'planet';

            planetHeader = document.createElement("h2");
            planetHeader.innerText = planet.name;
            planetElt.appendChild(planetHeader);
            peopleContainer.appendChild(planetElt);
        }
    })
}
/*
fetch(`https://www.swapi.tech/api/planets`)
.then((response) => {
    if (response.ok) {
        return response.text();
    } else {
        throw new Error("Failed to fetch repositories")
    }
})
.then((data) => {
    const planets = JSON.parse(data);
    console.log(planets);

    let planetsList = document.createElement("ul");
    planetsSection.appendChild(planetsList);
    for (let planet of planets) {
        let newPlanet = document.createElement("li");
        newPlanet.innerText = planet.name;
        planetsList.appendChild(newPlanet);
    }

    let diameterList = document.createElement("ul");
    diameterSection.appendChild(diameterList);
    for (let planetsDiameter of planets) {
        let newDiameterPlanet = document.createElement("li");
        newDiameterPlanet.innerText = planetsDiameter.diameter;
        planetsList.appendChild(newDiameterPlanet);
    }
})
.catch((error) => {
    if (error instanceof SyntaxError) {
        console.error("Unparsable response from server")
    } else {
        console.error("Error fetching data: ", error.message);
    }
})
*/