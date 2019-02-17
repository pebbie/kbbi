function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

function $(ename){
	return document.getElementById(ename);
}

function keyhandler(event){
	if(event.key=="Enter")
		submitform();
}

function getkateglo(shurl){
	$("rkat").innerHTML = "";
	var req = createCORSRequest(
		"GET",
		"http://kateglo.com/api.php?format=json&phrase=" + shurl);
	req.onreadystatechange = function(){
		if(req.readyState == 4){
			console.log(req.responseText)
			try{
				var o = JSON.parse(req.responseText);
				var n = o.kateglo.def_count;
				var tmp = "<ol>";
				for(var i=0; i<n; ++i){
					tmp += '<li>'+o.kateglo.definition[i].def_text+'</li>';
				}
				tmp += "</ol>";
				for(var i=0; i<o.kateglo.root.length; ++i){
					getlist(o.kateglo.root[i].root_phrase);
				}
				$("rkat").innerHTML = showvalue(o.kateglo.phrase, '('+o.kateglo.lex_class_name+')', tmp);
			}catch(err){
				$("rkat").innerHTML = showvalue(shurl, '', "frasa tidak ditemukan")
			}
		}
	};
	
	req.send(null);
}

function showvalue(key, cls, value){
	return '<div class="titlekey"><a target="_blank" href="https://kbbi.kemdikbud.go.id/entri/'+key+'">'+key+'</a> '+cls+'</div><div class="titlevalue">'+value+'</div>';
}

function submitform(){
	var url = $("url").value;
	if (url.length==0) {
		alert("masukkan lema yang dicari");
		return;
	}
	getkateglo(url);
	//getlist(url);
	return false;
}

$('btn-submit').addEventListener('click', submitform)
$('url').addEventListener('keypress', keyhandler)

chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
	if(selection.length>0)
  $("url").value = selection[0].trim();
});
