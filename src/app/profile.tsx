import { useAuth } from '@/providers/AuthProvider';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
	const { session } = useAuth();

	console.log(session);
	return (
		<View>
			<Text>User id : {session?.user.id} </Text>
		</View>
	);
}
