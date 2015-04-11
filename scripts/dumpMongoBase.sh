#!/bin/bash

# See http://stackoverflow.com/questions/16816860/meteor-how-can-i-backup-my-mongo-database

echo "Make sure that meteor is launched"
now=$(date +"%y-%m-%d_%H-%M")
topdir=$(pwd)
mongodump -h 127.0.0.1 --port 3001 -d meteor

if [[ -d dump ]]; then
  dumpfile=dump-$now.tgz
  cd dump
  tar cvfz $dumpfile  meteor
  rm -rf meteor
  cd -
  echo $dumpfile was created in dump/ folder
else
  echo "Abort, cannot find dump folder !"
fi
