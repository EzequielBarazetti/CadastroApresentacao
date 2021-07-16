package models

type Clients struct {
	ID       int64  `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	Nome     string `gorm:"column:nome;type:varchar(100);not null" json:"nome"`
	Sexo     string `gorm:"column:sexo" json:"sexo"`
	Cpf      string `gorm:"column:cpf;type:varchar(100);not null" json:"cpf"`
	Endereco string `gorm:"column:endereco;type:varchar(100);not null" json:"endereco"`
	Cidade   string `gorm:"column:cidade;type:varchar(100)" json:"cidade"`
}

func (Clients) TableName() string {
	return "clients"
}
