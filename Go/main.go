package main

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

var Database *sql.DB

func main() {
	Database, err := sql.Open("sqlite3", "./graphQLDB.db")
	if err != nil {
		log.Println("There was a problem creating the database", err)
	}

	defer Database.Close()

	sqlBytes, err := os.ReadFile("schemas.sql")
	if err != nil {
		log.Println("There was a problem reading the schema", err)
	}
	_, err = Database.Exec(string(sqlBytes))
	if err != nil {
		log.Println("There was a problem putting the tables into the database", err)
	}

}
