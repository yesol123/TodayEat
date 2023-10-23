$(document).ready(function () {
    $("header").load("./header.html",hover)
    $("footer").load("./footer.html")

    function hover(){
        $("header li:nth-of-type(4)").on('mouseenter',()=>{
            $("header li:nth-of-type(4) ul").stop().slideDown();
        })
        $("header li:nth-of-type(4)").on('mouseleave',()=>{
            $("header li:nth-of-type(4) ul").stop().slideUp();
        })

        window.addEventListener("resize", ()=>{ resize() })
        
        function resize(){
            const header = document.querySelector('header')
            const headerSection = document.querySelector('header > section');
            let headerLeft = headerSection.offsetLeft;
            let headerWdith = headerSection.clientWidth;
            let windowWdith = header.clientWidth;

            let headerRight = windowWdith - (headerLeft + headerWdith)

            if (windowWdith >= 1200) {
                $(".main > article .store").css("right",`${headerRight}px`)
            }
        }

        resize()

    }
})


