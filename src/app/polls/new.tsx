import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Stack } from 'expo-router';
import { useState } from 'react';

export default function NewPollScreen() {
	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState(['', '']);
	const createPoll = () => {
		console.warn('Create poll', { question, options });
	};

	const addOption = () => {
		setOptions([...options, '']);
	};

	const deleteOption = (index: number) => {
		if (options.length <= 2) {
			console.warn('You need at least 2 options');
			return;
		}
		const newOptions = [...options];
		newOptions.splice(index, 1);
		setOptions(newOptions);
	};
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: 'New Poll' }} />
			<Text style={styles.label}>Title</Text>
			<TextInput
				value={question}
				onChangeText={setQuestion}
				style={styles.input}
				placeholder="Type your question here"
			/>
			<Text style={styles.label}>Options</Text>
			{options.map((option, index) => (
				<View
					key={index}
					style={{ justifyContent: 'center' }}>
					<TextInput
						value={option}
						onChangeText={(value) => {
							const newOptions = [...options];
							newOptions[index] = value;
							setOptions(newOptions);
						}}
						style={styles.input}
						placeholder={`Option ${index + 1}`}
					/>
					<Feather
						onPress={() => deleteOption(index)}
						style={{ position: 'absolute', right: 5 }}
						name="x"
						size={20}
						color="gray"
					/>
				</View>
			))}
			<Button
				onPress={addOption}
				title="Add option"
			/>
			<Button
				onPress={createPoll}
				title="Create Poll"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		gap: 10,
	},
	label: {
		fontWeight: '500',
		marginTop: 10,
	},
	input: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 10,
	},
});
