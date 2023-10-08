import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
                this.totalPage = Number((total / perPage).toFixed(0));
                if (data.hits.length === 0 || this.query.trim() === '') {
                    return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                } else {
                    if (this.page < this.totalPage) {
                        Notify.success(`Hooray! We found ${total} images.`);
                    
                      
                        return data.hits;
                    }
                    else {
                        return Notify.failure("We're sorry, but you've reached the end of search results.");
                    }
                }
                // console.log(total, perPage);
                // this.getTotalPage(total, perPage);
               
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
    // getTotalPage(total,perPage) {
        
    //     console.log(this.totalPage);
    //     if (this.page < this.totalPage) {
    //         return data.hits; 
    //     }
    //     return console.log("We're sorry, but you've reached the end of search results.");
                
    // }
}
