function showFilter() {
    if (document.getElementById("filterContent").style.display === "block") {
        document.getElementById("filterContent").style.display = "none";
    }
    else {
        document.getElementById("filterContent").style.display = "block";
    }
}

function filterArticles() {
    let opinionChecked = document.getElementById("opinionCheckbox").checked;
    let recipeChecked = document.getElementById("recipeCheckbox").checked;
    let updateChecked = document.getElementById("updateCheckbox").checked;

    let opinionArticles = document.getElementsByClassName("opinion");
    let recipeArticles = document.getElementsByClassName("recipe");
    let updateArticles = document.getElementsByClassName("update");

    for (let i = 0; i < opinionArticles.length; i++) {
        opinionArticles[i].style.display = opinionChecked ? "block" : "none";
    }
    for (let i = 0; i < recipeArticles.length; i++) {
        recipeArticles[i].style.display = recipeChecked ? "block" : "none";
    }
    for (let i = 0; i < updateArticles.length; i++) {
        updateArticles[i].style.display = updateChecked ? "block" : "none";
    }
}

function showAddNew() {
    if (document.getElementById("newContent").style.display === "block") {
        document.getElementById("newContent").style.display = "none";
    }
    else {
        document.getElementById("newContent").style.display = "block";
    }
}

function addNewArticle() {
    let title = document.getElementById("inputHeader").value;
    let type = "";
    if (document.getElementById("opinionRadio").checked) {
        type = "opinion";
    }
    else if (document.getElementById("recipeRadio").checked) {
        type = "recipe";
    }
    else if (document.getElementById("lifeRadio").checked) {
        type = "update";
    }
    let content = document.getElementById("inputArticle").value
    let newArticle = document.createElement("article");
    newArticle.className = type;
    newArticle.id = "a" + (document.getElementById("articleList").children.length + 1);
    newArticle.innerHTML = `<span class="marker">${type.charAt(0).toUpperCase() + type.slice(1)}</span><h2>${title}</h2><p>${content}</p>`;
    document.getElementById("articleList").appendChild(newArticle);
}
