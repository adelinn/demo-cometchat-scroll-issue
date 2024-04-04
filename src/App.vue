<script setup lang="ts">
import "@cometchat/chat-uikit-vue/dist/style.css";
import { ref, watch } from "vue";
import MessageListWrapper from "./components/MessageListWrapper.vue";

const chatActive = ref<boolean>(true);

const accessToken = ref<string>("");
const at = localStorage.getItem("token");
if (at) {
  accessToken.value = at;
}

watch(accessToken, async (at) => {
  if (at) {
    localStorage.setItem('token', at);
  }
})
</script>

<template>
  <textarea v-model="accessToken" style="width: 400px; height: 50px;"></textarea>
  <br><br>
  Active: <input type="checkbox" v-model="chatActive" />
  <div class="chat-container" v-if="chatActive">
    <MessageListWrapper chatUid="adfcea71-9573-4b7b-807d-bffea37fbf48" />
  </div>
</template>

<style scoped>
.chat-container {
  width: 500px;
  height: 500px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  border: solid 1px green;
  position: relative;

}
</style>