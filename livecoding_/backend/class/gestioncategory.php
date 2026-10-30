<?php
require_once __DIR__ . '/category.php';

class GestionCategory
{
    private static $dataFile = __DIR__ . '/../data/category.json';

    public function afficherTous()
    {
        $data = json_decode(file_get_contents(self::$dataFile), true);
        $categories = [];
        foreach ($data as $item) {
            $categories[] = new Category($item['id'], $item['nom'], $item['desc']);
        }
        return $categories;
    }

    public function ajouter($nom, $desc) {
        $data =  [];
        $categorys = $this->afficherTous();
        $id = count($categorys) + 1;
        $categorys[] = new Category($id,$nom,$desc);


        foreach ($categorys as $item) {
            $data[] = [
                "id" => $item->getId(),
                "nom" => $item->getNom(),
                "desc" => $item->getNom()

            ];
        }


        file_put_contents(self::$dataFile, json_encode($data, JSON_PRETTY_PRINT));
    }



    
}
