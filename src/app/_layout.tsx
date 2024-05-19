import AuthProvider from '@/providers/AuthProvider';
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
	return (
		<AuthProvider>
			<Stack />
		</AuthProvider>
	);
}
