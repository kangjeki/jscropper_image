(function() { 
	const doc 	= document; 
	Window.prototype.query = function(tg) {
		return doc.querySelector(tg); 
	}
	Window.prototype.queryAll = function(tg) {
		return doc.querySelectorAll(tg); 
	}
	Window.prototype.jcEvent = function(el, eventName, callback) {
		el.addEventListener(eventName, function(ev) {
			callback(ev);
		});
	}
	Window.prototype.refreshPage = function() {
		let loc = window.location;
		window.location.href = loc;
	}
	this.ajax = {
		GET : (cf, res) => {const xhr = new XMLHttpRequest(); xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					res(xhr.responseText);
				};
			};
			let sn = ""; if (!cf.send){console.log("!No Data Send")}else{sn = "?" + cf.send};
			xhr.open('GET', cf.url + sn, true);
			xhr.send();
		},
		POST : (cf, res) => {
			const xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					res(xhr.responseText);
				};
			};
			xhr.open('POST', cf.url, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(cf.send);
		},
		UPLOAD : (cf, res) => {
			const xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					res(xhr.responseText);
				};
			};
			const form 	= new FormData();
			const input = cf.send;
			const file 	= input.files[0];
			const index = cf.send.getAttribute('name');

			form.append(index, file);

			xhr.open('POST', cf.url, true);
			xhr.send(form);
		}
	}

	this.jcAlert = function(txt, mode) {
		let wk = 2000;
		let el = doc.createElement('div');
		let tx = doc.createTextNode(txt);
			el.style.cssText = `
				margin: auto; padding: 5px;
				position: fixed;
				top: 0; right: 0; left: 0; bottom: 0;
				width: 30%;
				height: 40px;
				line-height: 25px;
				align-items: center;
				border: 1px #ddd solid;
				border-radius: 5px;
				text-align: center;
				overflow: hidden;
				z-index: 55555555;
			`;
		el.appendChild(tx);
		doc.body.appendChild(el);

		if (mode == undefined) {
			el.style.background = "#31b011";
			el.style.color 		= "#fff";
			wk = 2000;
		}
		else if (mode == true) {
			el.style.background = "#31b011";
			el.style.color 		= "#fff";
			wk = 2000;
		}
		else if (mode == false) {
			el.style.background = "red";
			el.style.color 		= "#fff";
			wk = 3000;
		}

		setTimeout(function() {
			el.remove();
		}, wk);	
	}

	this.jc_alertMobile = function(txt, mode) {
		let wk = 2000;
		let el = doc.createElement('div');
		let tx = doc.createTextNode(txt);
			el.style.cssText = `
				margin: auto; padding: 5px;
				position: fixed;
				top: 0; right: 0; left: 0; bottom: 0;
				width: 65%;
				height: 40px;
				line-height: 25px;
				align-items: center;
				border: 1px #ddd solid;
				border-radius: 5px;
				text-align: center;
				overflow: hidden;
				z-index: 55555555;
			`;
		el.appendChild(tx);
		doc.body.appendChild(el);

		if (mode == undefined) {
			el.style.background = "#31b011";
			el.style.color 		= "#fff";
			wk = 2000;
		}
		else if (mode == true) {
			el.style.background = "#31b011";
			el.style.color 		= "#fff";
			wk = 2000;
		}
		else if (mode == false) {
			el.style.background = "red";
			el.style.color 		= "#fff";
			wk = 3000;
		}

		setTimeout(function() {
			el.remove();
		}, wk);	
	}

	this.restring_code = function(tar) {
		let valueRe1 	= tar.replace(/&/g, '*a#;'),
			valueRe2 	= valueRe1.replace(/\?/g, '*b#;'),
			valueRe3 	= valueRe2.replace(/\./g, '*c#;'),
			valueRe4 	= valueRe3.replace(/:/g, '*d#;');
			valueRe5 	= valueRe4.replace(/</g, '*e#;');
			valueRe6 	= valueRe5.replace(/>/g, '*f#;');
			valueRe7 	= valueRe6.replace(/%/g, '*g#;');
			valueRe8 	= valueRe7.replace(/-/g, '*h#;');
			valueRe9 	= valueRe8.replace(/_/g, '*i#;');
			valueRe10 	= valueRe9.replace(/\+/g, '*j#;');
			valueRe11 	= valueRe10.replace(/=/g, '*k#;');
			valueRe12 	= valueRe11.replace(/\//g, '*l#;');

		return valueRe12;
	}

}());