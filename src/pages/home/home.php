<?php
$my_dir = "./src/pages/home";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Azixon</title>
    <script src="./src/resources/asajs/asa.js"></script>
    <link rel="stylesheet" href="<?=$my_dir?>/css/homeCSS.css">

    <!-- FONTS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Lato -->
    <!-- Montserrat -->
    <!-- REGULAR AND BOLD -->
    <!-- <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;1,900&family=Montserrat:ital,wght@0,400;1,900&display=swap" rel="stylesheet"> -->
    <!-- ALL -->
    
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <!-- FONTS -->
</head>
<body class="light">
<div class="root">
<!-- <div class="section about_site" id="block"></div> -->
</div>

<script type="module">
    import getText from "<?=$my_dir?>/parts/text.js";
    import crHeader from "<?=$my_dir?>/parts/header.js";
    import about_site from "<?=$my_dir?>/parts/about_site.js";
    import blog from "<?=$my_dir?>/parts/blog.js";
    import about from "<?=$my_dir?>/parts/about.js";
    import footer from "./src/main/parts/footer/footer.js";
    let lang = '<?=getUserLanguage();?>';
    if (localStorage.lang) {
        lang = localStorage.lang;
    }
    const main_text = getText(lang);
    crHeader(main_text,lang);
    about_site(main_text);
    blog(main_text.recently_on_the_blog);
    about(main_text);
    footer(main_text);

    // import * as ASA from "./src/resources/asajs/asa-module.js";
</script>

</body>
</html>