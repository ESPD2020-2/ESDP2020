import React from "react";
import { Map, Marker, Tooltip, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";

const CourierTrecking = () => {
  const couriers = useSelector((state) => state.users.couriers);

  return (
    <Map
      center={[42.877473663905946, 74.60403442382814]}
      zoom={13}
      style={{ height: "800px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {couriers &&
        couriers.map(
          (el) =>
            el.geoData && (
              <Marker
                draggable
                key={el._id}
                position={[el.geoData.lat, el.geoData.lon]}
              >
                <Tooltip permanent>{el.displayName || el.username}</Tooltip>
              </Marker>
            )
        )}
    </Map>
  );
};

export default CourierTrecking;
