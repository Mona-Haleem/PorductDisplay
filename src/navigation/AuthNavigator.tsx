import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/utils/types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();
function AuthNavigator() {
  console.log("Rendering AuthNavigator");
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={View} />
        <Stack.Screen name="SignUp" component={View} />
    </Stack.Navigator>
  )
}

export default AuthNavigator