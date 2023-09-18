import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/FontAwesome';

const StyledView = styled(View);
const StyledText = styled(Text);

export default NavBar = ({navigation}) => {
    console.log(navigation.getState().routes[0].name);
    const rootName = navigation.getState().routes[0].name;
    return (
        <StyledView className="flex-row items-center justify-around min-w-full p-2 bg-scarlet-gum-700">
            <Icon.Button
                name='pie-chart'
                size={28}
                backgroundColor={"#0000"}
                onPress={() => {
                    if (rootName !== 'Overview') {
                        navigation.navigate('Overview')
                    }
                }}
            >
                <StyledText className="text-scarlet-gum-300 font-semibold">
                    Home
                </StyledText>
            </Icon.Button>
            <Icon.Button
                name='list-alt'
                size={28}
                backgroundColor={"#0000"}
                onPress={() => {
                    if (rootName !== 'Expenses') {
                        navigation.navigate('Expenses')
                    }
                }}
            >
                <StyledText className="text-scarlet-gum-100 font-semibold">
                    Expenses
                </StyledText>
            </Icon.Button>
            <Icon.Button
                name='book'
                size={28}
                backgroundColor={"#0000"}
                onPress={() => {
                    if (rootName !== 'Budget') {
                        navigation.navigate('Budget')
                    }
                }}
            >
                <StyledText className="text-scarlet-gum-100 font-semibold">
                    Budget
                </StyledText>
            </Icon.Button>
        </StyledView>
    );
}