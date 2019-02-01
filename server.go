package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Started go server")
	fs := http.FileServer(http.Dir("."))
	http.Handle("/", fs)

	http.ListenAndServe(":8013", nil)
}
