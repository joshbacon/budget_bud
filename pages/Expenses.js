import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExpenseItem from '../components/ExpenseItem';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);
const StyledIcon = styled(Icon);

export default ExpensesPage = ({navigation}) => {
    return (
        <StyledView className='flex-1 justify-start align-middle bg-scarlet-gum-500'>
            <StatusBar style='auto' />
            <StyledPressable
                className='w-fill mx-2 mt-2 p-2 flex-row justify-start items-center rounded-xl bg-copper-rust-500'
                onPress={() => {
                    navigation.navigate('add');
                }}
            >
                <StyledIcon
                    name='plus-circle'
                    size={45}
                    color={'rgb(236, 223, 240)'}
                    backgroundColor={'#bf747a'}
                    underlayColor={"#0000"}
                />
                <StyledText className='pl-3 text-scarlet-gum-100'>
                    Add Transaction
                </StyledText>
            </StyledPressable>
            <SafeAreaView>
                <ScrollView>
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                    <ExpenseItem />
                </ScrollView>
            </SafeAreaView>

            {/* <StyledView className='z-20 absolute bottom-3 right-3'>
              <StyledIcon
                name='plus-circle'
                size={56}
                color={'#bf747a'}
                backgroundColor={'#431a60'}
                underlayColor={"#0000"}
                onPress={() => {
                    navigation.navigate('Enter Page');
                }}
              />
            </StyledView> */}
        </StyledView>
    );
}