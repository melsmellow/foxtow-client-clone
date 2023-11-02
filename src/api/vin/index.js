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
      // open loader

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
