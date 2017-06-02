#!/usr/bin/env bash

env APP_DB_ADDR="172.17.0.2"
env APP_DB_USER="root"
env APP_DB_PASS="812KKK"
env APP_DB_DBNAME="mysql"

JRN_PROC=$(docker ps -q --filter name=jrn)

if [ -n ${JRN_PROC} ]
    then docker stop ${JRN_PROC};
    else echo "no jrn running";
fi;

docker run