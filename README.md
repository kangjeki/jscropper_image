# js cropper 
Simple JS croper pan zoom


# usage

<b>in html</b>

		<script src="path/jscropper.min.js" cropper-module="jscropper.adapter"></script>


<b>js usage</b>

simple crop and spesific target element preview

		let crop = new JsCropper(this);
			crop.targetPreview = [ Element | Target Preview ];
			crop.init();


<b>all</b>

		var.cropperWidth = 300;
		var.cropperHeight = 200;
		var.fixedMode = false;
		var.convertScale = 1;
		var.parentElement = [ Element | Cover Cropper selector ];
		var.targetPreview = [ Element | Target Preview ];
		var.base64out = true;
		var.base64target = [ Element | target output base64 ];
		var.defaultButton = false;

exec manual

		var.exec; [ object ]

		var.exec.crop(); [ function ]
		var.exec.cancle(); [ function ]

