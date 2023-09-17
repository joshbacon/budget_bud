


export default function ExpensesPage() {
    return (
        <View style={styles.container}>
            <ExpenseItem />
            <StyledButton
                className='absolute bottom-1'
                title='Add'
                onPress={() => {}}
            />
        </View>
    )
}