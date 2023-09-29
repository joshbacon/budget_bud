import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExpenseItem from '../components/ExpenseItem';
import { item1, item2, item3 } from '../data/tempdata';
import EnterPage from './Enter';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);
const StyledIcon = styled(Icon);

export default ExpensesPage = ({navigation}) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <StyledView className='flex-1 justify-start align-middle bg-scarlet-gum-500'>
            <StatusBar style='auto' />

            <EnterPage showing={showModal} setShowing={setShowModal}/>
            
            <StyledPressable
                className='w-fill mx-2 my-2 p-2 flex-row justify-start items-center rounded-xl bg-scarlet-gum-700'
                onPress={() => {
                    setShowModal(true);
                }}
            >
                <StyledIcon
                    name='plus-circle'
                    size={45}
                    color={'rgb(236, 223, 240)'}
                    backgroundColor={'#0000'}
                    underlayColor={"#0000"}
                />
                <StyledText className='pl-3 text-scarlet-gum-100'>
                    Add Transaction
                </StyledText>
            </StyledPressable>

            <SafeAreaView>
                <ScrollView>
                    <ExpenseItem data={item1} />
                    <ExpenseItem data={item2} />
                    <ExpenseItem data={item3} />
                </ScrollView>
            </SafeAreaView>

        </StyledView>
    );
}