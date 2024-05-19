import { Stack, useLocalSearchParams } from 'expo-router';
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Button,
	ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Poll } from '@/types/types';
import { supabase } from '@/lib/supabase';

export default function DetailsPollScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [poll, setPoll] = useState<Poll | null>(null);
	const [selected, setSelected] = useState<string | null>(null);

	useEffect(() => {
		const fetchPoll = async () => {
			const { data, error } = await supabase
				.from('polls')
				.select('*')
				.eq('id', String(id))
				.single();
			if (error) {
				console.error('Error fetching poll', error);
				return;
			}
			setPoll(data);
		};
		fetchPoll();
	}, []);

	if (!poll) {
		return <ActivityIndicator />;
	}

	const handleVote = () => {
		console.warn('Voted for', selected);
	};
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: 'Poll voting' }} />
			<Text style={styles.question}>{poll.question}</Text>
			<View style={{ gap: 5 }}>
				{poll.options.map((option) => (
					<Pressable
						onPress={() => setSelected(option)}
						style={styles.optionContainer}
						key={option}>
						<Feather
							name={option === selected ? 'check-circle' : 'circle'}
							size={24}
							color={option === selected ? 'green' : 'gray'}
						/>
						<Text>{option}</Text>
					</Pressable>
				))}
			</View>
			<Button
				onPress={handleVote}
				title="Vote"
			/>
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
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
});
