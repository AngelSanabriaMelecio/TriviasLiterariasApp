<?php

    include_once('conexion.php');
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    try{

        $DT = $pdo -> prepare("DELETE FROM trivia WHERE triviaId = ?");
        $DQ = $pdo -> prepare("DELETE FROM question WHERE triviaId = ?" );
        $DP = $pdo -> prepare("DELETE FROM paragraph WHERE triviaId = ?" );


        $DT -> execute( [$data] );
        $DQ -> execute( [$data] );
        $DP -> execute( [$data] );

        echo json_encode('Se ha eliminado la trivia Exitosamente');

    }catch(PDOException $e){
        echo json_encode('que pasa?');
    }

?>