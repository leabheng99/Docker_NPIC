<template></template>
<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { LoadingModal, MessageModal, CloseModal } from "@/functions/swal";
import { apiGithubOAuthExchangeToken } from "@/functions/api/github-oauth";
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  try {
    LoadingModal("Processing Github authentication...");
    const error = route.query.error;
    if (error === 'github_oauth_failed') {
      CloseModal();
      return MessageModal({ icon: "error", title: "Error", text: "Github authentication failed. Please try again." }).then(() => {
        return router.replace({ name: 'auth.signin' });
      });
    }

    const token = route.query.token;
    const response = await apiGithubOAuthExchangeToken(token);
    userStore.setState(response.data.user);
    userStore.setSanctumToken(response.data.token);
    CloseModal();
    return router.replace({ name: 'dashboard' });
  } catch (e) {
    CloseModal();
    return MessageModal({ icon: "error", title: "Error", text: "Github authentication failed. Please try again." }).then(() => {
      return router.replace({ name: 'auth.signin' });
    });
  }
});
</script>
