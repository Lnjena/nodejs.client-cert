clientid="$1";
openssl genrsa -des3 -out "$clientid".key 4096
openssl req -new -key "$clientid".key -out "$clientid".csr
openssl x509 -req -days 365 -in $clientid.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out $clientid.crt
openssl pkcs12 -export -clcerts -in $clientid.crt -inkey $clientid.key -out $clientid.p12

