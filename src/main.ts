import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { CometChatUIKit } from "@cometchat/chat-uikit-vue";
import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";

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

createApp(App).mount('#app')
