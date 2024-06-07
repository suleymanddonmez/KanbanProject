import axios from "axios";

export interface BaseResponseType {
  success: boolean;
  data?: any;
  error?: string;
}

let baseResponse: BaseResponseType = {
  success: false,
};

const hostname = "http://localhost:3001";

const requests = {
  addProject: "/projects/add",
  getProjects: "/projects/all",
  getProject: "/projects/one",
  delProject: "/projects",
  addTaskList: "/taskLists/add",
  getTaskLists: "/taskLists/all",
  getTaskList: "/taskLists/one",
  delTaskList: "/taskLists",
  addTask: "/tasks/add",
  getTasks: "/tasks/all",
  getTask: "/tasks/one",
  delTask: "/tasks",
};

const actions = {
  get: async function (request: string, params: any, callBack: Function) {
    let config = {
      params: params,
    };
    await axios
      .get(hostname + request, config)
      .then(function (response) {
        if (response.status === 200) {
          baseResponse.success = true;
          baseResponse.data = response.data;
        } else {
          baseResponse.error = "Bir hata oluştu!";
        }
        callBack(baseResponse);
      })
      .catch(function (axiosError) {
        baseResponse.error = "Bir hata oluştu!";
        callBack(baseResponse);
      });
  },
  post: function post(request: string, params: any, callBack: Function) {
    let userLocalInfo = localStorage.getItem("userInfo");
    let config = {};
    if (userLocalInfo) {
      let userInfo = JSON.parse(userLocalInfo);
      if (userInfo?.access) {
        config = {
          headers: {
            Authorization: `Bearer ${userInfo?.access}`,
          },
        };
      }
    }
    axios
      .post(hostname + request, params)
      .then(function (response) {
        if (response.status === 200) {
          baseResponse.success = true;
          baseResponse.data = response.data;
        } else {
          baseResponse.error = "Bir hata oluştu!";
        }
        callBack(baseResponse);
      })
      .catch(function (axiosError) {
        baseResponse.error = "Bir hata oluştu!";
        callBack(baseResponse);
      });
  },
};

export default {
  requests,
  actions,
};
