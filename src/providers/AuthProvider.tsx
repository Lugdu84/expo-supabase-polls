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
};

const AuthContext = createContext<AuthData>({
	session: null,
	user: undefined,
});

export default function AuthProvider({ children }: PropsWithChildren) {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		const fetchSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);
		};
		fetchSession();
		supabase.auth.onAuthStateChange((event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<AuthContext.Provider value={{ session, user: session?.user }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
