#!/bin/bash

# Installer script to install dependencies in all sub folders
# Usage:
# ./npm_installl_all => runs only "npm install" in sub folders
# ./npm_install_all --force (-f) => same, but first removes node_modules folders

if [ "$1" = "--force" ] || [ "$1" = "-f" ]; then
	FORCE=true
fi

function _install {
	if [ $# -eq 2 ]; then
		printf "➡️   $1\n"

		cd $2

		if [ ! -z "$FORCE" ]; then
			printf "✳️   rm node_modules of $2\n"
			rm -fr node_modules
		fi

		printf "✳️   installing node_modules of $2\n"
		npm install
		cd -

		printf "\n\n"
	fi
}

_install "@backend" backend
_install "@frontend" frontend
_install "@docs/concept" docs/concept




