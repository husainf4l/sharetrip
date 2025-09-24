'use client'

import dynamic from 'next/dynamic'
import { Loader } from 'lucide-react'

interface MapMarker {
  lat: number
  lng: number
  title: string
}

interface MiniMapProps {
  markers: MapMarker[]
}

const GoogleMap = dynamic(
  () => import('@react-google-maps/api').then((mod) => mod.GoogleMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader className="w-4 h-4 animate-spin" />
          Loading map...
        </div>
      </div>
    )
  }
)

const Marker = dynamic(
  () => import('@react-google-maps/api').then((mod) => mod.Marker),
  { ssr: false }
)

const LoadScript = dynamic(
  () => import('@react-google-maps/api').then((mod) => mod.LoadScript),
  { ssr: false }
)

const mapContainerStyle = {
  width: '100%',
  height: '300px'
}

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
}

export default function MiniMap({ markers }: MiniMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 text-sm">Map unavailable - no API key configured</p>
      </div>
    )
  }

  if (markers.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 text-sm">No locations to display</p>
      </div>
    )
  }

  const center = markers.length === 1
    ? { lat: markers[0].lat, lng: markers[0].lng }
    : {
        lat: markers.reduce((sum, marker) => sum + marker.lat, 0) / markers.length,
        lng: markers.reduce((sum, marker) => sum + marker.lng, 0) / markers.length,
      }

  const bounds = markers.length > 1
    ? new window.google?.maps?.LatLngBounds().extend(center)
    : undefined

  if (bounds && markers.length > 1) {
    markers.forEach(marker => {
      bounds.extend({ lat: marker.lat, lng: marker.lng })
    })
  }

  const onLoad = (map: google.maps.Map) => {
    if (bounds && markers.length > 1) {
      map.fitBounds(bounds, { padding: 20 })
    }
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={markers.length === 1 ? 15 : 12}
          options={mapOptions}
          onLoad={onLoad}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.title}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}