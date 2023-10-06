import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomePage from './pages/Home';
import ExpensesPage from './pages/Expenses';
import BudgetPage from './pages/Budget';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          text: '#ecdff0',
          card: '#431A60',
          background: '#431a60',
        }
      }}
    >
      <Tab.Navigator initialRouteName='Overview'>
        <Tab.Screen
          name='Overview'
          component={HomePage}
          options={{
            tabBarActiveTintColor: '#ecdff0',
            tabBarIcon: ({color, size}) => (
              <Icon
                name='dashboard'
                size={size}
                color={color}
                backgroundColor={"#0000"}
                underlayColor={"#0000"}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Expenses'
          component={ExpensesPage}
          options={{
            tabBarActiveTintColor: '#ecdff0',
            tabBarIcon: ({color, size}) => (
              <Icon
                name='list-alt'
                size={size}
                color={color}
                backgroundColor={"#0000"}
                underlayColor={"#0000"}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Budget'
          component={BudgetPage}
          options={{
            tabBarActiveTintColor: '#ecdff0',
            tabBarIcon: ({color, size}) => (
              <Icon
                name='book'
                size={size}
                color={color}
                backgroundColor={"#0000"}
                underlayColor={"#0000"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}