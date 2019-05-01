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
        let garage = contenuXML.getElementsByTagName("garage");
        let temperature = parseFloat(garage[0].getElementsByTagName("temperature")[0].textContent);
        let humidity = parseFloat(garage[0].getElementsByTagName("humidity")[0].textContent);
        let door = parseInt(garage[0].getElementsByTagName("openclosedoor")[0].textContent);
        let tSeuil = parseInt(garage[0].getElementsByTagName("tempSeuil")[0].textContent);
        let hSeuil = parseInt(garage[0].getElementsByTagName("humdSeuil")[0].textContent);
        let tank = parseInt(garage[0].getElementsByTagName("tank")[0].textContent);
        var graphicData = {
            graphTemperature : temperature,
            graphHumidity : humidity,
            doorBool : door,
            tresholdTemp : tSeuil,
            tresholdHum : hSeuil,
            fuelTank : tank
        };
        // console.log(temperature + "\n"+humidity + "\n"+door + "\n"+tank + "\n")
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

    function updateDoor(data){
        let doorBtn = document.getElementById('door');
        if (data.doorBool){
            doorBtn.innerHTML="Porte ouverte";
            doorBtn.className="btn btn-warning btn-lg";
        } else if(data.doorBool==0){
            doorBtn.innerHTML="Porte fermée";
            doorBtn.className = "btn btn-success btn-lg";
        }else{
            console.log("Erreur dans l'acquisition des données..." + "\n" +
            data.doorBool + "\n" + typeof data.doorBool);
            //Juste pour debug
        }
    }
    function updateTank(data){
        let tankProgressBar = document.getElementById('tankProgress');
        if(data.fuelTank || data.fuelTank == 0){
            tankProgressBar.setAttribute('style',"width : "+data.fuelTank.toString()+"%");
        }else {
            console.log("Erreur dans l'acquisition des données..." + "\n" +
                data.fuelTank + "\n" + typeof data.fuelTank);
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
        updateDoor(fichier);
        updateTank(fichier);
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
}
catch (error) {
    console.log("Erreur détectée : " + error.stack);
}