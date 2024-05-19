<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpassword = "";
$dbname = "Nexus";
$dbport = 3306;

$conn = new mysqli($dbhost, $dbuser, $dbpassword, $dbname, $dbport);

if ($conn->error) {
	echo "errore durante la connessione al db!";
} else {
	// echo "connesso al db!".'<br/>';
}
?>