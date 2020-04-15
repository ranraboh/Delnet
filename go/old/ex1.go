// ran raboh 205707359
// Execise 1.4: Modify dup2 to print the names of all files in which each duplicated line occures
package main

import (
	"bufio"
	"fmt"
	"os"
)

/* ProcessFileContent go through each line in given file, for each string the method
increase its frequency and insert file name into the list of files it appeared  */
func ProcessFileContent(filesAppeared map[string][]string, occurencesCounter map[string]int, file *os.File) {
	input := bufio.NewScanner(file)
	fileName := file.Name()
	/* iterate over file content lines */
	for input.Scan() {
		/* for each string\line increase its number of occurences
		and append name of the file to the files set where the string appeared */
		str := input.Text()
		occurencesCounter[str]++

		/* check whether the current string already appeared in this file and
		therefore have registered in the string files list  */
		_, found := SliceLookup(filesAppeared[str], fileName)
		if !found {
			filesAppeared[str] = append(filesAppeared[str], fileName)
		}
	}
}

/* SliceLookup takes a slice and looks for an element in it. If found it will
return it's key, otherwise it will return -1 and a bool of false. */
func SliceLookup(slice []string, val string) (int, bool) {
	for i, item := range slice {
		if item == val {
			return i, true
		}
	}
	return -1, false
}

func main() {
	/* data structures mapping between each string to the number of occurences in the given files
	and list of files it appeared  */
	filesAppeared := make(map[string][]string)
	occurencesCounter := make(map[string]int)

	/* handle files given as arguments */
	files := os.Args[1:]
	if len(files) == 0 {
		ProcessFileContent(filesAppeared, occurencesCounter, os.Stdin)
	} else {
		for _, arg := range files {
			/* open current file and handle errors */
			file, err := os.Open(arg)
			if err != nil {
				fmt.Fprintf(os.Stderr, "dup2: %v", err)
				continue
			}

			/* go through each line in given file, for each string the method
			increase its frequency and insert file name into the list of files it appeared */
			ProcessFileContent(filesAppeared, occurencesCounter, file)
			file.Close()
		}

		/* for each string with frequency greater then one,
		print out the number of occurances and the name of files it appeared */
		for key, occurances := range occurencesCounter {
			if occurances > 1 {
				files_list := filesAppeared[key]
				fmt.Printf("%d %s %v\n", occurances, key, files_list)
			}
		}
	}
}

/* commandline: ./ex2 file1.text file2.text
file1.txt
aaaaa
aaaaa
aaaaa
bbb
ccc
bbb
ee

file2.txt
dddd
aaa
dddd
bbb
ccc
ff

output:
2 ccc [file1.txt file2.txt]
2 dddd [file2.txt]
3 aaaaa [file1.txt]
3 bbb [file1.txt file2.txt]
*/
