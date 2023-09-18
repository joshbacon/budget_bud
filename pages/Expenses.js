import { Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';
import ExpenseItem from '../components/ExpenseItem';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export default ExpensesPage = ({navigation}) => {
    return (
        <StyledView className='pt-6 min-w-screen min-h-screen flex-col justify-start align-middle bg-scarlet-gum-500'>
            <StatusBar style='auto' />
            <ExpenseItem />
            <StyledPressable
                className='w-8/12 bg-scarlet-gum-800 rounded-lg'
                title='Add'
                onPress={() => {
                    navigation.navigate('Enter Item');
                }}
            >
                <StyledText className='p-3 text-scarlet-gum-200 text-center font-semibold'>
                    Add Item
                </StyledText>
            </StyledPressable>
        </StyledView>
    );
}