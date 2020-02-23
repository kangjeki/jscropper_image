<?php  

if ( isset($_POST["upload"]) ) {

	$file_base64 	= $_POST["image"];
	$base 			= explode(",", $file_base64);
	$baseDecode 	= base64_decode($base[1]);

	$namaBaru = uniqid() . ".jpg";

	file_put_contents('output/' . $namaBaru, $baseDecode);

	if ( file_exists('output/' . $namaBaru) ) {
		echo "Success Upload => output/" . $namaBaru;
	}
	else {
		echo "Filed Upload!";
	}
}

?>

<!DOCTYPE html>
<html>
<head>
	<title>jscropper</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<style type="text/css">

		#cropper-upload {
			margin: auto; padding: 5px; 
			width: 350px; height: 400px; 
			border: 1px #4CC716 solid; 
			border-radius: 5px;
			box-shadow: 0 0 10px rgba(0,0,0,.5);
			background: #4CC716; 
			position: fixed;
			top: 0; right: 0; left: 0; bottom: 0;
			display: none;
		}

		#cover-frame-cropper {
			margin: 0; padding: 0px;
			width: 350px; height: 350px; 
			border: 1px #ddd solid; 
			background: #ddd; 
			position: relative;
		}
		.clear	{
			clear: both;
			padding: 5px;
		}
		.btn-frame {
			margin: 0; padding: 5px;
		}
		button {
			margin: 0; padding: 5px 10px;
			border: 0px solid;
			border-radius: 5px;
			color: #fff;
		}
		#btn-crop {
			background: #1B5DCA;
		}
		#btn-cancle {
			background: #CE0000;
		}
		.btn-upload {
			background: #4A008E;
			padding: 10px 15px;
		}

		label {
			background: #ddd; 
			margin: 0; padding: 5px;
		}
		textarea {
			display: block;
		}
	</style>
</head>
<body>
<div class="container">
	<h2>Test Upload Base64 File</h2>
	<br>
	<div id="cropper-upload">
		<div id="cover-frame-cropper">
			<!-- frame cover autocreate in here -->
		</div>
		<div class="clear"></div>
		<div class="btn-frame">
			<button id="btn-crop">Crop</button>
			<button id="btn-cancle">Cancle</button>
		</div>
	</div>
	

	<form method="post" action="">
		<!-- component -->
		<div id="target_appendPrev">
			<!-- Target append Preview Image -->
		</div>

		<br>
		<!-- label button -->
		<label for="in_file">Select Image</label>

		<!-- example input file selector -->
		<input type="file" id="in_file" hidden>
		<br>
		<br>
		<!-- example using output base64 to post atrib value -->
		<input type="text" name="image" id="in_base64">

		<!-- button post -->
		<br>		
		<button class="btn-upload" name="upload">Upload</button>
	</form>
</div>
	
<script src="../src/jscropper.min.js" cropper-module="jscropper.adapter"></script>
<script type="text/javascript">
	let in_file = document.querySelector("#in_file");
	let coverFix = document.querySelector('#cropper-upload');

	in_file.addEventListener('change', function() {
		coverFix.style.display = 'block';
		
		let crop = new JsCropper(this);
			crop.cropperWidth = 300;
			crop.cropperHeight = 200;
			crop.fixedMode = false;
			crop.convertScale = 1;
			crop.parentElement = document.querySelector('#cover-frame-cropper');
			crop.targetPreview = document.querySelector('#target_appendPrev');
			crop.base64out = true;
			crop.base64target = document.querySelector('#in_base64');
			crop.defaultButton = false;
			crop.init();

		document.querySelector('#btn-crop').onclick =function() {
			crop.exec.crop();

			let ind = document.querySelector('#target_appendPrev');
				ind.innerHTML = 'Wait..';
			coverFix.style.display = 'none';
		}

		document.querySelector('#btn-cancle').onclick =function() {
			crop.exec.cancle();
			coverFix.style.display = 'none';
		}
	});
</script>
</body>
</html>