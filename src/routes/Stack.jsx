import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Screens
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import IncreaseWeight from "../screens/IncreaseWeight";
import DecreaseWeight from "../screens/DecreaseWeight";
import AccountScreen from "../screens/AccountScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RewardsScreen from "../screens/RewardsScreen";
import MyRewardsScreen from "../screens/MyRewardsScreen";

const Login = createStackNavigator();
const Home = createStackNavigator();
const Account = createStackNavigator();

const AuthStack = () => {
    return (
        <Login.Navigator screenOptions={{ headerShown: false }}>
          <Login.Screen name="SignIn" component={SignInScreen} />
          <Login.Screen name="SignUp" component={SignUpScreen} />
        </Login.Navigator>
    );
  };

const HomeStack = () => {
    return (
        <Home.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Home.Screen name="Home" component={HomeScreen} />
            <Home.Screen name="Increase" component={IncreaseWeight} />
            <Home.Screen name="Decrease" component={DecreaseWeight} />
        </Home.Navigator>
    );
  };

const AccountStack = () => {
    return (
        <Account.Navigator initialRouteName="Account" screenOptions={{ headerShown: false }}>
            <Account.Screen name="Account" component={AccountScreen} />
            <Account.Screen name="Profile" component={ProfileScreen} />
            <Account.Screen name="Rewards" component={RewardsScreen} />
            <Account.Screen name="MyRewards" component={MyRewardsScreen} />
        </Account.Navigator>
    );
  };

export { AuthStack, HomeStack, AccountStack };