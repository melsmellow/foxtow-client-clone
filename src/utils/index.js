import axios from "axios";
const has = Object.prototype.hasOwnProperty;

const isEmpty = (prop) =>
  prop === null ||
  prop === undefined ||
  (has.call(prop, length) && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0);

const shouldNotPassProps = (prop) => ({
  shouldNotForwardProp: (props) => prop.indexOf(props) == -1,
});

function createRouteHandler(apiUrl, apiUrlSubPath) {
  return async function routeHandler(request) {
    const url = new URL(request.url);
    const isDelete = request.method === "DELETE";

    const contentType = request.headers.get("content-type");
    const authorization = request.headers.get("authorization");
    const requestGroup = request.headers.get("x-request-group-id");

    const reqHeaders = {
      "Content-Type": contentType,
      Authorization: authorization,
      "x-request-group-id": requestGroup,
    };

    const hasBody =
      contentType && contentType.indexOf("application/json") !== -1;
    let body = !isDelete && hasBody ? await request.json() : undefined;

    //for delete
    if (isDelete) {
      const deleteBody = url.searchParams.get("deleteBody");
      body = deleteBody ? JSON.parse(deleteBody) : body;
    }

    const axiosRequest = {
      method: request.method,
      url: `${apiUrl}${request.url.split(apiUrlSubPath)[1]}`,
      headers: reqHeaders,
      data: body,
    };

    try {
      const response = await axios(axiosRequest);
      return new Response(
        response.data ? JSON.stringify(response.data) : undefined,
        {
          status: response.status,
          statusText: response.statusText,
        }
      );
    } catch (error) {
      const err = error;
      const errorResponse = err?.response?.data ?? err;

      return new Response(JSON.stringify(errorResponse), {
        status: err?.response?.status || 500,
        statusText: err?.response?.statusText,
      });
    }
  };
}

async function createAxiosRequestInterceptor(instance) {
  instance.interceptors.request.use(requestInterceptor, (error) => {
    return Promise.reject(error);
  });

  console.log(instance);
  async function requestInterceptor(config) {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    const newConfig = config;

    newConfig.headers = {
      ...newConfig.headers,
      Authorization: `Bearer ${token}`,
      // "Content-Type": "multipart/form-data",
    };

    return newConfig;
  }
}

async function createAxiosResponseInterceptor(instance) {
  instance.interceptors.response.use(responseInterceptor);

  async function responseInterceptor(res) {
    const config = res.config;

    if ([503].includes(res.status)) {
      console.error("Error (Reason): ", res.data);
    }

    if ([401, 403].includes(res.status) && !config._retry) {
      config._retry = true;

      console.error("api error", res);
      // return Promise.reject(res);
      const body = {
        grant_type: "refresh_token",
        client_id: APP_CLIENT_ID,
        refresh_token: useAccountStore?.getState().tokenData?.refresh_token,
      };

      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body }),
      });
      if (response.status >= 400) {
        //if refresh token error. wikll redirect to login
        console.error("auth error refreshtoken redirect, redirect to login");
        window.location.replace(`${window.location.origin + PATHS.login.path}`);
      } else {
        const tokenData = await response.json();

        useAccountStore.getState().setTokenData(tokenData);
        return instance(config); //return new instance to re call again the failing APIs
      }
    }

    return res;
  }
}

const dateFormat = (date) => {
  const newDate = new Date(date);
  return newDate.toUTCString();
};

export {
  isEmpty,
  shouldNotPassProps,
  createRouteHandler,
  createAxiosResponseInterceptor,
  createAxiosRequestInterceptor,
  dateFormat,
};
