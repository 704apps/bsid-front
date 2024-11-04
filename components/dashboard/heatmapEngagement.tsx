"use client"

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import Heatmap from 'ol/layer/Heatmap'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Geometry from 'ol/geom/Geometry'

import 'ol/ol.css'

export default function HeatmapEngagement({ title = "Locais de leitura" }: { title?: string }) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Sample data for the heatmap
    const heatmapData = [
      { lon: -122.4194, lat: 37.7749, weight: 0.8 }, // San Francisco
      { lon: -74.0060, lat: 40.7128, weight: 1.0 },  // New York
      { lon: -87.6298, lat: 41.8781, weight: 0.6 },  // Chicago
      { lon: -118.2437, lat: 34.0522, weight: 0.9 }, // Los Angeles
      { lon: -95.3698, lat: 29.7604, weight: 0.7 },  // Houston
    ]

    const features = heatmapData.map(point => 
      new Feature({
        geometry: new Point(fromLonLat([point.lon, point.lat])),
        weight: point.weight
      }) as Feature<Geometry>
    )

    const heatmapLayer = new Heatmap({
      source: new VectorSource({
        features: features
      }),
      blur: 15,
      radius: 10,
      weight: (feature) => feature.get('weight')
    })

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        heatmapLayer
      ],
      view: new View({
        center: fromLonLat([-98.5795, 39.8283]), // Center of USA
        zoom: 4
      })
    })

    return () => map.setTarget(undefined)
  }, [])

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} className="h-[400px] w-full" aria-label="Heatmap visualization" role="img" />
      </CardContent>
    </Card>
  )
}