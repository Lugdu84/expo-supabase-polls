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
import { Poll, Vote } from '@/types/types';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

type NewVote = {
	option: string;
	poll_id: number;
	user_id: string;
	id?: number;
};

export default function DetailsPollScreen() {
	const { user } = useAuth();
	const { id } = useLocalSearchParams<{ id: string }>();
	const [poll, setPoll] = useState<Poll | null>(null);
	const [userVote, setUserVote] = useState<Vote | null>(null);
	const [selected, setSelected] = useState('');

	useEffect(() => {
		const fetchPoll = async () => {
			const { data, error } = await supabase
				.from('polls')
				.select('*')
				.eq('id', Number.parseInt(id!))
				.single();
			if (error) {
				console.error('Error fetching poll', error);
				return;
			}

			// fetch user vote
			const { data: votes } = await supabase
				.from('votes')
				.select('*')
				.eq('poll_id', Number.parseInt(id!))
				.eq('user_id', user!.id)
				.single();

			if (votes) {
				setSelected(votes.option);
			}
			setPoll(data);
			setUserVote(votes);
		};
		fetchPoll();
	}, []);

	if (!poll) {
		return <ActivityIndicator />;
	}

	const handleVote = async () => {
		const newVote: NewVote = {
			option: selected,
			poll_id: poll.id,
			user_id: user!.id,
		};
		if (userVote) {
			newVote.id = userVote.id;
		}
		const { error } = await supabase.from('votes').upsert(newVote).select();
		if (error) {
			console.error('Error voting', error);
			return;
		}
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
