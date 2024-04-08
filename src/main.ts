import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { CometChatUIKit } from "@cometchat/chat-uikit-vue";
import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";
import { CometChat } from "@cometchat/chat-sdk-javascript";

const settings = new UIKitSettingsBuilder()
    .setAppId("2520339d45a9d557")
    .setAutoEstablishSocketConnection(false)
    .setRegion("eu")
    .build();

await CometChatUIKit.init(settings);

const at = localStorage.getItem("token");
if (at) {
    await CometChatUIKit.loginWithAuthToken(at);
}

CometChat.connect();

createApp(App).mount('#app')
