import api from "../";

export async function decodeVin(vin) {
  return api.get({
    url: `vehicles/decodevinvalues/${vin}*BA?format=json`,
  });
}
