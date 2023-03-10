import { useState } from "react";
import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { utf8ToBytes } from 'ethereum-cryptography/utils';

function Transfer({ address, privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const addressBytes = utf8ToBytes(address);
    const recipientBytes = utf8ToBytes(recipient);
    const amountBytes = utf8ToBytes(sendAmount);

    const transaction = new Uint8Array(
      addressBytes.length +
      recipientBytes.length + 
      amountBytes.length
    );

    transaction.set(addressBytes);
    transaction.set(recipientBytes, addressBytes.length);
    transaction.set(amountBytes, addressBytes.length + recipientBytes.length);

    console.log(privateKey)

    const signature = secp.sign(keccak256(transaction), privateKey);

    console.log(signature)

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        // signature: toHex(signature.signature)
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
