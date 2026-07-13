<template>
  <div class="login-page">
    <div class="login-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <router-link to="/" class="h1"><b>Admin</b>LTE</router-link>
        </div>
        <div class="card-body">
          <p class="login-box-msg">Sign in to start your session</p>
          
          <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

          <form @submit.prevent="handleSubmit">
            <div class="input-group mb-3">
              <input type="email" class="form-control" placeholder="Email" v-model="email" required />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" placeholder="Password" v-model="password" required />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8"></div>
              <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
                  {{ isLoading ? 'Loading...' : 'Sign In' }}
                </button>
              </div>
            </div>
          </form>
          <p class="mb-0 mt-3">
            <router-link :to="{ name: 'auth.signup' }" class="text-center">Register a new membership</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const isLoading = ref(false);

const handleSubmit = async () => {
  errorMsg.value = '';
  isLoading.value = true;
  try {
    await authStore.signin(email.value, password.value);
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errorMsg.value = Object.values(error.response.data.errors)[0][0];
    } else if (error.response && error.response.data.message) {
      errorMsg.value = error.response.data.message;
    } else {
      errorMsg.value = 'Sign in failed. Please try again.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
