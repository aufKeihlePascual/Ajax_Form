<?php
require_once 'models/Location.php';
require_once 'controllers/LocationController.php';

$model = new Location();
$data = $model->getAllRegions();

$controller = new LocationController;
$controllerData = $controller->municipalities(3);

echo "<pre>";
print_r($data);
echo "</pre>";
?>
