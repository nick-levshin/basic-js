const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(message, key, decrypt = false) {
    if (!message || !key) {
      throw Error('Incorrect arguments!');
    }

    const res = [];
    let i = 0;
    [message, key] = [message, key].map((str) => str.toUpperCase());

    for (let char of message) {
      const code = char.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        const keyCode = (key[i++ % key.length].charCodeAt(0) - 65) % 32;
        const charCode = decrypt ? code + 65 - keyCode : code - 65 + keyCode;

        char = String.fromCharCode((charCode % 26) + 65);
      }

      res.push(char);
    }

    return (this.direct ? res : res.reverse()).join('');
  }

  decrypt(message, key) {
    return this.encrypt(message, key, true);
  }
}

module.exports = {
  VigenereCipheringMachine,
};
