<?php
require 'connect.php';
session_start();

if (!isset($_SESSION['email'])) {
    echo json_encode(["error" => "User not logged in"]);
    exit();
}

$email = $_SESSION['email'];

$sql = "SELECT Email, Username, Account_creation_date FROM users WHERE Email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $user["Password"] = $_SESSION['password']; // Aggiungi la password dalla sessione
    echo json_encode($user);
} else {
    echo json_encode(["error" => "User not found"]);
}

$conn->close();
?>
