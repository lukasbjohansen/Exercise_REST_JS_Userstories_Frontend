const baseUri = "https://exerciserestjsuserstory.azurewebsites.net/api/Records";

const app = Vue.createApp({
    data() {
        return {
            records: [],
            error: null,
<<<<<<< Updated upstream
            searchQuery: {
                title: "",
                artist: "",
                duration: "",
                publicationYear: ""
            },
            appliedSearchQuery: null
        }
    },
    computed: {
        filteredRecords() {
            if (!this.appliedSearchQuery) {
                return this.records
            }

            const { title, artist, duration, publicationYear } = this.appliedSearchQuery
            return this.records.filter(record =>
                (!title || record.title.toLowerCase().includes(title.toLowerCase())) &&
                (!artist || record.artist.toLowerCase().includes(artist.toLowerCase())) &&
                (!duration || Number(record.duration) === Number(duration)) &&
                (!publicationYear || String(record.publicationYear) === publicationYear)
            )
=======
            searchParams: {
                title: null,
                artist: null,
                publicationYear: null,
                minDuration: null,
                maxDuration: null
            }
>>>>>>> Stashed changes
        }
    },
    async created() {
        await this.search();
    },
    methods: {
<<<<<<< Updated upstream
        searchRecords() {
            this.appliedSearchQuery = { ...this.searchQuery }
        },
        async getRecords(uri){
=======
        async getRecords(uri, params = {}) {
>>>>>>> Stashed changes
            try {
                if (params.minDuration != null)
                    params.minDuration = Math.floor(params.minDuration * 60)
                if (params.maxDuration != null)
                    params.maxDuration = Math.floor(params.maxDuration * 60)
                const response = await axios.get(uri, { params: params });
                
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