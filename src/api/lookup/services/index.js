import api from "../../users";

export async function getTruckLookup() {
  return api.get({
    url: "truck/get",
  });
}

export async function getMakeLookup() {
  return api.get({
    url: "make/get",
  });
}

export async function getReasonLookup() {
  return api.get({
    url: "reason/get",
  });
}

export async function getCustomerLookup() {
  return api.get({
    url: "customer/get",
  });
}

export async function getDriverLookup() {
  return api.get({
    url: "driver/get",
  });
}
