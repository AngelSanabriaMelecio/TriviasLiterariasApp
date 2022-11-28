<?php

    include_once('conexion.php');

    class trivia
    {
        public $title;
        public $triviaId;
        public $triviaColor;
        public $questions = [];
    }
    class question
    {
        public $question;
        public $points;
        public $paragraphs = [];
    }
    class paragraph
    {
        public $paragraph;
        public $isCorrect;

        function __construct( $paragraph,$isCorrect ){
            $this ->paragraph = $paragraph;
            $this ->isCorrect = $isCorrect;
        }
    }

    $triviasQuery = $pdo->query("SELECT * from trivia");
    $questionsQuery = $pdo->prepare("SELECT * from question WHERE triviaId = ?");
    $paragraphsQuery = $pdo->prepare("SELECT * from paragraph WHERE triviaId = ? AND questionId = ?");


    $trivias = [];

    foreach ($triviasQuery as $tr) {

        $newTrivia = new trivia();
        $newTrivia -> title = $tr['title'];
        $newTrivia -> triviaId = $tr['triviaId'];
        $newTrivia -> triviaColor = $tr['triviaColor'];

        $questionsQuery->execute([ $tr['triviaId'] ]);
        $questArr = $questionsQuery->fetchAll();

        foreach ($questArr as $quest) {
        
            $newQuestion = new question();

            $paragraphsQuery->execute([$quest['triviaId'], $quest['questionId']]);
            
            $paragArr = $paragraphsQuery->fetchAll();

            $newQuestion->points = $quest['points'];
            $newQuestion->question = $quest['question'];


            foreach ($paragArr as $parag) {
 
                $newParagraph = new paragraph(
                    $parag['paragraph'],
                    $parag['isCorrect'],
                );

                array_push($newQuestion->paragraphs, $newParagraph);
            }
            array_push($newTrivia->questions, $newQuestion);
        }
        array_push( $trivias, $newTrivia );
    }
    echo json_encode($trivias);
?>
