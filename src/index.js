
import NewsApiService from "./API-serch";



const BASE_URL = 'https://pixabay.com/api/';

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery')

const newsApiService = new NewsApiService();

form.addEventListener('submit', getImage);
loadMoreBtn.addEventListener('click', loadMore);

loadMoreBtn.classList.add('hide');

function getImage(event) {
    event.preventDefault();
    loadMoreBtn.disabled = true;
    newsApiService.query = event.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage();
    newsApiService.fetchArticles().then((hits) => {
        
        if (newsApiService.query.trim() === ''|| hits.length === 0) {
            loadMoreBtn.classList.add('hide');
            clearGallery();
            return alert("Sorry, there are no images matching your search query. Please try again.")
        }
        else {
         clearGallery();
        appendMarkup(hits);
        loadMoreBtn.classList.remove('hide');
        loadMoreBtn.disabled = false;   
        }
        // console.log(newsApiService.getTotalPage());

    });
   
    

}
function clearGallery() {
    gallery.innerHTML = '';
}
function appendMarkup(hits) {
    gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
}
function loadMore() {
    loadMoreBtn.disabled = true;
    newsApiService.fetchArticles().then((hits) => {
        appendMarkup(hits);
        loadMoreBtn.disabled = false;
    });
}
function createMarkup(hits) {
   return hits.map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `
                <div class="photo-card">
                   <img src='${webformatURL}' alt="${tags}" loading="lazy" />
                     <div class="info">
                     <p class="info-item">
                       <b>Likes ${likes}</b>
                     </p>
                     <p class="info-item">
                      <b>Views ${views}</b>
                    </p>
                    <p class="info-item">
                      <b>Comments ${comments}</b>
                    </p>
                    <p class="info-item">
                      <b>Downloads ${downloads}</b>
                    </p>
                    </div>
                </div>
            `
        }).join('');
    
}
//todo  додати перевірку на кількість сторінок, та прибирати кнопку при їх закінчені
// async function getImage(e, options) {
//     e.preventDefault();
//     console.log('hi');
//     try {
//         const response = await axios.get('https://pixabay.com/api/?key=39875248-e66a9da82da2239ad899e3cdb&q=yellow+flowers&image_type=photo', options)
//         console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// }
