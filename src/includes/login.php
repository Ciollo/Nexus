<?php
include '../includes/connect.php';

session_start();


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['emailUtente']) || !isset($_POST['passwordUtente'])) {
        echo "go out"; 
    } else {
        $email = $_POST['emailUtente'];
        $password = $_POST['passwordUtente'];

        $email = strtolower($email);
        $password = hash('sha256', $password);

        $query = "SELECT * FROM Users WHERE email = '$email' AND password = '$password'";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            $_SESSION['logged'] = true;
            $_SESSION['email'] = $email;
            echo "Login riuscito!";
            header("Location: ../pages/main.html");
        } else {
            echo "Credenziali errate. Login fallito!";
        }
        $conn->close();
    }
}
