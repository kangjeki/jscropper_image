<?php  

if ( isset($_POST["upload"]) ) {

	$file_base64 	= $_POST["gambar"];
	$base 			= explode(",", $file_base64);
	$baseDecode 	= base64_decode($base[1]);

	$namaBaru = uniqid() . ".jpg";

	file_put_contents($namaBaru, $baseDecode);

	if ( file_exists($namaBaru) ) {
		echo "Sukses Upload";
	}
	else {
		echo "Gagal Upload!";
	}
}

?>

<!DOCTYPE html>
<html>
<head>
	<title>Mobile Image Croper</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="js/jc_bost.js"></script>
	
</head>
<body>
<br><br>
<div class="container">
	<form method="post" action="">
		<!-- component -->
		<div id="target_appendPrev">
			<!-- Target append Preview Image -->
		</div>

		<!-- label button -->
		<label for="imgIn_crop" style="background: #ddd; margin: 0; padding: 5px;">Pilih Gambar</label>

		<!-- input file API selector calss "input_fileCrop" dan attrib element untuk param -->
		<input type="file" class="input_fileCrop" target_prev='#target_appendPrev' target_name="#val_out_base64" id="imgIn_crop" hidden>

		<!-- output base64 to post atrib value -->
		<input type="hidden" name="gambar" id="val_out_base64">

		<!-- button post -->
		<br><br>
		<button name="upload">Upload</button>
	</form>
</div>
<script src="js/jscropper.js"></script>

</body>
</html>