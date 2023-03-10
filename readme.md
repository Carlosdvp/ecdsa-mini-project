## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

Link to the initial project and the starter Readme: https://github.com/alchemyplatform/ecdsa-node

********************************************************************

# Project Goals

1. Incorporate Public Key Cryptography so transfers can only be completed with a valid signature

- General steps:
		1. Hash the transaction
		2. Sign the transaction
		3. POST to the server
		4. Recover the public key from the signature
		5. Public key to address
		6. Compare address to sender

## Components

### Update - App
	- add privateKey variable as a prop for the Transfer component.

### Transfer method - Add Digital Signature

	- add digital signature function to transfer method
		- The app has a field for the address, this should be generated using the cryptography pkg (we will do this in the script file)

		1. First we need the address
			- generate a private/public key pair with the script
			- use the keccak algorithm to generate an address from the public key 
			- add these to the server file's balances obj
			- receive the address as a prop

		2. Then on the client side we need to implement the signature, which will be checked and verified on the server side.
				- client signs the transaction with the address
				- server gets this signed tx and recovers the public key from the signature
				- obtain the address for that public key
				- compare this address with the sender, if they match approve transaction, if they do not then reject with an error message.
				- if approved the tx should go through and the new balances should be updated.

## Server - Add script to generate Keys

- create new /scripts folder
    - add new file: generate new random key
    - use this script to generate private/public key pairs
    - also generate a wallet Address for each

## Server - Add Validation

- server's 'send' method needs to accomplish the following:
    1. get a signature from the client side app
    2. recover the public address from the signature, this will be the 'sender'
    3. confirm that the sender matches the public key derived from the signature, if it is approve the transfer and update balances as usual
    4. if not, then reject the transfer request.


## Libraries to use

- https://github.com/ethereum/js-ethereum-cryptography

	1. Add npm pkg
		- npm install ethereum-cryptography

## Additional Resources

* Public Key Exercises in the Digital Signatures lesson 
	(Recover Keys, Sign Message, Hash Messages)