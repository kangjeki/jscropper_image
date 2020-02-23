<!DOCTYPE html>
<html>
<head>
	<title>jscropper</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<style type="text/css">
		#cover-frame-cropper {
			margin: 0; padding: 5px; 
			width: 350px; height: 400px; 
			border: 1px green solid; 
			background: green; 
			position: relative;
		}
	</style>
</head>
<body>

<div class="container">
	<p>
		<b>Example Using Manual and Default Button</b><br>
		if you want to use manual button, you must turned off fixed mode or combinate with <a href="relative-cover.php">relative cover</a>, 
	</p>
</div>

<div class="container">
	<div id="cover-frame-cropper">
		<!-- frame cover autocreate in here -->
	</div>

	<div id="target_appendPrev">
		<!-- Target append Preview Image -->
	</div>

	<br>
	<input type="file" id="in_file">

	<br>
	<br>
	<button id="btn-crop">Crop</button>
	<button id="btn-cancle">Cancle</button>
	
</div>

<script src="../src/jscropper.min.js" cropper-module="jscropper.adapter"></script>
<script type="text/javascript">
	let in_file = document.querySelector("#in_file");

	in_file.addEventListener('change', function() {			
		let crop = new JsCropper(this);
			crop.cropperWidth = 300;
			crop.cropperHeight = 300;
			crop.fixedMode = false;
			crop.parentElement = document.querySelector('#cover-frame-cropper');
			crop.targetPreview = document.querySelector('#target_appendPrev');
			crop.defaultButton = false;
			crop.init();

		document.querySelector('#btn-crop').onclick =function() {
			crop.exec.crop();
		}
		document.querySelector('#btn-cancle').onclick =function() {
			crop.exec.cancle();
		}
	});
</script>
</body>
</html>