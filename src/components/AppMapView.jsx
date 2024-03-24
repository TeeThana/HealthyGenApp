import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from "react-native";
import axios from 'axios';
import tw from "twrnc";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewStyle from "../utils/MapViewStyle";
import { UserLocationContext } from '../contexts/UserLocationContext';
import Markers from './Markers';
import GlobalApi from '../utils/GlobalApi';

const AppMapView = ({placeList}) => {
    const { location, setLocation } = useContext(UserLocationContext);
    // console.log("AppMapView", placeList);
    return (
      location?.coords.latitude && (
        <View style={tw`flex`}>
          <MapView
            // zoomControlEnabled={true}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            style={tw`w-full h-full`}
            customMapStyle={MapViewStyle}
            minZoomLevel={15}
            region={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {location? <Marker
              coordinate={{
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
              }}
            >
              {/* <MaterialIcons name="my-location" size={35} color="#3b82f6" /> */}
            </Marker>: null}
            {placeList && placeList.map((item, index) => (
              <Markers key={index}
              index={index}
              place={item}/>
            ))}
          </MapView>
        </View>
      )
    );
}

export default AppMapView