$("header").addClass('sub')
$("footer").addClass('sub')
const check = document.querySelectorAll('.click > div > a');
const text = document.querySelectorAll('span');
const imgshow = document.querySelector('ul');
let star = ["./images/sub_3/star1.png","./images/sub_3/star2.png","./images/sub_3/star3.png","./images/sub_3/star4.png","./images/sub_3/star5.png"]
let num = 0;
let tag = '';

const code = localStorage.getItem("wr_code");

fetch('./js/data/md.json')
.then(res=>res.json())
.then(({list})=>{  
    list.forEach((v,k)=>{
        if(v.code == code){
            $(".write_box .heart > p > span").text(v.name)
        }
    })
});

check.forEach(function(v,k){
    v.onclick = function(){
        imgshow.innerHTML='';
            star.forEach(function(a,b){
                if(b == k){
                    tag = `<li><img src="${star[b]}" alt=""></li>`
                    imgshow.innerHTML += tag
                    text[num].classList.remove('active');
                    text[++b].classList.add('active');
                    num = b;
                }
            })
        
    }
})

