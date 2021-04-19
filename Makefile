all: README.md

README.md: guessinggame.sh
	echo "# MOOC: [The Unix Workbench](https://www.coursera.org/learn/unix) #" > README.md
	echo "- Peer-graded Assignment: Bash, Make, Git, and GitHub" >> README.md
	echo -n "- " >> README.md
	date >> README.md
	echo -n '- The number of lines of code contained in guessinggame.sh: ' >> README.md
	wc -l guessinggame.sh | cut -f1 -d" " >> README.md
	
clean:
	rm README.md