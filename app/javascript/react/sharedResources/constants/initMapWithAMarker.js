const initMapWithAMarker = (mapCanvas, lat, lng, zoom) => {
  let mapOptions = {
    center: {
      lat: lat,
      lng: lng
    },
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  let map = new google.maps.Map(mapCanvas, mapOptions)
  let markerOptions = {
    animation: google.maps.Animation.DROP,
    map: map,
    position: {
      lat: lat,
      lng: lng
    }
  }
  let marker
  return marker = new google.maps.Marker(markerOptions)
}

export default initMapWithAMarker
