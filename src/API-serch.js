import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        // this.totalPage = 0;
    }
  async fetchArticles() {
       const BASE_URL = 'https://pixabay.com/api/';
       const params = new URLSearchParams({
           key: '39875248-e66a9da82da2239ad899e3cdb',
           q: `${this.searchQuery}`,
           image_type: 'photo',
           orientation: 'horizontal',
           safesearch: true,
           page: `${this.page}`,
           per_page: 40,
       });
       try {
           const response = await axios.get(`${BASE_URL}`, { params });
           this.page += 1;
        //    const perPage = params.per_page;
                
           return response.data;
       }
       catch (error) {
           console.log(error);
       }
        // return axios.get(`${BASE_URL}`, { params })
        //     .then(response => response.data)
        //     .then((data) => {

        //         const total = data.totalHits;
        //         const perPage = params.per_page;
        //         this.totalPage = Number((total / perPage).toFixed(0));
        //         if (data.hits.length === 0 || this.query.trim() === '') {
        //             return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        //         } else {
        //             if (this.page < this.totalPage) {
        //                 if (this.page === 1) { Notify.success(`Hooray! We found ${total} images.`) }
        //                 this.page += 1;
        //                 return data.hits;
        //             }
        //             else {
        //                 return Notify.failure("We're sorry, but you've reached the end of search results.");
        //             }
        //         }
        //     })
        //     .catch(error => console.log(error))
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
    // getTotalPage(hits,totalHits) {
    //     this.totalPage = Number((totalHits / perPage).toFixed(0));
    //     return this.totalPage;
    // }
    resetTotalPage() {
        this.totalPage = 0;
    }

}
