<?php
class Category
{
    private int $id;
    private string $nom;
    private string $desc;

    public function __construct(int $id, string $nom, string $desc)
    {
        $this->id = $id;
        $this->nom = $nom;
        $this->desc = $desc;
    }

    public function getId(): int
    {
        return $this->id;
    }
    public function getNom(): string
    {
        return $this->nom;
    }
    public function getDesc(): string
    {
        return $this->desc;
    }
}
