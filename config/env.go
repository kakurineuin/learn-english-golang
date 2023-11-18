package config

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
)

func EnvJWTSecretKey() string {
	return os.Getenv("JWT_SECRET_KEY")
}

func EnvMongoDBURI() string {
	return os.Getenv("MONGODB_URI")
}
