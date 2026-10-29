<?php






require_once __DIR__ . '/categoriy.php';

class gestionCategoriy {

    private static $path_file = __DIR__ . "/../database/gesetionCategoriy.json";

   
    


    public function getAll() {
        try {
            $content = file_get_contents(self::$path_file);

            $data = json_decode($content, true);

            $categorys = [];
            foreach ($data as $item) {
                $category = new Categoriy($item["nom"], $item["desc"], $item["id"]);
                $categorys[] = $category;
            }
            return $categorys;

            

        } catch (Exception $e) {
            throw new Exception("Error Processing Request :");
            
        }
        


    }



    public function Create(Categoriy $categoriy) {

    try {
        $nom = trim($categoriy->getNom());

        if (strlen($nom) < 3) {
            throw new Exception("Le nom doit contenir au moins 3 caracteres. ");
            
        }

        $jsonData = file_get_contents(self::$path_file);
        $data = json_decode($jsonData, true);

        $id = count($data) + 1;

        $data[] = [
            "id" => $id,
            "nom" => $nom,
            "desc" => $categoriy->getDesc()
        ];

        $jsonData = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents(self::$path_file, $jsonData);

        } catch (Exception $e) {
            throw new Exception($e->getMessage());
            
            
        }

        
    }


    


}


