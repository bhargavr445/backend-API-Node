brew services start mongodb-community@7.0
mongosh
showdbs

# import json file into mongoDB
in terminal navigate to the path where we have json files
mongoimport persons.json -d [data-base-name] -c [collection-name] --jsonArray




