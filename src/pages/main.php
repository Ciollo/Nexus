<?php
require '../includes/loadPageBlocks.php';

function getUserPages($userId, $conn) {
    $stmt = $conn->prepare("SELECT id, title FROM pages WHERE ID_user = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_all(MYSQLI_ASSOC);
}

require '../includes/connect.php'; // Assicurati che $conn sia la tua connessione al database

$userId = $_SESSION['user_id']; // Assicurati che l'ID utente sia salvato nella sessione
$pages = getUserPages($userId, $conn);
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
                                <img src="../assets/images/Nexus_only_logo_no_bg.png" alt="title nexus" class="img-title-side-navbar" id="img-title-side-navbar" />
                                <!-- TODO MAYBE ADDING SOMETHING -->
                                <!-- <i class='bx bxs-chevrons-left btn-close-open-navbar btn-navbar-not-active btn-open-close-navbar' id="btn-close-open-navbar"></i> -->
                            </a>
                        </li>
                        <li class="navbar-item">
                            <a class="nav-link" id="btn-page-settings">
                                <i class="bx bx-cog link-icon"></i>
                                <span class="nav-link-title display-none">Settings</span>
                            </a>
                        </li>
                        <li class="navbar-item">
                            <a class="nav-link" id="btn-page-add">
                                <i class="bx bx-plus-circle link-icon"></i>
                                <span class="nav-link-title display-none">Add page</span>
                            </a>
                        </li>
                        <?php foreach ($pages as $page) : ?>
                            <li class="navbar-item">
                                <a class="nav-link page-link" href="#" data-page-id="<?= $page['id'] ?>" data-page-title="<?= htmlspecialchars($page['title']) ?>">
                                    <span class="nav-link-title"><?= htmlspecialchars($page['title']) ?></span>
                                </a>
                            </li>
                        <?php endforeach; ?>
                        <li class="navbar-item">
                            <a class="nav-link">
                                <img src="../assets/images/default_pfp.jpg" alt="user-pfp" class="user-pfp link-img" />
                                <span class="nav-link-title display-none"><?php echo $_SESSION['username']; ?></span>
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
                        <?php foreach ($blocks as $block) : ?>
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
                            <?php elseif ($block['ID_type_of_block'] == 5) : ?>
                                <div id="list-block" class="list-block ul block-class" contenteditable="true" type="ul">
                                    <ul>
                                        <li><?= htmlspecialchars($block['Content']) ?></li>
                                    </ul>
                                </div>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="main-overlay display-none" id="main-overlay"></div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="module" src="../assets/js/pages/main.js"></script>
    <script>
		 document.getElementById('btn-page-add').addEventListener('click', function() {
            $.ajax({
                url: '../includes/add_page.php',
                type: 'POST',
                success: function(response) {
                    const newPage = JSON.parse(response);
                    // Aggiorna la sessione lato client (opzionale, gestita dal server in realtà)
                    // Aggiorna la pagina con i nuovi dati
                    location.reload();
                }
            });
        });
        document.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.dataset.pageId;
                const pageTitle = this.dataset.pageTitle;

                $.ajax({
                    url: '../includes/update_page.php',
                    type: 'POST',
                    data: { pageId: pageId, pageTitle: pageTitle },
                    success: function(response) {
                        const result = JSON.parse(response);
                        if (result.status === 'success') {
                            // Ricarica la pagina per aggiornare il contenuto
                            location.reload();
                        } else {
                            console.error(result.message);
                        }
                    }
                });
            });
        });
    </script>
</body>

</html>
