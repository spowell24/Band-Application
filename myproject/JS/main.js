fetch('http://localhost:8902/guitarist/read')
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

        let table = document.querySelector("table");
        let data = Object.keys(bandData[0]);

        createTableHead(table, data);
        createTableBody(table, bandData);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

  function createTableHead(table, data)
  {
      let tableHead = table.createTHead();
      let row = tableHead.insertRow();
      for(let keys of data)
      {
          let th =  document.createElement("th");
          let text = document.createTextNode(keys);
          th.appendChild(text);
          row.appendChild(th);
      }

      let th2 = document.createElement("th");
      let text2 = document.createTextNode("View");
      th2.appendChild(text2);
      row.appendChild(th2);
  }

  function createTableBody(table, studentData)
  {
      for(let studentRecord of studentData)
      {
          let row = table.insertRow();
          for(let values in studentRecord)
          {
              console.log(studentRecord[values]);
              let cell = row.insertCell();
              let text = document.createTextNode(studentRecord[values]);
              cell.appendChild(text);
          }
          let newCell = row.insertCell();
          let myViewButton = document.createElement("a");
          let myButtonValue = document.createTextNode("View")
          myViewButton.className = "btn btn-danger";
          myViewButton.href = "record.html?id="+studentRecord.id
          myViewButton.appendChild(myButtonValue);
          newCell.appendChild(myViewButton);
      }
  }