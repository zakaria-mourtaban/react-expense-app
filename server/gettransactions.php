<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$host = "localhost";
$dbuser = "root";
$pass = "";
$dbname = "expensedb";

$connection = new mysqli($host, $dbuser, $pass, $dbname);
if ($connection->connect_error) {
	die(json_encode(['error' => 'Database connection failed']));
}

$users_id = $_POST["id"] ?? null;


$query = $connection->prepare("SELECT * FROM `transactions` WHERE users_id = 1");
$query->execute();

$result = $query->get_result();
$transactions = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($transactions ? $transactions : ['error' => 'No transactions found']);


$connection->close();
?>