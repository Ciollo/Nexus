<?php
include '../includes/connect.php';

session_start();    

if (!isset($_POST['emailUtente']) || !isset($_POST['password'])) {
    echo "go out";
} else {
    $email = $_POST['emailUtente'];
    $password = $_POST['password'];
    $originalPassword = $password;
    $email = strtolower($email);
	$password = hash('sha256', $password);

    $query = "SELECT * FROM Users WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $userID = $row['ID'];

        $_SESSION['user_id'] = $userID;
        $_SESSION['username'] = $row['Username'];
        $_SESSION['logged'] = true;
        $_SESSION['email'] = $email;
        $_SESSION['password'] = $originalPassword;

        // aggiungi la query join per prendere l'ID della pagina principale dell'utente
        $mainPageQuery = "
            SELECT pages.ID AS pageID, pages.Image_path AS imagePath, pages.Title AS title
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
            $pageTitle = $mainPageRow['title'];

            $_SESSION['id_page'] = $mainPageID;
            $_SESSION['image_path'] = $mainPageImagePath;
            $_SESSION['pageTitle'] = $pageTitle;
        }

        header("Location: ../pages/main.php");
    } else {
        $_SESSION['logged'] = false;
        echo "<script>alert('Credenziali errate. Login fallito!'); window.location.href = '../pages/login.html';</script>";
    }
    $conn->close();
}
?>