<?php
session_start();	

if (isset($_SESSION['logged']) && $_SESSION['logged'] === true) {
    session_unset();		
    session_destroy();	

	echo 'Logout effettuato! <br/> Verrai reindirizzato alla home...';
    header("refresh:3; url=../pages/home.html");
    exit();		
} else {
    header("Location: ../pages/home.html");
    exit();		
}
?>