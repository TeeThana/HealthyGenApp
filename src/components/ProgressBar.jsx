import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { RecommendDays } from "../api/Gemini";


const ProgressBar = ({ progress, goal }) => {
  console.log(goal)
  console.log("Progress Bar",progress)
  const [loading, setLoading] = useState(false)
  const [percent, setPercent] = useState(0);
  console.log("Percent", percent)

  useEffect(() => {
    setLoading(true)
    setPercent(progress)
    setLoading(false)
  }, [progress])
//   useEffect(() => {
//     const input = async () => {
//       const userData = await AsyncStorage.getItem("userInfo");
//       const parsedUserData = JSON.parse(userData);
//       setUserInfo(parsedUserData);
//       await recommendDays(parsedUserData);
//       console.log("input from async storage: ", parsedUserData);
//     };
//     input();

//   }, []);

//   const recommendDays = async (parsedUserData) => {
//     const res = await RecommendDays(parsedUserData, weight);
//     console.log("goal: ", res );
//   };

  return (
    <View style={tw`absolute z-10 bg-white w-5/6 h-30 rounded-lg shadow-md`}>
      { !loading ? (
        <>
        <View style={tw`flex flex-row mt-5 justify-between px-5`}>
        <Text style={{ fontFamily: "inter-bold", ...tw`text-black` }}>
          Start
        </Text>
        <Text style={{ fontFamily: "inter-bold", ...tw`text-black` }}>
          Day {goal}
        </Text>
      </View>
      <View style={tw`mt-5 items-center`}>
        <Progress.Bar
          progress={percent / 100}
          width={280}
          color={"#00D49D"}
          unfilledColor={"#D9D9D9"}
          borderWidth={0}
          height={8}
        />
        {/* <TextInput
          style={tw`mt-5 `}
          placeholder="Enter your percent"
          keyboardType="numeric"
          value={percent}
          onChangeText={handleWeightChange}
        /> */}
      </View>
        </>
      )
      : (
        <ActivityIndicator/>
      )}
      
    </View>
  );
};

export default ProgressBar;
