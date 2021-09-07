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
                &nbsp;Also I’m always glad to new offers and friends,<br>
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
                [{cls:"nav-el",tag:links.about,callback:"aboutAn"},"ОБ АВТОРЕ"],
                [{cls:"nav-el",tag:links.blog,callback:"blogAn"},"БЛОГ"],
                [{cls:"nav-el",tag:"p",callback:"contactAn"},"КОНТАКТЫ"]
            ],
            mini_header_nav: [
                {cls:"h_nav_mini_icon_box display_none",tag:"nav"},
                [
                    {cls:"h_nav_mini ",tag:"ul"},
                    [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.about,callback:"aboutAn"},"ОБ АВТОРЕ"]],
                    [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.blog,callback:"blogAn"},"БЛОГ"]],
                    [{cls:"nav_miniItem",tag:"li"},[{cls:"nav-el nav-el-mini",tag:links.contact},"КОНТАКТЫ"]]
                ]
            ],
            //END HEADER
            banner_h_line1:[
                {cls:"banner-t",tag:"h1"},[{cls:"banner-h",tag:"span"},"Azixon"]," это вебсайт о"
            ],
            banner_h_line2:[
                {cls:"banner-h",tag:"h1",g:true},
                "ДИЗАЙНЕ",
                "IT",
                "3D",
                "РАЗРАБОТКЕ",
                "ИСКУССТВЕ",
                "ТЕХНОЛОГИЯХ"
            ],
            //END BANNER
            about_site: [
                false,
                {
                    header:[{cls:"about-site-h",tag:"h3"},"3D технологии"],
                    text:[{cls:"about-site-t",tag:"p"},"3D модели были созданны в Blender и заскриптованны используя технологии такие как WebGL и Three.js"]
                },
                {
                    header:[{cls:"about-site-h",tag:"h3"},"Открытое ПО"],
                    text:[{cls:"about-site-t",tag:"p"},"Основная часть кода каоторую Вы можете встретить на сайте является открытым исходным кодом и использованно в научных целях "]
                },
                {
                    header:[{cls:"about-site-h",tag:"h3"},"Стили дизайна"],
                    text:[{cls:"about-site-t",tag:"p"},"Графический дизайн относиться к следующим облостям <br> (3D Изометрические иллюстрации, 3D иконки, Мульташный стиль, Лоу поли и Ручная обрисовка)"]
                }
            ],
            //END EBOUT SITE
            recently_on_the_blog: [{cls:"blog-h section_header",tag:"h2"},"Recently on the blog"],
            //END Recently on the blog
            about:[{cls:"about-h section_header",tag:"h2"},"Об авторе"],
            about_me:[
                {cls:"about-me-t",tag:"p"},
                `Здравствуйте ! <br>
                <br>
                &nbsp;Меня зовут `,[{cls:['about-me-t about-me-t-hl'],tag:"span"}, "Рэм"],`. Моим основным направлением является `,
                [{cls:['about-me-t about-me-t-hl'],tag:"span"}, " Веб Разработка"], `
                и на этом сайте я делюсь своим опытом и идеями.<br>
                &nbsp;Также я хорошо умею создавать  `,
                [{cls:['about-me-t about-me-t-hl'],tag:"span"}, " 3D модели"],
                `. <br>
                &nbsp; Моей сферой деятельности в области графической разработки является <br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                [UI / UX, Иконки, Иллюстрации и Анимация].<br>
                <br>`,
                [{cls:['about-me-t about-me-uses-page'],tag:"span"},`&nbsp;Если вам интересны программы и инструменты разработки которыми я пользуюсь, вы можете посетить мою `,
                [{cls:['about-me-t about-me-t-link'],tag:links.uses_page}, " Страницу разработки"]],`<br>
                &nbsp;Также я всегда рад новым предложениям и знакомствам,<br>
                так что не стесняйся `,
                [{cls:['about-me-t about-me-t-link'],tag:links.send_message}, " Отправить мне сообщение"]
            ],
            about_me_skills: [
                // {cls:"about_me_skills",tag:"p",g:true},
                false,
                `Briefly about my skills:<br>
                Мои навыки как программиста`,
                "Мои навыки как программиста 3D артиста",
                "Мои навыки как дизайнера",
                "Языки на котрых я общаюсь"
            ],

            copyright : [
                // {cls:"about_me_skills",tag:"p",g:true},
                {cls:"source_information display_none",tag:"div"},
                [{cls:"copyright_text about-me-t SI_C_desc",tag:"p"},"Здесь я указываю авторов работ из интернета"],

                [{cls:"copyright_box",tag:"div",callback:"copyright"},""],

                [{cls:"copyright_text about-me-t",tag:"p"},"Если вы заметили Ваш контент и Я не указал его, пожалуйста<br>",
                [{cls:['copyright-link about-me-t-link'],tag:links.send_message}, "свяжитесь со мной"]]
            ],
            copyright_phrases:{
                    author:"Автор",
                    author_unknown:"Автор не известен",
                    designed_by:"Разработанно",
                    created_by:"Созданно ",
                    source:"источник",
                    img:"Изображение"
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
                    text:[{cls:"about-site-t",tag:"p"},"3D modele byłe stworzone w Blenderze, i zaskryptowane przy użyciu technologii takich jak WebGL i Three.js"]
                },
                {
                    header:[{cls:"about-site-h",tag:"h3"},"Open Source"],
                    text:[{cls:"about-site-t",tag:"p"},"Większa cześć kodu którą tu spotkasz jest open sorce i wykorzystywane do celów edukacyjnych."]
                },
                {
                    header:[{cls:"about-site-h",tag:"h3"},"Obszary projektowe"],
                    text:[{cls:"about-site-t",tag:"p"},"Projekt graficzny odnosi się do następujących obszarów <br> (3D Ilustracja izometryczna, 3D ikony, Styl kreskówki, Low poly i Malowanie ręcznie)"]
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
                &nbsp;Mam na imię `,[{cls:['about-me-t about-me-t-hl'],tag:"span"}, "Rem"],`. Moim głównym kierunkiem jest `,
                [{cls:['about-me-t about-me-t-hl'],tag:"span"}, " tworzenie stron internetowych"], `
                i na tej stronie dzielę się moimi doświadczeniami i pomysłami.<br>
                &nbsp;Jestem też dobrze zorientowany w tworzyniu `,
                [{cls:['about-me-t about-me-t-hl'],tag:"span"}, "3D modelów"],
                `. <br>
                &nbsp;Moje działania sferowe w zakresie tworzenia grafiki to: <br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                [UI / UX, Ikony, Ilustracji and Animacja].<br>
                <br>`,
                [{cls:['about-me-t about-me-uses-page'],tag:"span"},`&nbsp;Jeśli interesują Cię programy i narzędzia, których używam, możesz sprawdzić moją `,
                [{cls:['about-me-t about-me-t-link'],tag:links.uses_page}, " Stronę narzędzi"]],`<br>
                &nbsp;Również zawsze cieszę się nowymi ofertami i przyjaciółmi,<br>
                więc nie krępuj się `,
                [{cls:['about-me-t about-me-t-link'],tag:links.send_message}, "Wyślij mi wiadomość"]
            ],
            about_me_skills: [
                // {cls:"about_me_skills",tag:"p",g:true},
                false,
                `Krótko o moich umiejętnościach:<br>
                Moje umiejętności jako programisty`,
                "Moje umiejętności jako artysta 3D",
                "Moje umiejętności jako projektanta",
                "Języki, którymi posługuję się"
            ],

            copyright : [
                // {cls:"about_me_skills",tag:"p",g:true},
                {cls:"source_information display_none",tag:"div"},
                [{cls:"copyright_text about-me-t SI_C_desc",tag:"p"},"Tu wskazuję autorów prac zaczerpniętych z internetu"],

                [{cls:"copyright_box",tag:"div",callback:"copyright"},""],

                [{cls:"copyright_text about-me-t",tag:"p"},"Jeśli widziałeś Twoje treści, a ja Cię nie wskazałem, proszę <br>",
                [{cls:['copyright-link about-me-t-link'],tag:links.send_message}, "Skontaktuj się ze mną"]]
            ],
            copyright_phrases:{
                    author:"Autor",
                    author_unknown:"Autor nieznany",
                    designed_by:"Zaprojektowane przez",
                    created_by:"Stworzone przez",
                    source:"źródło",
                    img:"Obraz"
                }
        }
        return result;
    //END OF CASE
}
}