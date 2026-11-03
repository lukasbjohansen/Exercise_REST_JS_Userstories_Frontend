const baseUri = "https://exerciserestjsuserstory.azurewebsites.net/api/Records";

const app = Vue.createApp({
    data() {
        return {
            records: [],
            error: null
        }
    },
    async created() {
        await this.getRecords(baseUri)
    },
    methods: {
        async getRecords(uri){
            try {
                const response = await axios.get(uri)
                this.records = await response.data
                this.error = null
            } catch (ex) {
                this.records = []
                this.error = ex.message
            }
        }
    }
}).mount('#app')