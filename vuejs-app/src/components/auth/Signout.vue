<template>
  <div class="login-page">
    <div class="login-box">
      <div class="card card-outline card-primary">
        <div class="card-body text-center">
          <p>Signing out...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { apiSignOut } from '@/functions/api/auth';
import { LoadingModal, CloseModal } from '@/functions/swal';

const userStore = useUserStore();
const router = useRouter();

onMounted(async () => {
  LoadingModal('Signing Out...');
  try {
    const token = userStore.getSanctumToken();
    if (token) {
      await apiSignOut(token);
    }
  } catch (error) {
    console.error('Signout failed:', error);
  } finally {
    userStore.reset();
    CloseModal();
    router.push({ name: 'auth.signin' });
  }
});
</script>
