const baseUri = "https://exerciserestjsuserstory.azurewebsites.net/api/Records";

const app = Vue.createApp({
    data() {
        return {
            records: [],
            error: null,
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
        }
    },
    async created() {
        await this.getRecords(baseUri)
    },
    methods: {
        searchRecords() {
            this.appliedSearchQuery = { ...this.searchQuery }
        },
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