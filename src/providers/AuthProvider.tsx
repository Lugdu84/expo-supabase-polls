import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

type AuthData = {
	session: Session | null;
	user: User | undefined;
	isAuthenticated: boolean;
};

const AuthContext = createContext<AuthData>({
	session: null,
	user: undefined,
	isAuthenticated: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		const fetchSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);
			if (!session) {
				supabase.auth.signInAnonymously();
			}
		};
		fetchSession();
		supabase.auth.onAuthStateChange((event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				session,
				user: session?.user,
				isAuthenticated: !!session?.user && !session.user.is_anonymous,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
