<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref } from 'vue';
import { initLoginStore } from '@/stores/counter';
const userinfo = initLoginStore();

defineOptions({
    name: "PersonalCenter"
})
const defaultState = ref(true);
const drawerState = ref(true);
const shopState = ref(true);

const defaultText = ref('通用部分 ▼');
const drawerText = ref('通用部分 ▼');
const shopText = ref('通用部分 ▼');


const staticImgs = {
    shopWindow: '/AA我的橱窗.png',
    plan: '/AA我的企划.png',
    like: '/AA我的喜欢.png',
    history: '/AA历史记录.png',
    receivedPlan: '/AA接到企划.png',
    wallet: '/AA我的钱包.png',
    sold: '/AA橱窗售出.png',
    myApply: '/AA我的应征.png',
    windowCollect: '/AA收藏橱窗.png',
    goodsPurchase: '/AA商品购买.png',
    goodsCollect: '/AA商品收藏.png',
    myData: '/AA我的数据.png',
    deadline: '/AA截稿日期.png',
    orderManagement: '/AA订单管理.png',
    myDelivery: '/AA快递包裹.png',
    afterSalesOrder: '/AA售后订单.png',
};

const preloadImageUrls = [
    staticImgs.shopWindow,
    staticImgs.plan,
    staticImgs.like,
    staticImgs.history,
    staticImgs.receivedPlan,
    staticImgs.wallet,
    staticImgs.sold,
    staticImgs.myApply,
    staticImgs.windowCollect,
    staticImgs.goodsPurchase,
    staticImgs.goodsCollect,
    staticImgs.myData,
    staticImgs.deadline,
    staticImgs.orderManagement,
    staticImgs.myDelivery,
    staticImgs.afterSalesOrder,
];

const ChangeState = (e: number) => {
    if (e == 0) {
        defaultState.value = defaultState.value ? false : true;
        defaultText.value = defaultState.value ? '通用部分 ▼' : '通用部分 ▶'
    }
    else if (e == 1) {
        drawerState.value = drawerState.value ? false : true;
    }

    else {
        shopState.value = shopState.value ? false : true;
    }
}
const responseData = ref<{
    id: string;
    name: string;
    description: string;
    fans: number,
    focus: number,
    image: string;
    userimage: string;
    beloved: number;
    collected: number;
}>();

const mockGoodsData = {
    id: '1',
    name: '秋兽狴犴',
    description: '立绘练习【十月排单】大大',
    fans: 99999,
    focus: 1,
    image: '/02_daring.ico',
    userimage: '/02_daring.ico',
    beloved: 10,
    collected: 20
};
</script>

<template>
    <div class="personal-body">
        <div class="person-message">
            <div class="reset-sth">
                <button class="button-cmt"><img src="/设置.png" alt="设置" /></button>
            </div>
            <div class="show-detail scroll-container">
                <div class="content-rows">
                    <div class="row row-1">
                        <button class="up-div-cmt">
                            <div class="user-info-cmt">
                                <img class="user-img-cmt" v-lazy="mockGoodsData.userimage" alt="用户头像" />
                                <div class="user-cmt">
                                    <div class="user-name-cmt">{{ mockGoodsData.name }}</div>
                                    <div class="user-data-about">
                                        <div class="you-got-fans">粉丝:{{ mockGoodsData.fans }}</div>
                                        <div class="you-got-focus">关注:{{ mockGoodsData.focus }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="whatever-named"> ></div>
                        </button>
                    </div>
                    <div class="row-2">
                        <button class="label-change" @click="ChangeState(0)">
                            <div class="state-item">
                                <div class="triangle-text">通用部分</div>
                                <img class="triangle-icon" :class="{ rotate: !defaultState }" src="/defaultPaw.png"
                                    alt="爪子" />
                            </div>
                        </button>
                        <div class="user-stats" v-show="defaultState">
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.shopWindow" alt="我的橱窗" />
                                <span class="stat-label">我的橱窗</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.plan" alt="我的企划" />
                                <span class="stat-label">我的企划</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.like" alt="我的喜欢" />
                                <span class="stat-label">喜欢作品</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.wallet" alt="我的钱包" />
                                <span class="stat-label">我的钱包</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.windowCollect" alt="接到企划" />
                                <span class="stat-label">收藏橱窗</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.goodsPurchase" alt="售出" />
                                <span class="stat-label">商品购买</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.goodsCollect" alt="应征" />
                                <span class="stat-label">收藏商品</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.history" alt="历史记录" />
                                <span class="stat-label">历史记录</span>
                            </button>
                        </div>
                    </div>

                    <div class="row row-2">
                        <div class="label-change">
                            <button class="state-item" style="color:darkorchid;" @click="ChangeState(1)">
                                <div class="triangle-text">画师部分</div>
                                <img class="triangle-icon" :class="{ rotate: !drawerState }" src="/drawerPaw.png"
                                    alt="爪子" />
                            </button>
                            <button class="click-to-drawer"><span class="drawer-text">进入画师主页</span></button>
                        </div>

                        <div class="user-stats" v-show="drawerState">
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.sold" alt="售出" />
                                <span class="stat-label">橱窗出售</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.myApply" alt="应征" />
                                <span class="stat-label">我的应征</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.receivedPlan" alt="接到企划" />
                                <span class="stat-label">接到企划</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.myData" alt="我的数据" />
                                <span class="stat-label">我的数据</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.deadline" alt="截稿日期" />
                                <span class="stat-label">截稿日期</span>
                            </button>
                        </div>
                    </div>

                    <div class="row-2">
                        <div class="label-change">
                            <button class="state-item" style="color:brown;" @click="ChangeState(2)">
                                <div class="triangle-text">商铺部分</div>
                                <img class="triangle-icon" :class="{ rotate: !shopState }" src="/shopPaw.png"
                                    alt="爪子" />

                            </button>
                            <button class="click-to-shop"><span class="shop-text">进入商铺主页</span></button>
                        </div>
                        <div class="user-stats" v-show="shopState">
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.orderManagement" alt="订单管理" />
                                <span class="stat-label">订单管理</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.afterSalesOrder" alt="售后订单" />
                                <span class="stat-label">售后订单</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.myDelivery" alt="快递包裹" />
                                <span class="stat-label">快递包裹</span>
                            </button>
                            <button class="stat-item">
                                <img class="stat-value" :src="staticImgs.myData" alt="我的数据" />
                                <span class="stat-label">我的数据</span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.personal-body {
    width: 100%;
    min-height: 100vh;
    background-color: #f9f9f9;
}

.person-message {
    width: 100%;
    margin: 0 auto;
    position: relative;
}


.reset-sth {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 10;
    display: flex;
    padding: 6px;

}

.button-cmt {
    width: 40px;
    height: 40px;
    border: none;
    background: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button-cmt img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: saturate(1);
}

.show-detail {
    width: 100%;
    background: linear-gradient(to bottom, #ffffff, #ffffff81);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 0;
    position: relative;
}

.scroll-container {
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    overflow-x: hidden;
    padding-top: 60px;
}

.content-rows {
    width: 100%;
    height: 100%;
    display: block;
    padding: 16px;
}


.row-1 .up-div-cmt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: none;
    padding-bottom: 4vw;
    background: none;
    transition: transform 0.2s;
    flex: 1;
}

.whatever-named {
    font-size: 6vw;
    color: #888;
    font-weight: 300;
}

.user-info-cmt {
    display: flex;
    align-items: center;
    gap: 2vw;
}

.user-img-cmt {
    width: 14vw;
    height: 14vw;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-cmt {
    flex: 1;
    width: 100%;
    display: flex;
    flex-flow: column;

    .user-name-cmt {
        font-size: 4.5vw;
        font-weight: 600;
        color: #000000;
        display: flex;
    }

    .user-data-about {
        display: flex;
        gap: 5vw;
    }
}

.row-2 {
    .user-stats {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        border: none;
        padding-bottom: 5vw;
        padding-left: 5vw;
    }

    .label-change {
        display: flex;
        align-items: center;
        border: none;
        background: scroll;
        padding-bottom: 1.5vw;
        gap: 65px;

        .state-item {
            display: flex;
            align-items: center;
            border: none;
            background: scroll;
            padding-bottom: 1.5vw;

            .triangle-icon {
                width: 40px;
                height: 40px;
                object-fit: cover;
            }

            .triangle-icon.rotate {
                transform: rotate(90deg);
            }
        }

        .click-to-drawer {
            border: none;
            background-color: darkorchid;
            border-radius: 8%;
            padding: 0px 8px;

            .drawer-text {
                color: rgb(255, 255, 255);
                font-size: 14px;
            }
        }

        .click-to-shop {
            border: none;
            background-color: brown;
            border-radius: 8%;
            padding: 0px 8px;

            .shop-text {
                color: rgb(255, 255, 255);
                font-size: 14px;
            }
        }
    }
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    padding: 1px;
    border-radius: 12px;
    transition: all 0.2s;
}

.stat-value {
    width: 12vw;
    height: 12vw;
    object-fit: contain;
    border-radius: 8px;
}

.stat-label {
    font-size: 12px;
    color: #777;
    font-weight: 500;
}

@media (max-width: 600px) {
    .works-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    .row-2 .user-stats {
        gap: 10px;
    }

    .stat-item {
        width: 80px;
        padding: 6px;
    }
}
</style>
