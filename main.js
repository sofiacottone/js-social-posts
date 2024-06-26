// Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:

// Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.

// Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

// BONUS
// 1. Formattare le date in formato italiano (gg/mm/aaaa)
// 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
// 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

//MILESTONE 1
// stampo i post
const postContainer = document.querySelector('#container');
posts.forEach((singlePost) => {
    const postTemplate = generateSinglePostTemplate(singlePost);
    postContainer.innerHTML += postTemplate;
});

//MILESTONE 2
// seleziono l'elemento del DOM
const allLikeBtn = document.querySelectorAll('.js-like-button');
const allLikeCounters = document.querySelectorAll('.js-likes-counter');

const likedPosts = [];

allLikeBtn.forEach((likeButton, index) => {
    likeButton.addEventListener('click', function (event) {
        event.preventDefault();

        const relatedCounter = allLikeCounters[index];
        const relatedCounterNumber = parseInt(relatedCounter.innerHTML);

        if (!this.classList.contains('like-button--liked')) {

            // cambio il colore del testo del bottone
            //  aggiungendo la classe 'like-button--liked'
            this.classList.add('like-button--liked');

            // seleziono il counter dei like e incremento al click
            relatedCounter.innerHTML = relatedCounterNumber + 1;

            // seleziono l'id
            const postId = parseInt(this.dataset.postid);
            // pusho l'id dei like
            likedPosts.push(postId);

        } else {
            this.classList.remove('like-button--liked');
            // seleziono il counter dei like e decremento al click
            relatedCounter.innerHTML = relatedCounterNumber - 1;

        }
    });

});

// #region FUNCTIONS

// 1
// funzione per generare i singoli post
// postObject -> oggetto che contiene le informazioni sul post
// return -> stringa che va inserita nel DOM contenente il template del post da stampare
function generateSinglePostTemplate(postObject) {

    const { id, content, media, author, likes, created } = postObject;

    // bonus 1
    const createdArray = created.split('-');
    const [year, month, day] = createdArray;
    const newDate = `${day}/${month}/${year}`

    const postTemplate = `
    <div class="post">
        <div class="post__header">
            <div class="post-meta">
                <div class="post-meta__icon">
                    ${getImageTemplate(author)}
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${author.name}</div>
                    <div class="post-meta__time">${newDate}</div>
                </div>
            </div>
        </div>
        <div class="post__text">${content}</div>
        <div class="post__image">
            <img src="${media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button js-like-button" href="#" data-postid="${id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                </div>
            </div>
        </div>
    </div>
    `;
    return postTemplate;
};

// 2
// restituisce un'immagine del profilo se presente, altrimenti stampa le iniziali
// author -> oggeto da cui andare a recuperare le informazioni
// return -> stringa che va inserita nel DOM
function getImageTemplate(author) {
    let imageString;

    if (author.image) {
        imageString = `<img class="profile-pic" src="${author.image}" alt="${author.name}">`;
    } else {
        const authorNameArray = author.name.split(' ');
        const [name, lastname] = authorNameArray;
        imageString = `
        <div class="profile-pic-default">
            <span>${name[0]}${lastname[0]}</span>
        </div>`;
    }

    return imageString;
};
// #endregion