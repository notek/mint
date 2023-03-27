<template>
    <header class="header-box">
        <div class="logo">
            <img src="@/assets/images/logo.png" alt="">
            <strong>{{ title }}</strong>
        </div>

        <div class="menu-icon" :class="{ open: menuStatus }" @click="operaMenuBox">
            <span></span>
        </div>
    </header>
    <div class="menu-box" :class="{ active: menuStatus }">
        <div class="lang-mask" :class="{ active: langStatus }"></div>

        <div class="lang-switch">
            <div class="lang-flag" @click="langStatus = !langStatus">
                <span>{{ langText }}</span>
                <van-icon name="arrow-down" />
            </div>
            <div class="lang-list" :class="{ active: langStatus }">
                <p class="lang-item" :class="{ active: currLang === 'en' }" @click="onSwitchLang('en')">English</p>
                <p class="lang-item" :class="{ active: currLang === 'zh' }" @click="onSwitchLang('zh')">简体中文</p>
            </div>
        </div>

        <ul>
            <li>
                <RouterLink to="/"><span>{{ t('menu.home') }}</span><van-icon name="arrow" /></RouterLink>
            </li>
            <li>
                <RouterLink to=""><span>{{ t('menu.king') }}</span><van-icon name="arrow" /></RouterLink>
            </li>
        </ul>

        <Button type="primary" block @click="connect" :loading="linkStatus"
            :loading-text="linkStatus ? t('link.connecting') : ''">{{ linkText }}</Button>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, onUnmounted } from 'vue'
import { showLoadingToast, Button } from 'vant'

const { t } = useI18n()
const props = defineProps<{
    connect: any
    linkText: string
    linkStatus: boolean
    title: string
}>()

onUnmounted(() => {
    const app = document.querySelector('#app') as HTMLElement
    app.style.cssText = ''
})

// 多语言切换
const menuStatus = ref<boolean>(false)
const langStatus = ref<boolean>(false)
const currLang = ref<string>(localStorage.getItem('lang') || 'zh')
const langText = ref<string>(currLang.value === 'zh' ? 'English' : '简体中文')

const operaMenuBox = () => {
    menuStatus.value = !menuStatus.value

    const app = document.querySelector('#app') as HTMLElement
    if (menuStatus.value) {
        app.style.cssText = 'height:100vh;overflow:hidden;'
    } else {
        app.style.cssText = ''
    }
}

const onSwitchLang = (lang: string) => {
    localStorage.setItem('lang', lang)
    showLoadingToast({
        duration: 1000,
        forbidClick: true,
        message: '语言切换中...',
        onClose: () => {
            showLoadingToast({
                duration: 1000,
                type: 'success',
                message: '切换成功',
                forbidClick: true,
                onClose: () => {
                    location.reload()
                }
            })
        }
    })
}
</script>