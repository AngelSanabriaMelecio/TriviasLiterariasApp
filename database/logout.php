<?php

    session_start();

    session_unset();

    session_destroy();

    header('Location: /TriviasApp/pages/LoginPage/login.php ');

?>