const siteUrl = 'https://tearfully-earthy-finfoot.cloudpub.ru/';
const styleUrl = siteUrl + 'static/css/bookmarklet.css';
const minWidth = 250;
const minHeight = 250;

// загрузить CSS
let head = document.getElementsByTagName('head')[0];
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = styleUrl + '?r=' + Math.floor(Math.random() * 1e16);
head.appendChild(link);

// загрузить HTML
let body = document.getElementsByTagName('body')[0];
let div = document.createElement('div');
div.id = 'bookmarklet';
div.innerHTML = '<a href="#" id="close">&times;</a><h1>Select an image to bookmark:</h1><div class="images"></div>';
body.appendChild(div);

function bookmarkletLaunch() {
  let bookmarklet = document.getElementById('bookmarklet');
  let imagesFound = bookmarklet.querySelector('.images');
  imagesFound.innerHTML = '';
  bookmarklet.style.display = 'block';

  bookmarklet.querySelector('#close').addEventListener('click', function() {
    bookmarklet.style.display = 'none';
  });

  let images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');
  images.forEach(image => {
    if (image.naturalWidth >= minWidth && image.naturalHeight >= minHeight) {
      let imageFound = document.createElement('img');
      imageFound.src = image.src;
      imagesFound.append(imageFound);
    }
  });

    // событие выбора изображения
  imagesFound.querySelectorAll('img').forEach(image => {
    image.addEventListener('click', function(event){
      imageSelected = event.target;
      bookmarklet.style.display = 'none';
      window.open(siteUrl + 'images/create/?url='
                  + encodeURIComponent(imageSelected.src)
                  + '&title='
                  + encodeURIComponent(document.title),
                  '_blank');
    })
  })

}

// запустить букмарклет
bookmarkletLaunch();
