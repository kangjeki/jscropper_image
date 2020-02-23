/** 
 * jscropper
 * version : v.1.1
 * @author 	: kangjeki
 * JS Version : min ES6;
 * ------------------------------------------------------------------------------
*/
function JsCropper(elIn) {
	var jc = this,
		appenDef = document.body;
		jc.fixedMode = true;
		jc.frameCropper;
		jc.cropperSelector;
		jc.cropperWidth	= 300;
		jc.cropperHeight = 300;
		jc.convertScale  = 2;
		jc.rotateImage 	= false;
		jc.parentElement = appenDef;
		jc.targetPreview = appenDef;
		jc.base64out = false;
		jc.base64target;
		jc.imageObject;
		jc.imgOffsetTop;
		jc.imgOffsetLeft;
		jc.defaultButton = true;
		jc.exec;

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
			bg_block_right 	= __regElemen('div', 'class', 'bg_block_right', false);

		/* membuat area / cropper selector */
		jc.cropperSelector 	= __regElemen('span', 'class', 'block_crop', false);
		
		/* menambahkan gambar dari url base64 */
		jc.imageObject 	= __regElemen('img', 'id', 'jc_imgCrop', false);
		jc.imageObject.src = window.URL.createObjectURL(elIn.files[0]);


		jc.frameCropper.append(bg_block_top);
		jc.frameCropper.append(jc.imageObject);
		jc.frameCropper.append(jc.cropperSelector);
		jc.frameCropper.append(bg_block_bottom);
		jc.frameCropper.append(bg_block_left);
		jc.frameCropper.append(bg_block_right);

		/* create Button Crop and Cancle */
		if ( jc.defaultButton ) {
			jc.fm_btnCropper 	= __regElemen('div', 'class', 'fm_btnCropper', false);
			jc.buttonCropper 	= __regElemen('button', 'class', 'btn btn-info', false);
			jc.buttonCancle 	= __regElemen('button', 'class', 'btn btn-info', false);
			jc.fm_btnCropper.append(jc.buttonCropper);
			jc.fm_btnCropper.append(jc.buttonCancle);
			jc.parentElement.append(jc.fm_btnCropper);
		}

		jc.parentElement.append(jc.frameCropper);

		let positionMode = ( jc.fixedMode ) ? 'fixed' : 'absolute';
		jc.frameCropper.style.cssText = `
			margin: auto 0; padding: 0;
			position: ${positionMode};
			left: 0; right: 0; top: 0; bottom: 0;
			background: rgba(0,0,0,.5);
			overflow: hidden;
		`;
		jc.cropperSelector.style.cssText = `
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
		jc.imageObject.style.cssText = `
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
		
		let bgblock_TB 	= (jc.cropperSelector.offsetTop) + 2,
			bgblock_LR 	= (jc.cropperSelector.offsetLeft) + 2;

		bg_block_top.style.cssText = `
			margin: 0; padding: 0;
			position: absolute;
			top: 0%; left: 0%; right: 0%; height : ${bgblock_TB}px;
			background: #000; opacity: 0.5;
			z-index: 1500;
			width: 100%;
		`;
		bg_block_bottom.style.cssText = `
			margin: 0; padding: 0;
			position: ${positionMode};
			bottom: 0%; left: 0%; right: 0%; height: ${bgblock_TB-3}px;
			background: #000; opacity: 0.5;
			z-index: 1500;
			width: 100%;
		`;
		bg_block_left.style.cssText = `
			margin: 0; padding: 0;
			position: absolute;
			bottom: 0%; 
			left: 0%; 
			right: 0%; 
			bottom: ${bgblock_TB-3}px; left: 0%; top: ${bgblock_TB}px; width: ${bgblock_LR-2}px; 
			background: #000; opacity: 0.5;
			z-index: 1500;
		`;
		bg_block_right.style.cssText = `
			margin: 0; padding: 0;
			position: absolute;
			bottom: ${bgblock_TB-3}px; right: 0%; top: ${bgblock_TB}px; width: ${bgblock_LR-2}px; 
			background: #000; opacity: 0.5;
			z-index: 1500;
		`;

		new Promise( resolve => {
			if ( jc.imageObject.src !== "" ) {
				setTimeout( e => {
					resolve(jc.imageObject);
				},500);
			}
		})
		.then( elem => {
			elem.style.display = 'block';
			let wd = ( jc.fixedMode ) ? window.innerWidth : jc.parentElement.clientWidth,
				hg = ( jc.fixedMode ) ? window.innerHeight : jc.parentElement.clientHeight;

			let offsetImageT = ( (hg - elem.clientHeight) / 2 ),
				offsetImageL = ( (wd - elem.clientWidth) / 2 );

			elem.style.top = offsetImageT + 'px';
			jc.imgOffsetTop = offsetImageT;
			jc.imgOffsetLeft = offsetImageL;

			if ( jc.defaultButton ) {
				let icoCls = `
					<svg height="20px" viewBox="0 0 365.71733 365" width="20px" xmlns="http://www.w3.org/2000/svg">
					<g fill="#f44336"><path d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0"/>
					<path d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0"/></g></svg>
				`,
				icoCrp = `
					<svg height="20px" viewBox="0 -46 417.81333 417" width="20px" xmlns="http://www.w3.org/2000/svg">
						<path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0" fill="#2196f3"/>
					</svg>
				`;
				let posFix = ( jc.fixedMode ) ? 'fixed' : 'absolute';
				jc.fm_btnCropper.style.cssText = `
					margin: 0; padding: 0;
					position: ${posFix};
					z-index: 1515;
					left: 0; right: 0; bottom: 0;
				`;

				jc.buttonCropper.style.cssText = `
					margin: 0; padding: 5px 10px;
					background: #f5f5f5;
					border: 0px solid;
					border-radius: 5px;
					position: ${posFix}; 
					bottom: 10px; right: 10px;
					z-index: 1515;
				`;
				jc.buttonCancle.style.cssText = `
					margin: 0; padding: 5px 10px;
					background: #f5f5f5;
					border: 0px solid;
					border-radius: 5px;
					position: ${posFix}; 
					bottom: 10px; left: 10px;
					z-index: 1515;
				`;
				jc.buttonCropper.innerHTML = icoCrp;
				jc.buttonCancle.innerHTML = icoCls;
			}

			/* start event handling */
			let handleSuport = ( 'ontouchstart' in window ) ? true : false;
			( handleSuport ) ? new Zoom(elem, { rotate: jc.rotateImage }) : __eventHandling();
			
			__buttonExec();
		});
	}
	

	/**
	 * ------------------------------------------------------------------------------------------------
	 * Event Handling for mouse
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
			let mtx = JSON.parse((jc.imageObject.style.transform).replace('matrix(', '[').replace(')',']'));
			imgY = mtx[5];
			imgX = mtx[4];
		}

		if ( eventOver ) {
			postcorX = ( imgX - (putX - ( ( ev.clientX == undefined ) ? ev.touches[0].clientX : ev.clientX ) ) );
			postcorY = ( imgY - (putY - ( ( ev.clientY == undefined ) ? ev.touches[0].clientY : ev.clientY ) ) );

			jc.imageObject.style.transform = `matrix(${scaleImg}, 0, 0, ${scaleImg}, ${postcorX}, ${postcorY})`;
		}
	}


	/**
	 * exec zoom event object
	 * ------------------------------------------------------------------------------------------------
	*/
	function execZoom(scale, transX, transY) {
		scaleImg = scale;
		jc.imageObject.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${transX}, ${transY})`;
	}

	let scale = 1;
	function zoomWheel(event, corX, corY) {
		scale += event.deltaY * -0.0005;
		scale = Math.min(Math.max(.05, scale), 4);
		let transX = (( corX - event.clientX) * scale) + ( event.clientX - corX * scale),
			transY = (( corY - event.clientY) * scale) + ( event.clientX - corY * scale),

			postcorX = transX;
			postcorY = transY;
		execZoom(scale, transX, transY);
	}
	
	function __eventHandling() {
		/* event mouse ---------------------------------------------------------------------------------- */
		jc.parentElement.addEventListener('mousedown', e => {
			eventOver = true;
			execOvercor('down', e);
		});

		jc.parentElement.addEventListener('mouseup', e => {
			eventOver = false;
			execOvercor('up', e)
		});

		jc.parentElement.addEventListener('mousemove', e => {
			execOvercor('move', e);
		});	

		jc.parentElement.addEventListener('wheel', eo => {
			zoomWheel(eo, postcorX, postcorY);
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
			nwImgCrp.src 	= jc.imageObject.src;

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
				jc.targetPreview.innerHTML = '';
				jc.targetPreview.appendChild(nwImg);
				if ( jc.base64out !== false ) {
					if (jc.base64target !== undefined) { 
						if (jc.base64target.tagName == 'INPUT' || jc.base64target.tagName == 'TEXTAREA') {

							jc.base64target.value = uriImg;
						}
						else {
							jc.base64target.innerHTML = uriImg;
						}	
					}
					else {
						throw Error('Target out base64target is ' + jc.base64target);
					}
				}

				/* remove url dan transform selector crop */
				elIn.value = "";
				( jc.defaultButton ) ? jc.fm_btnCropper.remove() : false;
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
		let execCrop = function() {
			/* mematikan event over dari touch dan mouse */
			eventOver = false;

			/* zoom scale manual untuk mengatur hasil resolusi img canvas */
			let scaleZoom 	= jc.convertScale;

			let img_w 		= parseFloat(jc.imageObject.clientWidth),
				img_h 		= parseFloat(jc.imageObject.clientHeight),
				mtx 		= JSON.parse((jc.imageObject.style.transform).replace('matrix(', '[').replace(')',']'));

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
		}

		/**
		 * executor event ketika membatalkan crop
		 * ------------------------------------------------------------------------------------------------
		*/
		let execCancle = function() {
			jc.frameCropper.remove();
			( jc.defaultButton ) ? jc.fm_btnCropper.remove() : false;
			elIn.value = "";
		}

		if ( jc.defaultButton ) {
			jc.buttonCropper.addEventListener('click', function() {
				execCrop();
			});
			jc.buttonCancle.addEventListener('click', function() {
				execCancle();
			});		
		}
		
		jc.exec = {
			crop : function() {
				execCrop();
			},
			cancle : function() {
				execCancle();
			}
		}
	}

	jc.init = function() {
		document.querySelectorAll('script').forEach(el => {
		if ( el.getAttribute('cropper-module') ) {
				let resrc = el.src.split('/');
				fetch(el.src.replace(resrc[resrc.length-1], el.getAttribute('cropper-module') + '.js')).then(res => { 
					if (res.status == 200) {
						res.text().then(txt => {eval(txt);__createElement();}).catch(er=>{throw Error('Error Parsing Modules')})
					}
					else {
						throw Error('Modules Zoomer Not Found!');
					}
				}).catch(er => {throw Error(er)});
			}
		});
	}
}
