<?php
    $pages = parse_ini_file('../config.ini');
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