<?php
require 'connect.php';

session_start();
$jsonData = json_decode(file_get_contents('php://input'), true);

$imagePath = $jsonData['src'];

$imagePath = substr($imagePath, strpos($imagePath, "/images/pagephoto/"));
print_r($imagePath);

$id_page = $_SESSION['id_page'];

$conn->query("UPDATE `pages` SET `Image_path` = '$imagePath', Last_modification=NOW() WHERE `ID` = $id_page");
$_SESSION['image_path'] = $imagePath;
$conn->close();
?>