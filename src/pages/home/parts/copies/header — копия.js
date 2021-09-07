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

function pasteText (arr,where) {
    
    if (this instanceof Element & typeof this == "object") where = this;
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

        if (settings.g) {
            crEl(tag,att).html(arr[i]).into(where);
        }

        if (settings.g === undefined || !settings.g) { 
            let isArr = Array.isArray(arr[i]);
            if (isArr) {
                newNode.pasteText(arr[i]);   
            }else {
                newNode.html(newNode.html() + arr[i])
            }
        }

    }
}

export default function crHeader (t) {
    setProtoTo(pasteText,getEl)


    let root = getEl(".root");
    if (root == undefined) return console.error("Root not found");
    const hdr = crEl("header");

    {
    //CREATE HEADER////////////////////////////////////
        const header_line = crEl("div",{class:"header_menu section"}).into(hdr);
        const logo = crEl("a",{class:"site_logo",href:"#"}).into(header_line).html("Azixon");
        header_line.pasteText(t.header_nav);
    //END HEADER////////////////////////////////////
    }

    //CREATE BANNER///////////////////////////////////
    const banner = crEl("div",{class:"banner"});
    const img = crEl("img",{class:"banner_img",src:"./src/assets/banner/background2.png"});
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
                    console.log(m)
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

            function textAnimation (i) {
                //OPACITY ANIMATION
                let op = 1;
                let addOp = false;
                let minusOp = setInterval(() => {
                    if (!addOp) {op -= 0.1;}else {
                        op += 0.1;
                    } 
                    el.css({opacity:op});
                    if (op <= 0) {
                        addOp = true;
                        el.html(b_text2[ShowThisT[i]]);
                    }
                    if (op >= 1) {
                        clearInterval(minusOp);
                    }
                }, 50);
                
            }

            //END OF ANIMATION PART ////////////////////////////////////////////
            console.log(ShowThisT)
            function enterTextBTL(i) {  
                textAnimation(i);
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
            //MUST BE OPTIMIZED 29.08.21
            let bnCrd = banner.getCrd();

            m.x = e.x+window.pageXOffset;
            m.y = e.y+window.pageYOffset;

            let wCenterW = banner.offsetWidth/2;
            let wCenterH = banner.offsetHeight/2;

            function enterParalax(argProc) {
                el.style.transform = `translate(${argProc.x}${argProc.u},${argProc.y}${argProc.u})`;
            }

            
            //smooth transition
            function smTrs(where,dir) {

                function smTrsFun () {
                    if (stopInter) {
                        clearInterval (doSmTrs);
                        InlInProc = false;
                        return false;
                    }         
                    console.log(myProc.x, myProc.y,where,InlInProc)
                    InlInProc = true;
                    //right is +
                    //bottom is +

                    //this is right
                    if (myProc.x > where.x) {
                        // setCorrS("r");
                        let mySpeed = val.r[0]/100
                        if (myProc.x - mySpeed < where.x) {
                            mySpeed = mySpeed - ( mySpeed - myProc.x );
                        }
                        myProc.x -= mySpeed;
                        // console.log(mySpeed)
                    }

                    if (myProc.x < where.x) {
                        // console.log("hi")
                        // let mySpeed = val.l[0]/100;
                        // if (myProc.x - mySpeed > where.x) {
                        //     mySpeed = mySpeed - ( mySpeed + myProc.x );
                        // }
                        // myProc.x += mySpeed;
                    }

                    //this is bottom
                    if (myProc.y > where.y) {
                        let mySpeed = val.b[0]/100;
                        if (myProc.y - mySpeed < where.y) {
                            mySpeed = mySpeed - ( mySpeed - myProc.y );
                        }
                        // console.log(mySpeed , myProc.y)
                        myProc.y -= mySpeed;
                        
                    }
                    if (myProc.y < 0) {
                        // myProc.y += val.t[0]/100;
                    }        
                    
                    enterParalax(myProc);
                    
                    if (where.x == myProc.x && where.y == myProc.y) {
                        // console.log("hi")
                        InlInProc = false;
                        clearInterval (doSmTrs[dir]);
                    }
                }

                if (dir == "x") {

                }
                let doSmTrs = {};
                doSmTrs.x = setInterval(() => {
                    
                }, 40);
                doSmTrs.y = setInterval(() => {
                    
                }, 40);

                //TLS OF PARALAX
                setTimeout(()=>{
                    clearInterval (doSmTrs.x);
                    clearInterval (doSmTrs.y);
                },1000)
            }
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

            // if( (m.x <= bnCrd.x_abs_bd && m.x >= bnCrd.x_abs_bd-100)||(m.y >= bnCrd.x_abs_bd && m.y <= bnCrd.x_abs_bd-100)) {
            //     console.log(m.x <= bnCrd.x_abs_bd)
            //     let dest = myProc;
            //     enterParalax(dest);
            // }else {
                enterParalax(myProc);
            // }
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

    window.onload = function (e) {
        paralaxEffect(dron1,"1.5%","2%","1.5%","2%");
        paralaxEffect(dron2,"1%","1%","1%","1%");
        paralaxEffect(robot,"1%","1.5%","1%","1.5%");
    }
    window.addEventListener("resize",function (){
        // console.log("hi")
    });
    window.addEventListener("scroll",function (){
        if (window.pageYOffset < 100) {
            hdr.css("background",`rgba(32, 32, 32, ${0})`);
        }
        if (window.pageYOffset > 100 && window.pageYOffset <= 400) {
            let proc = ( window.pageYOffset - 100 ) / 100;
            if (proc >= 0.7) {
                proc = 0.7;
            }
            hdr.css("background",`rgba(32, 32, 32, ${proc})`);
        }
    });


    root.prepend(banner);
    root.prepend(hdr);

}