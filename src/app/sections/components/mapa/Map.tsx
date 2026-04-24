"use client"

import { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Car, Beef, ArrowLeft, ArrowLeftCircle, MapPin } from "lucide-react"
import { createRoot } from "react-dom/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"


export function MapComponent() {

  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {

    if (!mapContainerRef.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string

    const coordinates: [number, number] = [-75.87826511996293, 8.746841123780412]

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: coordinates,
      zoom: 15.5
    })

    // Contenedor del marcador
    const markerElement = document.createElement("div")
    markerElement.style.display = "flex"
    markerElement.style.flexDirection = "column"
    markerElement.style.alignItems = "center"
    markerElement.style.cursor = "pointer"

    // Imagen del marcador
    const img = document.createElement("img")
    img.src = "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772862995/620429637_17932356405170762_5379083252956222494_n-removebg-preview_jyos1z.png"
    img.style.width = "40px"
    img.style.height = "40px"
    img.style.objectFit = "contain"

    // Texto del lugar
    const label = document.createElement("div")
    label.innerText = "Fundación Hogar Esperanza"
    label.style.fontSize = "14px"
    label.style.fontWeight = "bold"
    label.style.background = "white"
    label.style.padding = "3px 6px"
    label.style.borderRadius = "4px"
    label.style.marginTop = "4px"
    label.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)"

    markerElement.appendChild(img)
    markerElement.appendChild(label)

    new mapboxgl.Marker(markerElement)
      .setLngLat(coordinates)
      .addTo(mapRef.current)

    return () => {
      mapRef.current?.remove()
    }

  }, [])

  return (
    <div
      id="mapa"
      ref={mapContainerRef}
      style={{ width: "100%", height: "400px", borderRadius: "12px" }}
      onClick={() => window.location.href = "https://maps.app.goo.gl/jbBkPTq6yADU7ScU8"}
    />
  )
}

export function MapComponentPage() {

  const router = useRouter()

  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  const [loadingLocation, setLoadingLocation] = useState(false)

  const destination: [number, number] = [-75.87826511996293, 8.746841123780412]

  // =========================
  // CREAR RUTA
  // =========================

  const createRoute = async (start: [number, number]) => {

    const map = mapRef.current
    if (!map) return

    const url =
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`

    const res = await fetch(url)
    const data = await res.json()

    const route = data.routes[0].geometry
    const coordinates = route.coordinates

    if (map.getSource("route")) {
      map.removeLayer("route")
      map.removeSource("route")
    }

    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: route,
        properties: {}
      }
    })

    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      paint: {
        "line-color": "#10B981",
        "line-width": 6
      }
    })

    const bounds = new mapboxgl.LngLatBounds()
    coordinates.forEach((coord: any) => bounds.extend(coord))
    map.fitBounds(bounds, { padding: 80 })

    // =========================
    // CARRO ANIMADO
    // =========================

    const carContainer = document.createElement("div")
    const carRoot = createRoot(carContainer)
    carRoot.render(<Car size={32} color="red" />)

    const carMarker = new mapboxgl.Marker(carContainer)
      .setLngLat(coordinates[0])
      .addTo(map)

    let i = 0
    const total = coordinates.length

    function animate() {

      carMarker.setLngLat(coordinates[i])

      i++

      if (i >= total) {
        i = 0
      }

      setTimeout(animate, 700)

    }

    animate()

  }

  // =========================
  // OBTENER UBICACION USUARIO
  // =========================

  const getUserLocation = () => {

    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización")
      return
    }

    setLoadingLocation(true)

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat = position.coords.latitude
        const lng = position.coords.longitude

        const start: [number, number] = [lng, lat]

        const map = mapRef.current!

        const userContainer = document.createElement("div")
        const userRoot = createRoot(userContainer)
        userRoot.render(<MapPin size={30} color="blue" />)

        new mapboxgl.Marker(userContainer)
          .setLngLat(start)
          .addTo(map)

        await createRoute(start)

        setLoadingLocation(false)

      },

      () => {

        setLoadingLocation(false)
        alert("No se pudo obtener tu ubicación")

      }

    )
  }

  useEffect(() => {

    if (!mapContainerRef.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: destination,
      zoom: 15
    })

    mapRef.current.on("load", () => {

      const map = mapRef.current!

      // =========================
      // CENTRO COMERCIAL
      // =========================

      const mallMarker = document.createElement("div")
      mallMarker.innerText = "Centro Comercial Nuestro Montería"
      mallMarker.style.background = "white"
      mallMarker.style.padding = "4px 8px"
      mallMarker.style.borderRadius = "6px"
      mallMarker.style.fontWeight = "bold"

      new mapboxgl.Marker(mallMarker)
        .setLngLat([-75.86876706799217, 8.744445218491675])
        .addTo(map)

      // =========================
      // FUNDACION
      // =========================

      const hogarMarker = document.createElement("div")
      hogarMarker.innerText = "Fundación Hogar Esperanza"
      hogarMarker.style.background = "white"
      hogarMarker.style.padding = "4px 8px"
      hogarMarker.style.borderRadius = "6px"
      hogarMarker.style.fontWeight = "bold"

      new mapboxgl.Marker(hogarMarker)
        .setLngLat(destination)
        .addTo(map)

      // =========================
      // CABEZA Y COLA
      // =========================

      const cowContainer = document.createElement("div")

      const cowIcon = document.createElement("div")
      const cowRoot = createRoot(cowIcon)
      cowRoot.render(<Beef size={28} color="brown" />)

      cowContainer.appendChild(cowIcon)

      new mapboxgl.Marker(cowContainer)
        .setLngLat([-75.87624632612982, 8.750487932109825])
        .addTo(map)

    })

    return () => {
      mapRef.current?.remove()
    }

  }, [])

  return (

    <div className="w-full relative">

      <div
        ref={mapContainerRef}
        style={{ width: "full", height: "100vh", borderRadius: "12px" }}
      />

      <Button
        className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-[#15803D] text-white py-2 px-2 rounded-full"
        onClick={() => router.back()}
      >
        <ArrowLeftCircle size={20} />
      </Button>

      <Button
        className="absolute top-10 right-10 bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
        onClick={getUserLocation}
      >
        <MapPin size={18} />
        Dar mi ubicación
      </Button>

      <Button
        className="absolute bottom-10 right-1/2 transform translate-x-1/2 bg-[#15803D] text-white py-2 px-4 rounded-full"
        onClick={() => router.push("https://maps.app.goo.gl/jbBkPTq6yADU7ScU8")}
      >
        Ver en Google Maps
      </Button>

      {loadingLocation && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg">

            <div className="animate-spin rounded-full h-6 w-6 border-4 border-green-600 border-t-transparent"></div>

            <span className="font-medium text-sm">
              Obteniendo tu ubicación...
            </span>

          </div>

        </div>
      )}

      <p className="text-center text-sm absolute bottom-0 left-0 right-0 text-white bg-[#15803D] py-2">
        Pulsa "Dar mi ubicación" para ver la ruta
      </p>

    </div>
  )
}