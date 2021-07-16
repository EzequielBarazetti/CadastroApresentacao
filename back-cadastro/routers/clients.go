package routers

import (
	function "back-cadastro/functions"
	"back-cadastro/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ClientsRoutes(r *gin.Engine) {
	rout := r.Group("/clients", cors())
	{
		rout.GET("/listCadClient", listClientsPagination)
		rout.POST("/:id", insertUpdateClientRoute)
	}
}

func insertUpdateClientRoute(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	clients := models.Clients{}
	c.ShouldBindJSON(&clients)

	err := function.InsertUpdateClient(id, clients)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
	}

	c.JSON(http.StatusOK, gin.H{"sucess": true})
}

func listClientsPagination(c *gin.Context) {
	page, _ := strconv.ParseInt(c.Query("page"), 10, 64)
	page_size, _ := strconv.ParseInt(c.Query("page_size"), 10, 64)

	p, count, err := function.ListClientsPagination(page, page_size)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	respondPagination(c, page_size, page, count, p)
}
