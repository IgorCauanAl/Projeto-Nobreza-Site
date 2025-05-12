
   let indice = 0;
   const titulos = ["Ternos Clássicos","Ternos Modernos"];

    function detectarTelas(){

        if(window.innerWidth >= 1600){
            return 510;
        } else if(window.innerWidth >=1366){
            return 350;
        }
        
    }

    function moverSlideSobreNos(etapas){

        const carrosel = document.getElementById('imagens-container');
        const slides = document.querySelectorAll('.carrosel-img');
        const totalSlides = slides.length;
        const slideTitulos = document.getElementById('titulo-carrosel');

        indice = (indice + etapas +totalSlides) % totalSlides;

        const direcao = etapas > 0 ? "100%" : "-100%"; 

        const telas = detectarTelas()
        carrosel.style.transform = `translateX(-${indice * telas}px)`;


        slideTitulos.style.opacity=0;

        setTimeout(()=>{
            slideTitulos.textContent = titulos[indice];
            slideTitulos.style.opacity = 1;
        },300);

    
}


    let slideIndex = 0;

    function detectarTelasBestSeller (){

        if(window.innerWidth >= 1600){
            return 1110;
        } else if(window.innerWidth >=1366){
            return 1050;
        }
        
    }

    function moverSlideBestSeller(etapas){
        const slides = document.querySelectorAll('.grupo-imagens');
        const totalSlides = slides.length;
  
 
        slideIndex = (slideIndex + etapas + totalSlides) % totalSlides;
  

        const telasBestSeller = detectarTelasBestSeller();

        const carroselRolagem = document.querySelector('.carrosel-rolagem');
        carroselRolagem.style.transform = `translateX(-${slideIndex * telasBestSeller}px)`;
 

 
    }