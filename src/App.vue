<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <!-- router setting is here. -->
    <!-- <RouterLink to="/">Home</RouterLink> -->

    <Suspense>
        <RouterView />
    </Suspense>
</template>

<style lang="less">
html {
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
