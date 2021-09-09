let which_el;
let isIndicationLong = false;
function showSource(e, el, popup) {
    if (e.target == el[0] || e.target == el[1]) {
        popup.classList.toggle("display_none");
        if (popup.classList.contains("display_none")) {
            if (which_el)
                which_el.removeAttribute("style");
        }
        el = e.target;
        which_el = el;
        popup.css({ left: "0px", top: "0px" });
        let elCrd = el.getCrd();
        popup.css({
            left: (elCrd.X + elCrd.w / 2) - popup.offsetWidth / 2 + "px",
            top: elCrd.Y - popup.offsetHeight + "px"
        });
        if (!popup.classList.contains("display_none"))
            el.css({ background: "#295586" });
    } else if (e.target.closest(".source_information") == popup) { }
    else {
        if (!popup.classList.contains("display_none")) {
            popup.classList.add("display_none");
            which_el.removeAttribute("style");
        }
    }
}
{/* <a href='https://www.freepik.com/vectors/logo'>Logo vector created by myriammira - www.freepik.com</a> */ }

function footer(t) {
    let text = t.copyright_phrases;

    //THIS MUST BE CONIGURATED MANUALLY
    const img_l = "./src/assets/";
    const home = {
        flags: {
            intro: text.designed_by,
            author: "Go Squared Ltd.",
            source: "http://www.gosquared.com/",
            img: [img_l + "icons/flags/United-States.png", img_l + "icons/flags/Poland.png", img_l + "icons/flags/Russia.png"],
            style: "",
            desc: "Flags:"
        },
        SN_picons_icons: {
            intro: text.designed_by,
            author: "Morphix Design Studio",
            source: "https://picons.me/",
            img: [img_l + "icons_sn/picons_facebook.svg", img_l + "icons_sn/picons_instagram.svg", img_l + "icons_sn/picons_twitter.svg"],
            style: "",
            desc: "Logos:"
        },
        SN_github_icon: {
            intro: text.designed_by,
            author: "Dave Gandy",
            source: "https://icon-icons.com/ru/%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA/%D0%B3%D0%B8%D1%82%D1%85%D0%B0%D0%B1-%D0%BB%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF/73546",
            img: [img_l + "icons_sn/github.svg"],
            style: "",
            desc: "Logo:"
        }
    }
    //Logo: img designed by Rem - source
    let pageIs = home;
    function copyright(el) {

        for (let [key, v] of Object.entries(pageIs)) {
            el.crEl("div", ".copyrgiht_space", el => {
                el.crEl("p", ".C_desc C_text about-me-t").html(v.desc);
                el.crEl("div",".C_img_box",el=>{
                    v.img.map(e => { el.crEl("img", { class: "C_img", src: e, style:v.style }) });
                })
                el.crEl("p",".C_author C_text about-me-t").html(v.intro+"<br>"+v.author + " &mdash; ").crEl("a",{class:"C_link about-me-t-link",href:v.source}).html(text.source);;
            })
        }

    }


    let links = {
        github: "https://github.com/RemXYZ",
        fb: "#",
        instagram: "#",
        twitter: "#"
    }

    const root = getEl(".root");
    const popUps_container = getEl(".popUps_container");
    const div = "div";

    const footer = crEl("footer", ".footer_main").into(root);

    footer.crEl(div, ".footer_content section", (el) => {
        // el.crEl(div,".footer_line1",el=>{
        //&#169; 2021&mdash;2022 Rem Karablin;
        el.crEl(div, ".copyright_mark f_navItem").html(`&#169; 2021 Rem Karablin<br>
        `);
        // <span><a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Лицензия Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png" /></a><p>Regarding the images, more on <a href="#" class="f_navItem">License</a></p></span> 

        el.crEl("nav", ".footer_nav", el => {
            // el.crEl("a",{class:"f_navItem",href:"/blog"}).html("Blog");
            el.crEl("div").crEl("a", { class: "f_navItem", href: "/contact" }).html("Contact");
            el.crEl("ul", ".source_ul", el => {
                let sItem1 = el.crEl("li", ".sourceItem")
                    .crEl("p", { class: "f_navItem", href: "/acknowledgements" }).html("Acknowledgements");
                let sItem2 = el.crEl("li", ".sourceItem")
                    .crEl("p", { class: "f_navItem", href: "/acknowledgements" }).html("(Source)");
                //show source and authors
                let s_info = popUps_container.pasteText(t.copyright, 0, (st, el) => {
                    copyright(el);
                });
                //THIS EVENT WILL SHOW COPYRIGHT MENU
                window.addEventListener("click", e => { showSource(e, [sItem1, sItem2], s_info) });

            })
            el.crEl("div").crEl("a", { class: "f_navItem", href: "/license" }).html("License");
            el.crEl("div").crEl("a", { class: "f_navItem", href: "/useful_links" }).html("Useful Links");
        })

    });

    footer.crEl(div, ".footer_HR section");

    footer.crEl(div, ".footer_network section", el => {
        let src = "./src/assets/icons_sn/";

        el.crEl(div, ".socialNetwork_box", el => {
            el.crEl("a", { class: "sNLink", href: links.github }).crEl("img", { class: "socialNetwork", src: src + "github.svg" });
            el.crEl("a", { class: "sNLink", href: links.fb }).crEl("img", { class: "socialNetwork", src: src + "picons_facebook.svg" });
            el.crEl("a", { class: "sNLink", href: links.instagram }).crEl("img", { class: "socialNetwork", src: src + "picons_instagram.svg" });
            el.crEl("a", { class: "sNLink", href: links.twitter }).crEl("img", { class: "socialNetwork", src: src + "picons_twitter.svg" });
        });

        el.crEl(div, ".scrollToTop", el => {
            el.crEl("span", ".sTT_text").html("Top");
            el.crEl("img", { script: "sTT_img", src: src + "iconTop.svg" });
            el.addEventListener("click", () => {
                let val = window.pageYOffset;
                let anStart = setInterval((el) => {
                    val -= 20;
                    if (val <= 0) {
                        clearInterval(anStart);
                    }

                    window.scrollTo(window.pageYOffset, val)
                }, 5)
            })
        })

    });
    

}