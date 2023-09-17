import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export default ExpenseItem = (props) => {
    return (
        <StyledView className="flex-row items-center justify-around space-x- w-10/12 bg-stone-700 bg-opacity-5 p-3 rounded-xl">
            <StyledText className="text-scarlet-gum-100">McDonalds</StyledText>
            <StyledText className="text-scarlet-gum-100">Fast Food</StyledText>
            <StyledText className="text-scarlet-gum-100">$18.14</StyledText>
            <StyledText className="text-scarlet-gum-100">want</StyledText>
        </StyledView>
    );
}