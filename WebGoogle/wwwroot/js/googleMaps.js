var geocoder;
var map;
var latlongArr = [
    {
        lat: -23.644501, long: -46.574699
    },
    {
        lat: -23.639690, long: -46.573689
    },
    {
        lat: -23.639420, long: -46.568520
    },
    {
        lat: -23.636780, long: -46.564659
    },
    {
        lat: -23.613449, long: -46.580250
    },
    {
        lat: -23.600170, long: -46.576740
    },
    {
        lat: -23.592211, long: -46.579651
    },
    {
        lat: -23.590490, long: -46.572250
    },
    {
        lat: -23.593941, long: -46.562061
    },
    {
        lat: -23.592190, long: -46.560322
    },
    {
        lat: -23.580839, long: -46.558479
    },
    {
        lat: -23.583540, long: -46.547939
    },
];

var route;

var compareArrays = 0;

var seta;

var marker;


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
	
	const arrowTest = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    };
    

    const lineArrow = new google.maps.Polyline({
        path: [
            { lat: -23.618130, lng: -46.534809 }, //começo da seta
            { lat: -23.665900, lng: -46.580600 }, //fim da seta

        ],
        icons: [
            {
                icon: arrowTest, //desenho da seta
                offset: "100%",
            },
        ],
        map: map,
    });


    marcador.setMap(map);
    marcador2.setMap(map);
	lineArrow.setMap(map);

    setBusStopsCoordinates(latlongArr, map);
       
}

function codeAddress() {
    if (marker != null || marker != undefined)
        marker.setMap(null);

    var address = document.getElementById("address").value;
    geocoder.geocode({ "address": address }, function (results) {
        if (address !== '') {
            map.setCenter(results[0].geometry.location);
             marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.BOUNCE,
                position: results[0].geometry.location
            });
            marker.setMap(map);

            calcNearestStopPoint(results[0].geometry.location);
           
        } else {
            alert('Geocode was not successful');
        }
    });
}

function calcNearestStopPoint(searchPoint) {

    if (seta != null || seta != undefined) 
        seta.setMap(null);

    let distances = [];
    for (let i = 0; i < latlongArr.length; i++) {
        
        let actualDistance = calcDistPoints(searchPoint, latlongArr[i].lat, latlongArr[i].long);
        distances.push(actualDistance);
      
    }

    let minor = distances.map(Number).reduce(function (a, b) {
        return Math.min(a, b);
    });

    let position = distances.indexOf(minor);

    const arrowTest = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    };

    seta = new google.maps.Polyline({
        path: [
            { lat: searchPoint.lat(), lng: searchPoint.lng() }, //começo da seta
            { lat: latlongArr[position].lat, lng: latlongArr[position].long }, //fim da seta

        ],
        icons: [
            {
                icon: arrowTest, //desenho da seta
                offset: "100%",
            },
        ],
        map: map,
    });

    seta.setMap(map);

}

function calcDistPoints(searchPoints,latStopPoint,longStopPoint) {

    return Math.sqrt(Math.pow(latStopPoint - searchPoints.lat(), 2) + Math.pow(longStopPoint - searchPoints.lng(), 2));

}


//funçao que vai desenhar com conjunto de latlongs que vem da api(banco) usar JQuery colocar url da controller function e timeout set
function setBusCoordinates(latlongArr) {

    let routePoints = [];


    var meuEndereco = new google.maps.LatLng(-23.618130, -46.534809);
    var mbbEndereco = new google.maps.LatLng(-23.665900, -46.580600);
    //Cria opções ou um conjunto de recursos no Google Map
    var mapOptions = {
        center: meuEndereco,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //Exibe o Google map em uma div com as opções definidas
    var map = new google.maps.Map(document.getElementById("macDiv"), mapOptions);

    var marcador = new google.maps.Marker({
        position: meuEndereco,
        animation: google.maps.Animation.BOUNCE,
        title: "Local de saida"
    });
    var marcador2 = new google.maps.Marker({
        position: mbbEndereco,
        animation: google.maps.Animation.BOUNCE,
        title: "Destino"
    });

    marcador.setMap(map);
    marcador2.setMap(map);

    //const arrowTest = {
    //    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    //};

    if (latlongArr.length > 2 /*&& compareArrays > 2*/) //validar compareArrays para reiniciar no fim da viagem e verificar se a tabela de latlong do onibus reinicia no fim da viagem
        route.setMap(null);

    compareArrays++;

    
        let busMarker = new google.maps.Marker({
            position: { lat: latlongArr[latlongArr.length - 1].lat, lng: latlongArr[latlongArr.length - 1].long },
            map,
            icon: {
                path: faBus.icon[4],
                fillColor: "#0000ff",
                fillOpacity: 1,
                anchor: new google.maps.Point(
                    faBus.icon[0] / 2, // width
                    faBus.icon[1] // height
                ),
                strokeWeight: 1,
                strokeColor: "#ffffff",
                scale: 0.075,
            },
            title: "Ônibus",
        });

        busMarker.setMap(map);

        if (latlongArr.length > 1)
        {
            routePoints.push(new google.maps.LatLng(latlongArr[latlongArr.length - 2].lat, latlongArr[latlongArr.length - 2].long)); //verificar se e um JSON
            routePoints.push(new google.maps.LatLng(latlongArr[latlongArr.length - 1].lat, latlongArr[latlongArr.length - 1].long));

            drawCoordinates(routePoints, map);

            routePoints = [];
        }
    

    //var route = new google.maps.Polyline({
    //    path: routePoints,
    //    icons: [
    //        {
    //            icon: arrowTest, //desenho da seta
    //            offset: "100%",
    //        },
    //    ],
    //    map: map,
    //    strokeColor: "#FF0000",
    //    strokeOpacity: 1.0,
    //    strokeWeight: 2
    //});

    //route.setMap(map);

}


function setBusStopsCoordinates(latlongArr, map) {

    //let routePoints = [];


    const arrowTest = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    };

    //let directionsService = new google.maps.DirectionsService;
    //let directionsDisplay = new google.maps.DirectionsRenderer;

    //directionsDisplay.setMap(map);

    for (var i = 0; i < latlongArr.length; i++) {
        let busStopMarker = new google.maps.Marker({
            position: { lat: latlongArr[i].lat, lng: latlongArr[i].long },
            map,
            label: {
                text: "\ue530",
                fontFamily: "Material Icons",
                color: "#ffffff",
                fontSize: "18px",
            },
            title: "Parada",
        });

        if (i > 0) {
            const lineArrow = new google.maps.Polyline({
                path: [
                    { lat: latlongArr[i - 1].lat, lng: latlongArr[i - 1].long }, //começo da seta
                    { lat: latlongArr[i].lat, lng: latlongArr[i].long }, //fim da seta

                ],
                icons: [
                    {
                        icon: arrowTest, //desenho da seta
                        offset: "100%",
                    },
                ],
                map: map,
            });

            lineArrow.setMap(map);
        }
        //if (i > 0) {
        //    directionsService.route({
        //        origin: new google.maps.LatLng(latlongArr[i - 1].lat, latlongArr[i - 1].long),
        //        destination: new google.maps.LatLng(latlongArr[i].lat, latlongArr[i].long),
        //        travelMode: 'DRIVING'
        //    }, function (response, status) {
        //        status === 'OK' ? directionsDisplay.setDirections(result) : window.alert('Falha na obtencao da rota...')
        //    });

        //     directionsDisplay.setMap(map);

        //}
        

        busStopMarker.setMap(map);
        
    }
   
    

}


function drawCoordinates(routePoints, map) {


    const arrowTest = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    };

    route = new google.maps.Polyline({
        path: routePoints,
        icons: [
            {
                icon: arrowTest, //desenho da seta
                offset: "100%",
            },
        ],
        map: map,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    
    route.setMap(map);

    
   

}

    


