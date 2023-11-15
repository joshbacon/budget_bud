import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import Categories from '../data/Categories';
import Icon from 'react-native-vector-icons/FontAwesome';
import Item from '../data/Item';

const StyledView = styled(View);
const StyledText = styled(Text);

export default ExpenseItem = ({data}) => {
    // const item = Item(data);
    return (
        <StyledView className={
            `flex-row items-center justify-between mx-2 my-1 p-3 rounded-xl
                ${data.priority === 'need' ? 'bg-fruit-salad-500 ' : 'bg-copper-rust-500'}`
        }>

            <StyledView className=''>
                <StyledText className='text-lg text-scarlet-gum-100'>
                    {data.name}
                </StyledText>
                <StyledView className='flex-row'>
                    <StyledView className='z-20 min-w-icon items-center rounded-xl p-3 bg-scarlet-gum-500'>
                        <Icon
                            name={Categories[data.category].icon}
                            size={18}
                            color={'#ecdff0'}
                        />
                    </StyledView>
                    {
                        data.subCategory !== '' ?
                        <StyledView className='z-20 min-w-icon items-center rounded-xl p-3 ml-1 bg-scarlet-gum-500'>
                            <Icon
                                name={Categories[data.category].subs[data.subCategory]}
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
                    {data.date.split('T')[0]}
                </StyledText>
            </StyledView>

        </StyledView>
    );
}