package main

import (
	"learn-english-golang/config"
	"learn-english-golang/database"
	"learn-english-golang/handler/user"
	"log"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func home(c echo.Context) error {
	return c.String(http.StatusOK, "")
}

func restricted(c echo.Context) error {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*user.JwtCustomClaims)
	username := claims.Username
	role := claims.Role
	return c.String(http.StatusOK, "Welcome "+username+"! role: "+role)
}

func test(c echo.Context) error {
	return c.String(http.StatusOK, "test 123 !")
}

func main() {
	loadEnv()

	// 連線到資料庫
	if err := database.ConnectDB(); err != nil {
		log.Fatal(err)
	}

	// 程式結束時，結束資料庫連線
	defer func() {
		if err := database.DisconnectDB(); err != nil {
			log.Fatal(err)
		}
	}()

	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	setupAPIHandlers(e)

	// Unauthenticated route
	e.GET("/", home)

	// Restricted group
	r := e.Group("/restricted")

	// Configure middleware with the custom claims type
	config := echojwt.Config{
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(user.JwtCustomClaims)
		},
		SigningKey: []byte(config.EnvJWTSecretKey()),
	}
	r.Use(echojwt.WithConfig(config))
	r.GET("", restricted)

	e.Logger.Fatal(e.Start(":1323"))
}

func loadEnv() {
	switch os.Getenv("LEARN_ENGLISH_ENV") {
	case "PROD":
		godotenv.Load(".env.production")
	default:
		godotenv.Load(".env.local")
	}
}

func setupAPIHandlers(e *echo.Echo) {
	// API
	api := e.Group("/api")

	// Login route
	api.POST("/login", user.Login)

	// Create user
	api.POST("/user", user.CreateUser)
}
