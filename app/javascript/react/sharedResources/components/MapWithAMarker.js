import React from 'react'

const MapWithAMarker = props => {
  let initMap = () => {
    let lat, lng, map, mapCanvas, mapOptions, marker, markerOptions
    lat = props.latitude
    lng = props.longitude
    mapCanvas = document.getElementById('mapCanvas')
    mapOptions = {
      center: {
        lat: lat,
        lng: lng
      },
      zoom: props.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(mapCanvas, mapOptions)
    markerOptions = {
      animation: google.maps.Animation.DROP,
      map: map,
      position: {
        lat: lat,
        lng: lng
      }
    }
    return marker = new google.maps.Marker(markerOptions)
  }

  if (props.latitude && props.longitude) {
    initMap()
  }

  return(
    <div className='callout' id='mapCanvas' />
  )
}

export default MapWithAMarker
