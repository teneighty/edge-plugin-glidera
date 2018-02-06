import { core, config } from 'edge-libplugin'
import {glideraClient} from './glidera'
import dateformat from 'dateformat'
import * as States from './states'
import * as Occupations from './occupations'
import * as Config from './config'

class UserFactory {
  constructor() {
    this.account = core.readData('account') || {};
    if (this.account && this.account.country) {
      Config.updateCurrency(this.account.country);
    }
    this.redirectUri = config.get('REDIRECT_URI');
    this.domainUri = config.get('SANDBOX') === 'true'
      ? 'bitid:sandbox.glidera.io/api/v1/authentication/bitid'
      : 'bitid:www.glidera.io/api/v1/authentication/bitid';
    this.userStatus = core.readData('userStatus') || {
      'userCanTransact': false,
      'userEmailIsSetup': false,
      'userBankAccountIsSetup': false,
      'userBasicInfoIsSetup': false,
      'tier1SetupComplete': false,
      'tier2SetupComplete': false,
      'tier2TransactionVolumeRequirementComplete': false,
      'tier2AccountAgeRequirementComplete': false,
      'userOowIsSetup': false,
      'userSsnIsSetup': false,
    };
  }

  isAuthorized () {
    return glideraClient.isAuthorized();
  }

  getUserAccount () {
    return this.account;
  }
  
  clearUser () {
    this.account = {};
    glideraClient.accessKey = null;
    glideraClient.secret = null;
    core.writeData('account', {});
  }

  authorizeUrl () {
    var message = glideraClient.bitidAuthUri();
    var address = core.bitidAddress(this.domainUri, message);
    var signature = core.bitidSignature(this.domainUri, message);
    return glideraClient.bitidAuthRedirect(this.redirectUri, address, message, signature, 'authorize');
  }

  userSetupRedirect () {
    return glideraClient.userSetupRedirect(this.redirectUri, 'usersetup');
  }

  idVerifyRedirect() {
    return glideraClient.idVerifyRedirect(this.redirectUri, 'idverify');
  }

  createBankAccountUrl () {
    return glideraClient.createBankAccountRedirect(this.redirectUri, 'bankaccount');
  }

  editBankAccountUrl () {
    return glideraClient.bankAccountsRedirect(this.redirectUri, 'bankaccount');
  }
  
  requestAccessToken (cb) {
    var message = glideraClient.bitidTokenUri();
    var address = core.bitidAddress(this.domainUri, message);
    var signature = core.bitidSignature(this.domainUri, message);
    glideraClient.bitidAccessToken(address, message, signature, function(success, results) {
      if (success) {
        this.account.accessKey = glideraClient.accessKey;
        this.account.secret = glideraClient.secret;
        core.writeData('account', this.account);
      }
      cb(success, results);
    });
  }

  registrationMode () {
    var p = new Promise()
    glideraClient.registrationMode(function(success, isOpen) {
      if (success) {
        p.resolve(isOpen);
      } else {
        p.reject();
      }
    });
    return p;
  }

  getUserAccountStatus () {
    return this.userStatus;
  };

  userIdVerify (imageData) {
    var p = new Promise()
    glideraClient.userIdVerify(imageData, function(e, s, b) {
      s >= 200 && s < 300?  p.resolve(b) : p.reject(b);
    });
    return p;
  }

  resendEmailVerification () {
    var p = new Promise()
    glideraClient.resendEmailVerification(function(e,s,b) {
      s >= 200 && s < 300?  p.resolve(b) : p.reject(b);
    });
    return p;
  }

  fetchUserAccountStatus () {
    var p = new Promise()
    glideraClient.userStatus(function(e,s,b) {
      if (s === 200) {
        this.userStatus = b;
        core.writeData('userStatus', this.userStatus);
        p.resolve(this.userStatus);
      } else {
        p.reject(b);
      }
    })
    return p;
  }

  getEmailAddress () {
    return new Promise((resolve, reject) => {
      glideraClient.getEmailAddress(function(e, s, b) {
        if (s === 200) {
          this.account.email = b.email;
          core.writeData('account', this.account);
          resolve(this.account.email);
        } else {
          reject(b);
        }
      })
    })
  }

  getFullUserAccount () {
    return new Promise((resolve, reject) => {
      glideraClient.getPersonalInfo(function(e, s, b) {
        if (s === 200) {
          this.account.email = this.account.email || b.email
          this.account.firstName = b.firstName
          this.account.middleName = b.middleName
          this.account.lastName = b.lastName
          this.account.address1 = b.address1
          this.account.address2 = b.address2
          this.account.city = b.city
          this.account.zipCode = b.zipCode
          this.account.state = States.findState(b.state)
          this.account.country = b.countryCode
          this.account.occupation = Occupations.find(b.occupation)
          this.account.employerName = b.employerName
          this.account.employerDescription = b.employerDescription
          if (!this.account.last4Ssn) {
            this.account.last4Ssn = b.last4Ssn;
          }
          Config.updateCurrency(this.account.country);

          if (b.birthDate) {
            // XXX: This is kind of hacky
            var arr = b.birthDate.split("-");
            this.account.birthDate = new Date(arr[0], arr[1] - 1, arr[2]);
          }
          this.account.registered = true;

          // persist locally
          core.writeData('account', this.account)
          resolve(this.account)
        } else {
          reject(b)
        }
      });
    });
  }

  updateUserAccount (account) {
    return new Promise((resolve, reject) => {
      var d = {
        'firstName': account.firstName,
        'middleName': account.middleName,
        'lastName': account.lastName,
        'birthDate': account.birthDate ? dateformat(account.birthDate, 'yyyy-MM-dd') : null,
        'address1': account.address1,
        'address2': account.address2,
        'city': account.city,
        'state': account.state ? account.state.id : null,
        'zipCode': account.zipCode,
        'occupation': account.occupation ? account.occupation.id : null,
        'employerName': account.employerName,
        'employerDescription': account.employerDescription,
        'last4Ssn': account.last4Ssn,
        'ip': '127.0.0.1'
      };
      glideraClient.updatePersonalInfo(d, function(e, s, b) {
        if (s === 200) {
          core.writeData('account', account);
          resolve(b)
        } else {
          reject(b);
        }
      })
    })
  }
}

export const userInterface = new UserFactory()

