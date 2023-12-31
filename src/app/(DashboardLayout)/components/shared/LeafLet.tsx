import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect, useState } from "react";

interface Coordinate {
  lat?: any;
  long?: any;
}

const LeafLet: React.FC<Coordinate> = ({ lat, long }) => {
  const latitude = -6.3560826;
  const longtitude = 106.8532496;
  // const latitude = parseFloat(lat);
  // const longtitude = parseFloat(long);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <MapContainer
        center={[latitude, longtitude]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longtitude]} draggable={true}>
          <Popup>Hey ! I live here</Popup>
        </Marker>
      </MapContainer>
    )
  );
};

export default LeafLet;
