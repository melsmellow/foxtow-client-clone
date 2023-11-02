import api from "../";

export async function loginUser(reqBody) {
  return api.post({
    url: "user/login",
    data: reqBody,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
