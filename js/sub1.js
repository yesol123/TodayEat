
$("header").addClass('sub')
$("footer").addClass('sub')

// data
const inner = document.querySelector('.sub1 ul');
pop = document.querySelector('.sub1 ');
let tag = '', images = '';


fetch('./js/data/recommend.json')
    .then(res => res.json())
    .then(data => {
        data.forEach((v, k) => {
            images = '';
            for (let i = 0; i < 4; i++) {
                images += `
                    <a class="swiper-slide"><img src="${v.imgs[i]}"></a>
                `
            }
            tag += `
            <li class="swiper${++k} mySwiper">
                <div class="swiper-wrapper">
                    ${images}
                </div>
                <div class="string">
                    <p>${v.title}</p>
                    <p>${v.maincon}</p>
                </div>
            </li>
            `

        })
        inner.innerHTML = tag;

        slide();
        popupData(data);
    })


// slide
function slide() {
    var swiper = new Swiper(`.mySwiper`, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

// popup
function popupData(d) {
    let tag1 = '';
    const aList = document.querySelectorAll('.sub1 li'),
        allList = document.querySelector('.sub1 ul'),
        exPopup = document.querySelector('.sub1 .popup'),
        exPopup1 = document.querySelector('.sub1 .popup .popup1');

    aList.forEach(function (v, k) {
        v.onclick = function () {
            let tag1 = '', bb = '';
            let code_arr = d[k].code;

            fetch('./js/data/md.json')
                .then((res) => res.json())
                .then(({list}) => {
                    list.forEach((md,k) => {
                        for (let i = 0; i < code_arr.length; i++) {
                            if (code_arr[i] == md.code) {
                                bb += `
                                    <figure onclick="detail(${k})">
                                        <p><img src="${md.images}"></p>
                                        <figurecaption>
                                        ${md.name}
                                        </figurecaption>
                                    </figure>
                                    `
                            }
                        }
                    })

                    exPopup.style = 'display:flex';
                    tag1 = `
                            <p>${d[k].title}</p>
                            <p>${d[k].content}</p>
                            <div>${bb}</div>                        
                    `;
                    exPopup1.innerHTML = tag1;
                    
                })
            }
        })
    
    exPopup.onclick = function () {
        if (event.target.className == 'popup') {
            exPopup.style = 'display:none';
        }
    }

}

function ppp(){
    const exPopup = document.querySelector('.sub1 .popup')
    exPopup.style = 'display:none';
}


function detail(k){
    localStorage.setItem("pagecode",k);
    location.href='./detail.html';
}



