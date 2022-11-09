<?php
    include "conexionBE.php";

    $user = $_POST['inpUser'];
    $password = $_POST['inpPassword'];

    $encrypt  = hash('sha1',$password);


    if( strlen($user) < 3 ){
        echo '
                <script>
                    alert("El nombre de usuario es muy corto");
                    window.location = "../pages/registro/registro.html";
                </script>
            ';
        exit();
    }

    $user_repetido = mysqli_query($conexion,"SELECT * from user where userName = '$user'");
    if( mysqli_num_rows($user_repetido) > 0 ){
        echo '
            <script>
                alert("El nombre de usuario ya existe");
                window.location = "../pages/registro/registro.html";
            </script>
        ';
        exit();
    }
    if( strlen($password) < 8 ){
        echo '
                <script>
                    alert("La contraseña debe tener una longitud mayor a 8 caracteres");
                    window.location = "../pages/registro/registro.html";
                </script>
            ';
        exit();
    }


    $query = "INSERT INTO `user`(`userName`, `password`, `isAdmin`) 
        VALUES ('$user','$encrypt',false)";

    $ejecutar = mysqli_query($conexion, $query);

    if ($ejecutar) {
        echo '
                <script>
                    alert("Registro exitoso, bienvenido ");
                    window.location = "../pages/login/login.html";
                </script>
            ';
    } else {
        echo '
                <script>
                    alert("No se almaceno");
                    //window.location = "../pages/registro/registro.html";
                </script>
            ';
    }

?>