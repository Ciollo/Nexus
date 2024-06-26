<?php
require 'connect.php';
session_start();

if (isset($_SESSION['id_page'])) {
    $page_id = $_SESSION['id_page'];

    $sql = "SELECT Title, Description, Image_path FROM pages WHERE id = $page_id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $response = array("Title" => $row['Title'], "Description" => $row['Description'], "Image_path" => $row['Image_path']);
    } else {
        $response = array("error" => "Page not found");
    }
    
    echo json_encode($response);
} else {
    echo json_encode(array("error" => "Page ID not set in session"));
}

$conn->close();
?>
