
let ranNum = Math.floor(Math.random()*627);
fetch("./js/data/md.json")
            .then((data) => data.json())
            .then(({ list })=>{
                let imgSrc = ``,url=``;
                if(list[ranNum].booking == '') {
                    url = `업체에 전화 문의 주세요.`
                } else {
                    url = `<a href="${list[ranNum].booking}" target="_blank">네이버 예약</a>`
                }
                $(".store-img figure > img").attr('src',list[ranNum].images)
                $(".store-name").html(`<span>${list[ranNum].name}</span><p class="code_insert" onClick="code_in(${list[ranNum].code})" data-code='${list[ranNum].code}'><i class="fa fa-heart" aria-hidden="true"></i></p>`)
                $(".column").eq(1).find("div").eq(0).text(list[ranNum].adress)
                $(".column").eq(1).find("div").eq(1).text(list[ranNum].phone ? list[ranNum].phone  : '등록된 전화번호가 없습니다.')
                $(".column").eq(1).find("div").eq(2).text(list[ranNum].time ? list[ranNum].time.substr(0,28)+"..."  : '등록된 시간이 없습니다.' )
                $(".column").eq(1).find("div").eq(3).text(list[ranNum].description ? list[ranNum].description.substr(0,28)+"..." : "등록 된 정보가 없습니다." )
                $(".column").eq(1).find("div").eq(4).html(url)
                $(".column").eq(1).find("div").eq(5).text(list[ranNum].category)
                $(".column").eq(1).find("div").eq(6).text(list[ranNum].menus[0])
                checkCode();
                $(".detaild").on('click',()=>{
                    localStorage.setItem("pagecode",ranNum);
                    location.href='./detail.html';
                })
            })

const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d'), dragBox = document.querySelector('.main > article');



let ico_xy = [ 
    {x:380,y:420,thumb:'avocado',w:38,h:38,name:'서초구'},
    {x:120,y:410,thumb:'bread',w:38,h:38,name:'구로구'},
    {x:470,y:430,thumb:'french fries',w:38,h:38,name:'강남구'},
    {x:570,y:400,thumb:'coffee',w:38,h:38,name:'송파구'},
    {x:620,y:300,thumb:'chili',w:38,h:38,name:'강동구'},
    {x:280,y:480,thumb:'cooking',w:38,h:38,name:'관악구'},
    {x:205,y:480,thumb:'pineapple',w:20,h:30,name:'금천구'},
    {x:290,y:400,thumb:'pumpkin',w:38,h:38,name:'동작구'},
    {x:210,y:370,thumb:'dumpling',w:38,h:38,name:'영등포구'},
    {x:120,y:345,thumb:'carrot',w:60,h:60,name:'양천구'},
    {x:70,y:260,thumb:'cake',w:45,h:45,name:'강서구'},
    {x:220,y:280,thumb:'pear',w:45,h:45,name:'마포구'},
    {x:330,y:325,thumb:'hot dog',w:45,h:45,name:'용산구'},
    {x:430,y:300,thumb:'ice cream',w:45,h:45,name:'성동구'},
    {x:515,y:285,thumb:'grape',w:45,h:45,name:'광진구'},
    {x:465,y:230,thumb:'sushi rool',w:40,h:40,name:'동대문구'},
    {x:530,y:200,thumb:'burger_1',w:45,h:40,name:'중랑구'},
    {x:505,y:120,thumb:'coffee beans',w:45,h:40,name:'노원구'},
    {x:420,y:50,thumb:'kiwi',w:45,h:40,name:'도봉구'},
    {x:420,y:145,thumb:'donuts',w:45,h:40,name:'강북구'},
    {x:400,y:200,thumb:'orange_1',w:45,h:40,name:'성북구'},
    {x:330,y:220,thumb:'orange',w:55,h:55,name:'종로구'},
    {x:370,y:270,thumb:'honey',w:50,h:50,name:'중구'},
    {x:275,y:245,thumb:'cupcake',w:35,h:35,name:'서대문구'},
    {x:240,y:150,thumb:'onigiri',w:50,h:50,name:'은평구'}
]


let img = new Image();
img.src="./images/main-img/map.png";
img.addEventListener('load',()=>{
    ctx.drawImage(img, 0, 0, 700, 580)

    ico_xy.forEach((v,k) => {
        let newImg = new Image();
        newImg.src = `./images/main-img/icons/${v.thumb}.png`;
        newImg.addEventListener('load',()=>{
            ctx.drawImage(newImg, v.x, v.y, v.w, v.h)
        })

    });
})

canvas.onmousemove = function(event){
    const x = event.clientX - ctx.canvas.offsetLeft; 
    const y = event.clientY - ctx.canvas.offsetTop;

    for(let i=0; i<ico_xy.length; i++){
        let pos ={sx:ico_xy[i].x, dx:ico_xy[i].x + ico_xy[i].w, sy:ico_xy[i].y, dy:ico_xy[i].y + ico_xy[i].h};
        if(pos.sx < x && pos.dx > x && pos.sy < y && pos.dy > y){
            canvas.classList.add('over')
            break;
        } else {
            canvas.classList.remove('over')
        }

    }
}

canvas.onclick = function(event){
    const x = event.clientX - ctx.canvas.offsetLeft; 
    const y = event.clientY - ctx.canvas.offsetTop;

    const list_html = document.querySelector('.store')
    let tag ='',tag_li='',categorys=[],caBtn='';
    

    ico_xy.forEach((v,k) => {
       let pos ={sx:v.x, dx:v.x + v.w, sy:v.y, dy:v.y + v.h};
       if(pos.sx < x && pos.dx > x && pos.sy < y && pos.dy > y){
        if($(window).width() < 481) $(".main article button").show();
        $(list_html).addClass('flex');
        list_html.innerHTML = '';
        
            tag +=`
            
                <div class="eat_title">
                    <figure>
                        <p><img src="./images/main-img/logo-orange.png" alt="logo"></p>
                        <figcaption>
                            <h2> ${v.name} 맛집 </h2>
                        </figcaption>
                    </figure>
                    
                    <span>  </span>
                </div>
                <ul class="eat_list">

            `;
            fetch("./js/data/md.json")
            .then((data) => data.json())
            .then(({ list })=>{
                list.forEach((j,z)=>{
                    if(j.adress.includes(v.name) == true){
                        categorys.push(j.category);
                        tag_li +=`
                            <li onClick="newPop(${j.code})">
                                <p><img src="${j.images}" alt="${j.name}"></p>
                                <h2>${j.name}</h2>
                            </li>
                        `
                    }
                })
                tag += tag_li;
                tag += `</ul>`;
                list_html.innerHTML = tag;
                list_html.classList.add("active");

                if($(window).width() < 481) {
                     let btnTop = $(".store").offset().top - 50;
                     $(".main article > button").css("top", btnTop);
                }

                 

                let ca = new Set(categorys);
                let ca_arr = [...ca];
                for(let i=0; i < ca_arr.length; i++){
                    caBtn += `<span> ${ca_arr[i]} </span>`;
                }
                $(".eat_title").find('span').html(caBtn)
            })
        } 
    });
}

let newTage = '';
function newPop(e){
    const list_html = document.querySelector('.store')
    list_html.classList.remove('active');
    fetch("./js/data/md.json")
            .then((data) => data.json())
            .then(({ list })=>{
                list.forEach((data,k)=>{
                    if (data.code == e) {
                        let url=``;
                        if(data.booking == '') {
                            url = `업체에 전화 문의 주세요.`
                        } else {
                            url = `<a href="${data.booking}" target="_blank">네이버 예약</a>`
                        }
                        list_html.innerHTML = `
                            <div class="store-img">
                                <figure>
                                    <img src="${data.images}" alt="">
                                </figure>
                                <div class="padding">
                                    <div class="row look-detail1">
                                        <div><img src="./images/main-img/icons/map.png" alt=""></div>
                                        <div class="detaild">자세히 보기</div>
                                    </div>
                                </div>
                            </div>
                            <div class="padding">
                                <div class="store-name"><span>${data.name}</span><p class="code_insert" onClick="code_in(${data.code})" data-code='${data.code}'><i class="fa fa-heart" aria-hidden="true"></i></p></div>
                                <div class="row">
                                    <div class="column">
                                        <div><img class="icon" src="./images/main-img/icons/location.png" alt=""></div>
                                        <div><img class="icon" src="./images/main-img/icons/phone.png" alt=""></div>
                                        <div><img class="icon" src="./images/main-img/icons/clock.png" alt=""></div>
                                        <div><img class="icon" src="./images/main-img/icons/inform.png" alt=""></div>
                                        <div><img class="icon" src="./images/main-img/icons/reserve.png" alt=""></div>
                                        <div><img class="icon" src="./images/main-img/icons/category.png" alt=""></div>
                                        <div><img class="icon" src="./images/main-img/icons/sig.png" alt=""></div>
                                    </div>
                                    <div class="column">
                                        <div>${data.adress}</div>
                                        <div>${data.phone ? data.phone  : '등록된 전화번호가 없습니다.'}</div>
                                        <div>${data.time ? data.time.substr(0,28)+"..."  : '등록된 시간이 없습니다.'}</div>
                                        <div>${data.description ? data.description.substr(0,28)+"..." : "등록 된 정보가 없습니다."}</div>
                                        <div>${url}</div>
                                        <div>${data.category}</div>
                                        <div>${data.menus[0]}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="padding">
                                <div class="row look-detail2">
                                    <div><img src="./images/main-img/icons/map.png" alt=""></div>
                                    <div onclick="detail(${k})">자세히 보기</div>
                                </div>
                            </div>
                        `;
                    }
                
                })
                checkCode()
            })
}


function detail(k){
        localStorage.setItem("pagecode",k);
        location.href='./detail.html';
}

let mov=false;
canvas.addEventListener( "mousedown", (e)=>{
        let x = e.clientX;
        let y = e.clientY;
        mov = true;
        moves(x,y)
});
canvas.addEventListener( "mouseup", (e)=>{
    let x = e.clientX;
    let y = e.clientY;
    mov = false; 
    moves(x,y)
});

function moves(x,y){
    let thisLeft = Number(window.getComputedStyle(canvas).getPropertyValue('margin-left').replace(/px/g, '') )
    let thisTop = Number(window.getComputedStyle(canvas).getPropertyValue('margin-top').replace(/px/g, '') )
    canvas.addEventListener( "mousemove", (e)=>{
        if (mov) {
            let mx = e.clientX - x;
            let my = e.clientY - y;
            let marginLeft = thisLeft + mx;
            let marginTop = thisTop + my;
            canvas.style=`margin-left:${marginLeft}px; margin-top:${marginTop}px;`
        }
    })   
}

let mov2=false;
canvas.addEventListener( "touchstart", (e)=>{
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        mov2 = true;
        moves2(x,y)
});
canvas.addEventListener( "touchend", (e)=>{
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    mov2 = false; 
    moves2(x,y)
});



function moves2(x,y){
    let thisLeft = Number(window.getComputedStyle(canvas).getPropertyValue('margin-left').replace(/px/g, '') )
    let thisTop = Number(window.getComputedStyle(canvas).getPropertyValue('margin-top').replace(/px/g, '') )
    canvas.addEventListener( "touchmove", (e)=>{
        if (mov2) {
            let mx = e.touches[0].clientX - x;
            let my = e.touches[0].clientY - y;
            let marginLeft = thisLeft + mx;
            let marginTop = thisTop + my;
            canvas.style=`margin-left:${marginLeft}px; margin-top:${marginTop}px;`
        } else {
            canvas.style.zIndex = 0;
        }
    })   
}


function code_in(e){
    let w_codes = localStorage.getItem("w_code")
    if(!w_codes){
        localStorage.setItem("w_code",e)
    } else {
        let w_arr = w_codes.split(',')
        for(let i=0; i<w_arr.length; i++){
            if(w_arr[i] != e){
                let codes = w_codes + "," + e
                localStorage.setItem("w_code", codes)
            } else {
                localStorage.setItem("w_code", w_arr.filter(v => v != e))
                checkCode()
            }
        }
    }    
    checkCode()
}



function checkCode(){
    let wr_code = localStorage.getItem("w_code");
    let setData = $(".code_insert").data('code');
    if (wr_code){
        wr_arr = wr_code.split(',');
        for(let i=0; i<wr_arr.length; i++){
            if(wr_arr[i] == setData){
                $(".code_insert").addClass('active')
            } else {
                $(".code_insert").removeClass('active')
            }
        }
    }
}


function mpopclose(){
    $('.store').removeClass('flex')
    
    $(".main article button").hide();
}

