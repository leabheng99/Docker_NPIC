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
import { useAuthStore } from '../../stores/auth';
import { LoadingModal, CloseModal } from '@/functions/swal';

const authStore = useAuthStore();

onMounted(async () => {
  LoadingModal('Signing Out...');
  await authStore.signout();
  CloseModal();
});
</script>
