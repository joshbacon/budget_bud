import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styled } from 'nativewind';
import Item from '../data/Item';
import Categories from '../data/Categories';
import { useSelector, useDispatch } from 'react-redux';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const inputStyle = {
    fontSize: 20,
    color: '#FFF',
    height: 50,
    width: '82.5%',
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: '#fff',
    padding: 10
};

export default EnterPage = ({showing, setShowing}) => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const [date, setDate] = useState(new Date());
    const [showingDate, setShowingDate] = useState(false);
    
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');

    const [priority, setPriority] = useState('');

    const dateRange = useSelector(state => state.expenses.dateRange);
    const currExpenses = useSelector(state => state.expenses.currExpenses);
    const dispatch = useDispatch();

    console.log(`enter - ${dateRange}`);
    console.log(currExpenses);

    function saveEntry() {
        if (name !== '' && amount !== '' && priority !== '' && category !== '' &&
            (Object.entries(Categories[category].subs).length > 0 ? subCategory !== '' : true)
        ) {
            const entry = new Item({
                name: name,
                amount: amount,
                date: date,
                category: category,
                subCategory: subCategory,
                priority: priority
            });
            // save new entry to local memory for later
            entry.save();
            // and to redux to feed visuals (check if in current range first)
            const sunday = new Date();
            const quarter = Math.floor((new Date().getMonth() + 3) / 3);
            const start = new Date(sunday.getFullYear(), (quarter-1)*3+1, 1);
            start.setHours(0, 0, 0, 0);
            const first = new Date(sunday.getFullYear(), sunday.getMonth(), 1);
            first.setHours(0, 0, 0, 0);
            sunday.setDate(sunday.getDate() - sunday.getDay());
            sunday.setHours(0, 0, 0, 0);
            if ( (dateRange === 'week' && entry.getDate() >= sunday) ||
                 (dateRange === 'month' && entry.getDate() >= first) ||
                 (dateRange === 'quarter' && entry.getDate() >= start) ) {
                    dispatch({
                        type: 'SET_CURR_EXPENSES',
                        payload: [...currExpenses, {...entry.data(), date: date.toString()}]
                    });
            }

            // Reset inputs
            setName('');
            setAmount('');
            setCategory('');
            setSubCategory('');
            setPriority('');
            setShowing(false);
        } else {
            let leftOver = 'Empty fields: \n';
            if (name === '') leftOver += 'Name\n';
            if (amount === '') leftOver += 'Amount\n';
            if (category === '') leftOver += 'Category\n';
            if (subCategory === '') leftOver += 'Sub-category\n';
            if (priority === '') leftOver += 'Priority\n';
            Alert.alert('Missing fields', leftOver);
        }
    }

    function reset() {
        setName('');
        setAmount('');
        setDate(new Date());
        setShowingDate(false);
        setCategory('');
        setSubCategory('');
        setPriority('');
    }

    return (
        <Modal
            animationType='slide'
            visible={showing}
            onRequestClose={() => {
              setShowing(false);
            }}
            style={{width: '100%'}}
        >
            <StyledView className='flex-1 h-full flex-col justify-start items-center bg-scarlet-gum-500'>

                <StyledView className='flex-row w-full justify-start items-center'>
                    <StyledPressable
                        className='p-3'
                        onPress={() => {
                            reset();
                            setShowing(false);
                        }}
                    >
                        <Icon
                            name='close'
                            size={28}
                            color='#ecdff0'
                        />
                    </StyledPressable>
                    <StyledText className='text-lg font-semibold text-scarlet-gum-100'>
                        Add an Item
                    </StyledText>
                </StyledView>

                <ScrollView>
                    <StyledView className='w-11/12 gap-2'>
                        <StyledView className='flex-row justify-end items-center'>
                            <StyledView className='mr-2'>
                                <Icon
                                    name='pencil'
                                    size={24}
                                    color='#ecdff0'
                                />
                            </StyledView>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                placeholder={'name'}
                                style={inputStyle}
                            />
                        </StyledView>
                        <StyledView className='flex-row justify-end items-center'>
                            <StyledView className='mr-2'>
                                <Icon
                                    name='money'
                                    size={24}
                                    color='#ecdff0'
                                />
                            </StyledView>
                            <TextInput
                                value={amount}
                                onChangeText={setAmount}
                                placeholder='amount'
                                keyboardType='numeric'
                                style={inputStyle}
                            />
                        </StyledView>
                    </StyledView>

                    <StyledPressable
                        className={`flex-row mt-5 justify-between items-center bg-scarlet-gum-600 ${showingDate ? '' : 'mb-5'}`}
                        onPress={() => {
                            setShowingDate(!showingDate);
                        }}
                    >
                        <StyledText className='ml-5 text-lg text-scarlet-gum-200'>
                            {date.toDateString()}
                        </StyledText>
                        <StyledView className='mr-1 p-3 rounded bg-scarlet-gum-700'>
                            <Icon
                                name='calendar'
                                size={24}
                                color='#ecdff0'
                            />
                        </StyledView>
                    </StyledPressable>

                    <StyledView
                        className={`flex-row mb-5 h-10 w-screen ${showingDate ? '' : 'hidden'}`}
                        visible={showingDate}
                    >
                        <StyledPressable
                            className='w-1/2 h-10 pt-2 items-center rounded bg-scarlet-gum-700'
                            onPress={() => {
                                setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()-1));
                            }}
                        >
                            <Icon
                                name='chevron-left'
                                size={25}
                                color='#ecdff0'
                            />
                        </StyledPressable>
                        <StyledPressable
                            className='w-1/2 h-10 pt-2 items-center rounded bg-scarlet-gum-700'
                            onPress={() => {
                                setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()+1));
                            }}
                        >
                            <Icon
                                name='chevron-right'
                                size={25}
                                color='#ecdff0'
                            />
                        </StyledPressable>
                    </StyledView>

                    <StyledView className='flex-row w-full justify-evenly'>
                        <StyledPressable
                            className={`py-3 rounded bg-fruit-salad-500 ${priority==='need'?'px-8':'px-5'}`}
                            onPress={() => {
                                setPriority('need');
                            }}
                        >
                            <Icon
                                name='meh-o'
                                size={28}
                                color='#ecdff0'
                            />
                        </StyledPressable>
                        <StyledPressable
                            className={`py-3 rounded bg-copper-rust-500 ${priority==='want'?'px-8':'px-5'}`}
                            onPress={() => {
                                setPriority('want');
                            }}
                        >
                            <Icon
                                name='smile-o'
                                size={28}
                                color='#ecdff0'
                            />
                        </StyledPressable>
                    </StyledView>

                    <StyledView className='flex-row my-5 w-full justify-evenly'>
                        <StyledPressable
                            className={`p-3 rounded ${category==='Utilities'?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
                            onPress={() => {
                                if (category !== 'Utilities') {
                                    setCategory('Utilities');
                                    setSubCategory('');
                                }
                            }}
                        >
                            <Icon
                                name={Categories.Utilities.icon}
                                size={24}
                                color='#ecdff0'
                            />
                        </StyledPressable>
                        <StyledPressable
                            className={`p-3 rounded ${category==='Car'?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
                            onPress={() => {
                                if (category !== 'Car') {
                                    setCategory('Car');
                                    setSubCategory('');
                                }
                            }}
                        >
                            <Icon
                                name={Categories.Car.icon}
                                size={24}
                                color='#ecdff0'
                            />
                        </StyledPressable>
                        <StyledPressable
                            className={`p-3 rounded ${category==='Recurring'?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
                            onPress={() => {
                                if (category !== 'Recurring') {
                                    setCategory('Recurring');
                                    setSubCategory('');
                                }
                            }}
                        >
                            <Icon
                                name={Categories.Recurring.icon}
                                size={24}
                                color='#ecdff0'
                            />
                        </StyledPressable>
                        <StyledPressable
                            className={`p-3 rounded ${category==='Groceries'?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
                            onPress={() => {
                                if (category !== 'Groceries') {
                                    setCategory('Groceries');
                                    setSubCategory('');
                                }
                            }}
                        >
                            <Icon
                                name={Categories.Groceries.icon}
                                size={24}
                                color='#ecdff0'
                            />
                        </StyledPressable>
                        <StyledPressable
                            className={`p-3 rounded ${category==='Rent'?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
                            onPress={() => {
                                if (category !== 'Rent') {
                                    setCategory('Rent');
                                    setSubCategory('');
                                }
                            }}
                        >
                            <Icon
                                name={Categories.Rent.icon}
                                size={24}
                                color='#ecdff0'
                            />
                        </StyledPressable>
                        <StyledPressable
                            className={`p-3 rounded ${category==='Other'?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
                            onPress={() => {
                                if (category !== 'Other') {
                                    setCategory('Other');
                                    setSubCategory('');
                                }
                            }}
                        >
                            <Icon
                                name={Categories.Other.icon}
                                size={24}
                                color='#ecdff0'
                            />
                        </StyledPressable>
                    </StyledView>

                    <StyledView className='flex-row w-full justify-evenly'>
                        {category === 'Utilities' ?
                            Object.entries(Categories.Utilities.subs).map(([key, value]) => {
                                return (
                                    <StyledPressable
                                        key={key}
                                        className={`p-3 min-w-icon items-center rounded ${subCategory===key?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
                                        onPress={() => {
                                            setSubCategory(key);
                                        }}
                                    >
                                        <Icon
                                            name={value}
                                            size={24}
                                            color='#ecdff0'
                                        />
                                    </StyledPressable>
                                )
                            }) : null
                        }
                        {category === 'Car' ?
                            Object.entries(Categories.Car.subs).map(([key, value]) => {
                                return (
                                    <StyledPressable
                                        key={key}
                                        className={`p-3 min-w-icon items-center rounded ${subCategory===key?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
                                        onPress={() => {
                                            setSubCategory(key);
                                        }}
                                    >
                                        <Icon
                                            name={value}
                                            size={24}
                                            color='#ecdff0'
                                        />
                                    </StyledPressable>
                                )
                            }) : null
                        }
                        {category === 'Other' ?
                            Object.entries(Categories.Other.subs).map(([key, value]) => {
                                return (
                                    <StyledPressable
                                        key={key}
                                        className={`p-3 min-w-icon items-center rounded ${subCategory===key?'bg-scarlet-gum-400':'bg-scarlet-gum-700'}`}
                                        onPress={() => {
                                            setSubCategory(key);
                                        }}
                                    >
                                        <Icon
                                            name={value}
                                            size={24}
                                            color='#ecdff0'
                                        />
                                    </StyledPressable>
                                )
                            }) : null
                        }
                    </StyledView>
                </ScrollView>

                <StyledPressable
                    className='absolute bottom-0 py-3 items-center w-full bg-scarlet-gum-700'
                    onPress={saveEntry}
                >
                    <StyledText className='text-xl font-semibold text-scarlet-gum-200'>
                        Enter
                    </StyledText>
                </StyledPressable>

            </StyledView>
        </Modal>
    );
};