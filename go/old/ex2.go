// ran raboh 205707359
// Exercise 1.7: The function call io.Copy(dst, src) reads from src and writes to dst. Use it
// in fetch instead of ioutil.ReadAll to copy the response body to os.Stdout without requiring a
// buffer large enough to hold the entire stream. Be sure to check the error result of io.Copy.

package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

/* send http request for the given url and print out response body into standard output */
func ProcessUrlRequest(url string) {
	/* send http get request for resource identified by url */
	resp, err := http.Get(url)

	/* handle errors */
	if err != nil {
		fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
		os.Exit(1)
	}

	/* copy the response body to os.Stdout without requiring a buffer to hold the entire stream. */
	_, err = io.Copy(os.Stdout, resp.Body)
	fmt.Println()
	resp.Body.Close()

	/* check error result of io.Copy and handle error */
	if err != nil {
		fmt.Fprintf(os.Stderr, "fetch: reading %s: %v\n", url, err)
		os.Exit(1)
	}
}

func main() {
	/* go through each url in arguemnts list */
	for _, url := range os.Args[1:] {
		/* process url request: send http request for the current url and
		print out response body into standard output */
		ProcessUrlRequest(url)
	}
}
