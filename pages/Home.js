import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { PieChart, StackedBarChart, ContributionGraph } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 0,
    useShadowColorFromDataset: false // optional
};

const dataBar = {
  labels: ["Monday", "Tuesday"],
  legend: ["Needs", "Wants"],
  data: [
    [124.47, 23.71],
    [75.34, 30.12]
  ],
  barColors: ["#FF0000", "#00FF00"]
};

const spendDates = [
  { date: "2023-09-05", count: 1 },
  { date: "2023-09-06", count: 1 },
  { date: "2023-09-07", count: 4 },
  { date: "2023-09-10", count: 3 },
  { date: "2023-09-11", count: 1 },
  { date: "2023-09-12", count: 2 },
  { date: "2023-09-13", count: 1 },
  { date: "2023-09-14", count: 3 },
  { date: "2023-09-15", count: 2 },
  { date: "2023-09-17", count: 2 },
  { date: "2023-09-18", count: 1 }
];

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

export default HomePage = () => {
  return (
    <StyledView className='flex-1 flex-col justify-start items-center bg-scarlet-gum-500'>
      <StatusBar style='auto' />
      <StyledView className='min-w-full flex-row align-middle justify-evenly pt-5'>
        <StyledPressable
          className="p-2 w-3/12 bg-scarlet-gum-700 rounded-lg"
          onPress={() => {

          }}
        >
          <StyledText className='text-scarlet-gum-200 text-center font-semibold'>
            Quarter
          </StyledText>
        </StyledPressable>
        <StyledPressable
          className="p-2 w-3/12 bg-scarlet-gum-700 rounded-lg"
          onPress={() => {
            
          }}
        >
          <StyledText className='text-scarlet-gum-200 text-center font-semibold'>
            Month
          </StyledText>
        </StyledPressable>
        <StyledPressable
          className="p-2 w-3/12 bg-scarlet-gum-700 rounded-lg"
          onPress={() => {
            
          }}
        >
          <StyledText className='text-scarlet-gum-200 text-center font-semibold'>
            Week
          </StyledText>
        </StyledPressable>
      </StyledView>
      <PieChart
        data={data}
        accessor={'amount'}
        width={winWidth * 0.9}
        height={200}
        chartConfig={chartConfig}
        backgroundColor={'transparent'}
        paddingLeft={"15"}
        absolute
      />
      <StackedBarChart
        data={dataBar}
        width={winWidth * 0.9}
        height={220}
        chartConfig={chartConfig}
      />
      {/* have it so you can scroll between the stacked bar and a bezier curve of the sums */}
      <StyledView className='flex-1 flex-row justify-evenly items-center w-screen'>

        <StyledView className=''>
          <StyledText className='text-center text-base text-scarlet-gum-100'>Total:</StyledText>
          <StyledText className='text-center text-2xl text-scarlet-gum-100'>$497.23</StyledText>
        </StyledView>

        <StyledView className=''>
          <StyledText className='text-center text-2xl text-scarlet-gum-100'>30% less</StyledText>
          <StyledText className='text-center text-base text-scarlet-gum-100'>than last period</StyledText>
        </StyledView>
      
      </StyledView>
    </StyledView>
  );
}