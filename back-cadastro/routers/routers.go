package routers

import (
	"math"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Routers(r *gin.Engine) {
	r.NoRoute(cors())
	ClientsRoutes(r)
}

func respondWithError(c *gin.Context, code int, status_code int, message interface{}) {
	c.AbortWithStatusJSON(code, gin.H{"error": message, "status_code": status_code})
}
func respondPagination(c *gin.Context, page_size, page, count int64, data interface{}) {
	var totalPage = (float64(count) / float64(page_size))
	d := gin.H{
		"page_size_actual":    page_size,
		"page_atual":          page,
		"quant_total_records": count,
		"quant_total_pages":   math.Ceil(totalPage),
		"data":                data,
	}
	c.JSON(http.StatusOK, d)
}
