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
		<b>Example Output String Base64</b><br>
		Default output is <b>false</b><br>
	</p>
</div>

<div class="container">
	<div id="target_appendPrev">
		<!-- Target append Preview Image -->
	</div>

	<br>
	<input type="file" id="in_file">

	<br>
	<textarea id="base64out" style="width: 500px; height: 300px;"></textarea>
	
</div>

<script src="../src/jscropper.min.js" cropper-module="jscropper.adapter"></script>
<script type="text/javascript">
	let in_file = document.querySelector("#in_file");

	in_file.addEventListener('change', function() {			
		let crop = new JsCropper(this);
			crop.cropperWidth = 300;
			crop.cropperHeight = 300;
			crop.targetPreview = document.querySelector('#target_appendPrev');
			crop.base64out = true;
			crop.base64target = document.querySelector('#base64out');
			crop.init();
	});
</script>
</body>
</html>