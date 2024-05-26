<?php
// Allow all origins
header("Access-Control-Allow-Origin: *");

// Allow all methods
header("Access-Control-Allow-Methods: *");

// Allow all headers
header("Access-Control-Allow-Headers: *");

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "aya123";
$database = "blogs";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process registration logic here

    // For demonstration purposes, let's simply return a success message
    $response = array('message' => 'Registration successful');
    echo json_encode($response);
} else {
    // If the request method is not POST, return an error message
    http_response_code(405); // Method Not Allowed
    $error_response = array('error' => 'Method not allowed');
    echo json_encode($error_response);
}

// Close the connection
$conn->close();
?>
