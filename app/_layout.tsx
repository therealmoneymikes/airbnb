import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo"
import ModalHeaderText from "@/components/basecomponents/ModalHeaderText";


const CLERK_PUBLISHABLE_KEY ="pk_test_cG93ZXJmdWwtdnVsdHVyZS03NC5jbGVyay5hY2NvdW50cy5kZXYk"
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },

  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

// Storing of our token more secure with expo-secure-store (react-native or expo)
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
// a ! after a variable value means a non-nullable assertion operators. it tells the compile to the treat variable as definitely not nullable or undefined
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
  // Clerk Provider Context available for all other components now
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth(); //info about a users

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(modals)/login"); //calling expo router to push login screen to front screen
    }
  }, [isLoaded]);
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: "Log in or sign up",
          presentation: "modal",
          headerTitleStyle: {
            fontFamily: "mon-sb",
          },
          animation: "fade_from_bottom",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={25} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      {/* [id] should be same as the file name */}
      <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerTransparent: true,
          headerTitle: () => <ModalHeaderText />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{
              backgroundColor: '#fff',
              borderColor: Colors.grey,
              borderRadius: 20,
              borderWidth: 1,
              padding: 4,
            }}>
              <Ionicons name="close-outline" size={22} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      
    </Stack>
  );
}
