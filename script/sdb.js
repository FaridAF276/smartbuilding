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
        let sdb = contenuXML.getElementsByTagName("sdb");
        let temperature = parseFloat(sdb[0].getElementsByTagName("temperature")[0].textContent);
        let humidity = parseFloat(sdb[0].getElementsByTagName("humidity")[0].textContent);
        let flood = parseInt(sdb[0].getElementsByTagName("floodDetection")[0].textContent);
        let tSeuil = parseInt(sdb[0].getElementsByTagName("tempSeuil")[0].textContent);
        let hSeuil = parseInt(sdb[0].getElementsByTagName("humdSeuil")[0].textContent);
        var graphicData = {
            graphTemperature : temperature,
            graphHumidity : humidity,
            tresholdTemp : tSeuil,
            tresholdHum : hSeuil,
            floodDetection : flood
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

    function updateFlood(data){
        let floodBtn = document.getElementById('flood');
        if (data.floodDetection){
            floodBtn.textContent="Innondation !";
            floodBtn.className="btn btn-danger btn-lg";
        } else if(data.floodDetection==0){
            floodBtn.textContent="Situation normale";
            floodBtn.className = "btn btn-info btn-lg";
        }else{
            console.log("Erreur dans l'acquisition des données...");
        }}

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
            updateFlood(fichier);
            setTimeout(updateData,updateInterval);
        }
        function initializeTemp(data){
            let tresholdTempDiv = document.getElementById('tresholdTemp');
            let tresholdHumDiv = document.getElementById('tresholdHum');
            tresholdHumDiv.textContent = data.tresholdHum.toString();
            tresholdTempDiv.textContent = data.tresholdTemp.toString();
            let tempSeuilDeclenchement = data.graphTemperature + data.tresholdTemp;
            let humSeuilDeclenchement = data.graphHumidity + data.tresholdHum;
            tresholdHumDiv.textContent = "Le déclenchement s'effectuera à "+ humSeuilDeclenchement.toString()+" %";
            tresholdTempDiv.textContent = "Le déclenchement s'effectuera à "+ tempSeuilDeclenchement.toString()+" °C";

        }
        initializeTemp(readXML());
        updateData();
} catch (error) {
    console.log("Erreur détectée : " + error.stack);
}