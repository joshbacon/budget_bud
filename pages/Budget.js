import { useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, TextInput, Pressable, Modal, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { ProgressChart } from 'react-native-chart-kit';
import BudgetItem from '../components/BudgetItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import Categories from '../data/Categories';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const inputStyle = {
  fontSize: 20,
  color: '#FFF',
  height: 50,
  width: '82.5%',
  borderWidth: 2,
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

const data = {
  // labels: ["Jamaica", "YQM Ticket", "Car", 'Noah Kahan'],
  data: [0.5, 0.23, 0.82, 0.32]
};

export default BudgetPage = () => {

  // todo:
  // - store budget amounts in async storage
  // - store savings goals in async storage
  // - read all the saved data in on (app?) open so there's no wait

  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Utilities');

  const [savingsModalOpen, setSavingsModalOpen] = useState(false);

  // also make a modals folder and move them all into there

  // probably need a state string for each category/sub-category in order to display and update properly on set amount modal

  // also probably some state variables for setting savings goals + amounts saved

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
                Set Budget Amount
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
                    style={inputStyle}
                    keyboardType='numeric'
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
                          style={inputStyle}
                          keyboardType='numeric'
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
                    setBudgetModalOpen(false);
                  }}
                >
                  <StyledText className='text-lg text-scarlet-gum-200'>
                    Cancel
                  </StyledText>
                </StyledPressable>
                <StyledPressable
                  className='mt-5 p-2 w-24 items-center bg-scarlet-gum-700 rounded'
                  onPress={() => {
                    // set the amount in the stored data
                    setBudgetModalOpen(false);
                  }}
                >
                  <StyledText className='text-lg text-scarlet-gum-200'>
                    Ok
                  </StyledText>
                </StyledPressable>
              </StyledView>
            </StyledView>
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
          <BudgetItem category={'Utilities'} amount={100} limit={100} />
        </StyledPressable>
        <StyledPressable
          className='w-full items-center'
          onPress={() => {
            setSelectedCategory('Car');
            setBudgetModalOpen(true);
          }}
        >
          <BudgetItem category={'Car'} amount={109} limit={100} />
        </StyledPressable>
        <StyledPressable
          className='w-full items-center'
          onPress={() => {
            setSelectedCategory('Recurring');
            setBudgetModalOpen(true);
          }}
        >
          <BudgetItem category={'Recurring'} amount={25} limit={100} />
        </StyledPressable>
        <StyledPressable
          className='w-full items-center'
          onPress={() => {
            setSelectedCategory('Groceries');
            setBudgetModalOpen(true);
          }}
        >
          <BudgetItem category={'Groceries'} amount={25} limit={100} />
        </StyledPressable>
        <StyledPressable
          className='w-full items-center'
          onPress={() => {
            setSelectedCategory('Rent');
            setBudgetModalOpen(true);
          }}
        >
          <BudgetItem category={'Rent'} amount={25} limit={100} />
        </StyledPressable>
        <StyledPressable
          className='w-full items-center'
          onPress={() => {
            setSelectedCategory('Other');
            setBudgetModalOpen(true);
          }}
        >
          <BudgetItem category={'Other'} amount={99} limit={100} />
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
                        placeholder={'name'}
                      />
                    </StyledView>
                    <StyledView className='w-6/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder={'goal'}
                        keyboardType='numeric'
                      />
                    </StyledView>
                  </StyledView>
                  <StyledView className='flex-row w-full gap-x-2 justify-around items-center'>
                    <StyledView className='w-9/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder={'amount saved'}
                        keyboardType='numeric'
                      />
                    </StyledView>
                    <StyledPressable>
                      <Icon
                        name='save'
                        size={24}
                        color={'#ecdff0'}
                      />
                    </StyledPressable>
                    <StyledPressable>
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
                        placeholder={'name'}
                      />
                    </StyledView>
                    <StyledView className='w-6/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder={'goal'}
                        keyboardType='numeric'
                      />
                    </StyledView>
                  </StyledView>
                  <StyledView className='flex-row w-full gap-x-2 justify-around items-center'>
                    <StyledView className='w-9/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder={'amount saved'}
                        keyboardType='numeric'
                      />
                    </StyledView>
                    <StyledPressable>
                      <Icon
                        name='save'
                        size={24}
                        color={'#ecdff0'}
                      />
                    </StyledPressable>
                    <StyledPressable>
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
                        placeholder={'name'}
                      />
                    </StyledView>
                    <StyledView className='w-6/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder={'goal'}
                        keyboardType='numeric'
                      />
                    </StyledView>
                  </StyledView>
                  <StyledView className='flex-row w-full gap-x-2 justify-around items-center'>
                    <StyledView className='w-9/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder={'amount saved'}
                        keyboardType='numeric'
                      />
                    </StyledView>
                    <StyledPressable>
                      <Icon
                        name='save'
                        size={24}
                        color={'#ecdff0'}
                      />
                    </StyledPressable>
                    <StyledPressable>
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
                        placeholder={'name'}
                      />
                    </StyledView>
                    <StyledView className='w-6/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder={'goal'}
                        keyboardType='numeric'
                      />
                    </StyledView>
                  </StyledView>
                  <StyledView className='flex-row w-full gap-x-2 justify-around items-center'>
                    <StyledView className='w-9/12 bg-scarlet-gum-300'>
                      <TextInput
                        style={{...inputStyle, width: '100%'}}
                        placeholder={'amount saved'}
                        keyboardType='numeric'
                      />
                    </StyledView>
                    <StyledPressable>
                      <Icon
                        name='save'
                        size={24}
                        color={'#ecdff0'}
                      />
                    </StyledPressable>
                    <StyledPressable>
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
          data={data}
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