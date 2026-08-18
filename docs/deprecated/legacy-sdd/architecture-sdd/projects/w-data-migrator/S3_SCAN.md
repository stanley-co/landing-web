# S3 Scan

Steps:

1. connect to S3 endpoint/bucket;
2. list `data/`, `images/`, `documents/`, `certificates/`;
3. detect JSON files and binary objects;
4. HEAD referenced media to collect size/MIME where possible;
5. record missing/broken references.

