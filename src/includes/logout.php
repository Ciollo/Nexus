<?php
session_start();	

if (isset($_SESSION['logged']) && $_SESSION['logged'] === true) {
    session_unset();		
    session_destroy();	

	echo "<script>alert('Logout fatto!'); window.location.href = '../pages/home.html';</script>";
    exit();		
} else {
    header("Location: ../pages/home.html");
    exit();		
}
?>