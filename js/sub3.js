$("header").addClass('sub')
$("footer").addClass('sub')
const elUl = document.querySelector('.list');
let tag ='',cnt=0,maxCnt=10, poptag='', pop_no;

function pop(e){
    if(e == pop_no){
        $(".on"+e).toggleClass('active');
    } else {
        $(".on"+pop_no).removeClass('active');
        $(".on"+e).addClass('active');
        pop_no = e;
    }
    
}
function dataSet(cnts,maxCnts){
    fetch('./js/data/seoulmat.json')
    .then( (res) => res.json())
    .then(({review})=>{
        tag='';
        for(let i=cnts; i<maxCnts; i++){
            tag += `
            <li onclick="pop(${i})" data-code="${review[i].code}">
                <div class="matname"><p></p><span><img src="./images/main-img/logo-orange.png" alt=""></span></div>
                <div class="star"><img src="./images/sub_3/star${review[i].start}.png" alt=""></div>
                <div class="img"><img src="${review[i].images}" alt=""></div>
                <div class="say"><p>${review[i].content}</p></div>
            </li>
            `
            
            tag += `
                <div class="r_pop on${i}">
                <p class="popbtn"><button>X</button></p>
                    <div class = "r_pop1">
                        <div>
                            <div class="matname"><p></p><span><img src="./images/main-img/logo-orange.png" alt=""></span></div>
                            <div class="img"><img src="${review[i].images}" alt=""></div>
                            <div class="star"><img src="./images/sub_3/star${review[i].start}.png" alt=""></div>
                            <div class="say"><p>${review[i].content}</p></div>
                        </div>
                    </div>
                </div>
            `
        }
        elUl.innerHTML+=tag;
        title_set();

        
    })

    function title_set(){
        const elLi = document.querySelectorAll(".list li");
        elLi.forEach(function(j,q){
            fetch('./js/data/md.json')
            .then( (res2) => res2.json())
            .then(({list})=>{
                list.forEach(function(v,k){
                    if(v.code == j.dataset['code']){
                        $(elLi).eq(q).find('.matname > p').text(v.name);
                        $(".r_pop").eq(q).find('.matname > p').text(v.name);
                        $(".r_pop").eq(q).find('.matname > p').on('click',()=>{
                            localStorage.setItem("pagecode",k)
                            location.href='./detail.html';
                        })
                        $(".popbtn > button").click(function(){
                            $(".r_pop").removeClass('active');
                        });
                    }
                })      
            })
        })
    
    }
}
dataSet(cnt,maxCnt);

function more(){
    cnt = maxCnt;
    maxCnt += 10;
    dataSet(cnt,maxCnt);
}

//검색기능
const inputs = document.querySelector('.search input');
const searchbtn = document.querySelector('.searchbtn');

//버튼 누를 시 
searchbtn.addEventListener('click',()=>{
    searchData(inputs.value)
})

//엔터 누를 시
inputs.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
       searchData(inputs.value)
    }
});

function searchData(e){
    fetch('./js/data/md.json')
    .then(res => res.json())
    .then(({list})=>{
        list.forEach((v,k)=>{
            tag='';
            elUl.innerHTML='';
            if(v.name.includes(e)){
                fetch('./js/data/seoulmat.json')
                .then(res2 => res2.json())
                .then(({review})=>{
                    review.forEach((d,q)=>{
                        if(d.code == v.code) {
                            elUl.innerHTML += `
                            <li onclick="pop(${q})" data-code="${v.code}">
                                <div class="matname"><p>${v.name}</p><span><img src="./images/main-img/logo-orange.png" alt=""></span></div>
                                <div class="star"><img src="./images/sub_3/star${d.start}.png" alt=""></div>
                                <div class="img"><img src="${d.images}" alt=""></div>
                                <div class="say"><p>${d.content}</p></div>
                            </li>
                            
                            `
            
                            elUl.innerHTML += `
                                <div class="r_pop on${q}">
                                <p class="popbtn"><button>X</button></p>
                                    <div class = "r_pop1">
                                        <div>
                                            <div class="matname"><p>${v.name}</p><span><img src="./images/main-img/logo-orange.png" alt=""></span></div>
                                            <div class="img"><img src="${d.images}" alt=""></div>
                                            <div class="star"><img src="./images/sub_3/star${d.start}.png" alt=""></div>
                                            <div class="say"><p>${d.content}</p></div>
                                        </div>
                                    </div>
                                </div>
                            `
                            $(".popbtn > button").click(function(){$(".r_pop").removeClass('active');});
                        }
                    })
                })
            }
        })
    })
}


