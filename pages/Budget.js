import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { ProgressChart } from 'react-native-chart-kit';
import BudgetItem from '../components/BudgetItem';
import Icon from 'react-native-vector-icons/FontAwesome';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.25,
    decimalPlaces: 0,
    useShadowColorFromDataset: false // optional
};

const data = {
  labels: ["Jamaica", "YQM Ticket", "Car"],
  data: [0.5, 0.23, 0.82]
};

export default BudgetPage = () => {
  return (
    <StyledView className='flex-1 flex-col justify-top items-center bg-scarlet-gum-500'>
      <StyledView className='flex-1 w-11/12 pt-3 flex-col justify-top items-center'>
        <BudgetItem amount={25} goal={100} />
        <BudgetItem amount={25} goal={100} />
        <BudgetItem amount={25} goal={100} />
        <BudgetItem amount={25} goal={100} />
        <BudgetItem amount={25} goal={100} />
        <BudgetItem amount={25} goal={100} />
      </StyledView>

      <StyledView className='w-fill'>
        <ProgressChart
          data={data}
          width={winWidth}
          height={120}
          strokeWidth={5}
          radius={25}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </StyledView>
    </StyledView>
  );
}