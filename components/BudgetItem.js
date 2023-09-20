import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/FontAwesome';

const StyledView = styled(View);
const StyledText = styled(Text);

export default BudgetItem = ({amount, goal}) => {
    return (
            <StyledView className="z-0 relative flex-row w-11/12 mt-2 p-3 w-fill rounded-xl overflow-hidden bg-scarlet-gum-700">
                <StyledView className='z-10 absolute top-0 left-0 h-20 w-5/12 bg-fruit-salad-500' />
                <StyledView className='z-20 rounded-xl p-3 bg-scarlet-gum-500'>
                    <Icon 
                        name='car'
                        size={18}
                        color={'#ecdff0'}
                    />
                </StyledView>
                <StyledView className='z-20 pl-2 h-fill justify-center items-center'>
                    <StyledText className='text-base text-scarlet-gum-100'>
                        20%
                    </StyledText>
                </StyledView>
            </StyledView>
    );
}