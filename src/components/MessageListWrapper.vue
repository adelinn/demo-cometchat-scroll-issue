<script setup lang="ts">
import { ref, watch, onBeforeMount, onUnmounted } from 'vue';
import { CometChatMessages } from "@cometchat/chat-uikit-vue";
import { Group, CometChat } from "@cometchat/chat-sdk-javascript";

const props = defineProps({
  chatUid: { type: String, required: true },
});

const chatGroup = ref<Group>();

watch(()=> props.chatUid, async ()=> {
  chatGroup.value = (await CometChat.getGroup(props.chatUid)) ?? undefined;
}, { immediate: true })

onBeforeMount(async () => {
  CometChat.connect();
});

onUnmounted(async () => {
  CometChat.disconnect();
});
</script>

<template>
  <div class="bcc-chat-message-list-wrapper">
    <div v-if="chatGroup" class="bcc-chat-message-list">
      <CometChatMessages
        :hideMessageHeader="true"
        :disableSoundForMessages="true"
        :hideMessageComposer="false"
        :hideDetails="true"
        :group="chatGroup"
      />
    </div>
  </div>
</template>

<style lang="scss">
body {
  background: #fff;
  color: #000;

  @media (prefers-color-scheme: dark) {
    background: #000;
    color: #fff;
  }
}

.bcc-chat-message-list-wrapper {
  position: relative;
  height: 100%;
}

/*
primary: my bubble
accent: message bar text
accent100: message bar and widget buttons bg, others bubble
accent200: horizontal line on message bar
accent500: icons on message bar
accent600: dates and date separator and popup icons
accent700: avatar background, widget buttons text
accent900: text in avatar
*/

.bcc-chat-message-list {
  height: 100%;
  --cc__primary: #cfeac8;
  --cc__background: #f3faf7;
  --cc__secondary: white;
  --cc__accent: #004e48;
  --cc__accent50: rgba(62, 142, 117, 0.04);
  --cc__accent100: #ffffff;
  --cc__accent200: rgba(62, 142, 117, 0.15);
  --cc__accent300: rgba(62, 142, 117, 0.24);
  --cc__accent400: rgba(62, 142, 117, 0.33);
  --cc__accent500: rgba(62, 142, 117, 0.46);
  --cc__accent600: #004e48;
  --cc__accent700: #254a40;
  --cc__accent800: rgba(62, 142, 117, 0.82);
  --cc__accent900: #f3faf7;
  --cc__text-color: #000;
  --cc__link-color: #57639e;

  @media (prefers-color-scheme: dark) {
    --cc__primary: #57639e;
    --cc__background: hsl(230, 25%, 15%);
    --cc__secondary: #111827;
    --cc__accent: #6274ae;
    --cc__accent50: rgba(98, 116, 174, 0.24);
    --cc__accent100: linear-gradient(45deg, #05070b 0%, #0c111c 100%);
    --cc__accent200: rgba(98, 116, 174, 0.35);
    --cc__accent300: rgba(98, 116, 174, 0.44);
    --cc__accent400: rgba(98, 116, 174, 0.53);
    --cc__accent500: rgba(98, 116, 174, 0.66);
    --cc__accent600: #758abc;
    --cc__accent700: #6274ae;
    --cc__accent800: rgba(98, 116, 174, 0.92);
    --cc__accent900: #f3faf7;
    --cc__text-color: #fff;
    --cc__link-color: #cfeac8;
  }

  /* 1. Wrapper for Messages component */
  .cc-messages-wrapper {
    /* 1.1 Messages component */
    .cc-messages-wrapper__messages {
      /* 1.1.1 Wrapper for Messages List */
      .cc-messages-wrapper__messages-list {
        height: calc(100% - 96px);
      }

      /* 1.1.2 Wrapper for Messages Composer */
      .cc-messagecomposer-wrapper {
        //padding: 0; //Use to remove side padding on composer
      }
    }
  }

  .cc-messagebubble-wrapper__container {
    max-width: 80%;
  }

  .cc-messagebubble-wrapper__messageoptions {
    border-radius: 8px;
    .cc-context-menu__top-menu {
      border: 1px var(--cc__secondary) solid !important;
    }
  }
  /* 2. Message for Messages Composer when offline */
  .bcc-chat-message-composer-offline {
    position: relative;
    top: -96px;
    height: 96px;
    width: 100%;
    backdrop-filter: blur(4px);
    color: var(--cc__text-color);
    font: 700 1rem sans-serif;

    /* 2.1 Text of Messages Composer offline view */
    span {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px 8px 0 0;
    }
  }
}

.cc-messagecomposer__emojikeyboard {
  display: none;
}

// Hide emoji keyboard
.cc-messagecomposer__emojikeyboard {
  display: none;
}

.cc-threadedmessages-wrapper__bubbleview::-webkit-scrollbar,
.cc__message-list::-webkit-scrollbar {
  background: transparent;
  width: 8px;
}

.cc-threadedmessages-wrapper__bubbleview::-webkit-scrollbar-thumb,
.cc__message-list::-webkit-scrollbar-thumb {
  background: rgb(232, 229, 229);
  border-radius: 8px;
}
</style>
