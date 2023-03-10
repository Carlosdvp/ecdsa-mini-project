const express = require("express");
const cors = require("cors");
const secp = require("ethereum-cryptography/secp256k1");
const keccak256 = require("ethereum-cryptography/keccak");
const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "1e7889438c60b52a97131013e78989c5bf3a71f7": 100,
  "06271ed67bcc6c67ce90b4b046f9540cb6d63c1e": 50,
  "c17aed06d38639c1047d8c91794f6f0495716ce0": 75,
};

async function recoverKey(message, signature, recoveryBit) {
  let publicKey = secp.recoverPublicKey(hashedTransaction, signature, recoveryBit);

  return publicKey;
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO:
  // get the signature
  // recover the public address from the signature
  // that will be the sender
  
  const { sender, recipient, amount, signature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const transaction = {sender, recipient, amount};
  const hashedTransaction = keccak256(Buffer.from(JSON.stringify(transaction)));
  const recoveryBit = parseInt(signature.slice(130), 16);

  const sigRecovery = {
    receiver: signature.slice(0, 66),
    sender: signature.slice(66, 130)
  }

  let publicKey = recoverKey(hashedTransaction, sigRecovery, recoveryBit);
  let address = keccak256(publicKey.slice(1)).slice(-20);

  if (address !== sender) {
    res.status(400).send({ message: "Invalid Signature!"});
  } else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
