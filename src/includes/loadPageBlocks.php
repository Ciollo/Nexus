<?php
session_start();
require 'connect.php';

$idPage = $_SESSION['id_page'];

$sql = "SELECT ID, ID_type_of_block, Content, position_within_the_page FROM blocks WHERE ID_pages = '$idPage'  ORDER BY position_within_the_page";
$result = $conn->query($sql);

$blocks = array();
if ($result->num_rows > 0) {
    // Salva i dati in un array
    while($row = $result->fetch_assoc()) {
        $blocks[] = $row;
    }
}

// stampami tutto l'arrai di blocks
//print_r($blocks);
// echo json_encode($blocks);
$conn->close();
?>