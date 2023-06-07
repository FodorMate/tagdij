const tagokLista = document.querySelector("#tagok")
const buttonSubmit = document.querySelector("#submit")

window.addEventListener('load', tagokatBetolt);
buttonSubmit.addEventListener('click', befizetes);

function getTagok() {
    let url = "localhost:3000/tagok"
    fetch(url).then(response => response.json()).then((data) => tagokListaba(data));
}

function tagokListaba(data) {
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let newOption = document.createElement("option");
        let optionText = document.createTextNode(element.nev);
        newOption.appendChild(optionText);
        newOption.setAttribute("value", element.azon);
        tagokLista.appendChild(newOption);
    }
}

function befizetes() {
    let url = "localhost:3000/befiz";
    const data = getDataJson();

    fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json", },
        body: JSON.stringify(data)
    })

        .then(response => {
            return response.json()
        })
        .then(data => {
            comsole.log("Success", data)
        })
        .catch(err => { console.log("Error", err) })
}

function getDataJson() {
    let azon = tagokLista.value;
    let osszeg = document.querySelector("#osszeg").value;
    let befizetesJSON = `{"azon":"${azon}", "befiz":"${osszeg}"}`;
    return JSON.parse(befizetesJSON);
}