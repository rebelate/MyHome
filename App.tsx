import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from './Screens/Onboarding';
import {default as storage} from '@react-native-async-storage/async-storage';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

const Stack = createStackNavigator();
function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>HOME</Text>
    </View>
  );
}

function App() {
  const [config, setConfig] = React.useState(true);
  // observer(config);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    storage.getItem('onBoarded').then((result) => {
      const val = result != null ? JSON.parse(result) : null;
      const state = val != null ? val.onboard : true;
      setConfig(state);
      setLoading(false);
    });
  });

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {config && (
            <Stack.Screen
              options={{headerShown: false}}
              name="Onboarding"
              component={Intro}
            />
          )}
          <Stack.Screen name="Main" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
