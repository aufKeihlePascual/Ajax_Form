<?php
require_once 'config/db.php';

class Location {
    private $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getAllRegions() {
        $sql = $this->conn->query("SELECT * FROM table_region");
        return $sql->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProvinces($region_id) {
        $sql = $this->conn->prepare("SELECT * FROM table_province WHERE region_id = :region_id");
        
        $sql->execute(['region_id' => $region_id]);
        return $sql->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getMunicipalities($province_id) {
        $sql = $this->conn->prepare("SELECT * FROM table_municipality WHERE province_id = :province_id");

        $sql->execute(['province_id' => $province_id]);
        return $sql->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBarangays($municipality_id) {
        $sql = $this->conn->prepare("SELECT * FROM table_barangay WHERE municipality_id = :municipality_id");

        $sql->execute(['municipality_id' => $municipality_id]);
        return $sql->fetchAll(PDO::FETCH_ASSOC);
    }

}