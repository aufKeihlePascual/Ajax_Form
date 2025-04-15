<?php
    class Database {
        private $host = "localhost";
        private $username = "root";
        private $password = "";
        private $dbname = "philippines_database";
        private $charset = "utf8mb4";

        public function connect() {
            try {
                $conn= new PDO(
                    'mysql:host=' . $this->host . ';dbname=' . $this->dbname . ';charset=' . $this->charset,
                    $this->username,
                    $this->password
                );
                
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // echo "Connection successful";
                return $conn;

            } catch (PDOException $e) {
                echo "Connection failed: " . $e->getMessage();
            }
        }

    }