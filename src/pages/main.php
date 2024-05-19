<?php
require '../includes/loadPageBlocks.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
	<link rel="icon" type="image/x-icon$_SESSION['id_page']" href="../assets/images/nexus_favicon.ico" />
	<link rel="stylesheet" href="../assets/css/style.css" />
	<?php
	if (isset($_SESSION['pageTitle'])) {
		$title = $_SESSION['pageTitle'];
		echo "<title>$title</title>";
	}
	?>
</head>

<body class="site-bg">
	<div class="page-container">
		<div class="content-wrap">
			<header class="header-main-top" data-barba="wrapper" id="header-main-top">
				<div class="navbar-top-logo-title">
					<?php
					if (isset($_SESSION['image_path'])) {
						$image_path = $_SESSION['image_path'];
						echo "<img src='$image_path' alt='title nexus' class='title-img-navbar pageImg' />";
					}
					?>

					<?php
					if (isset($_SESSION['pageTitle'])) {
						$pageTitle = $_SESSION['pageTitle'];
						echo "<div class='navbar-top-title-page'>$pageTitle</div>";
					}
					?>

				</div>
				<div class="container-setting-page">
					<!-- <i class='bx bx-cog icon-setting' id="btn-page-settings"></i> -->
					<!-- TODO add functionality -->
					<i class="bx bx-save icon-setting" id="save-blocks"></i>
				</div>
			</header>
			<header class="header-main no-cursor-effect">
				<nav class="navbar-side navbar-side-not-active" id="navbar-side">
					<ul class="navbar-side-list">
						<li class="navbar-item">
							<a class="nav-title">
								<img src="../assets/images/Nexus_only_logo_no_bg.png" alt="title nexus" class="img-title-side-navbar" ; id="img-title-side-navbar" />
								<!-- TODO MAYBE ADDING SOMETHING -->
								<!-- <i class='bx bxs-chevrons-left btn-close-open-navbar btn-navbar-not-active btn-open-close-navbar'
                                    id="btn-close-open-navbar"></i> -->
							</a>
						</li>
						<li class="navbar-item">
							<a class="nav-link" id="btn-page-settings">
								<i class="bx bx-cog link-icon"></i>
								<span class="nav-link-title display-none"> Settings </span>
							</a>
						</li>
						<li class="navbar-item">
							<a class="nav-link" href="main.php">
								<?php
								if (isset($_SESSION['image_path'])) {
									$image_path = $_SESSION['image_path'];
									echo "<img src='$image_path' alt='user-pfp' class='link-img pageImg' />";
								}
								?>

								<?php
								if (isset($_SESSION['pageTitle'])) {
									$pageTitle = $_SESSION['pageTitle'];
									echo "<span class='nav-link-title'> $pageTitle </span>";
								}
								?>
							</a>
						</li>
						<li class="navbar-item">
							<a class="nav-link" href="home.html">
								<img src='../assets/images/Nexus_logo_resized.png' alt='user-pfp' class='link-img pageImg' />
								<span class='nav-link-title'> Home </span>
							</a>
						</li>
						<!-- TODO ADD FUNCTIONALITY -->
						<!-- <li class="navbar-item">
								<a class="nav-link" id="add-page-navbar-option">
									<i class="bx bx-add-to-queue link-icon"></i>
									<span class="nav-link-title display-none"> Add page </span>
								</a>
							</li> -->
						<li class="navbar-item">
							<a class="nav-link">
								<img src="../assets/images/default_pfp.jpg" alt="user-pfp" class="user-pfp link-img" />
								<span class="nav-link-title display-none"> <?php echo $_SESSION['username']; ?> </span>
							</a>
						</li>
					</ul>
				</nav>
			</header>

			<div class="main-page-content no-cursor-effect main-page-content-not-active">
				<div class="container-banner">
					<img src="../assets/images/cat_macchiato.jpeg" alt="" class="banner" />
				</div>
				<div class="container-user-page">
					<div class="container-img-page">
						<?php
						if (isset($_SESSION['image_path'])) {
							$image_path = $_SESSION['image_path'];
							echo "<img src='$image_path' alt='nexus logo' class='img-page pageImg' />";
						}
						?>
					</div>
					<div class="main-page-title">
						<?php
						if (isset($_SESSION['pageTitle'])) {
							$pageTitle = $_SESSION['pageTitle'];
							echo "<div class='main-page-title-text' contenteditable='false' data-placeholder='Write title...' id='page-title'> $pageTitle</div>";
						}
						?>
					</div>

					<div class="container-user-content" id="container-user-content">
						<div class="user-content" contenteditable="true" data-text="Write something..." id="user-content"></div>
						<?php foreach ($blocks as $block) :
							// echo "<script>console.log('".$block['ID_type_of_block']."')</script>";
						?>
							<?php if ($block['ID_type_of_block'] == 2) : ?>
								<div id="section-title-container" class="section-title-container sectionTitle block-class" contenteditable="false" type="sectionTitle">
									<div id="section-title" class="section-title" contenteditable="true" data-placeholder="Title"><?= htmlspecialchars($block['Content']) ?: 'Title' ?></div>
								</div>
							<?php elseif ($block['ID_type_of_block'] == 1) : ?>
								<div id="todo" class="todo todo-block block-class" contenteditable="false" type="todo">
									<input type="checkbox">
									<input type="text" placeholder="To Do" class="todo-input-field" value="<?= htmlspecialchars($block['Content']) ?>">
								</div>
							<?php elseif ($block['ID_type_of_block'] == 3) : ?>
								<div class="user-content block-class " contenteditable="true" type="paragraph"><?= htmlspecialchars($block['Content']) ?></div>
							<?php elseif ($block['ID_type_of_block'] == 4) : ?>
								<div id="section-sub-title-container" class="section-sub-title-container subTitle block-class" contenteditable="false" type="subTitle">
									<div id="section-sub-title" class="section-sub-title" contenteditable="true" data-placeholder="Sub Title"><?= htmlspecialchars($block['Content']) ?: 'Sub Title' ?></div>
								</div>
							<?php endif; ?>
						<?php endforeach; ?>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="main-overlay display-none" id="main-overlay"></div>

	<!-- TODO modificare il div sotto per aggiungerlo mediante funzione non direttamente in html -->
	<div id="image-panel" style="
				display: none;
				padding: 20px;
				background-color: #f0f0f0;
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			">
		<h2>Select an Image</h2>
		<div style="
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
					gap: 10px;
				">
			<img src="../assets/images/pagePhoto/camaleonti.jpg" alt="Image 1" style="width: 100%; object-fit: contain" class="selected-image" />
			<img src="../assets/images/pagePhoto/Flag_of_Italy.png" alt="Image 2" style="width: 100%; object-fit: contain" class="selected-image" />
			<img src="../assets/images/pagePhoto/nexus_logo.png" alt="Image 3" style="width: 100%; object-fit: contain" class="selected-image" />
			<img src="../assets/images/pagePhoto/rainbow.jpeg" alt="Image 4" style="width: 100%; object-fit: contain" class="selected-image" />
			<img src="../assets/images/pagePhoto/moon.jpeg" alt="Image 5" style="width: 100%; object-fit: contain" class="selected-image" />
		</div>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script type="module" src="../assets/js/pages/main.js"></script>
</body>

</html>