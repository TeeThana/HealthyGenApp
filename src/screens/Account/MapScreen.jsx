import React, { useState, useEffect, useContext } from "react";
import {TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import axios from 'axios';
import AppMapView from "../../components/AppMapView";
import Searchbar from "../../components/Searchbar";
import { UserLocationContext } from "../../contexts/UserLocationContext";
import GlobalApi from "../../utils/GlobalApi";
import PlaceListView from "../../components/PlaceListView";
import { SelectMarkerContext } from "../../contexts/SelectMarkerContext";
import { SelectDirectionContext } from "../../contexts/SelectDirectionContext";

//Icons
import {AntDesign} from "@expo/vector-icons";

const MapScreen = ({navigation, route}) => {
  const FilterMenu = route.params.menu.split(/[\s,]+/)
  const Filter = FilterMenu[0]
  console.log("Menu",route.params.menu)
  const [ filter, setFilter] = useState(Filter);
  console.log("Filter", filter)
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState()
  const [selectedMarker, setSelectedMarker] = useState([]);
  const [direction, setDirection] = useState(null)

  useEffect( () => {
    // const FilterMenu = async () => {
    // if (route.params.menu.includes(" " || ",")) {
    //   const menu = await route.params.menu.split(" " || ",");
    //   setFilter(menu[0]);
    // } else {
    //   setFilter(route.params.menu);
    // }
    // console.log("filter", filter)
    // }
    // FilterMenu()
    location&&fetchPlaces(location?.coords?.latitude, location?.coords?.longitude);
  },[location])

  const fetchPlaces = async (latitude, longitude) => {
    console.log("FetchPlaces", latitude, longitude)
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${filter}&location=${latitude},${longitude}&radius=5000&key=${GlobalApi.API_KEY}`;
    console.log("URL", url)
    try {
      const response = await axios.get(url);
      const filterPlace = response.data.results.filter(place => {
        console.log(place.geometry.location)
      })
      if (response.data.results.length === 0) {
        console.log("No result");
        // ตรงนี้คุณสามารถทำการแสดงข้อความ "No result" หรือดำเนินการต่อตามความต้องการ
      } else {
        setPlaceList(response.data.results);
        // console.log(JSON.stringify(placeList))
      }
    } catch (error) {
      console.error('Error fetching places: ', error);
    }
  };

  // const GetNearByPlace = () => {
  //   const data = {
  //     "includedTypes": ["restaurant"],
  //     "maxResultCount": 10,
  //     "locationRestriction": {
  //       "circle": {
  //         "center": {
  //           "latitude": location?.coords?.latitude,
  //           "longitude": location?.coords?.longitude
  //         },
  //         "radius": 1000.0
  //       }
  //     }
  //   }

  //   GlobalApi.NewNearByPlace(data).then(resp => {
  //     console.log(JSON.stringify(resp.data));
  //     setPlaceList(resp.data.places);
  //   })
  // }
  return (
    <SelectMarkerContext.Provider value={{selectedMarker, setSelectedMarker}}>
    <SelectDirectionContext.Provider value={{direction, setDirection}}>
    <View>
      {/* <View style={tw`mt-15 absolute z-10 w-full px-5`}>
        <Searchbar searchedLocation={(location) => console.log(location)} />
      </View> */}
      <TouchableOpacity style={tw`absolute z-10 top-10 mx-3 bg-white rounded-2 p-2 shadow-md`} onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={25}
            color="#313047"
            solid
          />
        </TouchableOpacity>
      {placeList && <AppMapView placeList={placeList}/>}
      <View style={tw`absolute z-10 bottom-0 w-full`}>
        {placeList && <PlaceListView placeList={placeList}/>}
      </View>
    </View>
    </SelectDirectionContext.Provider>
    </SelectMarkerContext.Provider>
  )
};

export default MapScreen;
