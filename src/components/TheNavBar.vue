<template>
  <header class="header" id="header">
    <router-link :to="{ name: 'Home' }" class="logo">
      <img src="../assets/svg/vueschool-logo.svg" />
    </router-link>

    <div class="btn-hamburger" @click="mobileNavMenu = !mobileNavMenu">
      <!-- use .btn-humburger-active to open the menu -->
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <!-- use .navbar-open to open nav -->
    <nav class="navbar">
      <ul>
        <li class="navbar-user">
          <a href="#">
            <img class="avatar-small" :src="authUser.avatar" :alt="`${authUser.name} profile pic`" />
            <span>
              {{ authUser.name }}
              <img
                class="icon-profile"
                src="../assets/svg/arrow-profile.svg"
                alt=""
              />
            </span>
          </a>

          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div id="user-dropdown">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item"><a href="#">View profile</a></li>
              <li class="dropdown-menu-item"><a href="#">Sign Out</a></li>
            </ul>
          </div>
        </li>
        <!-- <li class="navbar-item"><a href="#">Sign In</a></li>
        <li class="navbar-item"><a href="#">Register</a></li>
        <li class="navbar-mobile-item"><a href="#">View Profile</a></li>
        <li class="navbar-mobile-item"><a href="#">Sign Out</a></li> -->
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const authUser = computed(() => useStore().getters.authUser)
</script>

<style>
</style>
