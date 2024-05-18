import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

const poll = {
	question: 'React Native vs Flutter',
	options: ['React Native FTW', 'Flutter is the best', 'Both are great'],
};

export default function DetailsPollScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	return (
		<View style={styles.container}>
			<Text style={styles.question}>{poll.question}</Text>
			<View style={{ gap: 5 }}>
				{poll.options.map((option) => (
					<View
						style={styles.optionContainer}
						key={option}>
						<Text>{option}</Text>
					</View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		gap: 20,
	},
	question: {
		fontSize: 20,
		fontWeight: '600',
	},
	optionContainer: {
		padding: 10,
		borderRadius: 5,
		backgroundColor: 'white',
	},
});
