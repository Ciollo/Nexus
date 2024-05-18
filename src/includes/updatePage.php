<?php
require 'connect.php';
session_start();

// Verifica che la richiesta sia una richiesta POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ottieni i dati inviati tramite la richiesta POST
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Estrai i dati necessari dalla richiesta
    $newTitle = $requestData['title'];
    $newDescription = $requestData['description'];
    $pageID = $_SESSION['id_page']; // Assumi che $_SESSION['id_page'] contenga l'ID della pagina da aggiornare

    // Verifica se i dati sono effettivamente cambiati rispetto a quelli attualmente presenti nel database
    $checkQuery = "SELECT Title, Description FROM Pages WHERE ID='$pageID'";
    $result = $conn->query($checkQuery);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $currentTitle = $row['Title'];
        $currentDescription = $row['Description'];

        // Verifica se i nuovi dati sono diversi dai dati attualmente presenti nel database
        if ($newTitle === $currentTitle && $newDescription === $currentDescription) {
            // Se i dati non sono cambiati, invia una risposta al frontend
            echo json_encode(['success' => false, 'message' => 'No changes detected']);
            exit; // Interrompi l'esecuzione dello script
        }
    }

    // Aggiorna i dati nel database
    $updateQuery = "UPDATE Pages SET Title='$newTitle', Description='$newDescription', Last_modification=NOW() WHERE ID='$pageID'";
    $result = $conn->query($updateQuery);

    // Verifica se l'aggiornamento è stato eseguito con successo
    if ($result === TRUE) {
        // Invia una risposta di conferma al frontend
        echo json_encode(['success' => true, 'message' => 'Page updated successfully']);
    } else {
        // Invia una risposta di errore al frontend
        echo json_encode(['success' => false, 'message' => 'Failed to update page']);
    }
} else {
    // Invia una risposta di errore se la richiesta non è una richiesta POST
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>