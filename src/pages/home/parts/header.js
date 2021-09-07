// var language = window.navigator ? (window.navigator.language ||
//     window.navigator.systemLanguage ||
//     window.navigator.userLanguage) : "en";
// language = language.substr(0, 2).toLowerCase();

let links = {
    github:"https://github.com/RemXYZ",
    fb:"#",
    instagram:"#",
    twitter:"#"
}
//NAMES OF FUNCTION MAST MATCH THE NAMES FROM THE text.js -> animation: ... !!!
const textAnimations = {
    aboutAn:function (arg) {
        let requiredPos = getEl(arg).getCrd().Y;
        let val = window.pageYOffset;
        let isAdd = true;
        if (window.pageYOffset > requiredPos) {
            isAdd = false;
        }
        
        let anStart = setInterval((el)=>{
            if (isAdd) {
                val += 20;
                if (val >= requiredPos) {
                    clearInterval(anStart);
                }
            
            }else {
                val -= 20;
                if (val <= requiredPos) {
                    clearInterval(anStart);
                }
            }
            
            window.scrollTo(window.pageYOffset,val)
        },5)
    },
    blogAn:function (arg) {
        this.aboutAn(arg);
    },
    contactAn:function (el,popup) {
        popup.css({left:"0px",top:"0px"});
        popup.classList.toggle("display_none");
        let elCrd = el.getCrd();
        popup.css({
            left:(elCrd.X+elCrd.w/2) - popup.offsetWidth/2+"px",
            top:elCrd.Y-window.pageYOffset+elCrd.h+"px"
        });
        // el.classList.toggle(".addition_to_nav-el");
        if (popup.classList.contains("display_none")) {
            el.removeAttribute("style");
        }else {
            el.css({background:"rgba(32, 32, 32, 0.7)"});
        }
    }
}

export default function crHeader (t,lang) {
    const langSrcArr = {
        en:"./src/assets/icons/flags/United-States.png",
        pl:"./src/assets/icons/flags/Poland.png",
        ru:"./src/assets/icons/flags/Russia.png"
    }



    const root = getEl(".root");

    //POPUP CONTAINER
    const popUps_container = crEl("div",".popUps_container").into(root);
    

    if (root == undefined) return console.error("Root not found");
    const hdr = crEl("header");

    ///////////////////////////////////////////////////
    //CREATE HEADER////////////////////////////////////
    ///////////////////////////////////////////////////

        const header_line = crEl("div",{class:"header_menu section"}).into(hdr);
        const logo = crEl("a",{class:"site_logo",href:"#"}).into(header_line).html("Azixon");
        let h_nav_mini_icon = header_line.crEl("img",{class:"h_nav_mini_icon", src:"./src/assets/icons/menu.svg"});

        // NAVIGATION ANIMATION

        let conact_information = popUps_container.crEl("div",".conact_information display_none",el=>{
            el.crEl("p",".CI_email").html("Email: hello@gmail.com");
            el.crEl("div",".CI_media",el=>{
            let src = "./src/assets/icons_sn/";
            el.crEl("a",{class:"sNLink",href:links.github}).crEl("img",{class:"socialNetwork",src:src+"github.svg"});
            el.crEl("a",{class:"sNLink",href:links.fb}).crEl("img",{class:"socialNetwork",src:src+"picons_facebook.svg"});
            el.crEl("a",{class:"sNLink",href:links.instagram}).crEl("img",{class:"socialNetwork",src:src+"picons_instagram.svg"});
            el.crEl("a",{class:"sNLink",href:links.twitter}).crEl("img",{class:"socialNetwork lastSN",src:src+"picons_twitter.svg"});
            })
        });
        

        function doHeaderAnimation(arg,el) {
            let val = el;
            let val2 = null;
            if (arg == "aboutAn") val = ".about-h";
            if (arg == "blogAn") val = ".about-h";
            if (arg == "contactAn") val2 = conact_information;
            el.addEventListener("click",()=>textAnimations[arg](val,val2));
        }
        //NAVIGATION
        let nav = header_line.pasteText(t.header_nav,0,(arg,el)=>{
            doHeaderAnimation(arg,el);
        });
        let nav_lang = nav.crEl("div",".lang_select",el=>{
            el.crEl("img",{class:"nav_lang_img", src:langSrcArr[lang]});
            el.crEl("p").html('&#9660;');
        });
        
        let nav_mini = header_line.pasteText(t.mini_header_nav,0,(arg,el)=>{
            doHeaderAnimation(arg,el);
        });
        let nav_mini_leng = nav_mini.querySelector("ul").crEl("li",".nav_miniItem").crEl("div",{class:"lang_select",style:"display: flex; justify-content: center; font-size: 18px;"},el=>{
            el.crEl("img",{class:"nav_lang_img", src:langSrcArr[lang]});
            el.crEl("p").html('&#9660;');
        })

        //NAV LANG popup
    function lang_popup () {
        return crEl("ul",".lang_popup conact_information display_none",el=>{
            for (let [k,v] of Object.entries(langSrcArr)) {
                el.crEl("li",".lp_item",el=>{
                    
                    el.crEl("p","lp_text").html(k);
                    el.crEl("img",{class:"lp_img",src:v}) 
                })
            }
        });
    }
    let lang_popup1 = lang_popup()
    let lang_popup2 = lang_popup()
    lang_popup1.into(nav_mini_leng);
    lang_popup2.into(nav_lang);

    let LOpened = false;
    function change_lang (e) {
        
        let el = e.target;
        if (e.target == this 
            || e.target == this 
            || e.target == this.querySelector(".nav_lang_img")
            || e.target == this.querySelector("p")
        ) {
            if (
                e.target == this.querySelector(".nav_lang_img")
                || e.target == this.querySelector("p")
            ) {el = this;}

            if (!LOpened) {
                el.querySelector("p").html('&#9650;');
                doNotHideMenu = true;
                LOpened = true;
            }else {
                el.querySelector("p").html('&#9660;');
                doNotHideMenu = false;
                LOpened = false;
            }
            textAnimations.contactAn(el, el.querySelector(".lang_popup"));
        }
                
        if (e.target.closest(".lp_item")) {
            el = e.target.closest(".lp_item");
            let new_lang = el.querySelector('p').html();
            localStorage.setItem('lang',new_lang);
            location.reload();
        }
    }

    nav_lang.addEventListener("click",change_lang);
    nav_mini_leng.addEventListener("click",change_lang);


    //THIS EVENT WILL SHOW NAV MENU
    function hideMenu() {
        let menuPos = 0;
        let startPopUpMenu = setInterval(() => {
            menuPos -= 2;
            if (menuPos <= -100) {
                menuPos = -100;
                clearInterval(startPopUpMenu);
                nav_mini.classList.add("display_none");
            }
            nav_mini.style.transform = `translate(0,${menuPos}%)`;
        }, 5);
    }

    function showMenu() {

        nav_mini.classList.remove("display_none");

        let menuPos = -100;
        let startPopUpMenu = setInterval(() => {
            menuPos += 2;
            if (menuPos >= 0) {
                menuPos = 0;
                clearInterval(startPopUpMenu);
            }
            nav_mini.style.transform = `translate(0,${menuPos}%)`;
        }, 5);
        
    }
    let doNotHideMenu = false;
    window.addEventListener("click",function(e){

        if (e.target == h_nav_mini_icon) {

            if (!nav_mini.classList.contains("display_none")) {

                hideMenu();
                
            }else {

                showMenu()

            }

        }else {
            if (!nav_mini.classList.contains("display_none") && !doNotHideMenu) {

                hideMenu();
                
            }
        }
        
    });
    ////////////////////////////////////////////////
    //END HEADER////////////////////////////////////
    ////////////////////////////////////////////////

    //////////////////////////////////////////////////
    //CREATE BANNER///////////////////////////////////
    //////////////////////////////////////////////////

    const banner = crEl("div",{class:"banner"});
    const img = crEl("img",{class:"banner_img",src:"./src/assets/banner/background3.png"});
    banner.append(img);
    // for (let i = 0; i < 9;i++) {
    //     const img_ellipses = crEl("div",{class:`banner_ellips banner_ellips${i}`}).into(banner);
    // }
    const bnr_cnt = crEl("div",".banner_content section").into(banner);
    crEl("div",".banner_header_box",(el)=>{
        crEl("div",".banner_text .banner_text_line1").into(el).pasteText(t.banner_h_line1);

        //WORKING WITH CHANGING TEXT
        let b_text2 = t.banner_h_line2;
        let Node_b_text2 = crEl("div",".banner_text .banner_text_line2").into(el);
        crEl(b_text2[0].tag,{class:b_text2[0].cls},(el)=>{
            let ShowThisT = [];
            function DistrText () {
                for (let i = 1; i < b_text2.length;i++) {
                    let randInt
                    function UnicText() {
                        randInt = getRandomInt(1,b_text2.length-1);
                        if (ShowThisT.some(v=>v==randInt)) {
                            UnicText();
                        }
                    }
                    UnicText();
                    ShowThisT.push(randInt);
                    
                }
            }
            DistrText()

            //ANIMATION PART////////////////////////////////////

            function textAnimation2() {
                //ANIMATION LINE
                let Old_node = el.cloneNode(true);
                Old_node.classList.add("BT_tmp");
                Node_b_text2.append(Old_node)
                let w_par = parseInt(Old_node.CSSinfo().width);
                let w = w_par;
                let m = 0;

                let munisW = setInterval(() => {
                    w -= 2;
                    m += 2;
                    // console.log(m)
                    if (w <= 0) {
                        w = 0;
                        clearInterval(munisW);
                    }
                    if (m == w_par) {
                        m = w_par;
                    }
                    Old_node.style.width = w+"px";
                    Old_node.style.marginLeft = m+"px";
                }, 5);
            }
            
            function textAnimation (i,op,doAnim,addOp) {
                //OPACITY ANIMATION
                let valOp = 0.04;
                if (!addOp) {
                    op -= valOp;
                }else {
                    op += valOp;
                } 
                el.css({opacity:op});
                if (op <= 0) {
                    op = 0;
                    addOp = true;
                    el.html(b_text2[ShowThisT[i]]);
                }
                if (op >= 1) {
                    op = 1;
                    doAnim = false;
                }
                if (doAnim) {
                    requestAnimationFrame(function () {textAnimation(i,op,doAnim,addOp)});
                }      
            }

            //END OF ANIMATION PART ////////////////////////////////////////////
            function enterTextBTL(i) {  
                requestAnimationFrame(function () {textAnimation(i,1,true,false)});
                //ENTER NEW TEXT
                // el.html(b_text2[ShowThisT[i]]);
            }

            let j = 0;
            el.html(b_text2[ShowThisT[j]]);
            setInterval(() => {
                j++;
                if (j > ShowThisT.length-1) j = 0;
                enterTextBTL(j);
            }, 5000);

        }).into(Node_b_text2);
        
    }).into(bnr_cnt);

    function paralaxEffect (el,t,r,b,l) {
        //max: top, right, bottom, left
        function  valRegExp (u) {
            const valRegExp = [new RegExp ("^\\d+(\\.\\d+)?","gi"),new RegExp ("[A-Za-z%]+","g")];
            return [u.match(valRegExp[0])[0].num(),u.match(valRegExp[1])[0]];
        }
        
        let val = {
            t:valRegExp(t),
            r:valRegExp(r),
            b:valRegExp(b),
            l:valRegExp(l)
        }

        //mouse x and y
        let m = {}

        let myProc = {
            t:0,r:0,b:0,l:0
        };
        let stopInter = false;
        let InlInProc = false;

        function trackMouse(e) {
            //MUST BE OPTIMIZED 29.08.21 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            let bnCrd = banner.getCrd();

            m.x = e.x+window.pageXOffset;
            m.y = e.y+window.pageYOffset;

            let wCenterW = banner.offsetWidth/2;
            let wCenterH = banner.offsetHeight/2;

            function enterParalax(argProc) {
                el.style.transform = `translate(${argProc.x}${argProc.u},${argProc.y}${argProc.u})`;
            }

            
            //smooth transition
            function smTrs(where,from) {
                // if (InlInProc) {
                //     return false;
                // }
                //actual position
                let aPos;
                if (from === undefined) {
                    aPos = myProc;
                }else {
                    aPos = from;
                }
                
                let doSmTrs = setInterval(() => {
                    // console.log(stopInter)
                    
                    if (stopInter) {
                        clearInterval (doSmTrs);
                        InlInProc = false;
                        return false;
                    }         
                    // console.log(myProc.x, myProc.y)
                    InlInProc = true;
                    //right is +
                    //bottom is +
                    // console.log(aPos.x,aPos.y,where.x,where.y)
                    //this is right
                    if (aPos.x > where.x) {
                        // setCorrS("r");
                        let mySpeed = val.r[0]/100
                        if (myProc.x - mySpeed < where.x) {
                            mySpeed = mySpeed - ( mySpeed - myProc.x );
                        }
                        myProc.x -= mySpeed;
                        // console.log(mySpeed)
                    }

                    if (aPos.x < where.x) {
                        let mySpeed = val.l[0]/100;
                        if (myProc.x - mySpeed > where.x) {
                            mySpeed = mySpeed - ( mySpeed + myProc.x );
                        }
                        myProc.x += mySpeed;
                    }

                    //this is bottom
                    if (aPos.y > where.y) {
                        let mySpeed = val.b[0]/100;
                        if (myProc.y - mySpeed < where.y) {
                            mySpeed = mySpeed - ( mySpeed - myProc.y );
                        }
                        // console.log(mySpeed , myProc.y)
                        myProc.y -= mySpeed;
                        
                    }
                    if (aPos.y < 0) {
                        // myProc.y += val.t[0]/100;
                    }        


                    // if (where.x == myProc.x) {
                    //     myProc.x = where.x;
                    // }
                    // if (where.y == myProc.y) {
                    //     myProc.y = where.y;
                    // }
                    // myProc.x = where.x;
                    // myProc.y = where.y;
                    
                    enterParalax(myProc);
                    
                    if (where.x == aPos.x && aPos.y == myProc.y) {
                        // console.log("hi")
                        InlInProc = false;
                        clearInterval (doSmTrs);
                    }
                }, 50);

                //TLS OF PARALAX
                // setTimeout(()=>{
                //     InlInProc = false;
                //     clearInterval (doSmTrs);
                // },1000)
            }

            let LastMeeting = {};
            //IF MY MOUSE IS OUTSIDE OF BANNER BORDER, ITEMS MUST RETURN TO x0 and y0
            if(m.x+5 >= bnCrd.x_abs_bd || m.y >= bnCrd.y_abs_bd) {
                stopInter = false;
                let dest = {
                    x:0,
                    y:0,
                    u:myProc.u
                }
                if (dest.x != myProc.x && dest.y != myProc.y) {
                    smTrs(dest);
                }
                
                return false;

            }else {
                // clearInterval (doSmTrs);
                // smTrs(myProc);
                if (!stopInter) {
                    if (myProc.x !== undefined && myProc.y !== undefined) {
                        LastMeeting.x = myProc.x;
                        LastMeeting.y = myProc.y;
                        LastMeeting.u = myProc.u;
                        smTrs(LastMeeting);
                    }
                }
                
            }

            let xProc = Number(((1 - m.x / wCenterW) * 100).toFixed(0));
            let yProc = Number(((1 - m.y / wCenterH) * 100).toFixed(0));
            // console.log(myProc.x,myProc.y,xProc)

            //Create my procent
            function crMyProc(dir) {
                //Just a procent
                let jProc;
                //total Direction
                let totDir;
                if (dir == "l" || dir == "r") {
                    jProc = xProc;
                    totDir = "x";
                }
                if (dir == "t" || dir == "b") {
                    jProc = yProc;
                    totDir = "y";
                }
                myProc[dir] = -1*(val[dir][0] * (jProc/100)).toFixed(1).num();
                myProc[totDir] = myProc[dir];
                myProc.u = val[dir][1];
            }

            if (Math.sign(xProc) == 1) {
                crMyProc("l");
            }
            if (Math.sign(xProc) == -1) {
                crMyProc("r");
            }
            if (Math.sign(yProc) == 1) {
                crMyProc("t");
            }
            if (Math.sign(yProc) == -1) {
                crMyProc("b");
            }

            if (!stopInter) {
                // console.log(myProc.x,myProc.y)
                // smTrs(myProc,LastMeeting);
            }else {
                enterParalax(myProc);
                
            }
            
            stopInter = true;

            // let myCenter = myCrd.X + myCrd.w / 2;

        }

        window.addEventListener("mousemove",trackMouse);
    }

    //DOWNLOADING BANNER CONTENT IMAGES//////////////

    let bnCont_Img = crEl("div",".banner_cont_img_box",(el)=>{}).into(bnr_cnt);
    let dron1 = crEl("img",{class:"banner_cont_img dron",src:"./src/assets/banner/dron1.png"}).into(bnCont_Img);
    let dron2 = crEl("img",{class:"banner_cont_img dron",src:"./src/assets/banner/dron2.png"}).into(bnCont_Img);
    let robot = crEl("img",{class:"banner_cont_img",src:"./src/assets/banner/robot.png"}).into(bnCont_Img);
    //END BANNER////////////////////////////////////////

    function getScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    window.onload = function (e) {
        changeBG_H();
        paralaxEffect(dron1,"1.5%","2%","1.5%","2%");
        paralaxEffect(dron2,"1%","1%","1%","1%");
        paralaxEffect(robot,"1%","1.5%","1%","1.5%");
    }
    
    window.addEventListener("resize",function (){
        // console.log("hi")
    });
    
    function changeBG_H() {
        if (getScroll() < 100) {
            hdr.css("background",`rgba(32, 32, 32, ${0})`);
        }
        if (getScroll() > 100 &&getScroll() <= 400) {
            let proc = (getScroll()-100) / 300;
            if (proc >= 0.7) {
                proc = 0.7;
            }
            hdr.css("background",`rgba(32, 32, 32, ${proc})`);
        }
        if (getScroll() > 301) {
            hdr.css("background",`rgba(32, 32, 32, ${0.7})`);
        } 
    }

    window.addEventListener("scroll",function (){
        changeBG_H();
    });


    root.append(banner);
    root.append(hdr);

}