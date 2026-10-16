<?php

class categorie {

    private int $id;
    private string $nom;
    private string $desc;


    public function __construct(string $nom, string $desc)
    {
        $this->nom = $nom;
        $this->desc = $desc;
    }


    public function getId(): int {
        return $this->id;

    }
    public function getNom(): string {
        return $this->nom;

    }
    public function getDesc(): string {
        return $this->desc;

    }



    public function setId(int $id): void {
        $this->id = $id;
    }


}