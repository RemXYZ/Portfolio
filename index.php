<?php 
// echo "Hi";
// die();

if ($_SERVER['REQUEST_URI'] == '/') {
    $Page = 'index';
    $Module = 'index';
} else {
    $URL_Path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $URL_Parts = explode('/', trim($URL_Path, ' /'));
    $Page = array_shift($URL_Parts);
    $Module = array_shift($URL_Parts);
    if (!empty($Module)) {
        $Param = array();
        for ($i = 0; $i < count($URL_Parts); $i++) {
            $Param[$URL_Parts[$i]] = $URL_Parts[++$i];
        }
    } else $Module = 'main';
}


//source https://overcoder.net/q/1147611/php-%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C-%D1%82%D0%B5%D0%BA%D1%83%D1%89%D0%B8%D0%B9-%D1%8F%D0%B7%D1%8B%D0%BA-%D0%BE%D1%81-%D0%BA%D0%BB%D0%B8%D0%B5%D0%BD%D1%82%D0%B0
$defaultLang = 'en';
function getUserLanguage() {
    $rangeOfLang = ["en","pl","ru"];
    $langs = array();
   if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
   // break up string into pieces (languages and q factors)
        preg_match_all('/([a-z]{1,8}(-[a-z]{1,8})?)\s*(;\s*q\s*=\s*(1|0\.[0-9]+))?/i',
        $_SERVER['HTTP_ACCEPT_LANGUAGE'], $lang_parse);
        if (count($lang_parse[1])) {
            // create a list like â??enâ?? => 0.8
            $langs = array_combine($lang_parse[1], $lang_parse[4]);
            // set default to 1 for any without q factor
            foreach ($langs as $lang => $val) {
                if ($val === '') $langs[$lang] = 1;
            }
            // sort list based on value
            arsort($langs, SORT_NUMERIC);
        }
    }
    //extract most important (first)
    foreach ($langs as $lang => $val) { break; }
    //if complex language simplify it
    if (stristr($lang,"-")) {$tmp = explode("-",$lang); $lang = $tmp[0]; }
    //MODIFICATION 06.09.21
    foreach($rangeOfLang as $v) {
        if ($lang == $v) {$defaultLang = $lang; break;}
    }
    return $defaultLang;
}
//END SOURCE

if ($Page == 'Index.php'){
	include_once "./src/pages/home/home.php";
}
else if ($Page == 'index') {
	include_once "./src/pages/home/home.php";
}
else if ($Page == 'asajs') {
	include_once "./src/resources/asajs/asa.js";
}



?>