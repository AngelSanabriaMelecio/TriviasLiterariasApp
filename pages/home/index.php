<?php

    session_start();
    if(!isset($_SESSION['userName'])){
        header('Location:/TriviasApp/pages/LoginPage/login.php');
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="../../constants/appBarStyle.css">
</head>
<body background="../../assets/fondo.png" >
    <!-- ***********  App Bar *************** -->
    <div data-role="appbar" data-expand-point="md" class="appBarContainer">
        <a href="../home" class="logo-container">
            <span class="logo">
                E<sup>L</sup>
            </span>
        </a>
        <nav class="menuAppBar">
            <ul class="between">
                <div class="row">
                    <div id="menu0" class="menuOption">
                    <li class="button" onclick="showSubMenu(0)">
                            Registros
                            <span class="absoluteRight">
                                <img class="arrowImg" src="../../assets/arrow-down.png" alt="">
                                <img class="listImg" src="../../assets/list.png" alt="">
                            </span>
                        </li>
                        <span class="absoluteFill">
                            <a href="../triviasPage/" onclick="showSubMenu(0)" class="subMenuAppBar">Nueva Trivia </a>
                            <a onclick="showSubMenu(0)" class="subMenuAppBar">Nuevo Equipo</a>
                        </span>
                    </div>
                    <div id="menu1" class="menuOption">
                        <li class="button" onclick="showSubMenu(1)">
                            Concursos
                            <span class=" absoluteRight">
                            <img class="arrowImg" src="../../assets/arrow-down.png" alt="">
                            <img class="listImg" src="../../assets/list.png" alt="">
                            </span>
                        </li>
                        <span class="absoluteFill">
                            <a href="../currentContest/CurrentContest.html" onclick="showSubMenu(1)" class="subMenuAppBar">Concurso actual</a>
                            <a onclick="showSubMenu(1)" class="subMenuAppBar">Nuevo Concurso</a>
                            <a onclick="showSubMenu(1)" class="subMenuAppBar">Concursos Pasados</a>
                        </span>
                    </div>
                </div>
                <div>
                    <div class="menuOption">
                        <a class="button" href="../../database/logout.php">Cerrar sesion</a>
                    </div>
                </div>
            </ul>
        </nav>
    </div>
    <!-- ************************** -->
    Principal

    <script src="../../constants/master.js"></script>
</body>
</html>