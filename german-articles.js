var nounContainer = document.getElementById("noun");
var matchContainer = document.getElementById("match");

var nounsRequest = new XMLHttpRequest();
nounsRequest.open('GET', 'https://raw.githubusercontent.com/edwinmh/deutsch-nomen-a1/master/nomen.json', true);

nounsRequest.onload = function() {
	if (nounsRequest.status >= 200 && nounsRequest.status < 400) {
		nounsData = JSON.parse(nounsRequest.responseText);
		console.log(nounsData.length);
		
		var position = getRandomInt(0, nounsData.length);
		var noun = getNoum(nounsData, position);
		var article = getArticle(nounsData, position);
		renderNounHTML(noun);

		document.body.addEventListener("click", function(event) {
			if (event.target.className == "btn-artikel") {
				addActiveClassButton(event.target.id);
				renderArticleMatchHTML(matchArticle(event.target.textContent, article));
			}

			if (event.target.className == "btn-next") {
				position = getRandomInt(0, nounsData.length);
				noun = getNoum(nounsData, position);
				article = getArticle(nounsData, position);
				renderArticleMatchHTML(matchArticle(event.target.textContent, article));
				renderNounHTML(noun);
				removeActiveClassButton();
			}
		});

	} else {
		console.log("We connected to the server, but it returned an error.");
	}
}

nounsRequest.onerror = function() {
	console.log("Connection error");
}

nounsRequest.send();

function renderNounHTML(noun) {
	var htmlString = "";

	htmlString = "<h2>" + noun + "</h2>";
	nounContainer.innerHTML = htmlString;
	matchContainer.innerHTML = "";
}

function renderArticleMatchHTML(boolean) {
	var htmlString = "";

	if (boolean == true)  { htmlString = "<span class='right'></span>"; }
	if (boolean == false) { htmlString = "<span class='wrong'></span>"; }

	matchContainer.innerHTML = htmlString;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function matchArticle(articleUser, articleNoun) {
	if (articleUser == articleNoun) {
		return true;
	} else {
		return false;
	}
}

function getNoum(nouns, position) {
	return nouns[position].wort;
}

function getArticle(nouns, position) {
	return nouns[position].artikel;
}

function addActiveClassButton(id) {
	document.getElementById("btn-der").className = "btn-artikel";
	document.getElementById("btn-die").className = "btn-artikel";
	document.getElementById("btn-das").className = "btn-artikel";
	document.getElementById(id).className += " active";
}

function removeActiveClassButton ()  {
	document.getElementById("btn-der").className = "btn-artikel";
	document.getElementById("btn-die").className = "btn-artikel";
	document.getElementById("btn-das").className = "btn-artikel";
}