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
import Item from '../data/Item';

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

  const dateRange = useSelector(state => state.expenses.dateRange);
  const currExpenses = useSelector(state => state.expenses.currExpenses);
  const prevExpenses = useSelector(state => state.expenses.prevExpenses);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [pieData, setPieData] = useState(dummyPieData);
  const [lineData, setLineData] = useState(dummyLineData);
  const [barData, setBarData] = useState(dummyBarData);
  const [total, setTotal] = useState(dummyTotal);
  const [difference, setDifference] = useState(dummyDifference);
  
  console.log(`home - ${dateRange}`);
  console.log(currExpenses);

  async function updateDateRange(newRange) {
    if (loading) return;
    setLoading(true);
    AsyncStorage.getItem('expenses').then(result => {
      if (result !== null) {
        let expenseList = JSON.parse(result);
        if (newRange === 'quarter') {
          const today = new Date();
          const quarter = Math.floor((new Date().getMonth() + 3) / 3);
          const start = new Date(today.getFullYear(), (quarter-1)*3+1, 1);
          start.setHours(0, 0, 0, 0);
          dispatch({
            type: 'SET_CURR_EXPENSES',
            payload: expenseList.filter(item => {
              return new Date(item.date) > start;
            })
          });
          const prevQuarter = (today.getMonth()-4)/3+1;
          const prevStart = new Date(today.getFullYear(), (prevQuarter-1)*3+1, 1);
          prevStart.setHours(0, 0, 0, 0);
          dispatch({
            type: 'SET_PREV_EXPENSES',
            payload: expenseList.filter(item => {
              const tempDate = new Date(item.date);
              return tempDate < start && tempDate >= prevStart;
            })
          });
        } else if (newRange === 'month') {
          const today = new Date();
          const first = new Date(today.getFullYear(), today.getMonth(), 1);
          first.setHours(0, 0, 0, 0);
          dispatch({
            type: 'SET_CURR_EXPENSES',
            payload: expenseList.filter(item => {
              return new Date(item.date) >= first;
            })
          });
          const prevFirst = new Date(today.getFullYear(), today.getMonth()-1, 1);
          prevFirst.setHours(0, 0, 0, 0);
          dispatch({
            type: 'SET_PREV_EXPENSES',
            payload: expenseList.filter(item => {
              const tempDate = new Date(item.date);
              return tempDate < first && tempDate >= prevFirst;
            })
          });
        } else { // newRange === 'week'
          const sunday = new Date();
          sunday.setDate(sunday.getDate() - sunday.getDay());
          sunday.setHours(0, 0, 0, 0);
          dispatch({
            type: 'SET_CURR_EXPENSES',
            payload: expenseList.filter(item => {
              return new Date(item.date) >= sunday;
            })
          });
          const prevSunday = new Date();
          prevSunday.setDate(sunday.getDate() - 7);
          prevSunday.setHours(0, 0, 0, 0);
          dispatch({
            type: 'SET_PREV_EXPENSES',
            payload: expenseList.filter(item => {
              const tempDate = new Date(item.date);
              return tempDate < sunday && tempDate >= prevSunday;
            })
          });
        }
      }
      dispatch({
        type: 'SET_RANGE',
        payload: newRange
      });
    });
    setLoading(false);
  }

  async function cleanData() {
    // AsyncStorage.clear()
    AsyncStorage.getItem('expenses').then(result => {
      if (result !== null) {
        let expenseList = JSON.parse(result);

        const today = new Date();
        
        let currQuarter = Math.floor(today.getMonth() /3);
        
        let startOfLastQuarter = new Date(today.getFullYear(), currQuarter * 3, 1); 
        startOfLastQuarter.setMonth(startOfLastQuarter.getMonth() -3);
        startOfLastQuarter.setHours(0,0,0,0);

        expenseList.filter(item => {
          return new Date(item.date) >= startOfLastQuarter;
        });

        AsyncStorage.setItem('expenses', JSON.stringify(expenseList));
      }
    });
  }

  function formatData(dateRange, currRange, prevRange) {
    let itemList = [...currRange].map(item => new Item(item));

    if (dateRange === 'week') {
      
      let linePoints = [0, 0, 0, 0, 0, 0, 0];
      let barPoints = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];

      for (let i = 0; i < itemList.length; i++) {

        // format bezier
        linePoints[itemList[i].getDate().getDay()] += itemList[i].getAmount();

        // format bar
        if (itemList[i].getPriority() === 'need') {
          barPoints[itemList[i].getDate().getDay()][0] += itemList[i].getAmount();
        } else {
          barPoints[itemList[i].getDate().getDay()][1] += itemList[i].getAmount();
        }
      }

      // Round line points to 2 decmial points
      let fixedBezPoints = linePoints.map((point) => {
        try {
          return parseFloat(point.toFixed(2));
        } catch(err) {
          return point;
        }
      });
      setLineData({
        labels: lineLabelsWeek,
        datasets: [{
          data: fixedBezPoints
        }]
      });
      
      // Round bar points to 2 decmial points
      let fixedBarPoints = barPoints.map((point) => {
        let temp = [...point];
        try {
          temp[0] = parseFloat(temp[0].toFixed(2));
        } catch(err) {}
        try {
          temp[1] = parseFloat(temp[1].toFixed(2));
        } catch(err) {}
        return temp;
      })

      setBarData({
        labels: barLabelsWeek,
        legend: barLegend,
        data: fixedBarPoints,
        barColors: barColors
      });

    } else if (dateRange === 'month') {

      // format bezier
      let linePoints = [0, 0, 0, 0];
      for (let i = 0; i < itemList.length; i++) {
        let itemDay = itemList[i].getDate().getDate();
        if (itemDay <= 7) {
          linePoints[0] += itemList[i].getAmount();
        } else if (itemDay <= 14) {
          linePoints[1] += itemList[i].getAmount();
        } else if (itemDay <= 21) {
          linePoints[2] += itemList[i].getAmount();
        } else {
          linePoints[3] += itemList[i].getAmount();
        }
      }

      let fixedBezPoints = linePoints.map((point) => {
        try {
          let temp = parseFloat(point.toFixed(2));
          return temp;
        } catch(err) {
          return point;
        }
      });

      setLineData({
        labels: monthLabels,
        datasets: [{
          data: fixedBezPoints
        }]
      });

      // format bar data
      let barPoints = [[0, 0], [0, 0], [0, 0], [0, 0]];
      for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].getPriority() === 'need') {
          let itemDay = itemList[i].getDate().getDate();
          if (itemDay <= 7) {
            barPoints[0][0] += itemList[i].getAmount();
          } else if (itemDay <= 14) {
            barPoints[1][0] += itemList[i].getAmount();
          } else if (itemDay <= 21) {
            barPoints[2][0] += itemList[i].getAmount();
          } else {
            barPoints[3][0] += itemList[i].getAmount();
          }
        } else {
          let itemDay = itemList[i].getDate().getDate();
          if (itemDay <= 7) {
            barPoints[0][1] += itemList[i].getAmount();
          } else if (itemDay <= 14) {
            barPoints[1][1] += itemList[i].getAmount();
          } else if (itemDay <= 21) {
            barPoints[2][1] += itemList[i].getAmount();
          } else {
            barPoints[3][1] += itemList[i].getAmount();
          }
        }
      }

      let fixedBarPoints = barPoints.map((point) => {
        let temp = [...point];
        try {
          temp[0] = parseFloat(temp[0].toFixed(2));
        } catch(err) {}
        try {
          temp[1] = parseFloat(temp[1].toFixed(2));
        } catch(err) {}
        return temp;
      });

      setBarData({
        labels: monthLabels,
        legend: barLegend,
        data: fixedBarPoints,
        barColors: barColors
      });

    } else { // dateRange === 'quarter'

      // same labels for line and bar
      let quarterLabels = Q1Labels;
      let currQuarter = Math.floor((new Date().getMonth() + 3) / 3);
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
      for (let i = 0; i < itemList.length; i++) {
        let index = itemList[i].getDate().getMonth() % 3;
        linePoints[index] += itemList[i].getAmount();
      }

      let fixedBezPoints = linePoints.map((point) => {
        try {
          let temp = parseFloat(point.toFixed(2));
          return temp;
        } catch(err) {
          return point;
        }
      })

      setLineData({
        labels: quarterLabels,
        datasets: [{
          data: fixedBezPoints
        }]
      });

      // format bar data
      let barPoints = [[0, 0], [0, 0], [0, 0]];
      for (let i = 0; i < itemList.length; i++) {
        let index = itemList[i].getDate().getMonth() % 3;
        if (itemList[i].getPriority() === 'need') {
          barPoints[index][0] += itemList[i].getAmount()
        } else {
          barPoints[index][1] += itemList[i].getAmount()
        }
      }
      let fixedBarPoints = barPoints.map((point) => {
        let temp = [...point];
        try {
          temp[0] = parseFloat(temp[0].toFixed(2));
        } catch(err) {}
        try {
          temp[1] = parseFloat(temp[1].toFixed(2));
        } catch(err) {}
        return temp;
      })

      setBarData({
        labels: quarterLabels,
        legend: barLegend,
        data: fixedBarPoints,
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
    for (let i = 0; i < itemList.length; i++) {
      switch (itemList[i].getCategory()) {
        case 'Utilities':
          utilityPoint.amount += itemList[i].getAmount();
          break;
        case 'Car':
          carPoint.amount += itemList[i].getAmount();
          break;
        case 'Recurring':
          recurringPoint.amount += itemList[i].getAmount();
          break;
        case 'Groceries':
          groceriesPoint.amount += itemList[i].getAmount();
          break;
        case 'Rent':
          rentPoint.amount += itemList[i].getAmount();
        default:
          otherPoint.amount += itemList[i].getAmount();

      }
    }
    try {
      utilityPoint.amount = parseFloat(utilityPoint.amount.toFixed(2));
    } catch(err) {}
    try {
      carPoint.amount = parseFloat(carPoint.amount.toFixed(2));
    } catch(err) {}
    try {
      recurringPoint.amount = parseFloat(recurringPoint.amount.toFixed(2));
    } catch(err) {}
    try {
      groceriesPoint.amount = parseFloat(groceriesPoint.amount.toFixed(2));
    } catch(err) {}
    try {
      rentPoint.amount = parseFloat(rentPoint.amount.toFixed(2));
    } catch(err) {}
    try {
      otherPoint.amount = parseFloat(otherPoint.amount.toFixed(2));
    } catch(err) {}
    setPieData([
      utilityPoint,
      carPoint,
      recurringPoint,
      groceriesPoint,
      rentPoint,
      otherPoint
    ]);

    // format bottom text
    let currPeriod = itemList.reduce((total, item) => {
      return total += item.getAmount();
    }, 0);
    let prevPeriod = prevExpenses.reduce((total, item) => {
      return total += item.amount;
    }, 0);
    try {
      setTotal(parseFloat(currPeriod.toFixed(2)));
    } catch(err) {
      setTotal(currPeriod);
    }
    if (currPeriod === 0 || prevPeriod === 0) {
      setDifference('100% more');
    } else if (prevPeriod > currPeriod) {
      setDifference(`${(100-currPeriod/prevPeriod*100).toFixed(2)}% less`);
    } else {
      setDifference(`${(currPeriod/prevPeriod*100-100).toFixed(2)}% more`);
    }
  }

  useEffect(() => {
    formatData(dateRange, currExpenses, prevExpenses);
  }, [dateRange, currExpenses, prevExpenses]);

  useEffect(() => {
    cleanData().then(updateDateRange(dateRange));
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