
import NewsApiService from "./API-serch";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');

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
        if (!hits) {
            loadMoreBtn.classList.add('hide');
            loadMoreBtn.disabled = true;
            gallery.innerHTML = '';
            return;
        }
        else {
            clearGallery();
            appendMarkup(hits);
            lightbox.refresh();
            loadMoreBtn.classList.remove('hide');
            loadMoreBtn.disabled = false;
        }
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
        if (!hits) {
            loadMoreBtn.classList.add('hide');
            loadMoreBtn.disabled = true;
            return;
        }
        appendMarkup(hits);
        lightbox.refresh();
        loadMoreBtn.disabled = false;
    });
}
function createMarkup(hits) {
    return hits?.map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `
                <div class="photo-card">
                <a class="gallery__link" href="${largeImageURL}">
                   <img class= "image" src='${webformatURL}' alt="${tags}" loading="lazy" />
                   </a>
                     <div class="info">
                     <p class="info-item">
                       <b>Likes <span class="number"> ${likes}</span></b>
                     </p>
                     <p class="info-item">
                      <b>Views<br>  <span class="number"> ${views}</span></b>
                    </p>
                    <p class="info-item">
                      <b>Comments <span class="number"> ${comments}</span> </b>
                    </p>
                    <p class="info-item">
                      <b>Downloads <span class="number"> ${downloads}</span></b>
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
