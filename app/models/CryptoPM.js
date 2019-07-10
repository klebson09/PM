const crypto = require('crypto');
const alg = 'aes-256-ctr';
const pwd = '123';

function cryptoPM(){
}

cryptoPM.prototype.crypt = function(text){
	var cipher = crypto.createCipher(alg, pwd);
	var crypted = cipher.update(text, 'utf8', 'hex');
	return crypted;
}

cryptoPM.prototype.decrypt = function(text){
	var decipher = crypto.createDecipher(alg, pwd);
	var plain = decipher.update(text, 'hex', 'utf8');
	return plain;
}

cryptoPM.prototype.cryptIv = function(text){
	var iv = crypto.randomBytes(16);
	var ivKey = crypto.randomBytes(256);
	var cypherIv = crypto.createCipheriv(alg, ivKey, iv);
	var plain = cypherIv.update(text);
	return plain;
}

module.exports = function(){
  return cryptoPM;
}