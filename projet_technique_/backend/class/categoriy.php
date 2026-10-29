

<?php


class Categoriy {

    private int $id = 0;
    private string $nom ;
    private string $desc ;
    

    public function __construct(string $nom, string $desc, int $id) {
        $this->nom = $nom;
        $this->desc = $desc;
        $this->id = $id;
    }


    public function getId() : int {
        return $this->id;
    }


    public function setId(int $id): void {
        $this->id = $id;
    }


    public function getNom() : string {
        return $this->nom;
    }



    public function getDesc() : string {
        return $this->desc;
    }

    public function __toString()
    {
        return "{$this->nom} ({$this->desc})";
    }







}
