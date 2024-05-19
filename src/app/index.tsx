import { Link, Stack } from 'expo-router';
import { FlatList, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Poll } from '@/types/types';

export default function App() {
	const [polls, setPolls] = useState<Poll[]>([]);

	useEffect(() => {
		const fetchPolls = async () => {
			let { data: polls, error } = await supabase.from('polls').select('*');
			if (!polls) {
				polls = [];
			}
			if (error) console.error('Error fetching polls', error);
			setPolls(polls);
		};

		fetchPolls();
	}, []);
	return (
		<>
			<Stack.Screen
				options={{
					title: 'Polls',
					headerRight: () => (
						<Link href={'/polls/new'}>
							<AntDesign
								name="plus"
								size={24}
								color="gray"
							/>
						</Link>
					),
					headerLeft: () => (
						<Link href={'/profile'}>
							<AntDesign
								name="user"
								size={24}
								color="gray"
							/>
						</Link>
					),
				}}
			/>
			<FlatList
				data={polls}
				contentContainerStyle={styles.container}
				renderItem={({ item }) => (
					<Link
						href={`/polls/${item.id}`}
						style={styles.pollContainer}>
						<Text style={styles.pollTitle}>{item.question}</Text>
					</Link>
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
