<?php
require 'connect.php';
$data = json_decode(file_get_contents('php://input'), true);

$n = 0;
foreach ($data as $item) {
    $type = $item['type'];
    $text = $item['text'];

    $idType;
    switch($type) {
    case 'todo':
        $idType = 1;
        break;
    }

    $query = "INSERT INTO `blocks` (`ID_type_of_block`, `Content`, `position_within_the_page`) VALUES ('$idType', '$text', '$n')";  

    $res = $conn->query($query);

    // Bind the parameters to the SQL statement
    // $stmt->bind_param('is', $idType, $text);

    $n++;
}

// Close the statement and the connection
$conn->close();
?>