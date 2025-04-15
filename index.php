<?php
require_once 'controllers/LocationController.php';

$controller = new LocationController();

// Safely check if 'action' exists
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'regions') {
    $controller->regions();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'provinces') {
    $controller->provinces();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'municipalities') {
    $controller->municipalities();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'barangays') {
    $controller->barangays();
} else {
    header("Location: views/form.html");
    exit();
}
