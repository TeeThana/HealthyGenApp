import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList
} from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Components
import ProgressDairy from "../components/ProgressDairy";

//Api
import { Gemini, getData, getFirstDocName } from "../api/Gemini";

//Icons
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const QuestDairy = ({navigation,  weight }) => {
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [countData, setCountData] = useState(1);
  console.log("Count", countData);

  useEffect(() => {
    const input = async () => {
      const username = await AsyncStorage.getItem("username");
      const userData = await AsyncStorage.getItem("userInfo");
      const parsedUserData = JSON.parse(userData);
      setUserInfo(parsedUserData);
      await requestPlan(parsedUserData, username);
      console.log(
        "input from async storage: ",
        parsedUserData,
        "user:",
        username
      );
    };
    input();
  }, []);

  const handleMaps = (menu) => {
    navigation.navigate("Maps", { menu: menu });
  };

   const handleChecked = (index) => {
    //  console.log(index);
     setChecked((prevChecked) => {
       const updatedChecked = [...prevChecked];
       updatedChecked[index] = !updatedChecked[index];
       return updatedChecked;
     });
     setProgress((prevProgress) => prevProgress + 1);
   };

  const requestPlan = async (userInfo, username) => {
    setLoading(true);
    try {
      const currentDate = new Date()
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-");
      let data = await getData(username, currentDate);

      if (data && data.status === "success") {
        console.log("pull data success");
        setData(data.data);
        console.log("MealPlan", data.data.mealPlan);
        const [mealPlanData, exercisePlanData] = await Promise.all([
          data?.data?.mealPlan,
          data?.data?.exercisePlan,
        ]);
        console.log(mealPlanData.length + exercisePlanData.length)
        const countIndex = mealPlanData.length + exercisePlanData.length;
        console.log("Index", countIndex)
        setCountData(countIndex);

      } else {
        const res = await Gemini(userInfo, weight, username);
        // console.log("quest: ", res && res.status);

        if (res && res.status === "success") {
          data = await getData(username, currentDate);
          if (data && data.status === "success") {
            console.log("pull data success");
            setData(data.data);
          }
        }
      }
    } catch (err) {
      console.error("quest res err: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <View style={tw`flex flex-row justify-center mx-3 mt-5 items-center`}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <ProgressDairy progress={progress} countDiary={countData} />
          {data &&
            Object.entries(data).map(([key, value]) => {
              if (key === "exercisePlan" || key === "mealPlan") {
                return value.map((item, index) => {
                  if (key === "exercisePlan" && value.length !== 0) {
                    index += 3;
                  }
                  return (
                    <View
                      key={index}
                      style={tw`items-baseline bg-white w-5/6 h-20 mt-5 rounded-lg shadow-md flex flex-row justify-between items-center px-4`}
                    >
                      <View style={tw`w-3/5`}>
                        { item.มื้อ &&
                        <Text style={tw`text-black font-bold `}>
                          {item.มื้อ}
                        </Text>
                         }
                        <TouchableOpacity 
                          style={tw`flex-row`}
                          onPress={item.เมนู ? () => handleMaps(item.เมนู) : null}
                          disabled={!item.เมนู}
                        >
                          <Text style={tw`text-black font-bold mr-3`}>
                            {item.เมนู ? item.เมนู : item.ประเภท}
                          </Text>
                          {item.เมนู && <FontAwesome name="location-arrow" size={18} color="#4285F4" />}
                        </TouchableOpacity>
                        <Text style={tw`text-black font-bold `}>
                          {item.แคลอรี่ ? `${item.แคลอรี่} cals` : `${item.ระยะเวลา} นาที`}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          tw`p-3 rounded-md`,
                          {
                            backgroundColor: checked[index]
                              ? "#D9D9D9"
                              : "#00D49D",
                          },
                        ]}
                        onPress={() => {
                          handleChecked(index);
                        }}
                        disabled={checked[index]}
                      >
                        <Text style={tw`text-white font-bold `}>
                          {checked[index] ? "Checked" : "Check"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                });
              }
              return (
                <View>
                  <Text>No Info</Text>
                </View>
              );
            })}
        </>
      )}
    </>
  );
};

export default QuestDairy;
