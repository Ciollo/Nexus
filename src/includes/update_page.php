<?php
session_start();

if (isset($_POST['pageId'])) {
    $pageId = $_POST['pageId'];
    $pageTitle = $_POST['pageTitle'];

    $_SESSION['id_page'] = $pageId;
    $_SESSION['pageTitle'] = $pageTitle;

    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Page ID not set']);
}
?>
