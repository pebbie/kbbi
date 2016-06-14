function $(ename){
	return document.getElementById(ename);
}

function getlist(shurl){
	$("result").innerHTML = "";
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(req.readyState == 4){
			var e  = document.createElement('div');
			e.innerHTML = req.responseText;
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName=='DIV'){e = c;break;}
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName=='DIV'){e = c;break;}
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName=='DIV'){e = c;break;}
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName=='DIV'){e = c;break;}
			
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName=='DIV'){e = c;break;}
			//alert(e.innerHTML);
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName!=undefined){e = c;break;}
			e = e.childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[1];
			//for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName=='P'){e = c;break;}
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName=='LI'){getlong(c.childNodes[0].innerHTML);}
		}
	};
	var kataval=encodeURIComponent(shurl)
	var cmdval=encodeURIComponent("Tampilkan")
	//var opval=encodeURIComponent("2")
	var param="PARAM="+kataval+"&PERINTAH=Cari&OPKODE="+1;
	req.open(
		"POST",
		"http://badanbahasa.kemdikbud.go.id/kbbi/index.php",
		true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send(param);
}

function getlong(shurl){
	$("result").innerHTML = "";
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(req.readyState == 4){
			var e  = document.createElement('div');
			e.innerHTML = req.responseText;
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName=='DIV'){e = c;break;}
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName=='DIV'){e = c;break;}
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName=='DIV'){e = c;break;}
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName=='DIV'){e = c;break;}
			
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName=='DIV'){e = c;break;}
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName!=undefined){e = c;break;}
			e = e.childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[2].childNodes[3].childNodes[0].childNodes[0].childNodes[0];
			for (var i=0,c;c=e.childNodes[i];i++) if (c.tagName=='P'){e = c;break;}
			$("result").innerHTML += e.innerHTML+'<br/><br/>';
		}
	};
	var kataval=encodeURIComponent(shurl)
	var cmdval=encodeURIComponent("Tampilkan")
	var param="KATA="+kataval+"&PERINTAH2="+cmdval+"&DFTKATA="+kataval;
	req.open(
		"POST",
		"http://badanbahasa.kemdikbud.go.id/kbbi/index.php",
		true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send(param);
}

function getkateglo(shurl){
	$("rkat").innerHTML = "";
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(req.readyState == 4){
			console.log(req.responseText)
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
			$("rkat").innerHTML = showvalue(o.kateglo.phrase+' ('+o.kateglo.lex_class_name+')', tmp);
		}
	};
	req.open(
		"GET",
		"http://kateglo.com/api.php?format=json&phrase=" + shurl,
		true);
	req.send(null);
}

function showvalue(key, value){
	return '<div class="titlekey">'+key+'</div><div class="titlevalue">'+value+'</div>';
}

function submitform(){
	var url = $("url").value;
	if (url.length==0) {
		alert("masukkan lema yang dicari");
		return;
	}
	getkateglo(url);
	getlist(url);
	return false;
}

$('btn-submit').addEventListener('click', submitform)