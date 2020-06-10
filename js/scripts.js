var newsRepo = function () {
  var newslist = [];
  var apiUrl = "https://api.currentsapi.services/v1/latest-news";

  function addListItem(newsItem) {
    var container = $(".grid-container");
    // new elements
    var containerItem = $("<div class='container_item'></div>");
    var newsTitle = $("<h1>" + newsItem.title + "</h1>");
    var newsImg = $("<img src='" + newsItem.image + "' alt='no image found'>");
    var newsMore = $("<button class = 'more_button'>See More</button>");

    container.appendChild(containerItem);
    containerItem.appendChild(newsTitle);
    containerItem.appendChild(newsImg);
    containerItem.appendChild(newsMore);
  }

  function add(newsItem) {
    newslist.push(newsItem);
  }

  function getAll() {
    return newslist;
  }

  function loadList() {
    return $.ajax({ url: apiUrl, dataType: "json" })
      .then(function (responseJson) {
        responseJson.forEach(function (item) {
          var news = {
            title: item.title,
            image: item.image,
            author: item.author,
            description: item.description,
            published: item.published,
            moreUrl: item.url,
          };
          add(news);
        });
      })
      .catch(function (e) {
        console.log("error:" + e.statusText);
      });
  }

  function showDetails(item) {}

  function showModal(item) {
    var modalContainer = $("#modal-container");

    modalContainer.innerHTML = "";

    var modal = $("<div class='modal'></div>");

    var closeButtonElement = $("<button class='modal-close'>Close<button>");
    closeButtonElement.addEventListener("click", hideModal);

    var titleElement = $("<h1>" + item.title + "</h1>");

    var imgElement = $("<img src='" + item.image + "'>");

    var contentElement = $("<p>" + item.description + "</p>");

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imgElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");

    window.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        modalContainer.classList.contains("is-visible")
      ) {
        hideModal();
      }
    });

    modalContainer.addEventListener("click", (e) => {
      var target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    var modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  return {
    addListItem: addListItem,
    add: add,
    getAll: getAll,
    loadList: loadList,
  };
};

newsRepo.loadList().then(function () {
  newsRepo.getAll().forEach(function (newsItem) {
    newsRepo.addListItem(newsItem);
  });
});
