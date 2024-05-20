<?php
require 'connect.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);

    $newTitle = $requestData['title'];
    $newDescription = $requestData['description'];
    $pageID = $_SESSION['id_page']; 

    $checkQuery = "SELECT Title, Description FROM Pages WHERE ID='$pageID'";
    $result = $conn->query($checkQuery);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $currentTitle = $row['Title'];
        $currentDescription = $row['Description'];

        if ($newTitle === $currentTitle && $newDescription === $currentDescription) {
            echo json_encode(['success' => false, 'message' => 'No changes detected']);
            exit; 
        }
        $updateQuery = "UPDATE Pages SET Title='$newTitle', Description='$newDescription', Last_modification=NOW() WHERE ID='$pageID'";
        $result = $conn->query($updateQuery);

        if ($result === TRUE) {
            $_SESSION['pageTitle'] = $newTitle; 
            echo json_encode(['success' => true, 'message' => 'Page updated successfully']);
            header("Refresh:0");
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update page']);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}