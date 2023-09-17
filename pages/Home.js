import { StatusBar } from 'expo-status-bar';
import { View, Text, Button } from 'react-native';
import { styled } from 'nativewind';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Button);

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const data = [
    {
        name: 'Rent',
        amount: 700,
        color: '#FF0000',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: 'Insurance',
        amount: 84.83,
        color: '#00FF00',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: 'Car Payment',
        amount: 550,
        color: '#0000FF',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: 'Wifi',
        amount: 16.78,
        color: '#FF0000',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: 'Gas',
        amount: 75.64,
        color: '#00FF00',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: 'Food',
        amount: 50.99,
        color: '#0000FF',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
];


export default function HomePage() {
  return (
    <StyledView className='flex-1 flex-col justify-center align-top bg-scarlet-gum-500'>
      <StatusBar style='auto' />
      {/* <Icon name='caret-down' size={30} color='#FFF'></Icon> */}
      <StyledButton
        className="w-5/12 text-scarlet-gum-100"
        title={'Monthly'}
      />
      <PieChart
        data={data}
        accessor={'amount'}
        width={300}
        height={200}
        chartConfig={chartConfig}
        backgroundColor={'transparent'}
        paddingLeft={"15"}
        absolute
      />
    </StyledView>
  );
}