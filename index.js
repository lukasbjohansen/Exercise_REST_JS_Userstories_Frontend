const baseUri = "https://exerciserestjsuserstory.azurewebsites.net/api/Records";

const app = Vue.createApp({
    data() {
        return {
            records: [],
            error: null,
            searchParams: {
                title: null,
                artist: null,
                publicationYear: null,
                minDuration: null,
                maxDuration: null
            }
        }
    },
    async created() {
        await this.search();
    },
    methods: {
        async getRecords(uri, params = {}) {
            try {
                const queryParams = { ...params };
                
                // Omregner minutter til sekunder, da databasen/API'et forventer sekunder
                if (queryParams.minDuration != null && queryParams.minDuration !== '') {
                    queryParams.minDuration = Math.floor(queryParams.minDuration * 60);
                }
                if (queryParams.maxDuration != null && queryParams.maxDuration !== '') {
                    queryParams.maxDuration = Math.floor(queryParams.maxDuration * 60);
                }

                const response = await axios.get(uri, { params: queryParams });
                
                if (response.status === 204 || !response.data) {
                    this.records = [];
                } else {
                    this.records = response.data;
                }
                
                this.error = null;
            } catch (ex) {
                this.records = [];
                this.error = ex.message;
            }
        },
        async search() {
            const cleanParams = {};
            
            for (const [key, value] of Object.entries(this.searchParams)) {
                if (value !== null && value !== '' && value !== undefined) {
                    cleanParams[key] = value;
                }
            }
            
            await this.getRecords(baseUri, cleanParams);
        }
    }
}).mount('#app');