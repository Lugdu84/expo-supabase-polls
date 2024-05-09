import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function App() {
	const polls = [1, 2, 3];
	return (
		<>
			<Stack.Screen options={{ title: 'Polls' }} />
			<FlatList
				data={polls}
				contentContainerStyle={styles.container}
				renderItem={() => (
					<View style={styles.pollContainer}>
						<Text style={styles.pollTitle}>Exemple poll question</Text>
					</View>
				)}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		gap: 10,
	},
	pollContainer: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5,
	},
	pollTitle: {
		fontWeight: 'bold',
		fontSize: 16,
	},
});