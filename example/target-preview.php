
<!DOCTYPE html>
<html>
<head>
	<title>jscropper</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

<div class="container">
	<div id="target_appendPrev">
		<!-- Target append Preview Image -->
	</div>
	<input type="file" id="in_file">
</div>

<script src="../src/jscropper.min.js" cropper-module="jscropper.adapter"></script>
<script type="text/javascript">
	let in_file = document.querySelector("#in_file");

	in_file.addEventListener('change', function() {			
		let crop = new JsCropper(this);
			crop.targetPreview = document.querySelector('#target_appendPrev');
			crop.init();
	});
</script>
</body>
</html>