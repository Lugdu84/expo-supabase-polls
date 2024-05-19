import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { View, Text, Button } from 'react-native';

export default function ProfileScreen() {
	const { user } = useAuth();

	return (
		<View>
			<Text>User id : {user?.id} </Text>
			<Button
				title="Sign Out"
				onPress={() => supabase.auth.signOut()}
			/>
		</View>
	);
}
