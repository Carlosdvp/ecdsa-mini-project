## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incorporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.


<!-- -------------------------------------- -->

# Project Goals


1. Incorporate Public Key Cryptography so transfers can only be completed with a valid signature

## Components to Update - App

* Transfer

	- add digital signature function to transfer method
		- The app has a field for the address, this should be generated using the cryptography pkg (we will do this in the script file)

		1. First we need the address
			- generate a private/public key pair with the script
			- use the keccak algorithm to generate an address from the public key
			- add these to the server file's balances obj

		2. Then on the client side we need to implement the signature, which will be checked and verified on the server side.
				- client signs the transaction with the address
				- server gets this signed tx and recovers the private key from hte public key
				- if user is the owner of the account the tx should be approved and the new balances should be updated on the server.

## Scripts to Add - Server

* create new /scripts
	- add new file: generate new random key
	- use this script to generate private/public key pairs
	- also generate a wallet Address for each

## Validation to Add - Server

* server's 'send' method needs to accomplish the following:
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