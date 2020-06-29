import React, { useState } from 'react';
import { Map, Marker, Tooltip, TileLayer } from 'react-leaflet';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { getAddressByGeodata } from '../../store/actions/streetsActions';

const useStyles = makeStyles(() => ({
  container: {
    height : '600px',
  },
}));

const Maps = ({address}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [position, setPosition] = useState(null);

  const getGeocodeHandler = async (e) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    dispatch(getAddressByGeodata(lat, lng));
    setPosition([lat, lng]);
  }

  return (
    <Map 
      center={[42.87665992048512, 74.60372865200044]} 
      zoom={15} 
      className={classes.container} 
      onClick={getGeocodeHandler}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      {address && position && (
        <Marker position={position}>
          <Tooltip permanent>
            {address.title}
          </Tooltip>
        </Marker>
      )}
    </Map>
 
  )
};

export default Maps;