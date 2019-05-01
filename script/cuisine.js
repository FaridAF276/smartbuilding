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
        let cuisine = contenuXML.getElementsByTagName("cuisine");
        let temperature = parseFloat(cuisine[0].getElementsByTagName("temperature")[0].textContent);
        let humidity = parseFloat(cuisine[0].getElementsByTagName("humidity")[0].textContent);
        let windows = parseInt(cuisine[0].getElementsByTagName("opencloseWindow")[0].textContent);
        let presence = parseInt(cuisine[0].getElementsByTagName("presenceDetection")[0].textContent);
        var graphicData = {
            graphTemperature : temperature,
            graphHumidity : humidity,
            windBool : windows,
            presence : presence
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

    function updatePresence(data){
        let presenceBtn = document.getElementById('presence');
        if (data.presence){
            presenceBtn.innerHTML="Présence";
            presenceBtn.className="btn btn-warning btn-lg";
        } else if(data.presence==0){
            presenceBtn.innerHTML="Aucune présence";
            presenceBtn.className = "btn btn-success btn-lg";
        }else{
            console.log("Erreur dans l'acquisition des données...");
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
        updatePresence(fichier);
        setTimeout(updateData,updateInterval);
    }
    updateData();
}
catch (error) {
    console.log("Erreur détectée : " + error.stack);
}