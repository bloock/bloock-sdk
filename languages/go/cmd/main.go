package main

import (
	"log"

	"github.com/bloock/go-bloock"
)

func main() {
	client := bloock.NewClient("api_key")
	record, err := bloock.NewRecordFromString("hola")
	log.Println(record.GetHash())
	log.Println(err)

	receipt, err := client.SendRecords([]*bloock.Record{record})
	log.Printf("%+v", receipt)
	log.Println(err)

}
