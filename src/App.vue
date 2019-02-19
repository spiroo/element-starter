<template>
  <div class="app">
    <navbar />
    <content-view></content-view>
    <request-loding></request-loding>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ContentView from '@/components/ContentView.vue';
import RequestLoding from '@/components/RequestLoading.vue';

export default {
  components: {
    Navbar,
    ContentView,
    RequestLoding
  }
};
</script>
