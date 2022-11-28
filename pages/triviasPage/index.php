<?php

    session_start();
    if(!isset($_SESSION['userName'])){
        header('Location:/TriviasApp/pages/LoginPage/login.php');
    }

    include_once('../../database/conexion.php');


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="../../constants/global.css">
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
    <div class="page">
        <section id="section">
            <div class="triviaContainer">
                <input id="triviaName" type="text" placeholder="Nombre de la trivia" >
                <div id="questions" class="questionsContainer">
                    <div id="Q1" class="questionContainer">
                        <div class="flex-row pointsRow between">
                            <div class="flex-row w-30" >
                                <p>Puntos: </p>
                                <input class="pointsInput" type="number" placeholder="Pts.">
                            </div>
                            <button class="button deleteQuestion" onclick="deleteQuestion(event)">X</button>
                        </div>
                        <div class="flex-row questionRow">
                            <input class="questionText" type="text" placeholder="Pregunta">
                        </div>
                        <div id="paragraphs">
                            <div class="paragraphContainer">
                                <input type="checkbox" name="" id="isCorrect">
                                <input class="paragraphText" id="P1" type="text" onfocus="handleFocus( event )" placeholder="Nuevo Inciso" >
                                <button class="button" onclick="deleteParagraph(event)" disabled >
                                    X
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button addButton" onclick="appendQuestion()" >
                    Agregar Pregunta
                </div>
                <div class="button saveButton" onclick="saveTrivia()" >
                    Guardar
                </div>
            </div>
        </section>
        <aside>
            <div id="trivias"> 
            </div>
            <div class="button addButton" onclick="appendTrivia()" >
                Nueva
            </div>
        </aside>
    </div>

    <script src="../../constants/master.js"></script>
    <script src="main.js"></script>
</body>
</html>