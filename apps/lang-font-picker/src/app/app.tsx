import useLanguageFontPicker from '@lfp/headless-lfp';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';

export function App() {
  const lfp = useLanguageFontPicker();
  console.info(lfp);

  return (
    <div>
      <NxWelcome title="Language Font Picker" />
    </div>
  );
}

export default App;
