import { Live2D } from './components/Live2D';
import styles from './css/App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>AI Girl</h1>
        <p>美少女 Live2D 展示</p>
      </header>
      <main className={styles.appMain}>
        <Live2D />
      </main>
      <footer className={styles.appFooter}>
        <p>请将 Live2D 模型文件放在 public/models 目录下</p>
      </footer>
    </div>
  );
}

export default App;