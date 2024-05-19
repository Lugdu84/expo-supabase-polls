import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Slot, Stack } from 'expo-router';

export default function AuthLayout() {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Redirect href={'/profile'} />;
	}
	return <Stack />;
}
