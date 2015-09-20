#!/bin/bash 

### completely stolen from stackoverflow part goes here ###
# http://stackoverflow.com/questions/242538/unix-shell-script-find-out-which-directory-the-script-file-resides
# Absolute path to this script, e.g. /home/user/bin/foo.sh
SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")
### end of theft ###

cd $SCRIPTPATH
rm -rf .tmp
rsync -av . .tmp
cd .tmp
rm -rf .git
git init
git remote add origin git@github.com:vieiralucas/nim.git
git checkout -b gh-pages
git add . -A
git commit -m "Deploy"
git push origin gh-pages -f

