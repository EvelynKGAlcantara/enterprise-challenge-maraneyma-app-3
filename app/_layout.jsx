import { Stack } from "expo-router";
import { StudentsProvider } from "../app/context/Context";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  useFonts,
  SofiaSans_400Regular,
  SofiaSans_500Medium,
  SofiaSans_700Bold,
  SofiaSans_800ExtraBold,
} from "@expo-google-fonts/sofia-sans";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SofiaSans_400Regular,
    SofiaSans_700Bold,
    SofiaSans_800ExtraBold,
    SofiaSans_500Medium,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StudentsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 150,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onBoarding" />
        <Stack.Screen name="signupScreen" />
        <Stack.Screen name="loginScreen" />
      </Stack>
    </StudentsProvider>
  );
}
