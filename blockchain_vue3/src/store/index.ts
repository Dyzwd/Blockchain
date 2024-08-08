import { defineStore } from 'pinia'

export const useAllDataStore = defineStore('allData',{
    state(){
        return {
            isCollapse: false,
            bread:"",
            login:[
                {
                    name:"admin",
                    password:"123456"
                }
            ]
        }
    }   
})