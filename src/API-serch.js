import axios from "axios";

export default class NewsApiService {
    constructor()
    {
        this.searchQuery = '';
        this.page = 1;
        this.totalPage;
    }
    fetchArticles() {
        const BASE_URL = 'https://pixabay.com/api/';
        const params = {
            key: '39875248-e66a9da82da2239ad899e3cdb',
            q: `${this.searchQuery}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page:`${this.page}`,
            per_page:40,
        }
        console.log(this.searchQuery);
        return axios.get(`${BASE_URL}`, { params })
            .then(response => response.data)
            .then((data) => {
                this.page += 1;
                const total = data.totalHits;
                const perPage = params.per_page;
                // console.log(total, perPage);
                this.getTotalPage(total, perPage);
                return data.hits;
            })
            .catch(error => console.log(error))
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;

    }
    getTotalPage(total,perPage) {
        this.totalPage = Number((total/ perPage).toFixed(0));
        console.log(this.totalPage);
        return this.totalPage;
                
    }
}
