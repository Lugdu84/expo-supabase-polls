import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Redirect, Stack } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

export default function NewPollScreen() {
	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState(['', '']);
	const [error, setError] = useState('');
	const { user } = useAuth();

	if (!user) {
		return <Redirect href={'/login'} />;
	}
	const createPoll = async () => {
		setError('');
		if (!question) {
			setError('Question is required');
			return;
		}

		if (options.some((option) => !option)) {
			setError('Please valid at least 2 options');
			return;
		}
		console.warn('Create poll', { question, options });
		const { data, error } = await supabase
			.from('polls')
			.insert({
				question,
				options,
			})
			.select();

		if (error) {
			setError(error.message);
			return;
		}
		console.warn('Poll created', data);
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
			<Text style={{ color: 'red' }}>{error}</Text>
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
