<?php
include '../includes/connect.php';

session_start();    

if (!isset($_POST['emailUtente']) || !isset($_POST['password'])) {
    echo "go out";
} else {
    $email = $_POST['emailUtente'];
    $password = $_POST['password'];

    $email = strtolower($email);
	$password = hash('sha256', $password);

    $query = "SELECT * FROM Users WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $_SESSION['logged'] = true;
        $_SESSION['email'] = $email;
        header("refresh:3; url=../pages/main.html");
    } else {
        $_SESSION['logged'] = false;
        echo "<script>alert('Credenziali errate. Login fallito!'); window.location.href = '../pages/login.html';</script>";
    }
    $conn->close();
}
?>