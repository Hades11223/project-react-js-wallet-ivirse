import { getState } from "@redux";
import clientUtils from "@utils/client-utils";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
export default {
  state: {
    stompClient: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    connectToServerSocket: (access_token) => {
      return new Promise(async (resolve, reject) => {
        try {
          let headers = { Authorization: `bearer ${access_token}` };

          var sock = new SockJS(`${clientUtils.serverApi}/ws`, {
            transports: ["xhr-streaming"],
            headers,
          });
          let stompClient = Stomp.over(sock);
          sock.onopen = function () {
            console.log("open");
          };
          stompClient.connect(
            headers,
            function (frame) {
              console.log("Connected: " + frame);
              stompClient.subscribe("/topic/messaging", function (greeting) {
                console.log(greeting);
                //you can execute any function here
              });
            },
            function (err) {
            }
          );
          dispatch.ws.updateData({ stompClient });
          resolve(stompClient);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
    },
    sendMessage: ({ body }) => {
      const stompClient = getState()?.ws?.stompClient;
      return new Promise((resolve, reject) => {
        stompClient
          .send(`/app/hello`, {}, JSON.stringify("your message here"))
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {

            reject(err);
          });
      });
    },
  }),
};
