
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"
)

var db *pgxpool.Pool

func main() {

	databaseURL := "postgres://postgres:Rakshika%401125@localhost:5432/quickbasket"

	var err error

	db, err = pgxpool.New(context.Background(), databaseURL)
	if err != nil {
		log.Fatal("❌ Could not create database connection:", err)
	}

	err = db.Ping(context.Background())
	if err != nil {
		log.Fatal("❌ Could not connect to PostgreSQL:", err)
	}

	fmt.Println("✅ Connected to PostgreSQL successfully!")

	http.HandleFunc("/api/health", healthHandler)
	http.HandleFunc("/api/products", productsHandler)

	fmt.Println("🚀 QuickBasket server running on http://localhost:8080")

	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func healthHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	fmt.Fprintln(w, `{
		"message": "QuickBasket API is running"
	}`)
}

type Product struct {
	ID         int     `json:"id"`
	Name       string  `json:"name"`
	Price      float64 `json:"price"`
	CategoryID int     `json:"category_id"`
}

func productsHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	rows, err := db.Query(
		context.Background(),
		"SELECT id, name, price, category_id FROM products ORDER BY id",
	)

	if err != nil {
		http.Error(w, "Failed to get products", http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	var products []Product

	for rows.Next() {

		var product Product

		err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Price,
			&product.CategoryID,
		)

		if err != nil {
			http.Error(w, "Failed to read product", http.StatusInternalServerError)
			return
		}

		products = append(products, product)
	}

	json.NewEncoder(w).Encode(products)
}