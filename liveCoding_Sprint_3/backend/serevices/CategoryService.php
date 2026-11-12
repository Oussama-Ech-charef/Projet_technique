<?php
require_once __DIR__ . '/../dao/CategoryDao.php';
require_once __DIR__ . '/BeseService.php';

class CategoryService extends BeseService
{
    private CategoryDao $gestion;

    public function __construct()
    {
        $this->gestion = new CategoryDao();
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


        try {
            $this->gestion->ajouter($input['nom'], $input['desc']);
            return ['seccess' => true,];
        } catch (Exception $e) {
            return ['seccess' => true, 'message' => $e->getMessage()];

        }

        
    }

   
}
