window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    // læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);

    // registrer filter-knap
    document.querySelector(".filterknap_vegetar").addEventListener("click", filtrerVegetar );

}

var vegetarfilter = false;

function filtrerVegetar( event ) {
    console.log("filtrerVegetar");
    document.querySelectorAll(".produkt:not(.vegetar)").forEach( p => p.classList.toggle("hidden") ) ;
    /*
    // toggle vegetarfilter
    if( vegetarfilter ) {
        vegetarfilter = false;
        console.log("vis ikke-vegetar produkter");
        document.querySelectorAll(".produkt:not(.vegetar)").forEach( p => p.classList.toggle("hidden") ) ;
    } else {
        vegetarfilter = true;
        // vis kun vegetar-produkter!
        document.querySelectorAll(".produkt:not(.vegetar)").forEach( p => p.classList.add("hidden"));
        console.log("skjul ikke-vegetar produkter");
    }
    */
    event.preventDefault();
}


/* ***************************************** */

function visProduktListe( listen ) {
    console.table( listen );
    listen.forEach( visProdukt );
}

function visProdukt( produkt ) {
    console.log( produkt );
    // klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    // indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil( produkt.pris - (produkt.pris*produkt.rabatsats/100) );
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "/imgs/small/" + produkt.billede + "-sm.jpg";

    if( produkt.udsolgt == false ) {
        // produktet er ikke udsolgt
        // udsolgttekst skal fjernes
        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild( udsolgttekst );
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    if( produkt.udsolgt == true || produkt.rabatsats == 0 ) {
        // der er ikke rabat, rabat-prisen skal fjernes
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }


    // tilføj klasser til produkt
    if( produkt.vegetar == true ) {
        klon.querySelector(".produkt").classList.add("vegetar");
    }
    if( produkt.udsolgt ) {
        klon.querySelector(".produkt").classList.add("udsolgt");
    }
    if( produkt.rabatsats > 0 ) {
        klon.querySelector(".produkt").classList.add("tilbud");
    }
    if( produkt.alkoholprocent > 0 ) {
        klon.querySelector(".produkt").classList.add("alkohol");
    }


    // tilføj produkt-id til modalknap
    klon.querySelector(".modalknap").dataset.produkt = produkt.id;

    // registrer klik på modalknap
    klon.querySelector(".modalknap").addEventListener("click", modalKnapKlik)

    // append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);
}

function modalKnapKlik( event ) {
    console.log("knapklik", event);

    // find det produkt id, hvis knap der blev trykket på
    var produktId = event.target.dataset.produkt;
    console.log("Klik på produkt: ", produktId);

    $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?",{id: produktId}, visModalProdukt);

}

function visModalProdukt( produkt ) {
    console.log("vis modal for ", produkt);

    // find modal_template - klon den
    var klon = document.querySelector("#modal_template").content.cloneNode(true);

    // put data i klonen
    klon.querySelector(".data_navn").innerHTML = produkt.navn;

    // sletter det der stod i modal-content
    document.querySelector(".modal-content").innerHTML = "";

    // append klonen til modal-content
    document.querySelector(".modal-content").appendChild(klon);

}






















