<script setup lang="ts">
import request from '@/utils/request';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { initLoginStore, type UserInfo } from '@/stores/counter';

const route = useRouter();
const userName = ref('');
const passWord = ref('');
const authData = initLoginStore();


const junmpingToReSetCode = async () => {
    try {
        route.push('ResetCode');
    }
    catch (error) {
        alert(error);
    }
    finally {

    }
}
const jumpingToHomePage = async () => {
    try {
        if (!userName.value) {
            alert("请填写用户名");
            return;
        }
        else if (!passWord.value) {
            alert("请填写密码");
            return;
        }

        const requestData = await request.post('/api/login/login/', {
            username: userName.value,
            password: passWord.value,
        })
        const tmpData = requestData.data;
        if (tmpData) {
            const userInfo: UserInfo = {
                id: userName.value,
                name: passWord.value,
                token: tmpData.token,
                falsetime: Date.now() + 3600 * 1000 * 24,
            };
            if (!tmpData.userinfo) {
                authData.login(userInfo);
            }
            else { authData.updateToken(tmpData.token); }

            route.push("/");
        }
        else {
            alert("请先注册账号" + `${tmpData.token}`);
        }
    }
    catch (error) {
        route.push("/404");
        console.log(error);
    }
    finally {

    }

}
</script>

<template>
    <div class="login-container">
        <div class="login-in">
            <img class="head-picture" src="/favicon.ico" alt="应用图标">
            <div class="user-message">
                <input class="input-wrapper" type="text" v-model="userName" placeholder="用户名">
                <input class="input-wrapper" type="password" v-model="passWord" placeholder="密码">
            </div>
            <div class="button-group">
                <button class="forget-button" @click="junmpingToReSetCode">忘记密码</button>
                <button class="login-button" @click="jumpingToHomePage">登录</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 25vh;
    background-color: #f5f5f5;
    box-sizing: border-box;

    .login-in {
        width: 100%;
        max-width: 320px;
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        background-color: #fff;
        border-radius: 12px;

        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

        .head-picture {
            width: 60px;
            height: 60px;
            margin-bottom: 10px;
            border-radius: 50%;
            object-fit: cover;
        }

        .user-message {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;

            .input-wrapper {
                width: 90%;
                padding: 12px 15px;
                border: 1px solid #ddd;
                border-radius: 8px;
                outline: none;
                font-size: 16px;
                transition: all 0.2s ease;

                &:focus {
                    border-color: #42b983;
                    box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);

                    &::placeholder {
                        opacity: 0;
                        transition: opacity 0.1s ease;
                    }
                }
            }
        }


        .button-group {
            display: flex;
            justify-content: space-between;
            width: 100%;
            gap: 80px;
            margin-top: 10px;

            .forget-button,
            .login-button {
                padding: 12px 0;
                flex: 1;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.2s ease;
                border: none;
            }

            .forget-button {
                background-color: #f5f5f5;
                color: #666;
            }

            .login-button {
                background-color: #42b983;
                color: #fff;
                font-weight: 500;
            }

            .forget-button:hover,
            .login-button:hover {
                opacity: 0.9;
                transform: translateY(-2px);
            }

            .forget-button:active,
            .login-button:active {
                transform: translateY(0);
            }
        }
    }
}
</style>
