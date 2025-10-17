<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const pushActivity = () => {
    router.push('/login')
}
</script>

<template>
    <div class="to-home">
        <h1 class="first-line"><text class="first-line-text">网络貌似出现了问题</text></h1>
        <h2 class="sceond-line">请检查网络</h2>
        <button class="click-to-home" @click="pushActivity">
            <text class="button-text">豪德</text>
        </button>
    </div>
</template>

<style scoped>
.to-home {
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    .first-line {
        background-color: #b26060;

        .first-line-text {
            color: #000;
        }
    }

    .click-to-home {
        width: 50px;

        .button-text {
            color: #149846;
        }
    }
}
</style>