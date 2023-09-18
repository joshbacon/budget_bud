import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './pages/Home';
import ExpensesPage from './pages/Expenses';
import EnterPage from './pages/Enter';
import BudgetPage from './pages/Budget';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          text: '#ecdff0',
          card: '#431A60',
        }
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name='Overview' component={HomePage}/>
        <Stack.Screen name='Expenses' component={ExpensesPage}/>
        <Stack.Screen name='Enter Item' component={EnterPage}/>
        <Stack.Screen name='Budget' component={BudgetPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}