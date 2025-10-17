import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export interface GoodsInfo {
  id: string
  name: string
  token: string
  falsetime:number
}

export const goodsContentStore = defineStore('goods', () => {



})