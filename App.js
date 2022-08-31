import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetPage from './pages/GetPage';
import { UploadPage } from './pages/UploadPage';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="upload" component={UploadPage}/>
            <Stack.Screen name="get" component={GetPage}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}