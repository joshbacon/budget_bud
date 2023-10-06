import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { PieChart, StackedBarChart, ContributionGraph, LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    color: (opacity = 1) => `rgba(236, 223, 240, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 0,
    useShadowColorFromDataset: false // optional
};

const bezierData = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
  datasets: [{
    data: [100, 37, 64, 50, 0, 82, 0]
  }]
};

const dataBar = {
  labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  legend: ["Needs", "Wants"],
  data: [
    [124.47, 23.71],
    [75.34, 30.12],
    [75.34, 30.12],
    [75.34, 30.12],
    [75.34, 30.12],
    [75.34, 30.12],
    [75.34, 30.12]
  ],
  barColors: ["#479159", "#BF747A"]
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
        name: 'Utilities',
        amount: 60,
        color: '#20452a',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: 'Car',
        amount: 156.42,
        color: '#265634',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: 'Recurring',
        amount: 39,
        color: '#306b40',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: 'Groceries',
        amount: 64.32,
        color: '#479159',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: 'Rent',
        amount: 700,
        color: '#63a470',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: 'Other',
        amount: 75.84,
        color: '#92c39b',
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
];

export default HomePage = () => {

  // ToDo:
  // - load data in (show old data until it loads? figure something out)
  // - feed in to pie and bezier charts
  // - update bottom text (throw some color in based on if we're up or down from last period)
  // - delete things after 6 months (2 quarters): need to show if up or down from last period and quarter is longest

  const [dateRange, setDateRange] = useState('week');
  
  const [currentRange, setCurrentRange] = useState([]);
  const [previousRange, setPreviousRange] = useState([]);
  // store this with redux so the budget thing makes sense (just budget no savings)
  // also use in expenses so it goes back the week/month/quarter and you're not scrolling forever


  function updateDateRange(newRange) {
    // this is UNTESTED, but it should filter the expense array to the given time range
    // also grabs the previous one for that "______ than last period" thing
    AsyncStorage.getItem('expenses').then(result => {
      if (result !== null) {
        let expenseList = JSON.parse(result);
        if (newRange === 'quarter') {
          const today = new Date();
          const quarter = (today.getMonth()-1)/3+1;
          const start = new Date(today.getFullYear(), (quarter-1)*3+1, 1);
          setCurrentRange(expenseList.filter(item => {
            return JSON.parse(item).date > start.toDateString();
          }));
          const prevQuarter = (today.getMonth()-4)/3+1;
          const prevStart = new Date(today.getFullYear(), (prevQuarter-1)*3+1, 1);
          setPreviousRange(expenseList.filter(item => {
            return JSON.parse(item).date < start && JSON.parse(item).date >= prevStart;
          }));
        } else if (newRange === 'month') {
          const today = new Date();
          const first = new Date(today.getFullYear(), today.getMonth(), 1);
          setCurrentRange(expenseList.filter(item => {
            return JSON.parse(item).date >= first.toDateString();
          }));
          const prevFirst = new Date(today.getFullYear(), today.getMonth()-1, 1);
          setPreviousRange(expenseList.filter(item => {
            return JSON.parse(item).date < first.toDateString() && JSON.parse(item).date >= prevFirst;
          }));
        } else { // newRange === 'week'
          const sunday = new Date();
          sunday.setDate(sunday.getDate() - sunday.getDay());
          setCurrentRange(expenseList.filter(item => {
            return JSON.parse(item).date >= sunday.toDateString();
          }));
          const prevSunday = new Date();
          prevSunday.setDate(sunday.getDate() - 7);
          setPreviousRange(expenseList.filter(item => {
            return JSON.parse(item).date < sunday.toDateString() && JSON.parse(item).date >= prevSunday;
          }));
        }
      }
      setDateRange(newRange);
    });
  }

  return (
    <StyledView className='flex-1 flex-col justify-start items-center bg-scarlet-gum-500'>
      <StatusBar style='auto' />
      <StyledView className='w-full flex-row align-middle justify-evenly pt-5'>
        <StyledPressable
          className={`p-2 w-3/12 rounded-lg ${dateRange==='quarter'?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
          onPress={() => {
            updateDateRange('quarter');
          }}
        >
          <StyledText className='text-scarlet-gum-200 text-center font-semibold'>
            Quarter
          </StyledText>
        </StyledPressable>
        <StyledPressable
          className={`p-2 w-3/12 rounded-lg ${dateRange==='month'?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
          onPress={() => {
            updateDateRange('month');
          }}
        >
          <StyledText className='text-scarlet-gum-200 text-center font-semibold'>
            Month
          </StyledText>
        </StyledPressable>
        <StyledPressable
          className={`p-2 w-3/12 rounded-lg ${dateRange==='week'?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
          onPress={() => {
            updateDateRange('week');
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
        absolute
      />
      <LineChart
        bezier
        data={bezierData}
        width={winWidth * 0.95}
        height={220}
        chartConfig={chartConfig}
        style={{
          margin: 0,
          padding: 0,
          borderRadius: 10
        }}
      />
      {/* <StackedBarChart
        data={dataBar}
        width={winWidth * 0.9}
        height={220}
        chartConfig={chartConfig}
      /> */}
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