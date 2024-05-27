<?php
session_start();
require '../includes/connect.php'; 

$userId = $_SESSION['user_id']; 

$stmt = $conn->prepare("INSERT INTO pages (Title, Creation_date, Last_modification, ID_user) VALUES (?, NOW(), NOW(), ?)");
$defaultTitle = 'New Page';
$stmt->bind_param("si", $defaultTitle, $userId);
$stmt->execute();

$newPageId = $stmt->insert_id;
$newPageTitle = $defaultTitle;

$stmt->close();
$conn->close();

$_SESSION['id_page'] = $newPageId;
$_SESSION['pageTitle'] = $newPageTitle;

echo json_encode([
    'id' => $newPageId,
    'title' => $newPageTitle
]);
?>
