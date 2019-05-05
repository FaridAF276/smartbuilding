<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <?php header("Cache-control:max-age=1")?>
    <meta Cache-Control="no-cache">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>SmartBuilding Chart</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.js"></script>
    <script src="//cdn.rawgit.com/Mikhus/canvas-gauges/gh-pages/download/2.1.5/all/gauge.min.js"></script>
</head>
<body>
    <?php include ('../layout/navbar.php');
    ?>
    <div class="container-fluid">
        <div class="row">
        <h1>Les graphiques</h1>
        </div>
        <div class="row">
            <div class="col">
                Les graphiques ci-dessus proviennent des capteurs d'humidité et de température. La transmission des données de fait de la manière suivante : Les capteurs mesurent le température et l'humidité et les envoient au module "ESP32", ces données sont ensuite envoyé au boitier RaspBerry Pi qui les consignes dans un fichier (.xml) le site internet va donc lire ces données directement sur le fichier .xml
            </div>
        </div>
        <div class="row">
            <div class ="col">
                <canvas id="tempChart"></canvas>
            </div>
            <div class="col">
                <canvas id="humidityChart"></canvas>
            </div>
        </div>
        <div class="row">
            <div class="col"><h1>Les témoins</h1></div>
        </div>
        <div class="row">
            <div class="col ">De la même manière que précédemment ce bouton indique la couleur des led de la maison en fonction de la luminosité </div>
            <div class="col ">Ici nous indiquons à partir de quelle température de déclenchement d'effectuera</div>
            <div class="col ">Ici nous indiquons à partir de quelle température de déclenchement d'effectuera</div>
        </div>
        <div class="row">
            <div class="col"><button class="btn btn-info" id="brightness">Chargement...</button></div>
            <div class="col">
                <div id="tresholdTemp" class ="alert alert-dismissible alert-primary"></div>
            </div>
            <div class="col">
                <div id="tresholdHum" class = "alert alert-dismissible alert-primary"></div>
            </div>
        </div>
    </div>
    <script src = '../script/chambre.js'></script>
</body>
</html>