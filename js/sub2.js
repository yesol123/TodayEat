$("header").addClass('sub')
$("footer").addClass('sub')
const con = document.querySelector('.con')
let tag ='';


let s_arr = sessionStorage.getItem('s_code'), l_arr = localStorage.getItem('w_code');


$(".list ul li a").each(function(k,v){
    $(this).click(function(e){
        e.preventDefault();
        con.innerHTML=``;   
        $(".list ul li").removeClass('on')
        $(".list ul li").eq(k).addClass('on')
        if(v.innerText == "최근 본 맛집"){
            tag ='';
            s_arr = sessionStorage.getItem('s_code')
            list(s_arr)
        } else {
            tag ='';
            l_arr = localStorage.getItem('w_code');
            list(l_arr)
        }
    })
})


function list(q) {
    fetch('./js/data/md.json')
    .then(res=>res.json())
    .then(({list})=>{   
        list.forEach((v,k)=>{
            if(!q) { tag = ` <h2> 최근 본 목록이 없습니다. </h2> ` }
            else {
                let code_arr = q.split(',');
                let time = '', phone = '';
                for(let i=0; i<code_arr.length; i++){
                    if(v.code == code_arr[i]){
                        if(!v.time) { time = `등록된 이용시간이 없습니다.`} else { time = v.time}
                        if(!v.phone) { phone = `등록된 업체번호가 없습니다.`} else { phone = v.phone}
                        tag += `
                        <li class="on2" >
                            <figure onclick="pageMove(${k})">
                                <img src="${v.images}" alt="">
                                <p class = "ad">
                                    ${v.adress}
                                </p>
                                <i class="fa-solid fa-location-dot"></i>
                                </figure>
                            <b><span onclick="pageMove(${k})">${v.name}</span><span><i class="fa fa-heart" onclick="checkfav(${v.code})" data-code="${v.code}" aria-hidden="true"></i></span></b>
                            <p class="text-overflow-lines">${time}</p>
                            <p>${phone}</p>
                        </li>
                        `
                        
                    }
                }
            }
            
        })
        con.innerHTML = tag;
        fav_icon();
    })
}

list(s_arr)

function pageMove(e){
    localStorage.setItem("pagecode",e);
    location.href='./detail.html';
}


function fav_icon(){
    const findLi = document.querySelectorAll(".on2");

    findLi.forEach(function(v,k){
        const w_code = localStorage.getItem("w_code");
        let w_arr = w_code.split(',');
        let thisCode = $(v).find('b span > i').data('code');        
        for (let i=0; i<w_arr.length; i++){
            if(w_arr[i] == thisCode){
                $(v).addClass('active')
                return false;
            } else {
                $(v).removeClass('active')
            }
        }

    }) 
}


function checkfav(e){
    const w_code = localStorage.getItem("w_code");
    let w_arr = w_code.split(',');
    for(let i=0; i<w_arr.length; i++){
        if(w_arr[i] != e){
            let codes = w_arr + "," + e
            localStorage.setItem("w_code", codes)
        } else {
            localStorage.setItem("w_code", w_arr.filter(v => v != e));
        }
    }
    fav_icon()
}