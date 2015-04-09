<?php
class database {
    private $connection;
    private $host;
    private $password;
    private $username;
    private $database;
    public $error;
    
    public function __construct($host, $password, $username, $database) {
        $this->host = $host;
        $this->database = $database;
        $this->password = $password;
        $this->username = $username;        
        
        $this->connection = new mysqli($host, $username, $password);

    if($this->connection->connect_error) {
        die("<p>Error: " . $this->connection->connect_error . "</p>");
    }
    
    $exists = $this->connection->select_db($database);
    
    if("!$exists") {
        $query = $this->connection->query("CREATE DATABASE $database");
        
        if($query) {
            echo "successfully created database: " . $database;
        } 
    } else {
        echo "Database has already been created";
     }
    }
    
    public function openConnection() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
                
        if($this->connection->connect_error) {
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }
    }
    
    public function closeConnection() {
        if(isset($this->connection)) {
            $this->connection->close();
        }
    }
    
    public function query($string) {
        $this->openConnection();
        
        $query = $this->connection->query($string);
        
        if(!$query) {
            $this->error = $this->connection->error;
        }
        
        $this->closeConnection();
        
        return $query;
    }
}