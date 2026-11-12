<?php
require_once __DIR__ . '/../serevices/CategoryService.php';
header('Content-Type: application/json; charset=utf-8');

$methode = $_SERVER['REQUEST_METHOD'];
$service = new CategoryService();


    if ($methode == 'GET') {
        echo json_encode($service->listerCategories());
    }
     if ($methode == 'POST') {
        echo json_encode($service->ajouteCategories());
    }
   

