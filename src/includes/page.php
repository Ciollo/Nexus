<?php
include '../includes/connect.php';
session_start();    

if (
    !isset($_POST['title']) || 
    !isset($_POST['description'])
) {
    echo "go out";
} else {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $creation_date = date("Y-m-d");
    $last_modification = date("Y-m-d H:i:s"); 
    $userEmail = $_SESSION['email'];
    $image_path = "../assets/images/pagePhoto/nexus_logo.png";

    $query =  "SELECT `ID` FROM `users` WHERE `Email` = '$userEmail' LIMIT 1";
    $result = $conn->query($query);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $userID = $row['ID']; 
        
        $_SESSION['user_id'] = $userID;
        $_SESSION['username'] = $row['Username'];
        $_SESSION['logged'] = true;
        $_SESSION['email'] = $email;
        $insert_query = "INSERT INTO Pages (Title, Description, Creation_date, Last_modification, Image_path, ID_user) 
                         VALUES ('$title', '$description', '$creation_date', '$last_modification', '$image_path', '$userID')";
        
        if ($conn->query($insert_query) === TRUE) {
            $_SESSION['image_path'] = $image_path;
            $_SESSION['pageTitle'] = $title;
            header("Location: ../pages/main.php");
        } else {
			echo "<script>alert('Errore durante l'inserimento nel database!'); window.location.href = '../pages/insertPageName.html';</script>";
            
        }
    } else {
		echo "<script>alert('Utente non trovato!'); window.location.href = '../pages/insertPageName.html';</script>";
    }
    
    $conn->close();
}
?>