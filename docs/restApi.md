Rest API specification

# list all resources

GET /

# fetch single resource by id

GET /id
returns 404 if not found
returns the resource if success

# create resource

POST /
Body of request should include resource to be created
returns resource if success

# update a resource

PUT /id
body contains properties to update
retuns new resource if success

# delete resource

DELETE /id
returns 404 if not found
returns the resource if success
