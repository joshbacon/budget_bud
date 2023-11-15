import { ActivityIndicator, View} from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

export default Loader = () => {

    return (
        <StyledView className='flex-1 flex-col justify-start items-center bg-scarlet-gum-500'>
            <ActivityIndicator
                size={'large'}
                color={'#479159'}
            />
        </StyledView>
    );

}