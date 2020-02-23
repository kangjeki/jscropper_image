<!DOCTYPE html>
<html>
<head>
	<title>jscropper</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

<div class="container">
	<p>
		<b>Example Convert Scale</b><br>
		Default scale is <b>2</b><br>
		<br>
		Try it and download/save as image output and look at image size 
	</p>
</div>

<div class="container">
	<div id="target_appendPrev">
		<!-- Target append Preview Image -->
	</div>

	<input type="number" id="scale" value="2"><br>
	<input type="file" id="in_file">
</div>

<script src="../src/jscropper.min.js" cropper-module="jscropper.adapter"></script>
<script type="text/javascript">
	let in_file = document.querySelector("#in_file");

	in_file.addEventListener('change', function() {			
		let crop = new JsCropper(this);
			crop.cropperWidth = 300;
			crop.cropperHeight = 200;
			crop.convertScale = document.querySelector('#scale').value;
			crop.targetPreview = document.querySelector('#target_appendPrev');
			crop.init();
	});
</script>
</body>
</html>