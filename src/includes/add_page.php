<?php
session_start();
require '../includes/connect.php'; // Assicurati che $conn sia la tua connessione al database

$userId = $_SESSION['user_id']; // Assicurati che l'ID utente sia salvato nella sessione

// Inserisci una nuova pagina nel database
$stmt = $conn->prepare("INSERT INTO pages (Title, Creation_date, Last_modification, ID_user) VALUES (?, NOW(), NOW(), ?)");
$defaultTitle = 'New Page';
$stmt->bind_param("si", $defaultTitle, $userId);
$stmt->execute();

// Ottieni l'ID della nuova pagina appena inserita
$newPageId = $stmt->insert_id;
$newPageTitle = $defaultTitle;

$stmt->close();
$conn->close();

// Aggiorna la sessione
$_SESSION['id_page'] = $newPageId;
$_SESSION['pageTitle'] = $newPageTitle;

// Restituisci i dati della nuova pagina come JSON
echo json_encode([
    'id' => $newPageId,
    'title' => $newPageTitle
]);
?>
