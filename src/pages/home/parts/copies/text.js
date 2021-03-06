let links = {
    about:"a>#about",
    blog:"a>blog",
    contact:"a>contact",
    uses_page:"a>uses_page",
    send_message:"a>send_message"
}

function isLink (settings) {
    let Link_regexp = /^a>/g;
    if (Link_regexp.test(settings.tag)) {
        let splittedTag = settings.tag.split(">");
        let tag = splittedTag[0];
        let att = {href:splittedTag[1]};
        att.class = settings.cls;
        return {tag,att};
    }
    return false;
}

function pasteText (arr,whereArg,callback) {
    // console.log(arr)
    // console.log(callback)
    let where = whereArg;
    let thisIsMain = false;

    function doCallback(arg,el) {
        if (callback !== undefined && callback != false && callback != "") {
            callback(arg,el)
        }
    }
    
    if (this instanceof Element & typeof this == "object") {
        thisIsMain = true;
        where = this;
    }
    if ((!where instanceof Element == false & typeof where != "object")) {
        console.error("2 agrument must be the DOM element")
        return 0;
    }
    
    let settings = arr[0];
    // console.log(settings)
    let tag = settings.tag;
    let att = {class:settings.cls};
    //TEST ON LINK AND IT WILL CHANGE ATT TO CLASS AND HREF!
    let link = isLink(settings);
    if (link != false) {
        att = link.att;
        tag = link.tag;
    }

    let newNode;
    if (settings.g === undefined || !settings.g) {
        newNode = crEl(tag,att).into(where);
    }
    
    for (let i = 1;i < arr.length;i++) {
        // if (settings.g) {
        //     crEl(tag,att).html(arr[i]).into(where);
        // }
        if (settings.g === undefined || !settings.g) { 
            let isArr = Array.isArray(arr[i]);
            if (isArr) {
                newNode.pasteText(arr[i],where,callback);   
            }else {
                newNode.html(newNode.html() + arr[i])
                
                if (settings.callback) {
                    // console.log(settings, callback)
                    doCallback(settings.callback,newNode);
                }
            }
        }
    }

    return newNode;
}
export default function requestText (lang) {
setProtoTo(pasteText,getEl);
let result;
switch(lang) {
//exp.
/*
case "lang":
    return { nameVar: [ { ABOUT ELEMENT OR ROOT SETTINGS (CLASS, TAG, GROUP is mean that each element of array will be have root settings) } , TEXT... ] }
*/
    case "en":
    case "en-US":
    case "eng":
        result = {
            header_nav: [{cls:"h_nav",tag:"nav"},
                [{cls:"nav-el",tag:links.about,callback:"aboutAn"},"ABOUT"],
                [{cls:"nav-el",tag:links.blog,callback:"blogAn"},"BLOG"],
                [{cls:"nav-el",tag:"p",callback:"contactAn"},"CONTACTS"]
            ],
            mini_header_nav: [
                {cls:"h_nav_mini_icon_box display_none",tag:"nav"},
                [
                    {cls:"h_nav_mini ",tag:"ul"},
                    [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.about,callback:"aboutAn"},"ABOUT"]],
                    [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.blog,callback:"blogAn"},"BLOG"]],
                    [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.contact},"CONTACT"]]
                    // [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.contact, callback:"language"},"en"]]
                ]
            ],
            //END HEADER
            banner_h_line1:[
                {cls:"banner-t",tag:"h1"},[{cls:"banner-h",tag:"span"},"Azixon"]," is a website about"
            ],
            banner_h_line2:[
                {cls:"banner-h",tag:"h1",g:true},
                "DESIGN",
                "IT",
                "3D",
                "DEVELOPMENT",
                "ART",
                "TECHNOLOGIES"
            ],
            //END BANNER
            about_site: [
                false,
                {
                    header:[{cls:"about-site-h",tag:"h3"},"3D Technologies"],
                    text:[{cls:"about-site-t",tag:"p"},"3D models were created in Blender and scripted using technologies such as WebGL and Three.js"]
                },
                {
                    header:[{cls:"about-site-h",tag:"h3"},"Open Source"],
                    text:[{cls:"about-site-t",tag:"p"},"The main part of the code that can be found on the site are open source software and used for educational purposes. "]
                },
                {
                    header:[{cls:"about-site-h",tag:"h3"},"Design areas"],
                    text:[{cls:"about-site-t",tag:"p"},"The graphic design refers to the following areas: <br> (3D Isometric illustration, 3D icons, Cartoon style, Low poly and Hand painted)"]
                }
            ],
            //END EBOUT SITE
            recently_on_the_blog: [{cls:"blog-h section_header",tag:"h2"},"Recently on the blog"],
            //END Recently on the blog
            about:[{cls:"about-h section_header",tag:"h2"},"About"],
            about_me:[
                {cls:"about-me-t",tag:"p"},
                `Hello! <br>
                <br>
                &nbsp;My name is `,[{cls:['about-me-t about-me-t-hl'],tag:"span"}, "Rem"],`. My main direction is `,
                [{cls:['about-me-t about-me-t-hl'],tag:"span"}, " Web Development"], `
                and on this site I share my experiences and ideas.<br>
                &nbsp;I am also well versed and able to create `,
                [{cls:['about-me-t about-me-t-hl'],tag:"span"}, "3D models"],
                `. <br>
                &nbsp;My sphere activities in graphic development are: <br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                [UI / UX, Icons, Illustrations and Animation].<br>
                <br>`,
                [{cls:['about-me-t about-me-uses-page'],tag:"span"},`&nbsp;If you are interested in the programs and tools that I use, you can check out my `,
                [{cls:['about-me-t about-me-t-link'],tag:links.uses_page}, "Uses page"]],`<br>
                &nbsp;Also I???m always glad to new offers and friends,<br>
                so feel free to `,
                [{cls:['about-me-t about-me-t-link'],tag:links.send_message}, "Send me a message"]
            ],
            about_me_skills: [
                // {cls:"about_me_skills",tag:"p",g:true},
                false,
                `Briefly about my skills:<br>
                My skills as a programmer`,
                "My skills as a 3D artist",
                "My skills as a designer",
                "Languages I speak"
            ],

            copyright : [
                // {cls:"about_me_skills",tag:"p",g:true},
                {cls:"source_information display_none",tag:"div"},
                [{cls:"copyright_text about-me-t SI_C_desc",tag:"p"},"Here I indicate the authors of works taken from the Internet"],

                [{cls:"copyright_box",tag:"div",callback:"copyright"},""],

                [{cls:"copyright_text about-me-t",tag:"p"},"If you saw your content and I did not indicate you, please <br>",
                [{cls:['copyright-link about-me-t-link'],tag:links.send_message}, "contact me"]]
            ],
            copyright_phrases:{
                    author:"Author",
                    author_unknown:"Author unknown",
                    designed_by:"Designed by",
                    created_by:"Created by",
                    source:"source",
                    img:"Image"
                }
        }
        return result;
        //You dont't need break;
    //END OF CASE

    case "ru":
    case "rus":
        result = {
            header_nav: [{cls:"h_nav",tag:"nav"},
                [{cls:"nav-el",tag:links.about,callback:"aboutAn"},"???? ????????????"],
                [{cls:"nav-el",tag:links.blog,callback:"blogAn"},"????????"],
                [{cls:"nav-el",tag:"p",callback:"contactAn"},"????????????????"]
            ],
            mini_header_nav: [
                {cls:"h_nav_mini_icon_box display_none",tag:"nav"},
                [
                    {cls:"h_nav_mini ",tag:"ul"},
                    [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.about,callback:"aboutAn"},"???? ????????????"]],
                    [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.blog,callback:"blogAn"},"????????"]],
                    [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.contact},"????????????????"]]
                ]
            ],
            //END HEADER
            banner_h_line1:[
                {cls:"banner-t",tag:"h1"},[{cls:"banner-h",tag:"span"},"Azixon"]," ?????? ?????????????? ??"
            ],
            banner_h_line2:[
                {cls:"banner-h",tag:"h1",g:true},
                "??????????????",
                "IT",
                "3D",
                "????????????????????",
                "??????????????????",
                "??????????????????????"
            ],
            //END BANNER
            about_site: [
                false,
                {
                    header:[{cls:"about-site-h",tag:"h3"},"3D ????????????????????"],
                    text:[{cls:"about-site-t",tag:"p"},"3D ???????????? ???????? ???????????????? ?? Blender ?? ???????????????????????????? ?????????????????? ???????????????????? ?????????? ?????? WebGL ?? Three.js"]
                },
                {
                    header:[{cls:"about-site-h",tag:"h3"},"???????????????? ????"],
                    text:[{cls:"about-site-t",tag:"p"},"???????????????? ?????????? ???????? ???????????????? ???? ???????????? ?????????????????? ???? ?????????? ???????????????? ???????????????? ???????????????? ?????????? ?? ?????????????????????????? ?? ?????????????? ?????????? "]
                },
                {
                    header:[{cls:"about-site-h",tag:"h3"},"?????????? ??????????????"],
                    text:[{cls:"about-site-t",tag:"p"},"?????????????????????? ???????????? ???????????????????? ?? ?????????????????? ???????????????? <br> (3D ???????????????????????????? ??????????????????????, 3D ????????????, ???????????????????? ??????????, ?????? ???????? ?? ???????????? ??????????????????)"]
                }
            ],
            //END EBOUT SITE
            recently_on_the_blog: [{cls:"blog-h section_header",tag:"h2"},"Recently on the blog"],
            //END Recently on the blog
            about:[{cls:"about-h section_header",tag:"h2"},"???? ????????????"],
            about_me:[
                {cls:"about-me-t",tag:"p"},
                `???????????????????????? ! <br>
                <br>
                &nbsp;???????? ?????????? `,[{cls:['about-me-t about-me-t-hl'],tag:"span"}, "??????"],`. ???????? ???????????????? ???????????????????????? ???????????????? `,
                [{cls:['about-me-t about-me-t-hl'],tag:"span"}, " ?????? ????????????????????"], `
                ?? ???? ???????? ?????????? ?? ???????????? ?????????? ???????????? ?? ????????????.<br>
                &nbsp;?????????? ?? ???????????? ???????? ??????????????????  `,
                [{cls:['about-me-t about-me-t-hl'],tag:"span"}, " 3D ????????????"],
                `. <br>
                &nbsp; ???????? ???????????? ???????????????????????? ?? ?????????????? ?????????????????????? ???????????????????? ???????????????? <br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                [UI / UX, ????????????, ?????????????????????? ?? ????????????????].<br>
                <br>`,
                [{cls:['about-me-t about-me-uses-page'],tag:"span"},`&nbsp;???????? ?????? ?????????????????? ?????????????????? ?? ?????????????????????? ???????????????????? ???????????????? ?? ??????????????????, ???? ???????????? ???????????????? ?????? `,
                [{cls:['about-me-t about-me-t-link'],tag:links.uses_page}, " ???????????????? ????????????????????"]],`<br>
                &nbsp;?????????? ?? ???????????? ?????? ?????????? ???????????????????????? ?? ??????????????????????,<br>
                ?????? ?????? ???? ?????????????????? `,
                [{cls:['about-me-t about-me-t-link'],tag:links.send_message}, " ?????????????????? ?????? ??????????????????"]
            ],
            about_me_skills: [
                // {cls:"about_me_skills",tag:"p",g:true},
                false,
                `Briefly about my skills:<br>
                ?????? ???????????? ?????? ????????????????????????`,
                "?????? ???????????? ?????? ???????????????????????? 3D ??????????????",
                "?????? ???????????? ?????? ??????????????????",
                "?????????? ???? ???????????? ?? ??????????????"
            ],

            copyright : [
                // {cls:"about_me_skills",tag:"p",g:true},
                {cls:"source_information display_none",tag:"div"},
                [{cls:"copyright_text about-me-t SI_C_desc",tag:"p"},"?????????? ?? ???????????????? ?????????????? ?????????? ???? ??????????????????"],

                [{cls:"copyright_box",tag:"div",callback:"copyright"},""],

                [{cls:"copyright_text about-me-t",tag:"p"},"???????? ???? ???????????????? ?????? ?????????????? ?? ?? ???? ???????????? ??????, ????????????????????<br>",
                [{cls:['copyright-link about-me-t-link'],tag:links.send_message}, "?????????????????? ???? ????????"]]
            ],
            copyright_phrases:{
                    author:"??????????",
                    author_unknown:"?????????? ???? ????????????????",
                    designed_by:"????????????????????????",
                    created_by:"???????????????? ",
                    source:"????????????????",
                    img:"??????????????????????"
                }
        }
        return result;
    //END OF CASE
    case "pl":
        result = {
            header_nav: [{cls:"h_nav",tag:"nav"},
                [{cls:"nav-el",tag:links.about,callback:"aboutAn"},"O AUTORZE"],
                [{cls:"nav-el",tag:links.blog,callback:"blogAn"},"BLOG"],
                [{cls:"nav-el",tag:"p",callback:"contactAn"},"KONTAKTY"]
            ],
            mini_header_nav: [
                {cls:"h_nav_mini_icon_box display_none",tag:"nav"},
                [
                    {cls:"h_nav_mini ",tag:"ul"},
                    [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.about,callback:"aboutAn"},"O AUTORZE"]],
                    [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.blog,callback:"blogAn"},"BLOG"]],
                    [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.contact},"KONTAKTY"]]
                    // [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.contact, callback:"language"},"en"]]
                ]
            ],
            //END HEADER
            banner_h_line1:[
                {cls:"banner-t",tag:"h1"},[{cls:"banner-h",tag:"span"},"Azixon"]," to jest strona o"
            ],
            banner_h_line2:[
                {cls:"banner-h",tag:"h1",g:true},
                "DESIGNIE",
                "IT",
                "3D",
                "STRONACH",
                "SZTUCE",
                "TECHNOLOGIACH"
            ],
            //END BANNER
            about_site: [
                false,
                {
                    header:[{cls:"about-site-h",tag:"h3"},"3D Technologii"],
                    text:[{cls:"about-site-t",tag:"p"},"3D modele by??e stworzone w Blenderze, i zaskryptowane przy u??yciu technologii takich jak WebGL i Three.js"]
                },
                {
                    header:[{cls:"about-site-h",tag:"h3"},"Open Source"],
                    text:[{cls:"about-site-t",tag:"p"},"Wi??ksza cze???? kodu kt??r?? tu spotkasz jest open sorce i wykorzystywane do cel??w edukacyjnych."]
                },
                {
                    header:[{cls:"about-site-h",tag:"h3"},"Obszary projektowe"],
                    text:[{cls:"about-site-t",tag:"p"},"Projekt graficzny odnosi si?? do nast??puj??cych obszar??w <br> (3D Ilustracja izometryczna, 3D ikony, Styl kresk??wki, Low poly i Malowanie r??cznie)"]
                }
            ],
            //END EBOUT SITE
            recently_on_the_blog: [{cls:"blog-h section_header",tag:"h2"},"Recently on the blog"],
            //END Recently on the blog
            about:[{cls:"about-h section_header",tag:"h2"},"O mnie"],
            about_me:[
                {cls:"about-me-t",tag:"p"},
                `Witam! <br>
                <br>
                &nbsp;Mam na imi?? `,[{cls:['about-me-t about-me-t-hl'],tag:"span"}, "Rem"],`. Moim g????wnym kierunkiem jest `,
                [{cls:['about-me-t about-me-t-hl'],tag:"span"}, " tworzenie stron internetowych"], `
                i na tej stronie dziel?? si?? moimi do??wiadczeniami i pomys??ami.<br>
                &nbsp;Jestem te?? dobrze zorientowany w tworzyniu `,
                [{cls:['about-me-t about-me-t-hl'],tag:"span"}, "3D model??w"],
                `. <br>
                &nbsp;Moje dzia??ania sferowe w zakresie tworzenia grafiki to: <br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                [UI / UX, Ikony, Ilustracji and Animacja].<br>
                <br>`,
                [{cls:['about-me-t about-me-uses-page'],tag:"span"},`&nbsp;Je??li interesuj?? Ci?? programy i narz??dzia, kt??rych u??ywam, mo??esz sprawdzi?? moj?? `,
                [{cls:['about-me-t about-me-t-link'],tag:links.uses_page}, " Stron?? narz??dzi"]],`<br>
                &nbsp;R??wnie?? zawsze ciesz?? si?? nowymi ofertami i przyjaci????mi,<br>
                wi??c nie kr??puj si?? `,
                [{cls:['about-me-t about-me-t-link'],tag:links.send_message}, "Wy??lij mi wiadomo????"]
            ],
            about_me_skills: [
                // {cls:"about_me_skills",tag:"p",g:true},
                false,
                `Kr??tko o moich umiej??tno??ciach:<br>
                Moje umiej??tno??ci jako programisty`,
                "Moje umiej??tno??ci jako artysta 3D",
                "Moje umiej??tno??ci jako projektanta",
                "J??zyki, kt??rymi pos??uguj?? si??"
            ],

            copyright : [
                // {cls:"about_me_skills",tag:"p",g:true},
                {cls:"source_information display_none",tag:"div"},
                [{cls:"copyright_text about-me-t SI_C_desc",tag:"p"},"Tu wskazuj?? autor??w prac zaczerpni??tych z internetu"],

                [{cls:"copyright_box",tag:"div",callback:"copyright"},""],

                [{cls:"copyright_text about-me-t",tag:"p"},"Je??li widzia??e?? Twoje tre??ci, a ja Ci?? nie wskaza??em, prosz?? <br>",
                [{cls:['copyright-link about-me-t-link'],tag:links.send_message}, "Skontaktuj si?? ze mn??"]]
            ],
            copyright_phrases:{
                    author:"Autor",
                    author_unknown:"Autor nieznany",
                    designed_by:"Zaprojektowane przez",
                    created_by:"Stworzone przez",
                    source:"??r??d??o",
                    img:"Obraz"
                }
        }
        return result;
    //END OF CASE
}
}