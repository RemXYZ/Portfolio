export default function about(t) {

    const root = getEl(".root");
    let div = "div";

    let iconURL = "./src/assets/icons/";
    let skills_name = [false,"prog_skills","a3d_skills","dgn_skills","lang_skills"];
    let iconsList = [
        false,
        [
            {
                style:{height:"65px"},
                title:"HTML",
                img:iconURL+"html_r3.png"
            },
            {
                style:{height:"65px"},
                title:"CSS",
                img:iconURL+"css_r2.png"
            },
            [
                {
                    style:{height:"35px"},
                    title:"*SCSS",
                    img:iconURL+"sass.png"
                },
                {
                    style:{height:"40px",marginRight:"5px"},
                    title:"Bootstrap",
                    img:iconURL+"bootstrap_r1.png"
                },
            ]
            ,{
                style:{height:"50px"},
                title:"Java Script",
                img:iconURL+"js_r2.png"
            },
            [
                // {
                //     style:{height:"50px"},
                //     img:iconURL+"react.png"
                // },
                {
                    style:{height:"50px"},
                    title:"Three.js",
                    img:iconURL+"three.png"
                },
                {
                    style:{height:"50px",marginRight:"5px"},
                    title:"jQuery",
                    img:iconURL+"jquery.gif"
                },
            ],
            {
                style:{height:"35px"},
                title:"PHP",
                img:iconURL+"php_r1.png"
            },
            {
                style:{height:"35px"},
                title:"MySQL",
                img:iconURL+"MySQL.png"
            },
            {
                style:{height:"45px"},
                title:"C++",
                img:iconURL+"cpp_r1.png"
            }

        ],

        [
            {
                style: {height:"45px"},
                title:"Blender",
                img: iconURL+"blender.png"
            },
            [
                {
                    style: {height:"45px"},
                    title:"Modeling",
                    img: iconURL+"iconCubePSD3_1_PS20.png"
                },
                {
                    style: {height:"45px"},
                    title:"Sculpting",
                    img: iconURL+"iconSculpt_1_PSD3_PS20.png"
                },
                {
                    style: {height:"45px","image-rendering":"none"},
                    title:"Retopology",
                    img: iconURL+"sculpt_icon.png"
                },
                {
                    style: {height:"30px"},
                    title:"UV unwrapping",
                    img: iconURL+"uv_icon.png"
                },
                {
                    style: {height:"45px"},
                    title:"Hand Painting",
                    img: iconURL+"iconBrash_2_PSD3_PS20.png"
                },
                {
                    style: {height:"45px"},
                    title:"Rigging",
                    img: iconURL+"iconCubePSD3_PS20.png"
                }
            ]
        ],

        [
            {
                style:{height:"45px"},
                title:"Photoshop",
                img:iconURL+"photoshop.png"
            },
            {
                style:{height:"45px"},
                title:"Figma",
                img:iconURL+"figma2.webp"
            }
        ],
        [
            {
                style:{height:"35px",border:"1px solid #5b5b5b"},
                title:"English",
                img:iconURL+"flags/United-States.png"
            },
            {
                style:{height:"35px",border:"1px solid #5b5b5b"},
                title:"Polish",
                img:iconURL+"flags/Poland.png"
            },
            {
                style:{height:"35px",border:"1px solid #5b5b5b"},
                title:"Russian",
                img:iconURL+"flags/Russia.png"
            }
        ]

    ]
    

    crEl(div,".about_header section").into(root).pasteText(t.about);

    let about = crEl(div,".about_content section").into(root);

    let skills = t.about_me_skills;

    about.crEl(div,".about_me_container", (el)=>{
        el.pasteText(t.about_me);
        el.crEl(div,".my_skills_box",(el)=>{

           for (let i = 1; i < skills.length; i++) {
            el.crEl(div,".skills about-me-t " + skills_name[i], (el)=>{
                el.crEl("p",".skills_H").html(skills[i]);
                el.crEl(div,".skills_img_box",(box)=>{

                    //!!!the number of iconsList must match the skills!!!
                    for(let ix = 0; ix<iconsList[i].length; ix++) {
                        
                        // console.log(iconsList[i])
                        if (Array.isArray(iconsList[i][ix])) {
                            let nested = box.crEl(div,".nestedItem_skills");
                            iconsList[i][ix].map((iHref)=>{
                                crEl("img",{class:"skills_img nestedSkell", src:iHref.img, title: iHref.title}).into(nested)
                                .css(iHref.style);
                            });
                            crEl("span",".skills_bracket").into(nested,true).html("[");
                            crEl("span",".skills_bracket").into(nested).html("]");
                            continue;
                        }
                        // console.log(iconsList[i][ix])
                        box.crEl("img",{class:"skills_img", src:iconsList[i][ix].img, title:iconsList[i][ix].title}).
                        css(iconsList[i][ix].style);
                    }

                })
            });
           }
        //END OF my_skills_box()
        });
    })

    about.crEl(div,".portrait_div").crEl("img",{src:"./src/assets/portrait/r4_2.png",class:"portrait"})


//END OF MAIN FUNCTION
}