<?php
include '../includes/connect.php';

session_start();    

if (
    !isset($_POST['username']) || 
    !isset($_POST['password']) || 
    !isset($_POST['confirmPassword']) || 
    !isset($_POST['email'])
) {
    echo "go out";
} else {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];
    $email = $_POST['email'];
    $account_creation_date = date("Y-m-d");

    if ($password !== $confirmPassword) {
        $_SESSION['logged'] = false;
        echo "<script>alert('Le password non corrispondono!'); window.location.href = '../pages/register.html';</script>";
    } else {
        $password = hash('sha256', $password);
        $email = strtolower($email);
        // check if username is already in
        $check_query = "SELECT * FROM users WHERE email = '$email' OR username = '$username'";
        $result = $conn->query($check_query);

        if ($result->num_rows > 0) {
            $_SESSION['logged'] = false;
            echo "<script>alert('Utente già registrato!'); window.location.href = '../pages/register.html';</script>";
        } else {
            $insert_query = "INSERT INTO Users (Email, Password, Username, Account_creation_date) 
            VALUES ('$email', '$password', '$username', '$account_creation_date')";
            
            if ($conn->query($insert_query) === TRUE) {
                $_SESSION['logged'] = true;
                $_SESSION['email'] = $email;
                header("refresh:3; url=../pages/main.html");
            } else {
                $_SESSION['logged'] = false;
                echo "<script>alert('Errore durante l'inserimento nel database!'); window.location.href = '../pages/register.html';</script>";
            }
        }
        $conn->close();
    }
}
?>