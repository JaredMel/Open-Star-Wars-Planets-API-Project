const baseURL = "https://www.swapi.tech/api/planets";
const planetContainer = document.getElementById('planet-container');

async function fetchRecords() {
    try {
        const response = await fetch(baseURL);

        if (!response.ok) {
            throw new Error('Request failed');
        }

        let record = await response.json();
        console.log("record: ", record);
        const recordLength = record.total_pages;
        console.log(`Data fetched successfully:`, recordLength);

        const pageUrl = baseURL + "?page=";
        const urls = [];
        for (let i = 0; i < recordLength; i++) {
            urls.push(pageUrl + (i + 1) + '&limit=10');
        }
        getAllPages(urls);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
fetchRecords();


async function getAllPages(urls) {
    const promiseList = urls.map(text => fetch(text).then(r => r.json().catch(err => console.log(err))));
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
            planetContainer.appendChild(planetElt);

            planetElt.addEventListener('click', () => {
                const planetUrlFile = './planet.html';
                const params = new URLSearchParams();
                params.append("url", planetURL);
                const paramsURL = planetUrlFile + '?' + params.toString();
                console.log("paramsURL: ", paramsURL);
                window.location.href = paramsURL;
            });
        }
        return finalList;
    });
}