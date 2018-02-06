
export const NAME = 'Glidera'
export const EMAIL_VERIFICATION_ADDRESS = 'admin@glidera.com'
export const DEPOSIT_ID = 'Glidera Inc'
export const ORDER_TIMEOUT = '60'
export const DEPOSIT_TIMEOUT = '3600';
export const BIZ_ID = 11063;

export var countryCode = null
export var currencyNum = null
export var currency = null
export var currencySymbol = null; 

export function updateCurrency(_countryCode) {
  if (!_countryCode) {
    return;
  }
  countryCode = _countryCode;
  currencyNum = _countryCode === 'US' ? 840 : 127;
  currency = _countryCode === 'US' ? "USD" : "CAD";
  currencySymbol = '$';
}

updateCurrency('US')
