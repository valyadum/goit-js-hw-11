
import NewsApiService from "./API-serch";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');
const loadMoreField =document.querySelector('.load-div')

const newsApiService = new NewsApiService();
const optionsForObserver = {
    rootMargin: '250px',
};
const observer = new IntersectionObserver(loadMore, optionsForObserver);


form.addEventListener('submit', getImage);
// loadMoreBtn.addEventListener('click', loadMore);

// loadMoreBtn.classList.add('hide');


function getImage(event) {
    event.preventDefault();
    // loadMoreBtn.disabled = true;
    newsApiService.query = event.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage();
    newsApiService.resetTotalPage();
   
    if (!newsApiService.query.trim()) {
        // loadMoreBtn.classList.add('hide');
        gallery.innerHTML = '';
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    newsApiService.fetchArticles()
        .then(({ hits, totalHits }) => {
            if (!hits.length) {
                // loadMoreBtn.classList.add('hide');
                // loadMoreBtn.disabled = true;
                gallery.innerHTML = '';
                return Notify.failure("Sorry, there are no images matching your search query. Please try again.");;
            }
            else {
                clearGallery();
                observer.observe(loadMoreField);
                appendMarkup(hits);
                newsApiService.getTotalPage(hits);
                Notify.success(`Hooray! We found ${totalHits} images.`)
                lightbox.refresh();
                // loadMoreBtn.classList.remove('hide');
                // loadMoreBtn.disabled = false;
            }
            if (hits.length === totalHits) {
                // loadMoreBtn.classList.add('hide');
                observer.unobserve(loadMoreField);
                return Notify.failure("We're sorry, but you've reached the end of search results.");
            }
        })
        .catch((error) => { console.log(error) }).finally(
            form.reset()
        );
    observer.unobserve(loadMoreField); 
}
function clearGallery() {
    gallery.innerHTML = '';
}
function appendMarkup(hits) {
    gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
}

function loadMore() {
    // loadMoreBtn.disabled = true;
    newsApiService.fetchArticles()
        .then(({ hits, totalHits }) => {
            if (hits.length < totalHits) {
                console.log("norm");
                // if (totalHits === hits.length) {
                //     observer.unobserve(loadMoreField);
                //     return Notify.failure("We're sorry, but you've reached the end of search results.");
                // }
                appendMarkup(hits);
                lightbox.refresh();
                // loadMoreBtn.disabled = false;
            } else {
                console.log("many");
                // loadMoreBtn.classList.add('hide');
                // loadMoreBtn.disabled = true;
                observer.unobserve(loadMoreField);
                return Notify.failure("We're sorry, but you've reached the end of search results.");

            }
        })
        .catch((error) => { console.log(error) });
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
