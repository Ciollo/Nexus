<?php
include '../includes/connect.php';

session_start();    

if (!isset($_POST['email']) || !isset($_POST['password'])) {
    echo "go out";
} else {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $email = strtolower($email);
	$password = hash('sha256', $password);

    $query = "SELECT * FROM utenti WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $_SESSION['logged'] = true;
        $_SESSION['email'] = $email;
        echo "Login riuscito!";
        header("refresh:3; url=../pages/user.html");
    } else {
        echo "Credenziali errate. Login fallito!";
    }
    $conn->close();
}
?>