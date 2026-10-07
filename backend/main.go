package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

var db *pgxpool.Pool

// =========================
// MAIN
// =========================

func main() {

	// Get PostgreSQL connection URL
	databaseURL := os.Getenv("DATABASE_URL")

	if databaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is not set")
	}

	// Create database connection
	var err error

	db, err = pgxpool.New(context.Background(), databaseURL)

	if err != nil {
		log.Fatal("Could not create database connection:", err)
	}

	// Test database connection
	err = db.Ping(context.Background())

	if err != nil {
		log.Fatal("Could not connect to PostgreSQL:", err)
	}

	fmt.Println("Connected to PostgreSQL successfully!")

	// =========================
	// API ROUTES
	// =========================

	http.HandleFunc("/api/health", cors(healthHandler))

	http.HandleFunc("/api/products", cors(productsHandler))

	http.HandleFunc("/api/register", cors(registerHandler))

	fmt.Println("QuickBasket server running on http://localhost:8080")

	// Start server
	err = http.ListenAndServe(":8080", nil)

	if err != nil {
		log.Fatal(err)
	}
}

// =========================
// CORS
// =========================

func cors(handler http.HandlerFunc) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set(
			"Access-Control-Allow-Origin",
			"http://localhost:5173",
		)

		w.Header().Set(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS",
		)

		w.Header().Set(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization",
		)

		// Browser preflight request
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		handler(w, r)
	}
}

// =========================
// HEALTH API
// =========================

func healthHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	response := map[string]string{
		"message": "QuickBasket API is running",
	}

	json.NewEncoder(w).Encode(response)
}

// =========================
// PRODUCT MODEL
// =========================

type Product struct {
	ID         int     `json:"id"`
	Name       string  `json:"name"`
	Price      float64 `json:"price"`
	CategoryID int     `json:"category_id"`
}

// =========================
// PRODUCTS API
// =========================

func productsHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	// Only GET allowed
	if r.Method != http.MethodGet {

		http.Error(
			w,
			"Method not allowed",
			http.StatusMethodNotAllowed,
		)

		return
	}

	// Get products from PostgreSQL
	rows, err := db.Query(
		context.Background(),
		`SELECT id, name, price, category_id
		 FROM products
		 ORDER BY id`,
	)

	if err != nil {

		http.Error(
			w,
			"Failed to get products",
			http.StatusInternalServerError,
		)

		return
	}

	defer rows.Close()

	products := []Product{}

	for rows.Next() {

		var product Product

		err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Price,
			&product.CategoryID,
		)

		if err != nil {

			http.Error(
				w,
				"Failed to read product",
				http.StatusInternalServerError,
			)

			return
		}

		products = append(products, product)
	}

	// Check database error
	if err := rows.Err(); err != nil {

		http.Error(
			w,
			"Failed while reading products",
			http.StatusInternalServerError,
		)

		return
	}

	json.NewEncoder(w).Encode(products)
}

// =========================
// REGISTER MODEL
// =========================

type RegisterRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// =========================
// REGISTER API
// =========================

func registerHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	// Only POST allowed
	if r.Method != http.MethodPost {

		http.Error(
			w,
			"Method not allowed",
			http.StatusMethodNotAllowed,
		)

		return
	}

	// Read JSON request
	var request RegisterRequest

	err := json.NewDecoder(r.Body).Decode(&request)

	if err != nil {

		http.Error(
			w,
			"Invalid request",
			http.StatusBadRequest,
		)

		return
	}

	// Validate input
	if request.Name == "" ||
		request.Email == "" ||
		request.Password == "" {

		http.Error(
			w,
			"Name, email and password are required",
			http.StatusBadRequest,
		)

		return
	}

	// =========================
	// HASH PASSWORD
	// =========================

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(request.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {

		http.Error(
			w,
			"Failed to secure password",
			http.StatusInternalServerError,
		)

		return
	}

	// =========================
	// INSERT USER
	// =========================

	_, err = db.Exec(
		context.Background(),
		`INSERT INTO users
			(name, email, password_hash)
		 VALUES
			($1, $2, $3)`,
		request.Name,
		request.Email,
		string(hashedPassword),
	)

	if err != nil {

		http.Error(
			w,
			"Email already exists or database error",
			http.StatusConflict,
		)

		return
	}

	// =========================
	// SUCCESS RESPONSE
	// =========================

	response := map[string]string{
		"message": "Registration successful",
	}

	json.NewEncoder(w).Encode(response)
}