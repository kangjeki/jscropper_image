function h(b,a){return[b*a[0],b*a[1]]}function l(b,a){return[b[0]+a[0],b[1]+a[1]]}function m(b,a){return[b[0]-a[0],b[1]-a[1]]}function n(b,a){return b[0]*a[0]+b[1]*a[1]}function q(b,a){return l(h(a[0],b[0]),h(a[1],b[1]))}function r(b,a){this.a=b;this.c=a}var t=new r([[1,0],[0,1]],[0,0]);function u(b){var a={pan:!1,rotate:!0},c={};b=void 0==b?c:b;for(k in a)c=b[k],b[k]=void 0==c?a[k]:c;return b}
function v(b,a,c){function g(b){return function(a){a.preventDefault();if(d.j)return!1;a=a.touches;if(!a)return!1;b(a)}}function e(a){var d=a[0].pageX-b.offsetLeft;a=a[0].pageY-b.offsetTop;return[[d,a],[d+1,a+1]]}function p(a){var d=b.offsetLeft,c=b.offsetTop;return[[a[0].pageX-d,a[0].pageY-c],[a[1].pageX-d,a[1].pageY-c]]}this.f=null;this.j=!1;this.o=0;this.u=b;this.b=this.h=t;this.l=[0,0];this.i=[0,0];var d=this;this.s=u(a);this.g=c||window;b.style["transform-origin"]="0 0";a=g(function(a){var b=
a.length;if(b!=d.o)d.o=b,d.h=d.b,0!=b&&(d.l=1<a.length?p(a):e(a),d.i=d.l);else{d.i=1<a.length?p(a):e(a);a=d.l;var b=d.i,c=m(a[1],a[0]),g=m(b[1],b[0]),f;if(d.s.rotate){var w=n(c,c);f=n(c,g)/w;c=(c[0]*g[1]-c[1]*g[0])/w;f=[[f,c],[-c,f]]}else f=Math.sqrt(n(g,g))/Math.sqrt(n(c,c)),f=[[f,0],[-0,f]];a=new r(f,m(b[0],q(f,a[0])));b=d.h;f=a.a;c=b.a;d.b=new r([q(f,c[0]),q(f,c[1])],l(q(a.a,b.c),a.c));x(d)}});b.parentNode.addEventListener("touchstart",g(function(a){1===a.length&&(null!=d.f?(d.g.clearTimeout(d.f),
d.m(),d.f=null):d.f=d.g.setTimeout(function(){d.f=null},300))}));b.parentNode.addEventListener("touchstart",a);b.parentNode.addEventListener("touchmove",a);b.parentNode.addEventListener("touchend",a)}function x(b){var a=b.b,c=a.a,a=a.c;b.u.style.transform="matrix("+c[0][0]+","+c[0][1]+","+c[1][0]+","+c[1][1]+","+a[0]+","+a[1]+")"}
v.prototype.m=function(){if(this.g.requestAnimationFrame){this.j=!0;var b=this.h,a=null,c=this,g=function(e){a||(a=e);e=(e-a)/100;if(1<=e)c.b=t,x(c),c.j=!1;else{var p=b.a,d=t.a;c.b=new r([l(h(1-e,p[0]),h(e,d[0])),l(h(1-e,p[1]),h(e,d[1]))],l(h(1-e,b.c),h(e,t.c)));x(c);c.g.requestAnimationFrame(g)}};this.g.requestAnimationFrame(g)}else this.b=t,x(this)};v.prototype.reset=v.prototype.m;"undefined"===typeof exports?window.Zoom=v:exports.Zoom=v;

(function() {
	const JsCropper = function(baseUri, elemInput_fileCrop) {
		const _regElemen = function(el, atbName, atbVal, txtNode) {
			let regEl 	= document.createElement(el);
			let regTxt	= document.createTextNode(txtNode);
				regEl.setAttribute(atbName, atbVal);

			if (txtNode !== false) {
				regEl.appendChild(regTxt);
			}

			return regEl;
		}

		let sW = window.innerWidth,
			sH = window.innerHeight;

		let pj_frm 		= sW,
			lb_frm 		= (sW / 4) * 3,
			blockset 	= (sH - lb_frm) / 2;

		let frame_croper 	= _regElemen('div', 'id', 'jc_mobileCroper', false),
			bg_block_top 	= _regElemen('div', 'class', 'bg_block_top', false),
			bg_block_bottom = _regElemen('div', 'class', 'bg_block_bottom', false),
			cls_block_crop 	= _regElemen('div', 'class', 'block_crop', false),
			block_crop 		= _regElemen('div', 'id', 'block_crop', false),
			imgSelectCrop 	= _regElemen('img', 'id', 'jc_imgCrop', false);

			// create Button Crop and Cancle
		let btnCrop 	= _regElemen('button', 'class', 'btn btn-info', "Crop"),
			btnCcl 		= _regElemen('button', 'class', 'btn btn-info', "Cancle");


		frame_croper.append(bg_block_top);
		block_crop.append(imgSelectCrop);
		block_crop.append(cls_block_crop);
		frame_croper.append(block_crop);
		frame_croper.append(bg_block_bottom);
		frame_croper.append(btnCrop);
		frame_croper.append(btnCcl);

		document.body.append(frame_croper);

		frame_croper.style.cssText 		= `
			margin: 0; padding: 0;
			position: fixed;
			top: 0; left: 0; bottom: 0; right: 0;
			background: #999;
			z-index: 2122222222;
			width: 100%;
		`;
		block_crop.style.cssText 		= `
			width: ${pj_frm}px; 
			height: ${lb_frm}px; 
			top: ${blockset}px;
			margin: 0; padding: 0;
			position: absolute;
			left: 0; right: 0;
			background: transparent;
		`;
		bg_block_top.style.cssText 		= `
			height: ${blockset}px;
			margin: 0; padding: 0;
			position: absolute;
			top: 0; left: 0; right: 0;
			background: #000; opacity: 0.7;
			z-index: 5555;
			width: 100%;
		`;
		bg_block_bottom.style.cssText 	= `
			height: ${blockset}px;
			margin: 0; padding: 0;
			position: absolute;
			bottom: 0; left: 0; right: 0;
			background: #000; opacity: 0.5;
			z-index: 5555;
			width: 100%;
		`;
		cls_block_crop.style.cssText 	= `
			margin: 0; padding: 0;
			position: absolute;
			top: 0; right: 0;
			left: 0; bottom: 0;
			background: transparent;
			border: 1px #fff solid;
		`;
		imgSelectCrop.style.cssText 	= `
			margin: 0; padding: 0; width: 100%;
		`;
		btnCrop.style.cssText = `
			margin: 0; padding: 10px; 
			position: absolute; z-index: 9999999; 
			bottom: 10px; right: 10px;
		`;
		btnCcl.style.cssText = `
			margin: 0; padding: 10px; 
			position: absolute; z-index: 9999999; 
			bottom: 10px; left: 10px;
		`;
		
		imgSelectCrop.src 	= baseUri;
		var zm = new Zoom(imgSelectCrop, {
		    rotate: false
		});

		const execImageCrop = function(reOffsetH, reOffsetW, imgWd, imgHg, scaleZoom) {
			let reSizeImg 	= ( imgWd * imgHg ) * scaleZoom,
				reImgW 		= reSizeImg / imgHg,
				reImgH 		= reSizeImg / imgWd;

			let nwImgCrp 		= new Image();
				nwImgCrp.src 	= imgSelectCrop.src;

			nwImgCrp.onload = function() {
		
				let cvs = document.createElement('canvas'),
				cx 	= cvs.getContext('2d');

				let reSizeRes 	= ( pj_frm * lb_frm ) * scaleZoom,
					reW 		= reSizeRes / lb_frm,
					reH 		= reSizeRes / pj_frm;

					cvs.width 	= reW;
					cvs.height 	= reH;

				nwImgCrp.style.width 	= `${reImgW}px`;
				nwImgCrp.style.height 	= `${reImgH}px`;

				cx.drawImage(nwImgCrp, reOffsetW, reOffsetH, reImgW, reImgH);
				let uriImg 		= cvs.toDataURL();

				let nwImg 		= new Image();
					nwImg.src 	= uriImg;
					nwImg.style.cssText = `height: 200px; border: 1px #ddd solid;`;

				nwImg.onload = function() {
				// targout out image
					let targetPrev = elemInput_fileCrop.getAttribute('target_prev');
					let targetName = elemInput_fileCrop.getAttribute('target_name');

					if (targetPrev !== null && targetPrev !== undefined) {
						query(targetPrev).innerHTML = "";
						query(targetPrev).appendChild(nwImg);
					}

					if (targetName !== null && targetName !== undefined) {
						query(targetName).value = uriImg;
					}

					// remove url dan transform selector crop
					elemInput_fileCrop.value = "";
					frame_croper.remove();
				}
			}
		}

		// opt crop ------------------------------------
		jcEvent(window, 'touchmove', function() {
			let img_w 		= parseFloat(imgSelectCrop.width),
				img_h 		= parseFloat(imgSelectCrop.height),

				imgOffset 	= imgSelectCrop.style.transform,

				filString 	= imgOffset.replace("matrix(", ""),
				get_val		= filString.replace(")", ""),
				aryData 	= get_val.split(", "),

				scaleTransX	= parseFloat(aryData[0]);
				scaleTransY	= parseFloat(aryData[3]);

				this.topOffset 	= parseFloat(aryData[5]);
				this.leftOffset = parseFloat(aryData[4]);

			let img_Ls 		= ( (img_w * img_h) * parseFloat(scaleTransX)),
				img_scW 	= img_Ls / img_h,
				img_scH 	= img_Ls / img_w;

				this.imgWidth 	= img_scW;
				this.imgHeight 	= img_scH;
		});

		jcEvent(btnCrop, 'click', function() {
			// zoom scale out image canvas
			let scaleZoom 	= 2;
				
			if (this.imgWidth !== undefined && this.topOffset !== undefined) {
				imgWd 	= this.imgWidth;
				imgHg 	= this.imgHeight;

				let reSizeOffs 	= ( this.leftOffset * this.topOffset ) * scaleZoom,
					reOffsetW 	= reSizeOffs / this.topOffset,
					reOffsetH 	= reSizeOffs / this.leftOffset;
				
				execImageCrop(reOffsetH, reOffsetW, imgWd, imgHg, scaleZoom);
			}
			else {
				reOffsetH 	= 0;
				reOffsetW 	= 0;
				imgWd 	= imgSelectCrop.width;
				imgHg 	= imgSelectCrop.height;

				execImageCrop(reOffsetH, reOffsetW, imgWd, imgHg, scaleZoom);
			}
		});

		jcEvent(btnCcl, 'click', function() {
			frame_croper.remove();
			elemInput_fileCrop.value = "";
		});
	}

	// ---------------------------------------------------------------------
	// selector input file crop
	let input_fileCrop = queryAll(".input_fileCrop");
	input_fileCrop.forEach(function(elem, index) {
		jcEvent(elem, 'change', function() {
			let file 	= elem.files[0];
			let uri 	= window.URL.createObjectURL(file);

			// create New Cropper 
			new JsCropper(uri, elem);
		});
	});
}());

