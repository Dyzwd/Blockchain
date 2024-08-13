import { defineStore } from 'pinia'

export const useAllDataStore = defineStore('allData',{
    state(){
        return {
            isCollapse: false,
            bread:"",
            siderIndex:1,
            login:[
                {
                    name:"admin",
                    password:"123456"
                }
            ]
        }
    }   
})
