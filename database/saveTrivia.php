<?php

    include_once('conexion.php');

    $json = file_get_contents('php://input');
    $data = json_decode($json);

    try{
        $triviaId = $data->triviaId;
        $title = $data->title;
        $tColor = $data->triviaColor;
    
        $triviaExistQuery = $pdo->prepare("SELECT count(*) FROM trivia WHERE triviaId=?");
        $triviaExistQuery->execute([$triviaId]);
        if (!$triviaExistQuery->fetchColumn()) {
            $insert = $pdo->prepare("INSERT INTO trivia VALUES(?,'',?)");
            $insert->execute([$triviaId, $tColor]);
        }else{
            $updateTitle = $pdo->prepare("UPDATE trivia SET title = ? WHERE triviaId = ?");
            $updateTitle -> execute([$title,$triviaId]);
        }
    
        $deleteQuery = $pdo->prepare("DELETE FROM question WHERE triviaId = ?");
        $deleteQuery->execute([$triviaId]);
    
        $deleteP = $pdo -> prepare("DELETE FROM paragraph WHERE triviaId = ?");
        $deleteP -> execute([$triviaId]);
    
        $insertQuestionQuery = $pdo->prepare("INSERT INTO question VALUES(NULL,:triviaId,:question,:points)");
        
        $questions = $data->questions;
        $N = count($questions);
        
        for ($i = 0; $i < $N; $i++) {
            $quest = $questions[$i]->question;
            $pts = $questions[$i]->points;

            if(empty($quest))$quest = null;
            if(empty($pts))$pts = null;

            $insertQuestionQuery->bindParam(':triviaId', $triviaId );
            $insertQuestionQuery->bindParam(':question', $quest);
            $insertQuestionQuery->bindParam(':points', $pts);
            $insertQuestionQuery->execute();

            $lastQ = $pdo -> prepare("SELECT questionId FROM question ORDER BY questionId DESC LIMIT 1");
            $lastQ -> execute();
            $questionId = $lastQ->fetchColumn();

            $pgrphs = $questions[$i]->paragraphs;
            $M = count($pgrphs);
            for( $j=0; $j<$M; $j++ ){
                
                $isC = 0;
                if( $pgrphs[$j]->isCorrect )
                    $isC = 1;

                $insertParaQuery = $pdo -> prepare("INSERT INTO paragraph values(NULL,?,?,?,?)");
                $insertParaQuery -> execute([
                    $triviaId,
                    $questionId,
                    $pgrphs[$j]->paragraph,
                    $isC,   
                ]);
            }
        }
    }
    catch(PDOException $e){
        echo json_encode('que passa');
    }
    finally{
        echo json_encode('termino');
    }

    #echo json_encode( $questions[$i] -> question );


?>