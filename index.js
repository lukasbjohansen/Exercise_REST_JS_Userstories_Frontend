const baseUri = "https://exerciserestjsuserstory.azurewebsites.net/api/Records";
const authUrl       = "http://127.0.0.1:42069/api/Auth/login";
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
            },
            auth: { username: "", password: "" },
            authMessage: null,
            jwtToken: null,
            role: null,
            loggedIn: false
        }
    },
    async created() {
        await this.search();
    },
    methods: {
         async login(){
             axios.post(authUrl, this.auth)
                .then(response => {
                    this.jwtToken = response.data.token;
                    this.role = response.data.role;
                    this.loggedIn = true;
                    this.authMessage = "Authentication successful";
                    this.search(); // Fetch records immediately after successful login
                }).catch(ex => {
                    this.authMessage = "Authentication failed - " + ex.message;
                });
        },
        logout() {
            this.jwtToken = null;
            this.role = null;
            this.loggedIn = false;
            this.auth = { username: "", password: "" };
            this.records = [];
            this.error = null;
            this.authMessage = "Logged out successfully";
        },
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
        },
    }
}).mount('#app');