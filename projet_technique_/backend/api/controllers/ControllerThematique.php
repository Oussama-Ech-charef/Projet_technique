<?php


require_once __DIR__ . "/../../class/gestionCategoriy.php";

class ControllerCategory {
    public function listAll(){

        try {
            $gestionCateroy = new gestionCategoriy();
            $categorys = $gestionCateroy->getAll();

            $result = [];

            foreach ($categorys as $category) {
                $result[] = [
                    "id" => $category->getId(),
                    "nom" => $category->getNom(),
                    "desc" => $category->getDesc()
                ];
            }

            header("Content-Type: application/json");
            echo json_encode($result);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de la recuperation des categorys"]);
        }

    }

    public function creatCategory () {


        try {
            header("Content-Type: application/json");

            $jsondata = file_get_contents("php://input");
            $data = json_decode($jsondata, true);

            $category = new Categoriy($data["nom"], $data["desc"], 0);            $gestionCategory = new gestionCategoriy();
            $gestionCategory->Create($category);
            echo json_encode(["message" => "Category ajoutée avec succès"]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }


}

$controller = new ControllerCategory();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $controller->creatCategory();
} else {
    $controller->listAll();
}
