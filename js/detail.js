$("header").addClass('sub')
$("footer").addClass('sub')
const elUl = document.querySelector('.d-list')
let code='',time='',phone='';
fetch('./js/data/md.json')
.then(res=>res.json())
.then(data=>{   
    let k = localStorage.getItem("pagecode")
    let item = data.list[k]
    code = item.code;
    let sk = sessionStorage.getItem("s_code")
    if(!sk){
        sessionStorage.setItem('s_code',item.code)
    }else{
        if(!sk.includes(item.code)){
            let codes = sk + ',' + item.code;
            sessionStorage.setItem('s_code',codes)
        }
    }
    
    if(!k) {
        alert("정상적인 접근 해주세요.")
        location.href='./';
        return false;
    }
    if(!item.time) { time = `등록된 이용시간이 없습니다.`} else { time = item.time}
    if(!item.phone) { phone = `등록된 업체번호가 없습니다.`} else { phone = item.phone}
    elUl.innerHTML = `
                <li class="d-on" data-code='${item.code}'>
                    <b>${item.name}</b>
                    <p class="des">${item.description}</p>
                    <figure>
                        <img src="${item.images}" alt="">
                    </figure>
                    <p>${item.menus}</p>
                    <p class = "ad1">
                    <i class="fa-solid fa-location-dot"></i>
                        ${item.adress}
                    </p>
                    <p>${phone}</p>
                    <p>${time}</p>
                </li>
    `
});


$(".rev a:nth-of-type(2)").on('click',(e)=>{
    e.preventDefault();
    localStorage.setItem("wr_code",code)
    location.href='./write.html';
})




let wr_arr =[];
function checkCode(){
    let wr_code = localStorage.getItem("w_code");
    let setData = $(".d-on").data('code');
    wr_arr = wr_code.split(',')
        for(let i=0; i<wr_arr.length; i++){
            if(wr_arr[i] == setData){
                console.log(wr_arr[i])
                for(let i=0; i<wr_arr.length; i++){
                    if(wr_arr[i] == setData){
                        $(".fav").addClass('active')
                    } else {
                        $(".fav").removeClass('active')
                    }
                }
            }
    }
}

$(".rev a:nth-of-type(1)").on('click',(e)=>{
    e.preventDefault();
    let w_codes = localStorage.getItem("w_code")
    let this_code = $(".d-on").data('code');
    if(!w_codes){
        localStorage.setItem("w_code",this_code)
    } else {
        let w_arr = w_codes.split(',')
        for(let i=0; i<w_arr.length; i++){
            if(w_arr[i] != this_code){
                let codes = w_codes + "," + this_code
                localStorage.setItem("w_code", codes)
            } else {
                localStorage.setItem("w_code", w_arr.filter(v => v != this_code));
            }
        }
    }    
    checkCode()

})

checkCode()