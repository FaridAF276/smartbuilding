# SmartBuilding

## Presentation

This application was developped in the Smart Building projet realized for the Computer Engineering Projet course at the **University of Mons**. The project consists of a building filled with sensors that send different data to an ESP32 module and then this application has to parse that data and display it in various forms for example : 
* A live chart that shows real-time temperature of the house
* A live chart that show real-time humidity of the house
* Various buttons are used to notify the user of event occuring the house
  

## Requirements for this applciation

You can use this project to display your own data from your Smart Building model. All you need to do is to make sure that you create an application that writes code "sensordata.xml". We developped such a script in the "writing_Data.py" script.

After creating you repo and cloned the project you first need write the "config.ini" file. The file looks like this.
>Image de config.ini

Here you adapt the directory to the file name that you choose for example, the default directory is /html/pages/chambre.php, meaning that my .php is in my localhost in the 'html' file.

After you have modified this the application should run.



## Dependencies for this project.

This web application uses : 
* Bootstrap
* Chart.js
* jQuery
You need these to be installed in your computer and adapt the script tags in every .php file of the project if you want to execute this application off-line. 
 
 ## How does the script work

 To generate any of the chart or button we read the sensordata.xml to do that we use the readXML() function this function takes no parameters and returns an object with every data parsed from the .xml file.

 We then update the chart using the addData() function that we call every 1000 ms to add fresh data to the charts.
