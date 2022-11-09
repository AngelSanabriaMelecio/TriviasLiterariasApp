<?php


    $conexion = mysqli_connect("localhost","root","5194","triviaslitbd");

    if( $conexion ){
        echo 'Conectado exitosamente!!';
    }else{
        echo 'No se pudo :c';
    }

?>