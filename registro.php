<?php
  if (isset($_POST["nombre"]) && isset($_POST["pwd"])) {
    $name = $_POST["nombre"];
    $pwd = $_POST["pwd"];
    $cmd = 'powershell C:\createUser.ps1 '.$name.' '.$pwd;
    exec($cmd, $o, $r1);

    $cmd = 'C:\CrearCuentaMail.vbs '.$name.' '.$pwd;
    exec($cmd, $o, $r2);

    $r = $r1 + $r2;
    if ($r == 0) {
      echo '<script>alert("Cuentas creadas correctamente");</script>';
    } else {
      echo '<script>alert("Error al crear alguna de las cuentas");</script>';
    }

    $dest = $name.'@adriannet.local';
    $asunto = 'Nuevo registro';
    $msje = "Se ha creado su nueva direccion de correo electronico: ".$dest."\r\n".
            "Su contrase�a: ".$pwd;
    $header = "From: webmaster@adriannet.local";

    mail(utf8_decode($dest), utf8_decode($asunto), utf8_decode($msje), utf8_decode($header));
  }
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Formulario</title>
  </head>
  <body>
    <h2>Crear una cuenta de correo electrónico y FTP</h2>

    <form method="post">
      <p>Usuario: <input type="text" name="nombre" />@adriannet.local</p>
      <p>Contraseña: <input type="password" name="pwd" /></p>
      <p><input type="submit" value="Aceptar" /></p>
    </form>

    El usuario y contraseña son los mismos para el FTP.
  </body>
</html>