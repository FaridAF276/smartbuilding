function readXML(){
    let xmlData = new XMLHttpRequest();
    try {
        xmlData.open('GET', "/sensordata.xml",false);
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
            tresholdTemp : tSeuil,
            tresholdHum : hSeuil,
            doorBool : door
        };
        return graphicData;
    } catch (error) {
        console.log("Erreur détectée : " + error.stack)
    }
}

var updateInterval = 1000; //en milliseconde
function updateGauge(id='tempGauge', value){
    let gauge = document.getElementById(id);
    gauge.setAttribute('data-value', value.toString());
    setTimeout(updateGauge,updateInterval);
}
var data = readXML();
updateGauge('tempGauge',data.graphTemperature);
updateGauge('humidityGauge',data.graphHumidity);

