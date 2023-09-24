import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import HomePage from './pages/Home';
import ExpensesPage from './pages/Expenses';
import EnterPage from './pages/Enter';
import BudgetPage from './pages/Budget';

const Tab = createBottomTabNavigator ();
const Stack = createStackNavigator();

const ExpenseStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='list' component={ExpensesPage} options={{headerShown: false}}/>
    <Stack.Screen name='New Item' component={EnterPage}/>
  </Stack.Navigator>
);

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
          component={ExpenseStack}
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