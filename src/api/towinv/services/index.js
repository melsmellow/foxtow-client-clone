import api from "../../users";

export async function addTowInv(data) {
  return api.post({
    url: `/towinv/add`,
    data,
  });
}
