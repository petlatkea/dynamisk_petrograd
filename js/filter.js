
listen = listen.filter( fjernUdsolgte );

function fjernUdsolgte( produkt ) {
    if( produkt.udsolgt != true ) {
        // hvis produktet ikke er udsolgt, skal det fjernes
        return false;
    } else {
        // ellers skal det have lov at blive
        return true;
    }
}

function fjernUdsolgte( produkt ) {
    return !produkt.udsolgt;
}

var fjernUdsolgte = function( produkt ) {
    return !produkt.udsolgt;
}

listen = listen.filter( function( produkt ) {
    return !produkt.udsolgt;
});

listen = listen.filter( produkt => {
    return !produkt.udsolgt;
});

listen = listen.filter( produkt => { !produkt.udsolgt; });

listen = listen.filter( produkt => !produkt.udsolgt );

