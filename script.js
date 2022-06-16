//var defaultUrl = ""; --endereço da api aqui
//var modal = document.getElementById("myModal"); --local onde será criado
//var listProd = document.getElementById("listProducts");

//definindo de onde vem as categorias e os produtos
getCategories(defaultUrl);
getProducts(defaultUrl);

//CATEGORIES - pegando informações da api para criar itens (categories) e botões (paginação)
function getCategories(url) {
  return axios({
    method: "GET",
    url,
    data: {
      limit: 4,
    },
  }).then((response) => {
    createItemsCategories(response.data.results);
  });
}

//abre a lista de produtos da categoria selecionada
function getCategory(url) {
  return axios({
    method: "GET",
    url,
  }).then((response) => {
    //chamar a function getProducts ou já a lista?
    populateListProdContent(response.data);
    openListProd();
  });
}

function createItemsCategories(data) {
    const div = document.getElementById("itemsCat");
    div.innerHTML = "";
    for (let item of data) {
      const d = document.createElement("div");
      d.setAttribute("class", "item");
      d.append(createTag("p", `${item.name.toUpperCase()}`));
      d.addEventListener("click", function () {
        getCategory(defaultUrl + `/${item.name}`);
      });
      div.append(d);
    }
  }

//PRODUCTS - pegando informações da api para criar itens e botões de paginação
function getProducts(url) {
    return axios({
      method: "GET",
      url,
      data: {
        limit: 5,
      },
    }).then((response) => {
      createItemsProducts(response.data.results);
      createButtons(response.data);
    });
  }
  
  //alterar essas funções para exibir os produtos
  function getProduct(url) {
    return axios({
      method: "GET",
      url,
    }).then((response) => {
        populateListProdContent(response.data);
      openModal();
    });
  }

  function createItemsProducts(data) {
    const div = document.getElementById("itemsProd");
    div.innerHTML = "";
    for (let item of data) {
      const d = document.createElement("div");
      d.setAttribute("class", "item");
      d.append(createTag("p", `${item.name.toUpperCase()}`));
      d.addEventListener("click", function () {
        getProduct(defaultUrl + `/${item.name}`);
      });
      div.append(d);
    }
  }


  //paginação (fazer em números)
  function createButtons(data) {
    const div = document.getElementById("buttons");
    div.innerHTML = "";
  
    if (data.previous) {
      div.append(createButton("Anterior", data.previous));
    }
  
    if (data.next) {
      div.append(createButton("Próximo", data.next));
    }
  }
  
  function createTag(type, text) {
    const tag = document.createElement(type);
    const value = document.createTextNode(text);
    tag.append(value);
    return tag;
  }
  
  function createButton(name, url) {
    const b = createTag("button", name);
    const arrUrl = url.split("&")[0] + "&limit=5";
    b.setAttribute("class", "btn");
    b.addEventListener(
      "click",
      function () {
        getProducts(url);
      },
      false
    );
    return b;
  }



  //preencher campos dos produtos
  function populateListProdContent(item) {
    const div = document.getElementsByClassName("modal-body")[0];
    div.innerHTML = "";
  
    const h3 = createTag("h3", item.name.toUpperCase());
  
    const divImg = createTag("div", "");
    divImg.setAttribute("class", "modal-div-img");
  
    const frontImg = createTag("img", "");
    frontImg.setAttribute("src", item.sprites.front_default);
  
    const backImg = createTag("img", "");
    backImg.setAttribute("src", item.sprites.back_default);
  
    divImg.append(frontImg);
    divImg.append(backImg);
    div.append(h3);
    div.append(divImg);
  }
  
function openListProd() {
  modal.style.display = "flex";
}

function closeListProd() {
    modal.style.display = "none";
  }
