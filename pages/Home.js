import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Dimensions, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { PieChart, StackedBarChart, LineChart } from 'react-native-chart-kit';
import { useSelector, useDispatch } from 'react-redux';
import { barColors, Q1Labels, Q2Labels, Q3Labels, Q4Labels, monthLabels, barLabelsWeek, barLegend, legendFontColor, legendFontSize, lineLabelsWeek, pieColorCar, pieColorGroceries, pieColorOther, pieColorRecurring, pieColorRent, pieColorUtilities } from '../data/Constants';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dummyBarData, dummyDifference, dummyLineData, dummyPieData, dummyTotal } from '../data/DummyData';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const winWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(236, 223, 240, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0
};

export default HomePage = () => {

  //UTDS
  // - home and expenses page are now dynamic and change with the selected period
  // -- both need more testing once date picker is working (doesn't work over expo)
  //    to make sure they are getting the right ranges and updating properly
  // - the home page is one behind, so if it's on week and you switch to month it
  //   will update to the week data (thus shows nothing on load even though theres dummy data...)
  // - need to make budget page dynamic
  // -- probably need some new redux stuff but it looks like async storage is done (most likely untested)

  const dateRange = useSelector(state => state.expenses.dateRange);
  const currExpenses = useSelector(state => state.expenses.currExpenses);
  const prevExpenses = useSelector(state => state.expenses.prevExpenses);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [pieData, setPieData] = useState(dummyPieData);
  const [lineData, setLineData] = useState(dummyLineData);
  const [barData, setBarData] = useState(dummyBarData);
  const [total, setTotal] = useState(dummyTotal);
  const [difference, setDifference] = useState(dummyDifference);

  async function updateDateRange(newRange) {
    AsyncStorage.getItem('expenses').then(result => {
      if (result !== null) {
        let expenseList = JSON.parse(result);
        if (newRange === 'quarter') {
          const today = new Date();
          const quarter = (today.getMonth()-1)/3+1;
          const start = new Date(today.getFullYear(), (quarter-1)*3+1, 1);
          start.setHours(0, 0, 0, 0);
          dispatch({
            type: 'SET_CURR_EXPENSES',
            payload: expenseList.filter(item => {
              return item.date > start.toDateString();
            })
          });
          const prevQuarter = (today.getMonth()-4)/3+1;
          const prevStart = new Date(today.getFullYear(), (prevQuarter-1)*3+1, 1);
          prevStart.setHours(0, 0, 0, 0);
          dispatch({
            type: 'SET_PREV_EXPENSES',
            payload: expenseList.filter(item => {
              return item.date < start && item.date >= prevStart;
            })
          });
        } else if (newRange === 'month') {
          const today = new Date();
          const first = new Date(today.getFullYear(), today.getMonth(), 1);
          first.setHours(0, 0, 0, 0);
          dispatch({
            type: 'SET_CURR_EXPENSES',
            payload: expenseList.filter(item => {
              return item.date >= first.toDateString();
            })
          });
          const prevFirst = new Date(today.getFullYear(), today.getMonth()-1, 1);
          prevFirst.setHours(0, 0, 0, 0);
          dispatch({
            type: 'SET_PREV_EXPENSES',
            payload: expenseList.filter(item => {
              return item.date < first.toDateString() && item.date >= prevFirst;
            })
          });
        } else { // newRange === 'week'
          const sunday = new Date();
          sunday.setDate(sunday.getDate() - sunday.getDay());
          sunday.setHours(0, 0, 0, 0);
          dispatch({
            type: 'SET_CURR_EXPENSES',
            payload: expenseList.filter(item => {
              return item.date >= sunday.toDateString();
            })
          });
          const prevSunday = new Date();
          prevSunday.setDate(sunday.getDate() - 7);
          prevSunday.setHours(0, 0, 0, 0);
          dispatch({
            type: 'SET_PREV_EXPENSES',
            payload: expenseList.filter(item => {
              return item.date < sunday.toDateString() && item.date >= prevSunday.toDateString();
            })
          });
        }
      }
      dispatch({
        type: 'SET_RANGE',
        payload: newRange
      });
    });
  }

  async function cleanData() {
    AsyncStorage.clear();

    // definietely need to test this (need the date picker so we can backdate entries)
    AsyncStorage.getItem('expenses').then(result => {
      if (result !== null) {
        let expenseList = JSON.parse(result);
        const limitDate = new Date();
        limitDate.setDate(limitDate.getMonth() - 6);
        expenseList.filter(item => {
          return JSON.parse(item).date.getMonth() > limitDate.getMonth();
        })
      }
    });
  }

  function formatData() {

    if (dateRange === 'week') {
      // format bezier
      let linePoints = [0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < currExpenses.length; i++) {
        linePoints[new Date(currExpenses[i].date).getDay()-1] += currExpenses[i].amount
      }
      setLineData({
        labels: lineLabelsWeek,
        datasets: [{
          data: linePoints
        }]
      });

      // format bar
      let barPoints = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
      for (let i = 0; i < currExpenses.length; i++) {
        if (currExpenses[i].priority === 'need') {
          barPoints[new Date(currExpenses[i].date).getDay()][0] += currExpenses[i].amount
        } else {
          barPoints[new Date(currExpenses[i].date).getDay()][1] += currExpenses[i].amount
        }
      }
      setBarData({
        labels: barLabelsWeek,
        legend: barLegend,
        data: barPoints,
        barColors: barColors
      });

    } else if (dateRange === 'month') {
      // format bezier
      let linePoints = [0, 0, 0, 0];
      for (let i = 0; i < currExpenses.length; i++) {
        let itemDay = new Date(currExpenses[i].date).getDate();
        if (itemDay <= 7) {
          linePoints[0] += currExpenses[i].amount;
        } else if (itemDay <= 14) {
          linePoints[1] += currExpenses[i].amount;
        } else if (itemDay <= 21) {
          linePoints[2] += currExpenses[i].amount;
        } else {
          linePoints[3] += currExpenses[i].amount;
        }
      }

      setLineData({
        labels: monthLabels,
        datasets: [{
          data: linePoints
        }]
      });

      // format bar data
      let barPoints = [[0, 0], [0, 0], [0, 0], [0, 0]];
      for (let i = 0; i < currExpenses.length; i++) {
        if (currExpenses[i].priority === 'need') {
          let itemDay = new Date(currExpenses[i].date).getDate();
          if (itemDay <= 7) {
            barPoints[0][0] += currExpenses[i].amount;
          } else if (itemDay <= 14) {
            barPoints[1][0] += currExpenses[i].amount;
          } else if (itemDay <= 21) {
            barPoints[2][0] += currExpenses[i].amount;
          } else {
            barPoints[3][0] += currExpenses[i].amount;
          }
        } else {
          let itemDay = new Date(currExpenses[i].date).getDate();
          if (itemDay <= 7) {
            barPoints[0][1] += currExpenses[i].amount;
          } else if (itemDay <= 14) {
            barPoints[1][1] += currExpenses[i].amount;
          } else if (itemDay <= 21) {
            barPoints[2][1] += currExpenses[i].amount;
          } else {
            barPoints[3][1] += currExpenses[i].amount;
          }
        }
      }
      setBarData({
        labels: monthLabels,
        legend: barLegend,
        data: barPoints,
        barColors: barColors
      });

    } else { // dateRange === 'quarter'
      // same labels for line and bar
      let quarterLabels = Q1Labels;
      let currQuarter = (new Date().getMonth() - 1) / 3 + 1;
      switch (currQuarter) {
        case 2:
          quarterLabels = Q2Labels
          break;
        case 3:
          quarterLabels = Q3Labels
          break;
        case 4:
          quarterLabels = Q4Labels
          break;
        default:
          break;
      }

      // format bezier
      let linePoints = [0, 0, 0];
      for (let i = 0; i < currExpenses.length; i++) {
        let index = new Date(currExpenses[i].date).getMonth() % 3;
        linePoints[index] += currExpenses[i].amount
      }

      setLineData({
        labels: quarterLabels,
        datasets: [{
          data: linePoints
        }]
      });

      // format bar data
      let barPoints = [[0, 0], [0, 0], [0, 0]];
      for (let i = 0; i < currExpenses.length; i++) {
        let index = new Date(currExpenses[i].date).getMonth() % 3;
        if (currExpenses[i].priority === 'need') {
          barPoints[index][0] += currExpenses[i].amount
        } else {
          barPoints[index][1] += currExpenses[i].amount
        }
      }

      setBarData({
        labels: quarterLabels,
        legend: barLegend,
        data: barPoints,
        barColors: barColors
      });

    }

    // format pie
    let utilityPoint = {
      name: 'Utilities',
      amount: 0,
      color: pieColorUtilities,
      legendFontColor: legendFontColor,
      legendFontSize: legendFontSize
    };
    let carPoint =  {
      name: 'Car',
      amount: 0,
      color: pieColorCar,
      legendFontColor: legendFontColor,
      legendFontSize: legendFontSize
    };
    let recurringPoint =   {
      name: 'Recurring',
      amount: 0,
      color: pieColorRecurring,
      legendFontColor: legendFontColor,
      legendFontSize: legendFontSize
    };
    let groceriesPoint =   {
      name: 'Groceries',
      amount: 0,
      color: pieColorGroceries,
      legendFontColor: legendFontColor,
      legendFontSize: legendFontSize
    };
    let rentPoint =  {
      name: 'Rent',
      amount: 0,
      color: pieColorRent,
      legendFontColor: legendFontColor,
      legendFontSize: legendFontSize
    };
    let otherPoint =  {
      name: 'Other',
      amount: 0,
      color: pieColorOther,
      legendFontColor: legendFontColor,
      legendFontSize: legendFontSize
    };
    for (let i = 0; i < currExpenses.length; i++) {
      switch (currExpenses[i].category) {
        case 'Utilities':
          utilityPoint.amount += currExpenses[i].amount;
          break;
        case 'Car':
          carPoint.amount += currExpenses[i].amount;
          break;
        case 'Recurring':
          recurringPoint.amount += currExpenses[i].amount;
          break;
        case 'Groceries':
          groceriesPoint.amount += currExpenses[i].amount;
          break;
        case 'Rent':
          rentPoint.amount += currExpenses[i].amount;
        default:
          otherPoint.amount += currExpenses[i].amount;

      }
    }
    setPieData([
      utilityPoint,
      carPoint,
      recurringPoint,
      groceriesPoint,
      rentPoint,
      otherPoint
    ]);

    // format bottom text
    let currPeriod = currExpenses.reduce((total, item) => {
      return total += item.amount;
    }, 0);
    let prevPeriod = prevExpenses.reduce((total, item) => {
      return total += item.amount;
    }, 0);
    setTotal(currPeriod);
    if (currPeriod === 0 || prevPeriod === 0) {
      setDifference('100% more');
    } else if (prevPeriod > currPeriod) {
      setDifference(`${100-currPeriod/prevPeriod*100}% less`);
    } else {
      setDifference(`${currPeriod/prevPeriod*100-100}% more`);
    }
  }

  useEffect(() => {
    const initialLoad = async () => {
      await updateDateRange(dateRange).then( () => {
        formatData();
        setLoading(false);
      });
    }
    initialLoad();
    // cleanData();
  }, []);

  return (
    loading ?
    <Loader /> :
    <StyledView className='flex-1 flex-col justify-start items-center bg-scarlet-gum-500'>
      <StatusBar style='auto' />
      <StyledView className='w-full flex-row align-middle justify-evenly pt-5'>
        <StyledPressable
          className={`p-2 w-3/12 rounded-lg ${dateRange==='quarter'?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
          onPress={() => {
            updateDateRange('quarter').then(formatData());
          }}
        >
          <StyledText className='text-scarlet-gum-200 text-center font-semibold'>
            Quarter
          </StyledText>
        </StyledPressable>
        <StyledPressable
          className={`p-2 w-3/12 rounded-lg ${dateRange==='month'?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
          onPress={() => {
            updateDateRange('month').then(formatData());
          }}
        >
          <StyledText className='text-scarlet-gum-200 text-center font-semibold'>
            Month
          </StyledText>
        </StyledPressable>
        <StyledPressable
          className={`p-2 w-3/12 rounded-lg ${dateRange==='week'?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
          onPress={() => {
            updateDateRange('week').then(formatData());
          }}
        >
          <StyledText className='text-scarlet-gum-200 text-center font-semibold'>
            Week
          </StyledText>
        </StyledPressable>
      </StyledView>
      <PieChart
        data={pieData}
        accessor={'amount'}
        width={winWidth * 0.9}
        height={200}
        chartConfig={chartConfig}
        backgroundColor={'transparent'}
        absolute
      />

      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          paddingBottom: 0,
        }}
      >
        <LineChart
          bezier
          data={lineData}
          width={winWidth * 0.95}
          height={220}
          chartConfig={chartConfig}
          style={{
            margin: 3,
            padding: 0,
            borderRadius: 10
          }}
        />
        <StackedBarChart
          data={barData}
          width={winWidth * 0.95}
          height={220}
          chartConfig={chartConfig}
          style={{
            margin: 3,
            padding: 0,
            borderRadius: 10
          }}
        />
      </ScrollView>

      <StyledView className='flex-1 flex-row justify-evenly items-center w-screen pt-3 pb-5'>

        <StyledView className=''>
          <StyledText className='text-center text-base text-scarlet-gum-100'>Total:</StyledText>
          <StyledText className='text-center text-2xl text-scarlet-gum-100'>${total}</StyledText>
        </StyledView>

        <StyledView className=''>
          <StyledText
            className={ `text-center text-2xl
              ${difference.charAt(difference.length-1) === 'e' ? 'text-copper-rust-500' : 'text-fruit-salad-500'}`
          }>
            {difference}
          </StyledText>
          <StyledText
            className={ `text-center text-base
            ${difference.charAt(difference.length-1) === 'e' ? 'text-copper-rust-500' : 'text-fruit-salad-500'}`
          }>
              than last period
          </StyledText>
        </StyledView>
      
      </StyledView>
    </StyledView>
  );
}