function readXML(){
    let xmlData = new XMLHttpRequest();
    try {
        xmlData.open('GET', "../sensordata.xml",false);
        xmlData.onload = function() {
            if(this.status==200){
                console.log("Status = " + this.status);
            }
        }
        xmlData.send();
        var xmlResponse = xmlData.responseText;
        let parser = new DOMParser();
        let contenuXML= parser.parseFromString(xmlResponse,"text/xml");
        let chambre = contenuXML.getElementsByTagName("chambre");
        let temperature = parseInt(chambre[0].getElementsByTagName("temperature")[0].textContent);
        let humidity = parseInt(chambre[0].getElementsByTagName("humidity")[0].textContent);
        let seuil = parseInt(chambre[0].getElementsByTagName("tempSeuil")[0].textContent);
        let door = parseInt(chambre[0].getElementsByTagName("openclosedoor")[0].textContent);
        var graphicData = {
            graphTemperature : temperature,
            graphHumidity : humidity,
            tresholdTemp : seuil,
            doorBool : door
        };
        return graphicData;
    } catch (error) {
        console.log("Erreur détectée : " + error.stack)
    }
}

var updateInterval = 1000; //en milliseconde
var maxPointInChart = 20;
var updateCount = 0;
var numberElements = 15;
var graphData = readXML();
var chiffreTemp = graphData.graphTemperature;
var chiffreHumidity = graphData.graphHumidity;
var nomVariable = ['Test1', 'Test2', 'Test3'];
let charTemp = document.getElementById('tempChart').getContext('2d');
let charHumidity = document.getElementById('humidityChart').getContext('2d');
var commonOptions = {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            millisecond: 'mm:ss:SSS'
          }
        }
      }],
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    legend: {display: false},
    tooltips:{
      enabled: false
    }
};

let tempChart = new Chart(charTemp, {
    type : 'line',
    data : {
        datasets : [{
            label : 'Test',
            data : [1],
            pointBackgroundColor : 'green'
        }]
    },
    options: Object.assign({}, commonOptions, {
        title:{
          display: true,
          text: "Température",
          fontSize: 18
        }
      })

});

let humidChart = new Chart(charHumidity, {
  type : 'line',
  data : {
      datasets : [{
          label : 'Test',
          data : [1],
          pointBackgroundColor : 'green'
      }]
  },
  options: Object.assign({}, commonOptions, {
      title:{
        display: true,
        text: "Humidité",
        fontSize: 18
      }
    })
});

function updateDoor(data){
  let temoinPorte = document.getElementById("temoinPorte");
  console.log(temoinPorte);
  if (data.doorBool) {
    temoinPorte.textContent = "Ouverte";
    temoinPorte.className = "btn btn-success btn-lg";
  }else{
    temoinPorte.textContent = "Fermée";
    temoinPorte.className = "btn btn-danger btn-lg";
  }
}

function addData(data) {
    if(data){
      tempChart.data.labels.push(new Date());
      humidChart.data.labels.push(new Date());
    //   console.log(typeof testChart.data.datasets[0].data)
      tempChart.data.datasets[0].data.push(data.graphTemperature);
      humidChart.data.datasets[0].data.push(data.graphHumidity);
      if(updateCount > numberElements){
        //t
        tempChart.data.labels.shift();
        tempChart.data.datasets[0].data.shift();
        //%
        humidChart.data.labels.shift();
        humidChart.data.datasets[0].data.shift();
      }
      else updateCount++;
      tempChart.update();
      humidChart.update();
    }
  };
function updateData() {
    if(!location.hash){
      location.hash = "#reloading";
      location.reload(true);
    }else{
      location.hash="#reloaded";
    }
    console.log("Update Data");
    let fichier = readXML();
    addData(fichier);
    updateDoor(fichier);
    setTimeout(updateData,updateInterval);
  }

  updateData();