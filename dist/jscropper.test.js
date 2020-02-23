function JsCropper(baseUri, elemInput_fileCrop, files) {
	var jc = this;
		jc.frameCropper;
		jc.cropperSelector;
		jc.cropperWidth	= 400;
		jc.cropperHeight = 300;
		jc.convertScale  = 2;
		jc.imgSelectCrop;
		jc.buttonCropper;
		jc.buttonCancle;
		jc.imgOffsetTop;
		jc.imgOffsetLeft;
	
	let sW = window.innerWidth,
		sH = window.innerHeight;

	function __regElemen(el, atbName, atbVal, txtNode) {
		let regEl 	= document.createElement(el);
		let regTxt	= document.createTextNode(txtNode);
			regEl.setAttribute(atbName, atbVal);

		if (txtNode !== false) {
			regEl.appendChild(regTxt);
		}

		return regEl;
	}


	function __createElement() {
		/* membuat block area utama / frame cropper */
		jc.frameCropper 	= __regElemen('div', 'id', 'jc_mobileCroper', false);

		/* membuat attribute tambahan */
		let bg_block_top 	= __regElemen('div', 'class', 'bg_block_top', false),
			bg_block_bottom = __regElemen('div', 'class', 'bg_block_bottom', false),
			bg_block_left 	= __regElemen('div', 'class', 'bg_block_left', false),
			bg_block_right 	= __regElemen('div', 'class', 'bg_block_right', false),
			fm_cropperImg 	= __regElemen('div', 'class', 'fm_cropperImg', false);		

		/* membuat area / cropper selector */
		jc.cropperSelector 	= __regElemen('span', 'class', 'block_crop', false);
		
		/* menambahkan gambar dari url base64 */
		jc.imgSelectCrop 	= __regElemen('img', 'id', 'jc_imgCrop', false);
		jc.imgSelectCrop.src = baseUri;

		/* create Button Crop and Cancle */
		jc.buttonCropper 	= __regElemen('button', 'class', 'btn btn-info', "Crop");
		jc.buttonCancle 	= __regElemen('button', 'class', 'btn btn-info', "Cancle");

		jc.frameCropper.append(bg_block_top);
		fm_cropperImg.append(jc.imgSelectCrop);
		jc.frameCropper.append(fm_cropperImg);
		jc.frameCropper.append(jc.cropperSelector);
		jc.frameCropper.append(bg_block_bottom);
		jc.frameCropper.append(bg_block_left);
		jc.frameCropper.append(bg_block_right);
		jc.frameCropper.append(jc.buttonCropper);
		jc.frameCropper.append(jc.buttonCancle);

		document.body.append(jc.frameCropper);

		jc.frameCropper.style.cssText 		= `
			margin: auto 0; padding: 0;
			position: fixed;
			left: 0; right: 0; top: 0; bottom: 0;
			background: rgba(0,0,0,.5);
			overflow: hidden;
		`;
		jc.cropperSelector.style.cssText 	= `
			margin: auto;
			position: absolute;
			left: 0%;
			right: 0%;
			top: 0%;
			bottom: 0%;
			width: ${jc.cropperWidth}px; 
			height: ${jc.cropperHeight}px;
			border: 1px #fff dashed;
			z-index: 1500;
		`;
		jc.imgSelectCrop.style.cssText 	= `
			margin: 0;
			padding: 0px;
			position: absolute;
			display: none;
			top: 0%;
			right: 0%;
			left: 0%;
			bottom: 0%;
			width: 100%;
			transform-origin: 0px 0px;
			z-index: 1499;
			transform : matrix(1, 0, 0, 1, 0, 0);
		`;
		jc.buttonCropper.style.cssText = `
			margin: 0; padding: 10px; 
			position: absolute; 
			bottom: 10px; right: 10px;
			z-index: 1510;
		`;
		jc.buttonCancle.style.cssText = `
			margin: 0; padding: 10px; 
			position: absolute; 
			bottom: 10px; left: 10px;
			z-index: 1510;
		`;

		let bgblock_TB 	= (jc.cropperSelector.offsetTop) + 2,
			bgblock_LR 	= (jc.cropperSelector.offsetLeft) + 2

		bg_block_top.style.cssText 		= `
			margin: 0; padding: 0;
			position: absolute;
			top: 0%; left: 0%; right: 0%; height : ${bgblock_TB}px;
			background: #000; opacity: 0.5;
			z-index: 1500;
			width: 100%;
		`;
		bg_block_bottom.style.cssText 	= `
			margin: 0; padding: 0;
			position: absolute;
			bottom: 0%; left: 0%; right: 0%; height: ${bgblock_TB-3}px;
			background: #000; opacity: 0.5;
			z-index: 1500;
			width: 100%;
		`;
		bg_block_left.style.cssText 	= `
			margin: 0; padding: 0;
			position: absolute;
			bottom: 0%; 
			left: 0%; 
			right: 0%; 
			bottom: ${bgblock_TB-3}px; left: 0%; top: ${bgblock_TB}px; width: ${bgblock_LR-2}px; 
			background: #000; opacity: 0.5;
			z-index: 1500;
		`;
		bg_block_right.style.cssText 	= `
			margin: 0; padding: 0;
			position: absolute;
			bottom: ${bgblock_TB-3}px; right: 0%; top: ${bgblock_TB}px; width: ${bgblock_LR-2}px; 
			background: #000; opacity: 0.5;
			z-index: 1500;
		`;

		new Promise( resolve => {
			if ( jc.imgSelectCrop.src !== "" ) {
				setTimeout( e => {
					resolve(jc.imgSelectCrop);
				},500);
			}
		})
		.then( elem => {
			elem.style.display = 'block';
			console.log(elem.clientHeight);
			let offsetImageT = ( (window.innerHeight - elem.clientHeight) / 2 ),
				offsetImageL = ( (window.innerWidth - elem.clientWidth) / 2 );

			elem.style.top = offsetImageT + 'px';
			jc.imgOffsetTop = offsetImageT;
			jc.imgOffsetLeft = offsetImageL;

			//elem.style.transform = `matrix(${1}, 0, 0, ${1}, ${0}, ${elem.offsetTop})`;
			/* start event handling */
			__eventHandling();
			__buttonExec();
		});
	}
	

	/**
	 * Event Handling
	 * ------------------------------------------------------------------------------------------------
	*/
	let eventOver 	= false,
		postcorX 	= 0,
		postcorY 	= 0,
		putX 		= 0,
		putY 		= 0,
		imgX 		= 0,
		imgY 		= 0,
		scaleImg 	= 1;

	/**
	 * executor mover touch and mouse
	 * ------------------------------------------------------------------------------------------------
	*/
	function execOvercor(moveEvent, ev) {
		if ( moveEvent == 'down' ) {
			putX 	= ( ( ev.clientX == undefined ) ? ev.touches[0].clientX : ev.clientX );
			putY 	= ( ( ev.clientY == undefined ) ? ev.touches[0].clientY : ev.clientY );
			postcorX = 0;
			postcorY = 0;
			let mtx = JSON.parse((jc.imgSelectCrop.style.transform).replace('matrix(', '[').replace(')',']'));
			imgY = mtx[5];
			imgX = mtx[4];
		}

		if ( eventOver == true) {
			postcorX = ( imgX - (putX - ( ( ev.clientX == undefined ) ? ev.touches[0].clientX : ev.clientX ) ) );
			postcorY = ( imgY - (putY - ( ( ev.clientY == undefined ) ? ev.touches[0].clientY : ev.clientY ) ) );

			jc.imgSelectCrop.style.transform = `matrix(${scaleImg}, 0, 0, ${scaleImg}, ${postcorX}, ${postcorY})`;
		}
	}


	/**
	 * exec zoom event object
	 * ------------------------------------------------------------------------------------------------
	*/
	function execZoom(scale) {
		scaleImg = scale;
		jc.imgSelectCrop.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${postcorX}, ${postcorY})`;
	}

	let scale = 1;
	function zoomWheel(event) {
		scale += event.deltaY * -0.0005;
		scale = Math.min(Math.max(.125, scale), 4);
		execZoom(scale);
	}

	/* executor touch zoom */
	function touchZoom(el, callback) {
		let hypo = undefined,
		sess = 0;

		el.addEventListener('touchmove', function(event) {
			if (event.touches.length == 2) {
				let touchX = (event.touches[0].pageX - event.touches[1].pageX),
					touchY = (event.touches[0].pageY - event.touches[1].pageY);

				let hypo1  = Math.hypot( touchX, touchY );
				if (hypo === undefined) {
					hypo = hypo1;
				}

				sess = (hypo1/hypo);
				callback(sess, true, event);
			}
		}, false);

		el.addEventListener('touchend', function(event) {
			callback(sess, false, event);
			hypo = undefined;
		}, false);
	}
	
	function __eventHandling() {
		/* event mouse ---------------------------------------------------------------------------------- */
		window.addEventListener('mousedown', e => {
			eventOver = true;
			execOvercor('down', e);
		});

		window.addEventListener('mouseup', e => {
			eventOver = false;
			execOvercor('up', e)
		});

		window.addEventListener('mousemove', e => {
			execOvercor('move', e);
		});	

		window.addEventListener('wheel', eo => {
			zoomWheel(eo);
		});

		/**
		 * exec event Touche 
		 * ------------------------------------------------------------------------------------------------
		/**/
		window.addEventListener('touchstart', e => {
			eventOver = true;
			execOvercor('down', e);
		});

		window.addEventListener('touchend', e => {
			eventOver = false;
			execOvercor('up', e);
		});

		window.addEventListener('touchmove', e => {
			execOvercor('move', e);
		});


		let resAkhir    = 1,
			resAwal     = undefined,
			coorTc 		= 0;

		touchZoom(window, (scale, onscale, ev) => {
			if ( resAwal == undefined ) {
				resAwal = scale;
				
			}
			if ( onscale == true ) {
				let onres = ( resAkhir + -( (resAwal - scale) * 0.05) );
					onres = Math.min(Math.max(.125, onres), 4);

				let sclW 		= jc.imgSelectCrop.clientWidth * onres,
					sclH 		= jc.imgSelectCrop.clientHeight * onres;

				let screenX 	= jc.frameCropper.clientWidth,
					screenY 	= jc.frameCropper.clientHeight;

				let nscx 		= ( screenX - sclW ) / 2,
					nscy 		= ( screenY - sclH ) / 2;

					// let mtx = JSON.parse((jc.imgSelectCrop.style.transform).replace('matrix(', '[').replace(')',']'));
					// imgX = mtx[4];
					// imgY = mtx[5];

					//nscx = Math.min(Math.max(putX, onres), 0);

				jc.imgSelectCrop.style.transform = `matrix(${onres}, 0, 0, ${onres}, ${nscx}, ${nscy})`;
				resAkhir = onres;
				scaleImg = onres;
			}

			if ( onscale == false ) {
				resAwal = undefined;
			}
		});

	}
		

	/**
	 * executor image cropper dan membuat ulang gambar dengan canvas
	 * ------------------------------------------------------------------------------------------------
	*/
	function execImageCrop(reOffset_X, reOffset_Y, img_sc_X, img_sc_Y, scaleZoom) {
		/* mengatur ulang scale image berdasarkan zoom scale */
		let reImgW 			= (img_sc_X) * scaleZoom,
			reImgH 			= (img_sc_Y) * scaleZoom;

		/* mengatur ulang block cropper berdasarkan zoom scale */
		let cropperX 		= (jc.cropperSelector.offsetLeft + jc.imgOffsetLeft) * scaleZoom,
			cropperY 		= (jc.cropperSelector.offsetTop - jc.imgOffsetTop) * scaleZoom;

		let nwImgCrp 		= new Image();
			nwImgCrp.src 	= jc.imgSelectCrop.src;

		nwImgCrp.onload = function() {
	
			let cvs = document.createElement('canvas'),
				cx 	= cvs.getContext('2d');

			/* mengatur ukuran canvas berdasarkan block cropper zoom scale */
			let reW 		= jc.cropperWidth * scaleZoom,
				reH 		= jc.cropperHeight * scaleZoom;

			cvs.width 	= reW;
			cvs.height 	= reH;

			nwImgCrp.style.width 	= `${reImgW}px`;
			nwImgCrp.style.height 	= `${reImgH}px`;

			reOffset_X 		= reOffset_X - cropperX;
			reOffset_Y 		= reOffset_Y - cropperY;

			cx.drawImage(nwImgCrp, reOffset_X, reOffset_Y, reImgW, reImgH);
			let uriImg 		= cvs.toDataURL();

			let nwImg 		= new Image();
				nwImg.src 	= uriImg;
				nwImg.style.cssText = `height: 200px; border: 1px #ddd solid;`;

			nwImg.onload = function() {
				/* targout out image */
				let targetPrev = elemInput_fileCrop.getAttribute('target_prev');
				let targetName = elemInput_fileCrop.getAttribute('target_name');

				if (targetPrev !== null && targetPrev !== undefined) {
					query(targetPrev).innerHTML = "";
					query(targetPrev).appendChild(nwImg);
				}

				if (targetName !== null && targetName !== undefined) {
					query(targetName).value = uriImg;
				}

				/* remove url dan transform selector crop */
				elemInput_fileCrop.value = "";
				jc.frameCropper.remove();
			}
		}
	}


	/**
	 * Tombol Executor
	 * ------------------------------------------------------------------------------------------------
	*/
	function __buttonExec() {
		/**
		 * executor event tombol click crop
		 * ------------------------------------------------------------------------------------------------
		*/
		jc.buttonCropper.addEventListener('click', function() {
			console.log('runn');
			/* mematikan event over dari touch dan mouse */
			eventOver = false;

			/* zoom scale manual untuk mengatur hasil resolusi img canvas */
			let scaleZoom 	= jc.convertScale;

			let img_w 		= parseFloat(jc.imgSelectCrop.clientWidth),
				img_h 		= parseFloat(jc.imgSelectCrop.clientHeight),
				mtx 		= JSON.parse((jc.imgSelectCrop.style.transform).replace('matrix(', '[').replace(')',']'));

			let	scale		= parseFloat(mtx[0]),
				offset_T 	= parseFloat(mtx[5]),
				offset_L 	= parseFloat(mtx[4]);

			/* mengatur ukuran image berdasarkan zoom matrix */
			let img_sc_X 	= img_w * parseFloat(scale),
				img_sc_Y 	= img_h * parseFloat(scale);

			/* menentukan coordinat image berdasarkan zoomScale */
			let reOffset_X 	= offset_L * scaleZoom,
				reOffset_Y 	= offset_T * scaleZoom;

				reOffset_X 	= ( ! reOffset_X ) ? 0 : reOffset_X;
				reOffset_Y 	= ( ! reOffset_Y ) ? 0 : reOffset_Y;

			execImageCrop(reOffset_X, reOffset_Y, img_sc_X, img_sc_Y, scaleZoom);

		});


		/**
		 * executor event ketika membatalkan crop
		 * ------------------------------------------------------------------------------------------------
		*/
		jc.buttonCancle.addEventListener('click', function() {
			jc.frameCropper.remove();
			elemInput_fileCrop.value = "";
		});	
	}

	jc.init = function() {
		__createElement();
	}
	
}

// ---------------------------------------------------------------------
// selector input file crop
let input_fileCrop = queryAll(".input_fileCrop");
input_fileCrop.forEach(function(elem, index) {
	jcEvent(elem, 'change', function() {
		let file 	= elem.files[0];
		let uri 	= window.URL.createObjectURL(file);

		// create New Cropper 
		let cropper = new JC_mobileCroper(uri, elem, file);
			cropper.init();
	});
});


