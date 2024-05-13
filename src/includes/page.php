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
    $last_modification = date("Y-m-d H:i:s"); // Assume last modification is current time
    $position_within_workspace = 0; // Set position as default value for now
    
    // Perform any additional validation if needed
    
    $insert_query = "INSERT INTO Pages (Title, Description, Creation_date, Last_modification, Position_within_workspace) 
                     VALUES ('$title', '$description', '$creation_date', '$last_modification', '$position_within_workspace')";
            
    if ($conn->query($insert_query) === TRUE) {
        echo "New record created successfully";
        // Redirect or perform any other action after successful insertion
    } else {
        echo "Error: " . $insert_query . "<br>" . $conn->error;
        // Handle error condition
    }
    
    $conn->close();
}
?>
