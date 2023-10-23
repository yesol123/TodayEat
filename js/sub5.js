$("header").addClass('sub')
$("footer").addClass('sub')
const name = document.querySelector('.rcmd>ul>li:nth-of-type(1)>label>input'),
      menu = document.querySelector('.rcmd>ul>li:nth-of-type(2)>label>input'),
      score = document.querySelector('.rcmd>ul>li:nth-of-type(3)>label>input'),
      review = document.querySelector('.rcmd>ul>li:nth-of-type(4)>label>input'),
      photo = document.querySelector('.rcmd>ul>li:nth-of-type(5)>label>input'),
      elInput = document.querySelectorAll('input'),
      btn = document.querySelector('.rcmd>button')




$('.rcmd>button').on('click',function(){
  let a = name.value,
      b = menu.value,
      c = score.value,
      d = review.value,
      e = photo.value

      if(a == ``){
        alert(`상호명을 입력해주세요`)
        name.focus();
      }else if(b == ``){
        alert(`주문메뉴를 입력해주세요`)
        menu.focus();
      }else if(c == ``){
        alert(`평점을 입력해주세요`)
        score.focus();
      }else if(d == ``){
        alert(`리뷰를 입력해주세요`)
        review.focus();
      }else if(e == ``){
        alert(`사진을 등록해주세요`)
        photo.focus();
      }else{
        elInput.forEach(function(v,k){
          v.value = '';
        });
        alert('등록되었습니다')
      }
})