
<?php

    session_start();

    if( isset($_SESSION['userName']) ){
        header('Location:/TriviasApp/pages/home/');
    }

    require_once '../../database/conexion.php';

    $loginSuccesful = false;
    $loginError =false;

    if( isset($_POST['inpUser']) && isset($_POST['inpPass']) && isset($_POST['inpPass']) )
    {
        if( !empty($_POST['inpUser']) && !empty($_POST['inpPass']) && !empty($_POST['inpPass']))
        $user = $_POST['inpUser'];
        $password = sha1($_POST['inpPass']);

        $query = $pdo ->prepare("SELECT * from user WHERE userName = :userName");
        $query -> bindParam(':userName', $user);
        $query -> execute();

        if( $query -> rowCount() == 0 ){

            $query = $pdo->prepare("INSERT INTO user values(null,:userName,:password,0)");
    
            $query -> bindParam(':userName', $user);
            $query -> bindParam(':password', $password);
    
            if($query ->execute()){
               $loginSuccesful = true;
            }
        }else{
            $loginError = true;
        }
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
    <link rel="stylesheet" href="../../constants/global.css">
</head>

<body background="../../assets/fondo.png">
    <div class="loginbox" id="theLoginBox">
        <h1>Regístrate hoy!</h1>
        <?php if ($loginSuccesful): ?>
        <p class="succes">Usuario creado correctamente!</p>
        <?php endif; ?>
        <?php if ($loginError): ?>
        <p class="error">El nombre de usuario ya existe.</p>
        <?php endif; ?>
        <form action="signup.php" method="post" id="frmLogin">
            <p id="lblUser">Usuario</p>
            <p><input name="inpUser" type="text" placeholder="Ingresa tu usuario"></p>
            <p id="lblPass">Contraseña</p>
            <p><input name="inpPass" type="password"></p>
            <p id="lblPass2">Confirmar contraseña</p>
            <p><input name="inpPass2" type="password"></p>
            <p><input class="button" type="submit" value="Crear Cuenta"></p>
            <p class="center link"><a href="../LoginPage/login.php">Iniciar Sesión</a></p>
        </form>
    </div>
    <script src="main.js"></script>
</body>

</html>