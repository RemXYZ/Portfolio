export default function about_site(t) {
    const root = getEl(".root");
    const desc = crEl("div",".about_site section");
    let div = "div";
    //as = about site
    let as_img = [
        false,
        "./src/assets/icons/iconCubePV4.png",
        "./src/assets/icons/prog.png",
        "./src/assets/icons/iconDesignR4Evee.png"
    ];

    let text = t.about_site;
    for (let i = 1; i < text.length;i++) {
        let as_block = crEl(div,".AS_block").into(desc);
        crEl(div,".as_content_img_box",(el)=>{
            crEl("img",{class:"as_content_img",src:as_img[i]}).into(el);
        }).into(as_block)

        crEl(div,".as_content",(el)=>{
            el.pasteText(text[i].header);
            el.pasteText(text[i].text);
        }).into(as_block)
    }

    

    root.append(desc);
}