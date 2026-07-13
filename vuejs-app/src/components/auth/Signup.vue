<template>
  <div class="login-page">
    <div class="login-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <router-link to="/" class="h1"><b>Admin</b>LTE</router-link>
        </div>
        <div class="card-body">
          <p class="login-box-msg">Sign up for a new membership</p>
          
          <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

          <form @submit.prevent="handleSubmit">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Name" v-model="name" required />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
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
            <div class="input-group mb-3">
              <input type="password" class="form-control" placeholder="Confirm Password" v-model="password_confirmation" required />
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
                  {{ isLoading ? 'Loading...' : 'Sign up' }}
                </button>
              </div>
            </div>
          </form>
          <p class="mb-1 mt-3">
            <router-link :to="{ name: 'auth.signin' }" class="text-center">I already have an account</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const errorMsg = ref('');
const isLoading = ref(false);

const handleSubmit = async () => {
  if (password.value !== password_confirmation.value) {
    errorMsg.value = 'Passwords do not match';
    return;
  }
  
  errorMsg.value = '';
  isLoading.value = true;
  try {
    await authStore.signup(name.value, email.value, password.value, password_confirmation.value);
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errorMsg.value = Object.values(error.response.data.errors)[0][0];
    } else if (error.response && error.response.data.message) {
      errorMsg.value = error.response.data.message;
    } else {
      errorMsg.value = 'Sign up failed. Please try again.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
