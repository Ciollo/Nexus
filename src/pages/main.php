<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<link
			href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
			rel="stylesheet"
		/>
		<link
			rel="icon"
			type="image/x-icon"
			href="../assets/images/nexus_favicon.ico"
		/>
		<link rel="stylesheet" href="../assets/css/style.css" />
		<title>Main</title>
	</head>

	<body class="site-bg">
		<div class="page-container">
			<div class="content-wrap">
				<header
					class="header-main-top"
					data-barba="wrapper"
					id="header-main-top"
				>
					<div class="navbar-top-logo-title">
						<?php
						session_start();
						if (isset($_SESSION['image_path'])) {
							$image_path = $_SESSION['image_path'];
							echo "<img src='$image_path' alt='title nexus' class='title-img-navbar pageImg' />";
						} 
						?>
						<div class="navbar-top-title-page">Title</div>
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
									<img
										src="../assets/images/Nexus_only_logo_no_bg.png"
										alt="title nexus"
										class="img-title-side-navbar"
										id="img-title-side-navbar"
									/>
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
									<span class="nav-link-title display-none title-Page">
										Main
									</span>
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
									<img
										src="../assets/images/default_pfp.jpg"
										alt="user-pfp"
										class="user-pfp link-img"
									/>
								<span class="nav-link-title display-none"> <?php echo $_SESSION['username']; ?> </span>
								</a>
							</li>
						</ul>
					</nav>
				</header>

				<div
					class="main-page-content no-cursor-effect main-page-content-not-active"
				>
					<div class="container-banner">
						<img
							src="../assets/images/cat_macchiato.jpeg"
							alt=""
							class="banner"
						/>
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
							<div
								class="main-page-title-text"
								contenteditable="true"
								data-placeholder="Write title..."
								id="page-title"
							></div>
						</div>

						<div class="container-user-content" id="container-user-content">
							<div
								class="user-content"
								contenteditable="true"
								data-text="Write something..."
								id="user-content"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="main-overlay display-none" id="main-overlay"></div>

		<!-- TODO modificare il div sotto per aggiungerlo mediante funzione non direttamente in html -->
		<div
			id="image-panel"
			style="
				display: none;
				padding: 20px;
				background-color: #f0f0f0;
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			"
		>
			<h2>Select an Image</h2>
			<div
				style="
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
					gap: 10px;
				"
			>
				<img
					src="../assets/images/pagePhoto/camaleonti.jpg"
					alt="Image 1"
					style="width: 100%; object-fit: contain"
					class="selected-image"
				/>
				<img
					src="../assets/images/pagePhoto/Flag_of_Italy.png"
					alt="Image 2"
					style="width: 100%; object-fit: contain"
					class="selected-image"
				/>
				<img
					src="../assets/images/pagePhoto/nexus_logo.png"
					alt="Image 3"
					style="width: 100%; object-fit: contain"
					class="selected-image"
				/>
				<img
					src="../assets/images/pagePhoto/rainbow.jpeg"
					alt="Image 4"
					style="width: 100%; object-fit: contain"
					class="selected-image"
				/>
				<img
					src="../assets/images/pagePhoto/moon.jpeg"
					alt="Image 5"
					style="width: 100%; object-fit: contain"
					class="selected-image"
				/>
			</div>
		</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<script type="module" src="../assets/js/pages/main.js"></script>
	</body>
</html>
