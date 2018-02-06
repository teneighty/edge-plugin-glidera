import {core, config} from 'edge-libplugin'

function request() {
  throw Error('not implemented')
};

function hmacsha256(message, secret) {
  throw Error('not implemented')
};

function prepareData(request, opts, json) {
  throw Error('not implemented')
};

class Glidera {
  constructor(o) {
    o = o || {};
    if (!o.clientId) {
      throw Error('Missing clientId')
    }
    this.clientId = o.clientId;
    this.accessKey = '';
    this.secret = o.secret || '';
    this.GLIDERA_DOMAIN = o.sandbox === true
        ? 'sandbox.glidera.io'
        : 'www.glidera.io';
    this.GLIDERA_URL = 'https://' + this.GLIDERA_DOMAIN;
  }

  _nextNonce () {
    return new Date().getTime();
  }

  _request (authRequired, uri, opts) {
    opts = opts || {};
    var method = opts.method || 'GET';
    var url = this.GLIDERA_URL + '/api/v1' + uri;

    var headers = opts.headers ? opts.headers : {},
        nonce = (this._nextNonce()).toString(),
        json = opts.data ? JSON.stringify(opts.data) : '',
        req = {
          method: method,
          url: url,
          headers: headers
        };
    if (authRequired && this.accessKey) {
        headers['X-CLIENT-ID'] = this.clientId;
        headers['X-ACCESS-KEY'] = this.accessKey;
        headers['X-ACCESS-NONCE'] = nonce;
        headers['X-ACCESS-SIGNATURE'] = hmacsha256(nonce + url + json, this.secret);
    }
    if (opts.otpCode) {
      headers['2FA_CODE'] = opts.otpCode;
      delete opts.otpCode;
    }
    if (method === 'POST') {
      prepareData(req, opts, json);
      req.body = json;
      headers['Content-Type'] = 'application/json';
      headers['Accept'] = 'application/json';
    }
    return request(req, opts.callback);
  }

  registrationMode (cb) {
    this._request(false, '/user/register/mode', {
      'method': 'GET',
      'callback': function(error, statusCode, body) {
        cb(statusCode === 200, body.mode === 'OPEN');
      }
    })
  }

  bitidAuthUri () {
    return ['bitid://', this.GLIDERA_DOMAIN, '/bitid/auth?x=', new Date().getTime()].join('');
  }

  bitidAuthRedirect (next, bitid_address, bitid_uri, bitid_signature, state) {
    return [this.GLIDERA_URL, '/bitid/auth',
      '?client_id=', this.clientId,
      '&bitid_address=', encodeURIComponent(bitid_address),
      '&bitid_uri=', encodeURIComponent(bitid_uri),
      '&bitid_signature=', encodeURIComponent(bitid_signature),
      '&redirect_uri=', encodeURIComponent(next),
      '&state=', encodeURIComponent(state)].join('');
  }

  bitidTokenUri () {
    return ['https://', this.GLIDERA_DOMAIN, '/api/v1/authentication/oauth1/create?x=', new Date().getTime()].join('');
  }

  bitidAccessToken (bitid_address, bitid_uri, bitid_signature, cb) {
    var that = this;
    var headers = {
      'X-CLIENT-ID': this.clientId,
      'X-BITID-ADDRESS': bitid_address,
      'X-BITID-URI': bitid_uri,
      'X-BITID-SIGNATURE': bitid_signature
    };
    this._request(false, '/authentication/oauth1/create', {
      'method': 'POST',
      'headers': headers,
      'callback': function(error, statusCode, body) {
        if (statusCode === 200) {
          that.accessKey = body.access_key;
          that.secret = body.secret;
        }
        cb(statusCode === 200, body);
      }
    })
  }

  userSetupRedirect (next, state) {
    var nonce = new Date().getTime();
    var url = [this.GLIDERA_URL, '/user/setup',
      '?redirect_uri=', encodeURIComponent(next),
      '&state=', encodeURIComponent(state),
      '&X-CLIENT-ID=', this.clientId,
      '&X-ACCESS-KEY=', this.accessKey,
      '&X-ACCESS-NONCE=', nonce].join('');
    url += '&X-ACCESS-SIGNATURE=' + hmacsha256(url, this.secret);
    return url;
  }

  createBankAccountRedirect (next, state) {
    var nonce = new Date().getTime();
    var url = [this.GLIDERA_URL, '/user/bankaccountcreate',
      '?redirect_uri=', encodeURIComponent(next),
      '&state=', encodeURIComponent(state),
      '&X-CLIENT-ID=', this.clientId,
      '&X-ACCESS-KEY=', this.accessKey,
      '&X-ACCESS-NONCE=', nonce].join('');
    url += '&X-ACCESS-SIGNATURE=' + hmacsha256(url, this.secret);
    return url
  }

  bankAccountsRedirect (next, state) {
    var nonce = new Date().getTime();
    var url = [this.GLIDERA_URL, '/user/bankaccounts',
      '?redirect_uri=', encodeURIComponent(next),
      '&state=', encodeURIComponent(state),
      '&X-CLIENT-ID=', this.clientId,
      '&X-ACCESS-KEY=', this.accessKey,
      '&X-ACCESS-NONCE=', nonce].join('');
    url += '&X-ACCESS-SIGNATURE=' + hmacsha256(url, this.secret);
    return url;
  }

  idVerifyRedirect  (next, state) {
    var nonce = new Date().getTime();
    var url = [this.GLIDERA_URL, '/user/idverify',
      '?redirect_uri=', encodeURIComponent(next),
      '&state=', encodeURIComponent(state),
      '&X-CLIENT-ID=', this.clientId,
      '&X-ACCESS-KEY=', this.accessKey,
      '&X-ACCESS-NONCE=', nonce].join('');
    url += '&X-ACCESS-SIGNATURE=' + hmacsha256(url, this.secret);
    return url;
  }

  isAuthorized () {
    return this.accessKey ? true : false;
  }

  getEmailAddress (callback) {
    return this._request(true, '/user/email', {
      'callback': callback
    })
  }

  getPersonalInfo (callback) {
    return this._request(true, '/user/personalinfo', {
      'callback': callback
    });
  }

  updatePersonalInfo  (data, callback) {
    return this._request(true, '/user/personalinfo', {
      'method': 'POST',
      'data': data,
      'callback': callback
    });
  }

  userIdVerify (imageData, callback) {
    return this._request(true, '/user/idverify', {
      'method': 'POST',
      'data': { "data": imageData },
      'callback': callback
    });
  }

  resendEmailVerification  (callback) {
    return this._request(true, '/user/email/resend_verification', {
      'method': 'POST',
      'callback': callback
    });
  }

  userStatus (callback) {
    return this._request(true, '/user/status', {
      'callback': callback
    })
  }

  userLimits (callback) {
    return this._request(true, '/user/limits', {
      'callback': callback
    })
  }

  addPhoneNumber (phoneNumber, callback) {
    return this._request(true, '/user/phone', {
      'method': 'POST',
      'data': {
        'phoneNumber': phoneNumber
      },
      'callback': callback
    })
  }

  deletePhoneNumber (otpCode, callback) {
    return this._request(true, '/user/phone', {
      'method': 'DELETE',
      'otpCode': otpCode,
      'callback': callback
    });
  }

  confirmPhoneNumber (newCode, oldCode, callback) {
    var data = {};
    data.newVerificationCode = newCode;
    if ('' !== oldCode) {
      data.oldVerificationCode = oldCode;
    }
    return this._request(true, '/user/phone/confirm', {
      'method': 'POST',
      'data': data,
      'callback': callback
    })
  }

  getPhoneNumber (callback) {
    return this._request(true, '/user/phone', {
      'callback': callback
    });
  }

  buyPrices (qty, mode, callback) {
    var data = {};
    if (mode === 'fiat') {
      data['fiat'] = qty;
    } else {
      data['qty'] = qty;
    }
    return this._request(true, '/prices/buy', {
      'method': 'POST',
      'data': data,
      'callback': callback
    });
  }

  buy (otpCode, destinationAddress, qty, opts, callback) {
    var data = {
      'destinationAddress': destinationAddress,
      'qty': qty
    };
    if (opts.priceUuid) {
      data.priceUuid = opts.priceUuid;
    } else {
      data.useCurrentPrice = true;
    }
    return this._request(true, '/buy', {
      'method': 'POST',
      'otpCode': otpCode,
      'data': data,
      'callback': callback
    });
  }

  sellAddress (qty, callback) {
    return this._request(true, '/user/create_sell_address', {
      'method': 'GET',
      'callback': callback
    });
  }

  sellPrices (qty, mode, callback) {
    var data = {};
    if (mode === 'fiat') {
      data['fiat'] = qty;
    } else {
      data['qty'] = qty;
    }
    return this._request(true, '/prices/sell', {
      'method': 'POST',
      'data': data,
      'callback': callback
    });
  }

  sell (otpCode, refundAddress, signedTransaction, opts, callback) {
    var data = {
      'refundAddress': refundAddress,
      'signedTransaction': signedTransaction
    };
    if (opts.priceUuid) {
      data.priceUuid = opts.priceUuid;
    } else {
      data.useCurrentPrice = true;
    }
    return this._request(true, '/sell', {
      'method': 'POST',
      'otpCode': otpCode,
      'data': data,
      'callback': callback
    })
  }

  transactions (callback) {
    return this._request(true, '/transaction', {
      'callback': callback
    })
  }

  transaction (id, callback) {
    return this._request(true, '/transaction/' + id, {
      'callback': callback
    })
  }

  getTwoFactorCode (callback) {
    return this._request(true, '/authentication/get2faCode/', {
      'callback': callback
    });
  }
}


export const glideraClient = new Glidera({
  'sandbox': config.get('SANDBOX') === 'true' ? true : false,
  'clientId': config.get('GLIDERA_CLIENT_ID')
});
core.readData('account')
  .then(account => {
    if (account) {
      glideraClient.accessKey = account.accessKey
      glideraClient.secret = account.secret
    }
  })
