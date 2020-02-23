# js cropper 
Simple JS croper pan zoom


# usage

<b>in html</b>

		<script src="path/jscropper.min.js" cropper-module="jscropper.adapter"></script>


<b>js usage</b>

simple crop and spesific target element preview

		let crop = new JsCropper(input);
			crop.targetPreview = [ Element | Target Preview ];
			crop.init();


<b>all</b>

		let crop = new JsCropper(input);

			crop.cropperWidth = 300;
			crop.cropperHeight = 200;
			crop.fixedMode = false;
			crop.convertScale = 1;
			crop.parentElement = [ Element | Cover Cropper selector ];
			crop.targetPreview = [ Element | Target Preview ];
			crop.base64out = true;
			crop.base64target = [ Element | target output base64 ];
			crop.defaultButton = false;

exec manual

			crop.exec; [ object ]

			crop.exec.crop(); [ function ]
			crop.exec.cancle(); [ function ]

