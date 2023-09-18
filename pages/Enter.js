import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';
import Item from '../data/Model';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export default EnterPage = () => {
    return (
        <StyledView className='bg-scarlet-gum-400'>
            <StatusBar style='auto' />
            <StyledText className='p-3 text-scarlet-gum-200 text-center font-semibold'>
                Sup dog
            </StyledText>
        </StyledView>
    );
};