<?php
require 'connect.php';

session_start();
// Get the JSON data from the POST data
$jsonData = json_decode(file_get_contents('php://input'), true);

// Get the image path from the JSON data
$imagePath = $jsonData['src'];

// Remove the initial part of the image path
$imagePath = substr($imagePath, strpos($imagePath, "/images/pagephoto/"));
print_r($imagePath);

// Assume the user email is stored in a session variable
$id_page = $_SESSION['id_page'];

// Query to get the page ID
//$result = $conn->query("SELECT `ID` FROM `users` WHERE `Email` = '$userEmail' LIMIT 1");
//$result = $conn->query("SELECT `ID` FROM `users` WHERE `Email` = '$userEmail' LIMIT 1");

// Fetch the result
//$row = $result->fetch_assoc();
//$userId = $row['ID'];

// Query to update the profile picture
$conn->query("UPDATE `pages` SET `Image_path` = '$imagePath' WHERE `ID` = $id_page");
$_SESSION['image_path'] = $imagePath;
// Close the connection
$conn->close();
?>