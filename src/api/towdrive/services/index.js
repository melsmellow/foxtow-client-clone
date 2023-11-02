import api from "../../users";

export async function addTowDrive(data) {
  return api.post({
    url: `/towdrive/add`,
    data,
  });
}
