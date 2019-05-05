<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
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

<?php
    $pages = parse_ini_file('config.ini');
?>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#">SMART BUILDING</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                  <a class="nav-link" href="/index.php">Acceuil <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href=<?php echo $pages['chambrePHP']?>>Chambre</a>
              </li>

              <li class="nav-item">
                  <a class="nav-link" href=<?php echo $pages['salonPHP']?>>Salon</a>
              </li>

              <li class="nav-item">
                  <a class="nav-link" href=<?php echo $pages['sdbPHP']?>>Salle de bain</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href=<?php echo $pages['hallPHP']?>>Hall</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href=<?php echo $pages['garagePHP']?>>Garage</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href=<?php echo $pages['cuisinePHP']?>>Cuisine</a>
              </li>
          </ul>
        </div>
</nav>
    ?>
    <div class="container-fluid">
      <div class="row">
        <div class ="col"><canvas id="tempChart"></canvas></div>
        <div class="col">
          <canvas id="humidityChart"></canvas>
        </div>
      </div>    
    </div>

    <div class="container-fluid">
          <div class="row">
            <div>
              <h1>Etat de la porte : </h1>
              <button type="button" class="btn btn-success" id="temoinPorte">Ouverte</button>
            </div>
            <div class="col">
            
            </div>
          </div>
    </div>
    <script src="script/graphics.js"></script>
</body>
</html>