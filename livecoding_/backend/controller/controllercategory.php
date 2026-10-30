<?php
require_once __DIR__ . '/../class/gestioncategory.php';

class ControllerCategory
{
    private GestionCategory $gestion;

    public function __construct()
    {
        $this->gestion = new GestionCategory();
    }

    public function listerCategories()
    {
        $data = [];
        $categories = $this->gestion->afficherTous();
        foreach ($categories as $category) {
            $data[] = [
                'id' => $category->getId(),
                'nom' => $category->getNom(),
                'desc' => $category->getDesc()
            ];
        }
        return $data;
    }

    public function ajouteCategories() {
        $input = json_decode(file_get_contents('php://input'), true);

        $this->gestion->ajouter($input['nom'], $input['desc']);

        
    }

   
}
