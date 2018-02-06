const US_STATES = [
  {"id": "AL", "name": "Alabama"},
  {"id": "AK", "name": "Alaska"},
  {"id": "AZ", "name": "Arizona"},
  {"id": "AR", "name": "Arkansas"},
  {"id": "CA", "name": "California"},
  {"id": "CO", "name": "Colorado"},
  {"id": "CT", "name": "Connecticut"},
  {"id": "DE", "name": "Delaware"},
  {"id": "DC", "name": "District"},
  {"id": "FL", "name": "Florida"},
  {"id": "GA", "name": "Georgia"},
  {"id": "HI", "name": "Hawaii"},
  {"id": "ID", "name": "Idaho"},
  {"id": "IL", "name": "Illinois"},
  {"id": "IN", "name": "Indiana"},
  {"id": "IA", "name": "Iowa"},
  {"id": "KS", "name": "Kansas"},
  {"id": "KY", "name": "Kentucky"},
  {"id": "LA", "name": "Louisiana"},
  {"id": "ME", "name": "Maine"},
  {"id": "MD", "name": "Maryland"},
  {"id": "MA", "name": "Massachusetts"},
  {"id": "MI", "name": "Michigan"},
  {"id": "MN", "name": "Minnesota"},
  {"id": "MS", "name": "Mississippi"},
  {"id": "MO", "name": "Missouri"},
  {"id": "MT", "name": "Montana"},
  {"id": "NE", "name": "Nebraska"},
  {"id": "NV", "name": "Nevada"},
  {"id": "NH", "name": "New Hampshire"},
  {"id": "NJ", "name": "New Jersey"},
  {"id": "NM", "name": "New Mexico"},
  {"id": "NY", "name": "New York"},
  {"id": "NC", "name": "North Carolina"},
  {"id": "ND", "name": "North Dakota"},
  {"id": "OH", "name": "Ohio"},
  {"id": "OK", "name": "Oklahoma"},
  {"id": "OR", "name": "Oregon"},
  {"id": "PA", "name": "Pennsylvania"},
  {"id": "RI", "name": "Rhode"},
  {"id": "SC", "name": "South Carolina"},
  {"id": "SD", "name": "South Dakota"},
  {"id": "TN", "name": "Tennessee"},
  {"id": "TX", "name": "Texas"},
  {"id": "UT", "name": "Utah"},
  {"id": "VT", "name": "Vermont"},
  {"id": "VA", "name": "Virginia"},
  {"id": "WA", "name": "Washington"},
  {"id": "WV", "name": "West Virginia"},
  {"id": "WI", "name": "Wisconsin"},
  {"id": "WY", "name": "Wyoming"}
]

var CA_PROVINCES = [
  {"id": "ON", "name": "Ontario"},
  {"id": "QC", "name": "Quebec"},
  {"id": "NS", "name": "Nova Scotia"},
  {"id": "NB", "name": "New Brunswick"},
  {"id": "MB", "name": "Manitoba"},
  {"id": "BC", "name": "British Columbia"},
  {"id": "PE", "name": "Prince Edward Island"},
  {"id": "SK", "name": "Saskatchewan"},
  {"id": "AB", "name": "Alberta"},
  {"id": "NL", "name": "Newfoundland and Labrador"}
]

export function getStates(countryCode) {
  return countryCode === "US" ? US_STATES : CA_PROVINCES
}

export function findState(countryCode, code) {
  var l = getStates(countryCode).filter(function(s) {
    return s.id === code;
  });
  return l.length >= 1 ? l[0] : null;
}

