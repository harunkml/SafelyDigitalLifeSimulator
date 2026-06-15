import { AppProvider as StateProvider } from '../../state/AppContext';

export default function AppProvider({ children }) {
  return (
    <StateProvider>
      {children}
    </StateProvider>
  );
}
