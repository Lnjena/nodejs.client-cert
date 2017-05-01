# Generate Server Key (also CA) and Server Certificate
`openssl genrsa -des3 -out ca.key 4096`
`openssl req -x509 -new -key ca.key -days 365 -out ca.crt`

# Generate Client Key & Client CSR
`openssl genrsa -des3 -out client.key 4096`
`openssl req -new -key client.key -out client.csr`

# Sign Client CSR and generate Client Cert
`openssl x509 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt`

# Convert x509 Client Cert to pkcs12 format, for use in Browser
`openssl pkcs12 -export -clcerts -in client.crt -inkey client.key -out client.p12`

# Remove Password Protection from server key:
`cp ca.key ca.key.orig`
`openssl rsa -in ca.key.orig -out ca.key`
