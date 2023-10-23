$("header").addClass('sub')
$("footer").addClass('sub')
const elUl = document.querySelector('.all_ul'),
      elBtn = document.querySelector('button'),
      elInput = document.querySelector('input')
      


let tag = '';
fetch('./js/data/notice.json')
  .then(res => res.json())
  .then(data => {
    tag = `
            <li>
              <ul>
                  <li>번호</li>
                  <li>제목</li>
                  <li>등록일</li>
              </ul>
            </li>
            `
      data.forEach(function(v,k){
        let no = v.no;
          tag += `
                  <li class="all_li" onclick="popUp(${no})">
                    <ul>
                      <li>${v.no}</li>
                      <li>${v.title}</li>
                      <li>${v.date}</li>
                    </ul>
                  </li>
                  `
      })
    elUl.innerHTML = tag;
  })

function popUp(d){
  const elPop = document.querySelector('.popup2');
  $(".popup1").addClass('active')
  fetch('./js/data/notice.json')
    .then(res => res.json())
    .then(data => {
      data.forEach(function(v,k){
        if(v.no == d) {
          tag = `
            <button onclick="closepop()"> X </button>
            <div>
              <h2> ${v.title} </h2>
              <p> ${v.date} </p>

              <span> ${v.content} </span>
            </div>
          `
        }
      })
      elPop.innerHTML = tag;
    })
}

function closepop() {
  $(".popup1").removeClass('active')
}


$("#sr").on('keyup',function(e){
  if (e.keyCode === 13) {
    let keyword = $(this).val();
    ser(keyword)
  }
})
$(".search button").on('click',()=>{
  let keyword = $("#sr").val();
  ser(keyword)

})

function ser(keyword){
  tag = `
  <li>
    <ul>
        <li>번호</li>
        <li>제목</li>
        <li>등록일</li>
    </ul>
  </li>
  `
  fetch('./js/data/notice.json')
  .then(res => res.json())
  .then(data => {
    data.forEach((v)=>{
      if(v.title.includes(keyword)){
        
        tag += `
        <li class="all_li" onclick="popUp(${v.no})">
          <ul>
            <li>${v.no}</li>
            <li>${v.title}</li>
            <li>${v.date}</li>
          </ul>
        </li>
        `
      }
    })
    elUl.innerHTML = tag;
  })
}