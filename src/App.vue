<script setup lang="ts">
</script>

<template>
  <div class="main-page">
    <nav>
      <router-link :to="{ name: 'PageIndex' }"></router-link>
    </nav>
    <main class="router-view">
      <RouterView class="all-page"></RouterView>
    </main>
  </div>
</template>

<style>
body,
html,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  touch-action: none;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


.main-page {


  .router-view {

    box-sizing: border-box;
    flex-grow: 1;
    overflow: hidden;
    touch-action: none;

    .all-page {
      background-color: rgba(233, 249, 177, 0.327);
      height: 100%;
      overflow: hidden;
      touch-action: none;
    }
  }
}
</style>