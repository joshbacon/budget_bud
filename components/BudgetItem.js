import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import Categories from '../data/Categories';
import Icon from 'react-native-vector-icons/FontAwesome';

const StyledView = styled(View);
const StyledText = styled(Text);

export default BudgetItem = ({category, amount, limit}) => {
    if (limit === 0) {
        limit = amount;
    }
    return (
        <StyledView className="z-0 relative flex-row w-11/12 mt-2 p-3 w-fill rounded-xl overflow-hidden bg-scarlet-gum-700">
            <StyledView
                className={`z-10 absolute top-0 left-0 h-20 ${amount>=limit?'bg-copper-rust-500':'bg-fruit-salad-500'}`}
                style={{
                    width: `${Math.round(amount/limit*100)}%`
                }}
            />
            <StyledView className='z-20 rounded-xl p-3 min-w-icon items-center bg-scarlet-gum-500'>
                <Icon 
                    name={Categories[category].icon}
                    size={18}
                    color={'#ecdff0'}
                />
            </StyledView>
            <StyledView className='z-20 pl-2 h-fill justify-center items-center'>
                <StyledText className='text-base text-scarlet-gum-100'>
                    {Math.round(amount/limit*100)}%
                </StyledText>
            </StyledView>
        </StyledView>
    );
}