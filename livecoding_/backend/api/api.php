<?php
require_once __DIR__ . '/../controller/controllercategory.php';
header('Content-Type: application/json; charset=utf-8');

$methode = $_SERVER['REQUEST_METHOD'];
$controller = new ControllerCategory();


    if ($methode == 'GET') {
        echo json_encode($controller->listerCategories());
    }
     if ($methode == 'POST') {
        echo json_encode($controller->ajouteCategories());
    }
   

