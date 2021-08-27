var geocoder;
var map
function ExibirGoogleMaps() {
    //Define a latitude e Longitude do Mapa
    var meuEndereco = new google.maps.LatLng(-23.618130, -46.534809);
    var mbbEndereco = new google.maps.LatLng(-23.665900, -46.580600);
    geocoder = new google.maps.Geocoder();
    //Cria opções ou um conjunto de recursos no Google Map
    var mapOptions = {
        center: meuEndereco,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //Exibe o Google map em uma div com as opções definidas
    map = new google.maps.Map(document.getElementById("macDiv"), mapOptions);
    var iconName = "https://cdn1.iconfinder.com/data/icons/flat-transport-icons-1/48/Bus-512.png";

    //Define o marcador no mapa
    var marcador = new google.maps.Marker({
        position: meuEndereco,
        animation: google.maps.Animation.BOUNCE
    });
    var marcador2 = new google.maps.Marker({
        position: mbbEndereco,
        animation: google.maps.Animation.BOUNCE,
    });


    marcador.setMap(map);
    marcador2.setMap(map);
       
}

function codeAddress() {
    var address = document.getElementById("address").value;
    geocoder.geocode({ "address": address }, function (results) {
        if (address !== '') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.BOUNCE,
                position: results[0].geometry.location
            });
            marker.setMap(map);
           
        } else {
            alert('Geocode was not successful');
        }
    });
}
    


