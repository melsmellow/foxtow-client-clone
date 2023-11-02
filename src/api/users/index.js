import instance from "./config";

class Api {
  async get({ url, params, headers }) {
    try {
      // open loader

      const res = await instance.get(url, {
        params,
        headers,
      });

      return res;
    } finally {
      // close loader
    }
  }

  async post({ url, params, headers, data = undefined }) {
    try {
      // const formData = new FormData();

      // for (const [key, value] of data.entries()) {
      //   if (key === "files") formData.append("files", value);
      //   if (value !== "") formData.append(key, value);
      // }

      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      const res = await instance.post(url, data, {
        params,
        headers,
      });

      return res;
    } finally {
      // close loader
    }
  }

  async delete({ url, params, headers }) {
    try {
      // open loader

      const res = await instance.delete(url, {
        params,
        headers,
      });

      return res;
    } finally {
      // close loader
    }
  }

  async put({ url, params, headers, data = undefined }) {
    try {
      // open loader

      const res = await instance.put(url, data, {
        params,
        headers,
      });

      return res;
    } finally {
      // close loader
    }
  }
}

const api = new Api();
export default api;
