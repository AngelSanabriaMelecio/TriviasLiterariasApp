
var subMenuVisible = [{visible:false},{visible:false}]

function showSubMenu( id ){
    
    let menu = document.getElementById('menu'+id)
    let otherMenu = document.getElementById('menu'+((id-1)*-1))
    
    let subMenu = menu.querySelector('.absoluteFill')
    let otherSubMenu = otherMenu.querySelector('.absoluteFill')
    
    let imgArrow = menu.querySelector(".arrowImg")
    let imgList = menu.querySelector(".listImg")
    
    let otherImgArrow = otherMenu.querySelector(".arrowImg")
    let otherImgList = otherMenu.querySelector(".listImg")


    otherSubMenu.style.opacity = "0%";
    otherSubMenu.style.visibility = "hidden";
    otherImgList.style.opacity = "0%"
    otherImgArrow.style.opacity = "100%"

    subMenuVisible[ (id-1)*-1 ].visible=false

    if( !subMenuVisible[id].visible ){
        imgArrow.style.opacity = "0%";
        imgList.style.opacity='100%'

        subMenu.style.opacity = "100%";
        subMenu.style.visibility = "visible";        
    }
    else{
        imgArrow.style.opacity = "100%";
        imgList.style.opacity='0%'
    
        subMenu.style.opacity = "0%";
        subMenu.style.visibility = "hidden";
    }
    subMenuVisible[id].visible = !subMenuVisible[id].visible


    console.log(subMenuVisible)
}
