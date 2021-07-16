package functions

import (
	"back-cadastro/connection"
	"back-cadastro/models"
)

func InsertUpdateClient(id int64, client models.Clients) error {
	var err error
	if id != 0 {
		err = connection.DB.Debug().Where("id", id).Updates(&client).Error
	} else {
		err = connection.DB.Debug().Create(&client).Error
	}

	if err != nil {
		panic(err)
	}
	return err
}

func ListClientsPagination(page, pageSize int64) ([]models.Clients, int64, error) {
	c := []models.Clients{}
	var count int64

	err := connection.DB.Scopes(Pagination(page, pageSize)).Find(&c).Error
	connection.DB.Model(models.Clients{}).Count(&count)

	if err != nil {
		return nil, 0, err
	}

	return c, count, nil
}
