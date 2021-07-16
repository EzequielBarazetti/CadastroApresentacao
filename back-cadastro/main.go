package main

import (
	"back-cadastro/connection"
	routers "back-cadastro/routers"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	connection.Connection()
	routers.Routers(r)
	r.Run()
}
