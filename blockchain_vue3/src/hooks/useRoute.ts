import { useRouter } from 'vue-router'
import { useAllDataStore } from '@/store'
const store = useAllDataStore()

export default function () {
    const router = useRouter()
    const menuChange = (res: any) => {
        router.push({ path: res })
        if (res == '/home/chart') {
            store.bread = ""
            store.siderIndex = 1
        }
        if (res == '/home/list') {
            store.bread = "农产品数据"
            store.siderIndex = 2
        }
        if (res == '/home/typein') {
            store.bread = "农产品数据录入"
            store.siderIndex = 3
        }
        if (res == '/home/trade') {
            store.bread = "交易市场"
            store.siderIndex = 4
        }
        if (res == '/home/user') {
            store.bread = "个人中心"
            store.siderIndex = 5
        }
    }

    return {menuChange}
}