function readXML(){
    let xmlData = new XMLHttpRequest();
    try {
        xmlData.open('GET', "/smartbuilding/sensordata.xml",false);
        xmlData.onload = function() {
            if(this.status==200){
                // console.log("Status = " + this.status);
            }
        }
        xmlData.send();
        var xmlResponse = xmlData.responseText;
        // console.log(xmlResponse);
        let parser = new DOMParser();
        let contenuXML= parser.parseFromString(xmlResponse,"text/xml");
        // console.log(contenuXML);
        let temperature = contenuXML.getElementsByTagName("temperature");
        var stringTabTemp=temperature[0].firstChild.data;
        let tableauTemp = JSON.parse("["+stringTabTemp+"]");
        // let tableauTemp = JSON.parse("["+stringTabTemp+"]");
        let humidity = contenuXML.getElementsByTagName("humidity");
        var stringTabHumidity=humidity[0].firstChild.data;
        let tableauHumidity = JSON.parse("["+stringTabHumidity+"]");
        var graphicData = {
            graphtemperature : tableauTemp,
            graphhumidity : tableauHumidity
        };
        return graphicData;
        
    } catch (error) {
        console.log("Erreur détectée : " + error.stack)
    }
}

Plotly.plot(tempGraphDivId,[{
    y:readXML().graphtemperature,
    type:'line'
}]);

var count = 0;
setInterval(function(){
    Plotly.extendTraces(tempGraphDivId,{ y:[readXML().graphtemperature]}, [0]);
    count++;
    console.log(readXML().graphtemperature);
    if(count > 10) {
        Plotly.relayout(tempGraphDivId,{
            xaxis: {
                range: [count-10,count]
            }
        });
    }
},500);