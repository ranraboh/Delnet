// ran raboh 205707359
// Exercise 1.9: Modify fetch to also print the HTTP status code, found in resp.Status.
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

func main() {
	/* go through each url in arguments list */
	for _, url := range os.Args[1:] {
		/* send http get request for the current url */
		resp, err := http.Get(url)

		/* handle errors */
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
			os.Exit(1)
		}

		/* read response body into long concatenated string */
		b, err := ioutil.ReadAll(resp.Body)
		resp.Body.Close()

		/* handle any errors in reading body of http response message */
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: reading %s: %v\n", url, err)
			os.Exit(1)
		}

		/* print out response body content and response status */
		fmt.Printf("%s\n", b)
		fmt.Printf("Status: %s\n", resp.Status)

		/* we may as well print out status code
		fmt.Printf("Status code: %d\n", resp.StatusCode) */
	}
}

/* remark: i have modified the original fetch to print the HTTP status code
and not the one in execise 1.7
the instructor posted a note in google classroom indicating both options are okay
*/
