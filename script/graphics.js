function readXML(){
    let xmlData = new XMLHttpRequest();
    try {
        xmlData.open('GET', "/html/sensordata.xml",false);
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
        let temperature = parseInt(chambre[0].getElementsByTagName("temperature")[0].innerHTML);
        let humidity = parseInt(chambre[0].getElementsByTagName("humidity")[0].innerHTML);
        var graphicData = {
            graphTemperature : temperature,
            graphHumidity : humidity
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
var chiffreTemp = graphData.graphtemperature;
var chiffreHumidity = graphData.graphhumidity;
var nomVariable = ['Test1', 'Test2', 'Test3'];
let charTemp = document.getElementById('tempChart').getContext('2d');
// let charHumidity = document.getElementById('humidityChart').getContext('2d');
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



function addData(data) {
    if(data){
      tempChart.data.labels.push(new Date());
    //   console.log(typeof testChart.data.datasets[0].data)
      tempChart.data.datasets[0].data.push(data);
      if(updateCount > numberElements){
        tempChart.data.labels.shift();
        tempChart.data.datasets[0].data.shift();
      }
      else updateCount++;
      tempChart.update();
    }
  };
  function updateData() {
    console.log("Update Data");
    addData(readXML().graphTemperature);
    setTimeout(updateData,updateInterval);
  }
  updateData();