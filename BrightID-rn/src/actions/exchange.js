// @flow

import nacl from 'tweetnacl';
import { strToUint8Array } from '../utils/encoding';

import { setPublicKey2 } from './index';

export const GENERATE_MESSAGE = 'GENERATE_MESSAGE';

export const generateMessage = (pk2: Object) => (
  dispatch: Function,
  getState: Function,
) => {
  // set publickey from nearby connection
  const publicKey2 = new Uint8Array(Object.values(pk2));

  dispatch(setPublicKey2(publicKey2));
  // generate timestamp
  const timestamp = Date.now();
  // obtain local public / secret keys
  const { publicKey, secretKey } = getState().main;
  // message (publicKey1 + publicKey2 + timestamp) signed by the private key of the user represented by publicKey1
  const message = strToUint8Array(
    publicKey.toString() + publicKey2.toString() + timestamp,
  );

  // testing signed message
  const genKeys = nacl.sign.keyPair();
  // console.warn(publicKey.toString());
  console.warn(Buffer.from(message).toString());
  const sig1 = nacl.sign.detached(message, secretKey);
  const sig2 = nacl.sign.detached(message, genKeys.secretKey);
  // console.warn(publicKey instanceof Uint8Array);
  console.warn(nacl.sign.detached.verify(message, sig1, publicKey));
  console.warn(nacl.sign.detached.verify(message, sig2, genKeys.publicKey));

  // console.warn(signedMessage);
};
