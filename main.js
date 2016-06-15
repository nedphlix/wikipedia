var button;
var userInput;
var url;

function getUserInput() {
	userInput = document.getElementById("searchTerm").value;
	apiCall(userInput);
}

function apiCall(userInput) {
	url = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&search=" + userInput + "&callback=?";
	console.log(url);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var data = xmlhttp.responseText;
			var res = JSON.parse(data.substring(5, data.length - 1));
			updateDoc(res);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function updateDoc(res) {
	var length = res[1].length;
	
	var resultsp = document.createElement("h3");
	var resultspt = document.createTextNode("Results:");
	resultsp.appendChild(resultspt);
	resultsp.style.marginBottom="20px";
	document.getElementById("quoteContainer").appendChild(resultsp);

	for (var i = 0; i < length; i++) {

		var anchor = document.createElement("a");
		var anchort = document.createTextNode(res[1][i]);
		anchor.appendChild(anchort);
		anchor.setAttribute('href', res[3][i]);
		anchor.setAttribute('target', '_blank');
		document.getElementById("quoteContainer").appendChild(anchor);

		var para = document.createElement("p");
		var parat = document.createTextNode(res[2][i]);
		para.appendChild(parat);
		para.style.marginBottom="20px";
		document.getElementById("quoteContainer").appendChild(para);
	}
}

window.onload = function() {
	button = document.getElementById("submitButton");
	button.addEventListener("click", getUserInput);
}

