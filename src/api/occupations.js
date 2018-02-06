
const OCCUPATIONS = [
  {"id": "1", "name": "Accounting"},
  {"id": "2", "name": "Administration"},
  {"id": "3", "name": "Arts, Culture"},
  {"id": "4", "name": "Business"},
  {"id": "5", "name": "Communications"},
  {"id": "6", "name": "Customer Service"},
  {"id": "7", "name": "Education"},
  {"id": "8", "name": "Energy, Utilities"},
  {"id": "9", "name": "Engineering"},
  {"id": "10", "name": "Finance"},
  {"id": "11", "name": "Financial Services"},
  {"id": "12", "name": "Government"},
  {"id": "13", "name": "Health"},
  {"id": "14", "name": "Hospitality"},
  {"id": "15", "name": "Human Resources"},
  {"id": "16", "name": "Internet"},
  {"id": "17", "name": "Legal"},
  {"id": "18", "name": "Manufacturing"},
  {"id": "19", "name": "Marketing"},
  {"id": "20", "name": "Non profit"},
  {"id": "21", "name": "Recreation"},
  {"id": "22", "name": "Religion"},
  {"id": "23", "name": "Research"},
  {"id": "24", "name": "Sales"},
  {"id": "25", "name": "Sports, Fitness"},
  {"id": "26", "name": "Student"},
  {"id": "27", "name": "Crypto Exchange"},
  {"id": "28", "name": "Crypto Merchant"},
  {"id": "29", "name": "Other"},
  {"id": "30", "name": "Advertising"},
  {"id": "31", "name": "Agent (Tranvel Etc.)"},
  {"id": "32", "name": "Architect"},
  {"id": "33", "name": "Aviation"},
  {"id": "34", "name": "Banking"},
  {"id": "35", "name": "Brokerage"},
  {"id": "36", "name": "Chiropractor"},
  {"id": "37", "name": "Computers"},
  {"id": "38", "name": "Controller"},
  {"id": "39", "name": "Dean"},
  {"id": "40", "name": "Dental"},
  {"id": "41", "name": "Doctor"},
  {"id": "42", "name": "Driver (Truck, Bus)"},
  {"id": "43", "name": "Farmer"},
  {"id": "44", "name": "Film"},
  {"id": "45", "name": "Fireman"},
  {"id": "46", "name": "Fisheries"},
  {"id": "47", "name": "Flight Attendant"},
  {"id": "48", "name": "Forestry"},
  {"id": "49", "name": "Homemaker"},
  {"id": "50", "name": "Insurance"},
  {"id": "51", "name": "Journalism"},
  {"id": "52", "name": "Judge"},
  {"id": "53", "name": "Landscaper, Gardener"},
  {"id": "54", "name": "Lawyer"},
  {"id": "55", "name": "Medical"},
  {"id": "56", "name": "Military"},
  {"id": "57", "name": "Music"},
  {"id": "58", "name": "Non Profit"},
  {"id": "59", "name": "Nursing"},
  {"id": "60", "name": "Paramedic"},
  {"id": "61", "name": "Pilot"},
  {"id": "62", "name": "Police"},
  {"id": "63", "name": "Principal"},
  {"id": "64", "name": "Professor"},
  {"id": "65", "name": "Psychiatric"},
  {"id": "66", "name": "Radiology"},
  {"id": "67", "name": "Restaurant"},
  {"id": "68", "name": "Retail"},
  {"id": "69", "name": "Social Worker"},
  {"id": "70", "name": "Teacher"},
  {"id": "71", "name": "Technician"},
  {"id": "72", "name": "Therapist"},
  {"id": "73", "name": "Veterinarian"}
]
// OTHER: 29
export function getOccupations () {
  return OCCUPATIONS.sort(function(a, b) {
    if (a.name < b.name) return -1;
    if (b.name < a.name) return 1;
    return 0;
  });
}
export function find (code) {
  var l = OCCUPATIONS.filter(function(s) {
    return code && s.id === code.toString();
  });
  return l.length >= 1 ? l[0] : null;
}

