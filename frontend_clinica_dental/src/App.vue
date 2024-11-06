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

/* Plugins CSS */
@import url('https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/css/nice-select.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/gijgo/1.9.13/combined/css/gijgo.min.css');

/* Local Plugins (no CDN disponible) */
@import 'assets/css/plugins/preloader.css';
@import 'assets/css/plugins/magnific-popup.css';

/* Main Style CSS (proyecto local) */
@import 'assets/css/style.css';
</style>

