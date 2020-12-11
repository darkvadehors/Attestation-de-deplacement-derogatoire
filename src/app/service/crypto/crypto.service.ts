import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  secretKey = environment.privateKey;
  constructor() { }

  encrypt(textToEncrypt : string) : string{
    return CryptoJS.AES.encrypt(textToEncrypt, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string) : string{
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
