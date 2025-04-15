<?php
require_once 'models/Location.php';

class LocationController {
    private $model;

    public function __construct()
    {
        $this->model = new Location();
    }

    public function regions() {
        $regions = $this->model->getAllRegions();
        echo json_encode($regions);
    }

    public function provinces() {
        $region_id = $_POST['region_id'];
        echo json_encode($this->model->getProvinces($region_id));
    }

    public function municipalities() {
        $province_id = $_POST['province_id'];
        echo json_encode($this->model->getMunicipalities($province_id));
    }
    
    public function barangays() {
        $municipality_id = $_POST['municipality_id'];
        echo json_encode($this->model->getBarangays($municipality_id));
    }
    
}