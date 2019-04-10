function readXML(){
    let xmlData = new XMLHttpRequest();
    try {
        xmlData.open('GET', "/smartbuilding/sensordata.xml",false);
        xmlData.onload = function() {
            if(this.status==200){
                console.log("Status = " + this.status);
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

var graphData = readXML();
var chiffreTemp = graphData.graphtemperature;
var chiffreHumidity = graphData.graphhumidity;
// var nomVariable = ['Test1', 'Test2', 'Test3'];
let charTemp = document.getElementById('tempChart').getContext('2d');
let charHumidity = document.getElementById('humidityChart').getContext('2d');
let tempChart = new Chart(charTemp, {
   type:'line', //bar, horiz bar, pie, line, donut, radar, polarArea
   data :{
       labels : [1,2,3,4,5,6,7],
       datasets : [{
           label : 'Temparture',
           data : chiffreTemp,
           backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
           ],
           borderWidth :1,
           borderColor:'#777',
           hoverBorderWidth : 3,
           hoverBorderColor : '#000'
       }],
   },
   options : {
       title : {
           display : true,
           text : 'Temperature de la maison',
           fontSize: 25
       },
       legend : {
           display : true,
           position : 'right',
           labels : {
               fontColor : 'black'
           }
       },
       layout : {
           padding : {
               left : 50,
               right : 0,
               bottom : 0,
               top : 0
           }
       },
       tooltips : {
           enabled : true
       }
   }
});

let humidityChart = new Chart(charHumidity, {
    type:'line', //bar, horiz bar, pie, line, donut, radar, polarArea
    data :{
        labels : [1,2,3,4,5,6,7],
        datasets : [{
            label : 'Temparture',
            data : chiffreHumidity,
            backgroundColor:[
             'rgba(255, 99, 132, 0.6)',
             'rgba(54, 162, 235, 0.6)',
             'rgba(255, 206, 86, 0.6)',
            ],
            borderWidth :1,
            borderColor:'#777',
            hoverBorderWidth : 3,
            hoverBorderColor : '#000'
        }],
    },
    options : {
        title : {
            display : true,
            text : 'Humidité de la maison',
            fontSize: 25
        },
        legend : {
            display : true,
            position : 'right',
            labels : {
                fontColor : 'black'
            }
        },
        layout : {
            padding : {
                left : 50,
                right : 0,
                bottom : 0,
                top : 0
            }
        },
        tooltips : {
            enabled : true
        },
        scale : {
            ticks : {
                suggestedMin : 0
            }
        }
    }
 });
var count=0;
setInterval (function(){
    count++;
        console.log("count= "+ count+ " typeof = "+ typeof(count));
        humidityChart.data.datasets[0].data.push(readXML().graphhumidity);
        humidityChart.data.labels.push(count);
        humidityChart.options.scale.ticks.suggestedMin ++;
    
        tempChart.data.datasets[0].data.push(readXML().graphtemperature);
        tempChart.data.labels.push(count);
        tempChart.options.scale.ticks.suggestedMin ++;
}, 500);


