import { useState, useEffect } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  MarkerClusterer,
  DirectionsRenderer,
  InfoWindow,
} from '@react-google-maps/api';
import BasicTabs from './BasicTabs';

import H2 from '../../components/H2';
function StoreMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDLkElszSVl12F3Pt6hA1Jo7_7eWP_ERno',
  });

  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState('...');
  const [duration, setDuration] = useState('...');
  const [move, setMove] = useState('WALKING');
  const [mapInstance, seMapInstance] = useState(null);

  const center = { lat: 25.0337702, lng: 121.5433378 };

  const stores = [
    { lat: 25.0337702, lng: 121.5433378 }, //大安
    { lat: 25.0480099, lng: 121.5170087 }, //北車
    { lat: 25.0404691, lng: 121.5667799 }, //市府
  ];

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  //計算路徑
  async function caculateRoute() {
    clearRoute();
    // if (originRef.current.value === '' || destinationRef.current.value === '') {
    //   return;
    // }

    const o = { lat: 25.0337702, lng: 121.5433378 };
    // const o = JSON.parse(originRef.current.value);
    const d = { lat: 25.0480099, lng: 121.5170087 };
    // const d = JSON.parse(destinationRef.current.value);
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      // eslint-disable-next-line no-undef
      origin: new google.maps.LatLng(o.lat, o.lng),
      // eslint-disable-next-line no-undef
      destination: new google.maps.LatLng(d.lat, d.lng),
      // eslint-disable-next-line no-undef
      travelMode: move,
    });
    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  async function caculateRoute2() {
    clearRoute();
    const o = { lat: 25.0337702, lng: 121.5433378 };
    const d = { lat: 25.0404691, lng: 121.5667799 };
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      // eslint-disable-next-line no-undef
      origin: new google.maps.LatLng(o.lat, o.lng),
      // eslint-disable-next-line no-undef
      destination: new google.maps.LatLng(d.lat, d.lng),
      // eslint-disable-next-line no-undef
      travelMode: move,
    });
    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }
  //清除距離與時間
  function clearRoute() {
    setDirectionResponse(null);
    setDistance('');
    setDuration('');
  }

  const onLoad = (map) => {
    seMapInstance(map);
  };

  function createKey(stores) {
    return stores.lat + stores.lng;
  }

  return (
    <section className="container mt-5 pt-5">
      <H2 title="店鋪資訊" Entitle="MAP" />
      <div className="d-md-flex">
        <div className="col-12 col-md-6 mapInfo">
          <BasicTabs
            duration={duration}
            distance={distance}
            caculateRoute={caculateRoute}
            caculateRoute2={caculateRoute2}
            move={move}
            setMove={setMove}
            stores={stores}
            moveTo={(to) => {
              mapInstance.panTo(to);
            }}
          ></BasicTabs>
        </div>
        <div className="col-12 col-md-6">
          <GoogleMap
            center={center}
            zoom={14}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              mapId: ['7d73f43b257d967e'],
              disableDefaultUI: true, //關閉預設控制面板
              zoomControl: true,
            }}
            onLoad={onLoad}
          >
            <InfoWindow position={center}>
              <div>
                <h1>大安店</h1>
              </div>
            </InfoWindow>
            <MarkerClusterer averageCenter enableRetinaIcons gridSize={120}>
              {(clusterer) =>
                stores.map((location) => (
                  <Marker
                    key={createKey(location)}
                    position={location}
                    clusterer={clusterer}
                    icon={{
                      url: './images/DountMap.gif',
                    }}
                  />
                ))
              }
            </MarkerClusterer>
            {/* 在地圖上顯示路徑 */}
            {directionResponse && (
              <DirectionsRenderer directions={directionResponse} />
            )}
          </GoogleMap>
        </div>
      </div>
    </section>
  );
}
export default StoreMap;
