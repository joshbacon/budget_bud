import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styled } from 'nativewind';
import Item from '../data/Item';
import Categories from '../data/Categories';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledInput = styled(TextInput);
const StyledPressable = styled(Pressable);

export default EnterPage = () => {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const [priority, setPriority] = useState('');

    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');

    function saveEntry() {
        // check that everything has something entered
        // format somehow (fill an Item object? then you could put the save function there)
        // save to local storage
    }

    return (
        <StyledView className='flex-1 flex-col gap-2 justify-center items-center'>
            <StatusBar style='auto' />

            <StyledInput
                value={name}
                onChangeText={setName}
                placeholder={'name'}
            />
            <StyledInput
                value={amount}
                onChangeText={setAmount}
                placeholder='14.72'
                keyboardType='numeric'
            />

            <StyledPressable className='flex-row w-full justify-between items-center bg-scarlet-gum-600'>
                <StyledText className='ml-5 text-lg text-scarlet-gum-200'>
                    Sept 25, 2023
                </StyledText>
                <StyledView className='mr-1 p-3 rounded bg-scarlet-gum-700'>
                    <Icon
                        name={Categories.Recurring.icon}
                        size={24}
                        color='#ecdff0'
                    />
                </StyledView>
                {/* this will work in the build but not in expo go app (could try with a usb also maybe?)
                <DatePicker
                    modal
                    date={date}
                    mode='date'
                    textColor='#CEB2D9'
                    theme='dark'
                    androidVariant='nativeAndroid'
                    onConfirm={(date) => {
                        setOpen(false);
                        setDate(date);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                /> */}
            </StyledPressable>

            <StyledView className='flex-row w-9/12 justify-evenly'>
                {/* idk add some extra padding or something to indicate which priority is picked */}
                <StyledPressable className='py-3 px-5 rounded bg-copper-rust-500'>
                    <Icon
                        name='meh-o'
                        size={28}
                        color='#ecdff0'
                    />
                </StyledPressable>
                <StyledPressable className='py-3 px-5 rounded bg-fruit-salad-500'>
                    <Icon
                        name='smile-o'
                        size={28}
                        color='#ecdff0'
                    />
                </StyledPressable>
            </StyledView>

            <StyledView className='flex-row w-full justify-evenly'>
                <StyledPressable className='p-3 rounded bg-scarlet-gum-700'>
                    <Icon
                        name={Categories.Utilities.icon}
                        size={24}
                        color='#ecdff0'
                    />
                </StyledPressable>
                <StyledPressable className='p-3 rounded bg-scarlet-gum-700'>
                    <Icon
                        name={Categories.Car.icon}
                        size={24}
                        color='#ecdff0'
                    />
                </StyledPressable>
                <StyledPressable className='p-3 rounded bg-scarlet-gum-700'>
                    <Icon
                        name={Categories.Recurring.icon}
                        size={24}
                        color='#ecdff0'
                    />
                </StyledPressable>
                <StyledPressable className='p-3 rounded bg-scarlet-gum-700'>
                    <Icon
                        name={Categories.Groceries.icon}
                        size={24}
                        color='#ecdff0'
                    />
                </StyledPressable>
                <StyledPressable className='p-3 rounded bg-scarlet-gum-700'>
                    <Icon
                        name={Categories.Rent.icon}
                        size={24}
                        color='#ecdff0'
                    />
                </StyledPressable>
                <StyledPressable className='p-3 rounded bg-scarlet-gum-400'>
                    <Icon
                        name={Categories.Other.icon}
                        size={24}
                        color='#ecdff0'
                    />
                </StyledPressable>
            </StyledView>

            <StyledView className='flex-row w-full justify-evenly'>
                <StyledPressable className='p-3 rounded bg-scarlet-gum-700'>
                    <Icon
                        name={Categories.Other.subs.Clothes}
                        size={24}
                        color='#ecdff0'
                    />
                </StyledPressable>
                <StyledPressable className='p-3 rounded bg-scarlet-gum-700'>
                    <Icon
                        name={Categories.Other.subs.Tech}
                        size={24}
                        color='#ecdff0'
                    />
                </StyledPressable>
                <StyledPressable className='p-3 rounded bg-scarlet-gum-400'>
                    <Icon
                        name={Categories.Other.subs.FastFood}
                        size={24}
                        color='#ecdff0'
                    />
                </StyledPressable>
                <StyledPressable className='p-3 rounded bg-scarlet-gum-700'>
                    <Icon
                        name={Categories.Other.subs.Travel}
                        size={24}
                        color='#ecdff0'
                    />
                </StyledPressable>
                <StyledPressable className='p-3 rounded bg-scarlet-gum-700'>
                    <Icon
                        name={Categories.Other.subs.Gifts}
                        size={24}
                        color='#ecdff0'
                    />
                </StyledPressable>
                <StyledPressable className='p-3 rounded bg-scarlet-gum-700'>
                    <Icon
                        name={Categories.Other.subs.Misc}
                        size={24}
                        color='#ecdff0'
                    />
                </StyledPressable>
            </StyledView>

            <StyledPressable className='absolute bottom-0 py-3 items-center w-full bg-scarlet-gum-700'>
                <StyledText className='text-xl font-semibold text-scarlet-gum-200'>
                    Enter
                </StyledText>
            </StyledPressable>

        </StyledView>
    );
};