import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dimensions } from 'react-native';
import { View, Text, TextInput, Pressable, Modal, SafeAreaView, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { ProgressChart } from 'react-native-chart-kit';
import BudgetItem from '../components/BudgetItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import Categories from '../data/Categories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dummyBudgetData, dummySavingsData } from '../data/DummyData';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const winWidth = Dimensions.get('window').width;

const inputStyle = {
  fontSize: 20,
  color: '#FFF',
  height: 50,
  width: '82.5%',
  borderWidth: 0,
  borderBottomWidth: 2,
  borderColor: '#fff',
  padding: 10
};

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.25,
    decimalPlaces: 0,
    useShadowColorFromDataset: false // optional
};

export default BudgetPage = () => {

  const dateRange = useSelector(state => state.expenses.dateRange);
  const currExpenses = useSelector(state => state.expenses.currExpenses);

  const [budgetData, setBudgetData] = useState(dummyBudgetData);
  
  const [savingsData, setSavingsData] = useState(dummySavingsData);

  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Utilities');

  const [savingsModalOpen, setSavingsModalOpen] = useState(false);

  const [progressData, setProgressData] = useState({
    data: [0]
  });

  /* Budget Data related functions */

  function changeBudgetAmount(subCat, amount) {
    if (amount === '') {
      amount = null;
    }
    let tempData = {...budgetData};
    if (subCat !== null) {
      tempData[selectedCategory][subCat] = amount;
    } else {
      tempData[selectedCategory] = amount;
    }
    setBudgetData(tempData);
  }

  function saveBudgetData() {
    let floatData = {...budgetData};
    for (let [key, sec] of Object.entries(floatData)) {

      if (sec === null) continue;
      if (typeof sec === 'object') {
        for (let [sKey, sSec] of Object.entries(sec)) {
          if (sSec === null) continue;
          try {
            floatData[key][sKey] = parseFloat(parseFloat(sSec).toFixed(2));
          } catch(err) {}
        }
      } else {
        try {
          floatData[key] = parseFloat(parseFloat(sec).toFixed(2));
        } catch(err) {}
      }
    }
    setBudgetData(floatData);
    AsyncStorage.setItem('budget', JSON.stringify(floatData));
  }

  /* Savings Data related functions */

  function setSavingsName(index, name) {
    let tempData = [...savingsData];
    tempData[index].name = name === '' ? null : name;
    setSavingsData(tempData);
  }

  function setSavingsGoal(index, amount) {
    let tempData = [...savingsData];
    tempData[index].goal = amount;
    setSavingsData(tempData);
  }

  function setSavingsAmount(index, amount) {
    let tempData = [...savingsData];
    tempData[index].amount = amount;
    setSavingsData(tempData);
  }

  function saveSavingsData() {
    AsyncStorage.setItem('savings', JSON.stringify(savingsData));
  }

  function emptySavingsIndex(index) {
    let tempData = [...savingsData];
    tempData[index] = {name: '', amount: null, goal: null};
    setSavingsData(tempData);
  }

  /* Hooks */

  useEffect(() => {
    // Reformat data for the savings progress chart
    let tempData = savingsData
      .filter(s => (s.amount !== null && s.goal !== null))
      .map(s => (s.amount / s.goal))
      .map(s => {
        if (s === Infinity) return 1;
        if (isNaN(s)) return 0;
        if (s > 1) return 1;
        return s;
      });
    if (tempData.length !== 0) setProgressData(tempData);
  }, [savingsData]);

  useEffect(() => {
    // Load budget data
    AsyncStorage.getItem('budget').then(result => {
      if (result !== null) {
        setBudgetData(JSON.parse(result))
      };
    });
    // Load savings data
    AsyncStorage.getItem('savings').then(result => {
      if (result !== null) {
        setSavingsData(JSON.parse(result));
      }
    });
  }, []);


  return (
    <StyledView className='flex-1 flex-col justify-start items-center bg-scarlet-gum-500'>
      <Modal
        animationType='slide'
        visible={budgetModalOpen}
        onRequestClose={() => {
          setBudgetModalOpen(false);
        }}
      >
        <StyledView className='flex-1 justify-center items-center bg-scarlet-gum-500'>
          <ScrollView style={{flex: 1}}>
            <StyledView className='p-8 rounded-xl bg-scarlet-gum-500'>
              <StyledText className='mb-5 text-lg font-semibold text-scarlet-gum-200 text-center'>
                Set Monthly Budget Amount
              </StyledText>
              {
                Object.keys(Categories[selectedCategory].subs).length === 0 ?
                <StyledView className='w-fill flex-row justify-evenly items-center'>
                  <Icon
                    name={Categories[selectedCategory].icon}
                    size={24}
                    color={'#ecdff0'}
                  />
                  <TextInput
                    style={{
                      ...inputStyle,
                      borderColor: `${
                        currExpenses
                        .reduce((total, expense) => {
                          if (expense.category === selectedCategory)
                            return total += expense.amount;
                          else return total;
                        }, 0) > budgetData[selectedCategory] * (dateRange === 'week' ? 0.25 : dateRange === 'quarter' ? 3 : 1) ?
                        '#bf747a' :
                        '#479159'
                      }`
                    }}
                    keyboardType='numeric'
                    value={budgetData[selectedCategory]?.toString()}
                    onChangeText={ newAmount => {
                      changeBudgetAmount(null, newAmount);
                    }}
                  />
                </StyledView> :
                <StyledView className='flex-col gap-y-1'>
                  {Object.entries(Categories[selectedCategory].subs).map(([key, value]) => {
                    return (
                      <StyledView key={key} className='w-fill flex-row gap-3 justify-end items-center'>
                        <Icon
                          name={value}
                          size={24}
                          color={'#ecdff0'}
                        />
                        <TextInput
                          style={{
                            ...inputStyle,
                            borderColor: `${
                              currExpenses
                              .reduce((total, expense) => {
                                if (expense.category === selectedCategory && expense.subCategory === key)
                                  return total += expense.amount;
                                else return total;
                              }, 0) > budgetData[selectedCategory][key] * (dateRange === 'week' ? 0.25 : dateRange === 'quarter' ? 3 : 1) ?
                              '#bf747a' :
                              '#479159'
                            }`
                          }}
                          value={budgetData[selectedCategory][key]?.toString()}
                          keyboardType='numeric'
                          onChangeText={ newAmount => {
                            changeBudgetAmount(key, newAmount);
                          }}
                        />
                      </StyledView>
                    )
                  })}
                </StyledView>
              }
              <StyledView className='flex-row w-fill justify-evenly'>
                <StyledPressable
                  className='mt-5 p-2 w-24 items-center bg-scarlet-gum-700 rounded'
                  onPress={() => {
                    saveBudgetData();
                    setBudgetModalOpen(false);
                  }}
                >
                  <StyledText className='text-lg text-scarlet-gum-200'>
                    Ok
                  </StyledText>
                </StyledPressable>
              </StyledView>
            </StyledView>
            { currExpenses
              .filter(e => e.category === selectedCategory)
              .reverse()
              .map(item => {
                return <ExpenseItem key={item.date} data={item}/>
              })
            }
          </ScrollView>
        </StyledView>
      </Modal>
      <StyledView className='flex-1 w-11/12 pt-3 flex-col justify-top items-center'>
        <StyledPressable
          className='w-full items-center'
          onPress={() => {
            setSelectedCategory('Utilities');
            setBudgetModalOpen(true);
          }}
        >
          <BudgetItem
            category={'Utilities'}
            amount={currExpenses.reduce((total, expense) => {
              return total += expense.category === 'Utilities' ? expense.amount : 0;
            }, 0)}
            limit={Object.entries(budgetData.Utilities).reduce((total, limit) => {
              return total += limit[1] ?? 0;
            }, 0) * (dateRange === 'week' ? 0.25 : dateRange === 'quarter' ? 3 : 1)}
          />
        </StyledPressable>
        <StyledPressable
          className='w-full items-center'
          onPress={() => {
            setSelectedCategory('Car');
            setBudgetModalOpen(true);
          }}
        >
          <BudgetItem
            category={'Car'}
            amount={currExpenses.reduce((total, expense) => {
              return total += expense.category === 'Car' ? expense.amount : 0;
            }, 0)}
            limit={Object.entries(budgetData.Car).reduce((total, limit) => {
              return total += limit[1] ?? 0;
            }, 0) * (dateRange === 'week' ? 0.25 : dateRange === 'quarter' ? 3 : 1)}
          />
        </StyledPressable>
        <StyledPressable
          className='w-full items-center'
          onPress={() => {
            setSelectedCategory('Recurring');
            setBudgetModalOpen(true);
          }}
        >
          <BudgetItem
            category={'Recurring'}
            amount={currExpenses.reduce((total, expense) => {
              return total += expense.category === 'Recurring' ? expense.amount : 0;
            }, 0)}
            limit={budgetData.Recurring * (dateRange === 'week' ? 0.25 : dateRange === 'quarter' ? 3 : 1)}
          />
        </StyledPressable>
        <StyledPressable
          className='w-full items-center'
          onPress={() => {
            setSelectedCategory('Groceries');
            setBudgetModalOpen(true);
          }}
        >
          <BudgetItem category={'Groceries'}
            amount={currExpenses.reduce((total, expense) => {
              return total += expense.category === 'Groceries' ? expense.amount : 0;
            }, 0)}
            limit={budgetData.Groceries * (dateRange === 'week' ? 0.25 : dateRange === 'quarter' ? 3 : 1)}
          />
        </StyledPressable>
        <StyledPressable
          className='w-full items-center'
          onPress={() => {
            setSelectedCategory('Rent');
            setBudgetModalOpen(true);
          }}
        >
          <BudgetItem
            category={'Rent'}
            amount={currExpenses.reduce((total, expense) => {
              return total += expense.category === 'Rent' ? expense.amount : 0;
            }, 0)}
            limit={budgetData.Rent * (dateRange === 'week' ? 0.25 : dateRange === 'quarter' ? 3 : 1)}
          />
        </StyledPressable>
        <StyledPressable
          className='w-full items-center'
          onPress={() => {
            setSelectedCategory('Other');
            setBudgetModalOpen(true);
          }}
        >
          <BudgetItem
            category={'Other'}
            amount={currExpenses.reduce((total, expense) => {
              return total += expense.category === 'Other' ? expense.amount : 0;
            }, 0)}
            limit={Object.entries(budgetData.Other).reduce((total, limit) => {
              return total += limit[1] ?? 0;
            }, 0) * (dateRange === 'week' ? 0.25 : dateRange === 'quarter' ? 3 : 1)}
          />
        </StyledPressable>
      </StyledView>

      <StyledPressable
        className=''
        onPress={() => {
          setSavingsModalOpen(true);
        }}
      >
        <Modal
          animationType='slide'
          visible={savingsModalOpen}
          onRequestClose={() => {
            setSavingsModalOpen(false);
          }}
        >
          <StyledView className='flex-1 bg-scarlet-gum-500'>
            <StyledText className='text-xl ml-3 font-semibold text-scarlet-gum-200'>
              Savings Goals
            </StyledText>
              
            <ScrollView style={{flex: 1}}>
              <StyledView className='flex-1 justify-evenly items-center'>
                <StyledView className='w-11/12 justify-evenly items-center py-4'>
                  <StyledView className='flex-row pb-2'>
                    <StyledView className='w-6/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder='name'
                        value={savingsData[0].name}
                        onChangeText={newName => {
                          setSavingsName(0, newName);
                        }}
                      />
                    </StyledView>
                    <StyledView className='w-6/12 ml-1 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder='goal'
                        value={savingsData[0].goal}
                        keyboardType='numeric'
                        onChangeText={newAmount => {
                          setSavingsGoal(0, newAmount);
                        }}
                      />
                    </StyledView>
                  </StyledView>
                  <StyledView className='flex-row w-full gap-x-2 justify-around items-center'>
                    <StyledView className='w-9/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder='amount saved'
                        value={savingsData[0].amount}
                        keyboardType='numeric'
                        onChangeText={newAmount => {
                          setSavingsAmount(0, newAmount);
                        }}
                      />
                    </StyledView>
                    <StyledPressable
                      onPress={() => emptySavingsIndex(0)}
                    >
                      <Icon
                        name='trash-o'
                        size={24}
                        color={'#ecdff0'}
                      />
                    </StyledPressable>
                  </StyledView>
                </StyledView>

                  <StyledView className='w-full h-1 bg-scarlet-gum-300'><StyledText> </StyledText></StyledView>

                <StyledView className='w-11/12 justify-evenly items-center py-4'>
                  <StyledView className='flex-row pb-2'>
                    <StyledView className='w-6/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder='name'
                        value={savingsData[1].name}
                        onChangeText={newName => {
                          setSavingsName(1, newName);
                        }}
                      />
                    </StyledView>
                    <StyledView className='w-6/12 ml-1 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder='goal'
                        value={savingsData[1].goal}
                        keyboardType='numeric'
                        onChangeText={newAmount => {
                          setSavingsGoal(1, newAmount);
                        }}
                      />
                    </StyledView>
                  </StyledView>
                  <StyledView className='flex-row w-full gap-x-2 justify-around items-center'>
                    <StyledView className='w-9/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder='amount saved'
                        value={savingsData[1].amount}
                        keyboardType='numeric'
                        onChangeText={newAmount => {
                          setSavingsAmount(1, newAmount);
                        }}
                      />
                    </StyledView>
                    <StyledPressable
                      onPress={() => emptySavingsIndex(1)}
                    >
                      <Icon
                        name='trash-o'
                        size={24}
                        color={'#ecdff0'}
                      />
                    </StyledPressable>
                  </StyledView>
                </StyledView>

                  <StyledView className='w-full h-1 bg-scarlet-gum-300'><StyledText> </StyledText></StyledView>

                <StyledView className='w-11/12 justify-evenly items-center py-4'>
                  <StyledView className='flex-row pb-2'>
                    <StyledView className='w-6/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder='name'
                        value={savingsData[2].name}
                        onChangeText={newName => {
                          setSavingsName(2, newName);
                        }}
                      />
                    </StyledView>
                    <StyledView className='w-6/12 ml-1 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder='goal'
                        value={savingsData[2].goal}
                        keyboardType='numeric'
                        onChangeText={newAmount => {
                          setSavingsGoal(2, newAmount);
                        }}
                      />
                    </StyledView>
                  </StyledView>
                  <StyledView className='flex-row w-full gap-x-2 justify-around items-center'>
                    <StyledView className='w-9/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder='amount saved'
                        value={savingsData[2].amount}
                        keyboardType='numeric'
                        onChangeText={newAmount => {
                          setSavingsAmount(2, newAmount);
                        }}
                      />
                    </StyledView>
                    <StyledPressable
                      onPress={() => emptySavingsIndex(2)}
                    >
                      <Icon
                        name='trash-o'
                        size={24}
                        color={'#ecdff0'}
                      />
                    </StyledPressable>
                  </StyledView>
                </StyledView>

                  <StyledView className='w-full h-1 bg-scarlet-gum-300'><StyledText> </StyledText></StyledView>

                <StyledView className='w-11/12 justify-evenly items-center py-4'>
                  <StyledView className='flex-row pb-2'>
                    <StyledView className='w-6/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder='name'
                        value={savingsData[3].name}
                        onChangeText={newName => {
                          setSavingsName(3, newName);
                        }}
                      />
                    </StyledView>
                    <StyledView className='w-6/12 ml-1 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder='goal'
                        value={savingsData[3].goal}
                        keyboardType='numeric'
                        onChangeText={newAmount => {
                          setSavingsGoal(3, newAmount);
                        }}
                      />
                    </StyledView>
                  </StyledView>
                  <StyledView className='flex-row w-full gap-x-2 justify-around items-center'>
                    <StyledView className='w-9/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder='amount saved'
                        value={savingsData[3].amount}
                        keyboardType='numeric'
                        onChangeText={newAmount => {
                          setSavingsAmount(3, newAmount);
                        }}
                      />
                    </StyledView>
                    <StyledPressable
                      onPress={() => emptySavingsIndex(3)}
                    >
                      <Icon
                        name='trash-o'
                        size={24}
                        color={'#ecdff0'}
                      />
                    </StyledPressable>
                  </StyledView>
                </StyledView>
              </StyledView>
            </ScrollView>

            <StyledPressable
              className='w-full py-3 bg-scarlet-gum-700'
              onPress={() => {
                saveSavingsData();
                setSavingsModalOpen(false);
              }}
            >
              <StyledText className='text-center text-lg font-semibold text-scarlet-gum-100'>
                Back
              </StyledText>
            </StyledPressable>

          </StyledView>
        </Modal>

        <ProgressChart
          data={progressData}
          width={winWidth}
          height={120}
          strokeWidth={5}
          radius={25}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </StyledPressable>
    </StyledView>
  );
}