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
        let salon = contenuXML.getElementsByTagName("salon");
        let temp = parseFloat(salon[0].getElementsByTagName("temperature")[0].textContent);
        let humidity = parseFloat(salon[0].getElementsByTagName("humidity")[0].textContent);
        let extBrightness = salon[0].getElementsByTagName("extBrightness")[0].textContent.replace(/\s/g,'');
        let rain = parseInt(salon[0].getElementsByTagName("rainDetect")[0].textContent);
        let tSeuil = parseInt(salon[0].getElementsByTagName("tempSeuil")[0].textContent);
        let hSeuil = parseInt(salon[0].getElementsByTagName("humdSeuil")[0].textContent);
        let openCloseW =parseInt(salon[0].getElementsByTagName("opencloseWindow")[0].textContent);
        var graphicData = {
            graphTemperature : temp,
            graphHumidity : humidity,
            brightness : extBrightness,
            rain : rain,
            tresholdTemp : tSeuil,
            tresholdHum : hSeuil,
            openCloseWindow : openCloseW
        };
        return graphicData;
    } catch (error) {
        console.log("Erreur détectée : " + error.stack)
    }
}
try{
    const updateInterval = 1000; //en milliseconde
    const maxPointInChart = 20;
    var updateCount = 0;
    const numberElements = 15;
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

    function updateBrightness (data){
        let brightnessBtn = document.getElementById('brightness');
        if(data.brightness.toLowerCase() == "rouge"){
            brightnessBtn.className="btn btn-danger btn-lg";
            brightnessBtn.innerHTML = "Rouge";
        }else if(data.brightness.toLowerCase() == "jaune"){
            brightnessBtn.className="btn btn-warning btn-lg";
            brightnessBtn.innerHTML = "Jaune";
        }else if (data.brightness.toLowerCase() == "blanc"){
            brightnessBtn.className="btn btn-light btn-lg";
            brightnessBtn.innerHTML = "Blanc";
        }else{
            console.log("Données inattendue, veuillez vérifier le fichier XML : "+data.brightness.toLowerCase()
                + "\n type : " + typeof data.brightness.toLowerCase());
        }
        }

    function updateWindow(data){
        let windowBtn = document.getElementById('window');
        if (data.openCloseWindow){
            windowBtn.innerHTML="Fenêtre Ouverte";
            windowBtn.className="btn btn-warning btn-lg";
        } else if(data.openCloseWindow==0){
            windowBtn.innerHTML="Fenêtre fermée";
            windowBtn.className = "btn btn-success btn-lg";
        }else{
            console.log("Données inattendue, veuillez vérifier le fichier XML : "+data.openCloseWindow
                + "\n type : " + typeof data.openCloseWindow);
        }

    }

    function updateRain(data){
        let rainBtn = document.getElementById('rain');
        if (data.rain){
            rainBtn.innerHTML="Pluie détectée";
            rainBtn.className="btn btn-warning btn-lg";
        } else if(data.rain==0){
            rainBtn.innerHTML="Temps sec....";
            rainBtn.className = "btn btn-success btn-lg";
        }else{
            console.log("Données inattendue, veuillez vérifier le fichier XML : "+data.rain
                + "\n type : " + typeof data.rain);
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
    }
    function updateData() {
        console.log("Update Data");
        let fichier = readXML();
        addData(fichier);
        updateBrightness(fichier);
        updateRain(fichier);
        updateWindow(fichier);
        setTimeout(updateData,updateInterval);
    }
    function initializeTemp(tresholdTemp, tresholdHum){
        let tresholdTempDiv = document.getElementById('tresholdTemp');
        let tresholdHumDiv = document.getElementById('tresholdHum');
        tresholdHumDiv.innerHTML = tresholdTemp.toString();
        tresholdTempDiv.innerHTML = tresholdHum.toString();
    }
    var tresh =readXML();
    initializeTemp(tresh.tresholdTemp, tresh.tresholdHum);
    updateData();
} catch (error) {
    console.log("Erreur détectée : " + error.stack);
}