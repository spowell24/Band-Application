const params = new URLSearchParams(window.location.search);

for(let param of params)
{
    console.log("Here I am", param);
    let id = param[1];
    console.log(id);
    getSingleRecord(id);
}

function getSingleRecord(id)
{
fetch('http://localhost:8902/guitarist/read/'+id)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(bandData) {
        console.log(bandData);

        document.getElementById("id").value=bandData.id;
        document.getElementById("name").value=bandData.name;
        document.getElementById("strings").value=bandData.strings;
        document.getElementById("type").value=bandData.type;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

document.querySelector("form.bandRecords").addEventListener("submit", function(stop)
{
    stop.preventDefault();

    let formElements = document.querySelector("form.bandRecords").elements;
    console.log(formElements);

    let id = formElements["id"].value;
    let name = formElements["name"].value;
    let strings = formElements["strings"].value;
    let type = formElements["type"].value;
    console.log(id);
    console.log(name);
    console.log(strings);
    console.log(type);
    updateBand(id, name, strings, type);
})

function updateBand(id, name, strings, type)
{
    let idToUpdate = parseInt(id);
    let stringUpdate = parseInt(strings);
    fetch("http://localhost:8902/guitarist/update/"+idToUpdate,
    {
    method: 'put',
    headers: {
      "Content-type": "application/json"
    },
    body: json = JSON.stringify({
        "id": idToUpdate,
        "name": name,
        "strings": stringUpdate,
        "band":{
            "bandId": 1
        },
        "type": type
    })})
  .then(json)
  .then(function (data) {
    console.log('Request succeeded with JSON response', data);
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
}
