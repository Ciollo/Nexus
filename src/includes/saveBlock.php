<?php
session_start();
require 'connect.php';

function deleteBlocks($conn, $id_page) {
    $deleteStmt = $conn->prepare("DELETE FROM `blocks` WHERE `ID_pages` = ?");
    $deleteStmt->bind_param("i", $id_page);
    $deleteStmt->execute();
    $deleteStmt->close();
}

function insertBlocks($conn, $data, $id_page) {
    $stmt = $conn->prepare("INSERT INTO `blocks` (`ID_type_of_block`, `Content`, `ID_pages`, `position_within_the_page`) VALUES (?, ?, ?, ?)");
    $position = 0; // Initialize position counter

    foreach ($data as $item) {
        $type = $item['type'];
        $text = $item['text'];

        $idType = null;
        switch($type) {
        case 'todo':
            $idType = TYPE_TODO;
            break;
        case 'sectionTitle':
            $idType = TYPE_TITLE;
            break;
        case 'subTitle':
            $idType = TYPE_SUB_TITLE;
            break;
        case 'paragraph':
            $idType = TYPE_PARGRAPH;
            break;
        default:
            echo "Invalid type: $type";
            break;
        }

        $stmt->bind_param("isii", $idType, $text, $id_page, $position);
        $stmt->execute();

        $position++; // Increment position counter
    }

    $stmt->close();
}

const TYPE_TODO = 1;
const TYPE_TITLE = 2;
const TYPE_PARGRAPH = 3;
const TYPE_SUB_TITLE = 4;

$data = json_decode(file_get_contents('php://input'), true);
$id_page = $_SESSION['id_page']; // Get id_page from session

deleteBlocks($conn, $id_page);
insertBlocks($conn, $data, $id_page);

$conn->close();
?>