<!DOCTYPE html>
<html>
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

    <?php include ('layout/navbar.php');
    ?>
    <div class="container-fluid">
      <div class="row">
        <div class ="col"><canvas id="tempChart"></canvas></div>
        <!-- <canvas data-type="linear-gauge"
                data-width="160"
                data-height="600"
                data-border-radius="20"
                data-borders="0"
                data-bar-stroke-width="20"
                data-minor-ticks="10"
                data-major-ticks="0,10,20,30,40,50,60,70,80,90,100"
                data-value="6"
                data-units="°C"
                data-color-value-box-shadow="false"
                id="tempGauge"
        ></canvas> -->
        <div class="col">
          <canvas id="humidityChart"></canvas>
          <!-- <canvas data-type="radial-gauge"
                  data-width="400"
                  data-height="400"
                  data-units="%"
                  data-title="false"
                  data-value="12"
                  data-min-value="0"
                  data-max-value="100"
                  data-major-ticks="0,20,40,60,80,100"
                  data-minor-ticks="2"
                  data-stroke-ticks="false"
                  data-highlights='[
                      { "from": 0, "to": 50, "color": "rgba(0,255,0,.15)" },
                      { "from": 50, "to": 70, "color": "rgba(255,255,0,.15)" },
                      { "from": 70, "to": 100, "color": "rgba(255,30,0,.25)" }
                  ]'
                  data-color-plate="#222"
                  data-color-major-ticks="#f5f5f5"
                  data-color-minor-ticks="#ddd"
                  data-color-title="#fff"
                  data-color-units="#ccc"
                  data-color-numbers="#eee"
                  data-color-needle-start="rgba(240, 128, 128, 1)"
                  data-color-needle-end="rgba(255, 160, 122, .9)"
                  data-value-box="true"
                  data-animation-rule="bounce"
                  data-animation-duration="500"
                  data-font-value="Led"
                  data-animated-value="true"
                  id="humidityGauge"
></canvas> -->
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
    <!-- <script src="script/tempPlotlyGraphics.js"></script> -->
    <script src="script/graphics.js"></script>
    <!-- <script src="script/gauge.js"></script> -->
</body>
</html>