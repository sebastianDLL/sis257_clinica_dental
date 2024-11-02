<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'

import { RouterView } from 'vue-router'

import '@/assets/js/vendor/modernizr-3.11.2.min.js'
import '@/assets/js/vendor/jquery-1.12.4.min.js'

import '@/assets/js/plugins/popper.min.js'
import '@/assets/js/plugins/bootstrap.min.js'

import '@/assets/js/plugins/slick.min.js'
import '@/assets/js/ajax-contact.js'
import '@/assets/js/plugins/jquery.nice-select.min.js'
import '@/assets/js/plugins/gijgo.min.js'
import '@/assets/js/plugins/jquery.magnific-popup.min.js'
import './assets/js/main.js'
</script>

<template>
  <MainHeader />
  <RouterView />
  <MainFooter />
</template>

<style>
/*Icon Font CSS */
@import 'assets/css/plugins/font-awesome.min.css';
@import 'assets/css/plugins/remixicon.css';
@import 'assets/css/plugins/flaticon.css';
/*Plugins CSS */
@import 'assets/css/plugins/bootstrap.min.css';
@import 'assets/css/plugins/animate.min.css';
@import 'assets/css/plugins/slick.css';
@import 'assets/css/plugins/nice-select.css';
@import 'assets/css/plugins/gijgo.min.css';
@import 'assets/css/plugins/preloader.css';
@import 'assets/css/plugins/magnific-popup.css';
/*Main Style CSS*/
@import 'assets/css/style.css';
</style>
