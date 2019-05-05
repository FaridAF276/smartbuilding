# SmartBuilding 
## Presentation
This application was developed in the Smart Building project realized in the Computer Engineering Project course at the **University of Mons**. The project consists of a building filled with sensors that send different data to an ESP32 module and then this application has to parse that data and display it in various forms for example: 
* A live chart that shows real-time temperature of the house
* A live chart that show real-time humidity of the house
* Various buttons are used to notify the user about event occurring in the house
  

## Requirements for this application

You can use this project to display your own data from your Smart Building model. All you need to do is to make sure that you create an application that writes code "sensordata.xml". We developed such a script in the "writing_Data.py" script.

After creating you repository and cloned the project you first need write the "config.ini" file. The file looks like this.
>Image de config.ini

Here you adapt the directory to the file name that you choose for example, the default directory is /html/pages/chambre.php, meaning that my .php is in my localhost in the 'html' file.

After you have modified this the application should run.

