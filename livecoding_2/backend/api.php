<?php

header("Conetent-Type: application/json");

require_once 'categorie.php';


class gestioncat {

    private $path_file;


    public function __construct()
    {
        $this->path_file = 'data/categories.json';
    }


    public function getcat() {
        $content = file_get_contents($this->path_file);
        $category = json_decode($content, true);
        echo json_encode($category);
    }


    public function ajoutcat(){
        $content = file_get_contents($this->path_file);
        $category = json_decode($content, true);
        $data = json_decode(file_get_contents("php://input"), true);
        $nom = $data["nom"] ?? "";
        $desc = $data["desc"] ?? "";


        $novel = new categorie($nom, $desc);
        $novel->setId(count($category) + 1);

       $category [] = [
           "id" =>  $novel->getId(),
           "nom" =>  $novel->getNom(),
           "desc" =>  $novel->getDesc()
       ];

       file_put_contents(
        $this->path_file,
        json_encode($category, JSON_PRETTY_PRINT)
       );

       echo json_encode($category);



    }



}

$category = new gestioncat();
$methode = $_SERVER["REQUEST_METHOD"];

if ($methode === "GET") {
    $category->getcat();
} elseif ($methode === "POST") {
    $category->ajoutcat();
}