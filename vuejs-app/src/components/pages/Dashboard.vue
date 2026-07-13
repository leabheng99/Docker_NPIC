<template>
  <div class="wrapper">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light p-3 ml-0">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'auth.signout' }" class="nav-link text-danger">
            <i class="fas fa-sign-out-alt"></i> Sign out
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="content-wrapper p-4 ml-0">
      <div class="alert alert-success" role="alert" v-if="authStore.user">
        <h4 class="alert-heading">Welcome, {{ authStore.user.name }}!</h4>
        <p>You are logged in successfully with email: {{ authStore.user.email }}</p>
        <hr>
        <p class="mb-0">This is your dashboard. Everything is working correctly.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';
const authStore = useAuthStore();
</script>
