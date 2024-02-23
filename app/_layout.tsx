// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
//
// import { useColorScheme } from '@/components/useColorScheme';
// import {GoBackConfiguration} from "@/src/components/GoBackConfiguration";
//
// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';
//
// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };
//
// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();
//
// export default function RootLayout() {
//   const [loaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     ...FontAwesome.font,
//   });
//
//   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);
//
//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);
//
//   if (!loaded) {
//     return null;
//   }
//
//   return <RootLayoutNav />;
// }
//
// function RootLayoutNav() {
//   const colorScheme = useColorScheme();
//
//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <GoBackConfiguration />
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
//       </Stack>
//     </ThemeProvider>
//   );
// }

import { ThemeProvider } from '@emotion/react';
import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { GoBackConfiguration } from '@/src/components/GoBackConfiguration';
import { theme } from '@/src/design-system/theme/theme';
import { Home } from '@/src/pages/Home';
import { ProgramGridPage } from '@/src/pages/ProgramGridPage';
import { Menu } from '@/src/components/Menu/Menu';
import { MenuProvider } from '@/src/components/Menu/MenuContext';
import styled from '@emotion/native';
import { useFonts } from '@/src/hooks/useFonts';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProgramInfo } from '@/src/modules/program/domain/programInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProgramDetail } from '@/src/pages/ProgramDetail';
import { NonVirtualizedGridPage } from '@/src/pages/NonVirtualizedGridPage';
import { GridWithLongNodesPage } from '@/src/pages/GridWithLongNodesPage';
import { useTVPanEvent } from '@/src/components/PanEvent/useTVPanEvent';
import ScreenTest from "@/src/components/ScreenTest";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
  Home: undefined;
  ProgramGridPage: undefined;
  NonVirtualizedGridPage: undefined;
  GridWithLongNodesPage: undefined;
};

export type RootStackParamList = {
  TabNavigator: undefined;
  ProgramDetail: { programInfo: ProgramInfo };
};

const RenderMenu = (props: BottomTabBarProps) => <Menu {...props} />;

const TabNavigator = () => {
  return (
      <MenuProvider>
        <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Home"
            tabBar={RenderMenu}
            sceneContainerStyle={{
              marginLeft: theme.sizes.menu.closed,
              backgroundColor: theme.colors.background.main,
            }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="ProgramGridPage" component={ProgramGridPage} />
          <Tab.Screen name="NonVirtualizedGridPage" component={NonVirtualizedGridPage} />
          <Tab.Screen name="GridWithLongNodesPage" component={GridWithLongNodesPage} />
        </Tab.Navigator>
      </MenuProvider>
  );
};

function App(): JSX.Element {
  useTVPanEvent();
  const { height, width } = useWindowDimensions();
  const areFontsLoaded = useFonts();

  if (!areFontsLoaded) {
    return null;
  }

  return (
      <NavigationContainer independent>
        <ThemeProvider theme={theme}>
          <GoBackConfiguration />

          <Container width={width} height={height}>
            <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: theme.colors.background.main,
                  },
                }}
                initialRouteName="TabNavigator"
            >
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              <Stack.Screen name="ProgramDetail" component={ProgramDetail} />
            </Stack.Navigator>
          </Container>
        </ThemeProvider>
      </NavigationContainer>
  );
}

export default App;

const Container = styled.View<{ width: number; height: number }>(({ width, height }) => ({
  width,
  height,
  flexDirection: 'row-reverse',
  backgroundColor: theme.colors.background.main,
}));

