<?php
include 'connect.php';

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
        echo "Le password non corrispondono";
    } else {
        $password = hash('sha256', $password);
        $email = strtolower($email);
        // check if username is already in
        $check_query = "SELECT * FROM users WHERE email = '$email' OR username = '$username'";
        $result = $conn->query($check_query);

        if ($result->num_rows > 0) {
            echo "Questo utente esiste già nel database.";
        } else {
            $insert_query = "INSERT INTO Users (Email, Password, Username, Account_creation_date) 
            VALUES ('$email', '$password', '$username', '$account_creation_date')";
            
            if ($conn->query($insert_query) === TRUE) {
                $_SESSION['logged'] = true;
                $_SESSION['email'] = $email;
                echo "Utente registrato con successo nel database.";
            header("Location: ../pages/main.html");
            } else {
                echo "Errore durante l'inserimento dell'utente nel database: " . $conn->error;
            }
        }
        $conn->close();
    }
}
?>