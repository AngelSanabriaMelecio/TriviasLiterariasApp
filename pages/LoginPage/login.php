<?php

    session_start();

    if( isset($_SESSION['userName']) ){
        header('Location:/TriviasApp/pages/home/');
    }

    require_once "../../database/conexion.php";
    $loginError = false;

    if(isset($_POST['inpUser']) && isset($_POST['inpPass']))
    {
        if(!empty($_POST['inpUser']) && !empty($_POST['inpPass']))
        {
            $password = sha1($_POST['inpPass']);
            $stmt = $pdo->prepare("SELECT userName,password from user WHERE userName = :userName ");
            $stmt -> bindParam(':userName',$_POST['inpUser'] );
            $stmt -> execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

        
            if( !empty($user) )
            {
                if( $user['password'] == $password ){
                    $_SESSION['userName'] = $_POST['inpUser'];
                    header('Location:/TriviasApp/pages/home/ ');
                }
                else
                    $loginError = true;
            }
            else{
                $loginError = true;     
            }

        }
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login.css">
    <title>Document</title>
</head>
<body background=" ../../assets/fondo.png" >
    <div class="loginbox" id="theLoginBox" >
        <h1>Inicia Sesion</h1>
        <?php if( $loginError ): ?>
        <p class="error">Usuario y/o Contraseña incorrectos.</p>
        <?php endif; ?>
        <form action="login.php" method="post" id="frmLogin">
            <p id="lblUser">Usuario</p>
            <p><input name="inpUser"type="text" placeholder="Ingresa tu usuario" ></p>
            <p id="lblPass">Contraseña</p>
            <p><input name="inpPass" type="password"></p> 
            <p><input class="button" type="submit" value="Ingresar"></p>
            <p class="center link"><a href="../signuppage/signup.php">Registrate</a></p>

        </form>
    </div>
    <script src="login.js"></script>
</body>
</html>