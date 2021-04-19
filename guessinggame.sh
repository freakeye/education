#!/usr/bin/env bash

declare -i RIGHT_NUMBER=$(ls -1 | wc -l)
echo 'How many files are in the current directory?'
declare -i delta=-1								# to start the main loop

function get_hint() {
	if [[ $1 -gt 0 ]]; then
		echo 'Your guess was too HIGH' >&2
	elif [[ $1 -lt 0 ]]; then
		echo 'Your guess was too LOW' >&2
	else
		echo 'Congratulations on guessing!' >&2
	fi
}

function is_a_number() {
	local re='^[0-9]+$'
	[[ $1 =~ $re ]] && echo 0 || echo 1
}

# main
until [[ "$delta" -eq 0 ]]
do
	read -p 'Enter your guess: ' -r
	cur_guess=$REPLY

	if [[ $(is_a_number $cur_guess) -eq 0 ]]; then
		let "delta= $cur_guess - $RIGHT_NUMBER"
		get_hint $delta
	else
		echo 'Try to enter an integer positive number' >&2
	fi
done
