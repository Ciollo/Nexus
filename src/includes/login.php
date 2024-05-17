<?php
include '../includes/connect.php';

session_start();    

if (!isset($_POST['emailUtente']) || !isset($_POST['password'])) {
    echo "go out";
} else {
    $email = $_POST['emailUtente'];
    $password = $_POST['password'];

    $email = strtolower($email);
	$password = hash('sha256', $password);

    $query = "SELECT * FROM Users WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $userID = $row['ID'];

        $_SESSION['logged'] = true;
        $_SESSION['email'] = $email;

        // aggiungi la query join per prendere l'ID della pagina principale dell'utente
        $mainPageQuery = "
            SELECT pages.ID AS pageID, pages.Image_path AS imagePath 
            FROM pages 
            JOIN users ON pages.ID_user = users.ID 
            WHERE users.ID = $userID 
            ORDER BY pages.ID ASC 
            LIMIT 1";

        $mainPageResult = $conn->query($mainPageQuery);

        if ($mainPageResult->num_rows > 0) {
            $mainPageRow = $mainPageResult->fetch_assoc();
            $mainPageID = $mainPageRow['pageID'];
            $mainPageImagePath = $mainPageRow['imagePath'];

            $_SESSION['id_page'] = $mainPageID;
            $_SESSION['image_path'] = $mainPageImagePath;
        }

        header("Location: ../pages/main.php");
    } else {
        $_SESSION['logged'] = false;
        echo "<script>alert('Credenziali errate. Login fallito!'); window.location.href = '../pages/login.html';</script>";
    }
    $conn->close();
}
?>