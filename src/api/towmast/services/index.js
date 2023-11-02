import api from "../../users";

export async function getTowmastData() {
  return api.get({
    url: "towmast/get",
  });
}

export async function getTowMastById(id) {
  return api.get({
    url: `towmast/get/${id}`,
  });
}

export async function addTowmastData(data) {
  return api.post({
    url: `/towmast/add`,
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function deleteTowmastData(id) {
  return api.delete({
    url: `/towmast/${id}/delete`,
  });
}
