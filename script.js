const accessKey = "R2wv048y7ub-QQHDXH9xXz-LODkl7GoUdi1wVws-xs0";

const searchBox = document.querySelector(".search__box");
const searchBtn = document.querySelector(".search__btn");

const showMore = document.querySelector(".show__more");

const imagesContainer = document.querySelector(".images__container");

let keyWord = "";
let page = 0;

searchBox.focus();

async function searchImages() {
  keyWord = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?per_page=16&page=${page}&query=${keyWord}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  results.map(function (result) {
    const image = document.createElement("img");
    image.src = result.urls.small;

    const aTag = document.createElement("a");
    aTag.href = result.links.html;

    aTag.appendChild(image);
    aTag.target = "_blank";

    const box = document.createElement("div");
    box.classList.add("box");

    box.appendChild(aTag);
    imagesContainer.appendChild(box);
  });

  if (imagesContainer.innerHTML != "") {
    showMore.style.display = "block";
  } else {
    showMore.style.display = "none";
  }
}

searchBtn.addEventListener("click", function (e) {
  if(imagesContainer.innerHTML === ""){
    alert('Plz search a valid name')
  }else{
    if (searchBox.value != "") {
      imagesContainer.innerHTML = "";
      e.preventDefault();
      page = 1;
      searchImages();
    } else {
      alert("Please search a valid name");
    }
  }


  showMore.addEventListener("click", function (e) {
    page++;
    searchImages();
  });
});
