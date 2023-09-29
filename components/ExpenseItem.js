import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/FontAwesome';
import Item from '../data/Item';

const StyledView = styled(View);
const StyledText = styled(Text);

export default ExpenseItem = ({data}) => {
    // const item = Item(data);
    return (
        <StyledView className={
            `flex-row items-center justify-between mx-2 my-1 p-3 rounded-xl
                ${data.priority ? 'bg-fruit-salad-500 ' : 'bg-copper-rust-500'}`
        }>

            <StyledView className=''>
                <StyledText className='text-lg text-scarlet-gum-100'>
                    {data.name}
                </StyledText>
                <StyledView className='flex-row'>
                    <StyledView className='z-20 min-w-icon items-center rounded-xl p-3 bg-scarlet-gum-500'>
                        <Icon
                            name={data.category}
                            size={18}
                            color={'#ecdff0'}
                        />
                    </StyledView>
                    {
                        data.subCategory !== null ?
                        <StyledView className='z-20 min-w-icon items-center rounded-xl p-3 ml-1 bg-scarlet-gum-500'>
                            <Icon
                                name={data.subCategory}
                                size={18}
                                color={'#ecdff0'}
                            />
                        </StyledView> : null
                    }
                </StyledView>
            </StyledView>

            <StyledView className=''>
                <StyledText className='text-lg text-right text-scarlet-gum-100'>
                    ${data.amount}
                </StyledText>
                <StyledText className='text-right text-scarlet-gum-100'>
                    {data.date}
                </StyledText>
            </StyledView>

        </StyledView>
    );
}