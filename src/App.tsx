import { Live2D } from './components/Live2D';
import styles from './css/App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>AI Girl Gallery</h1>
        <p className={styles.tagline}>美少女 Live2D 展示馆</p>
        <span className={styles.badge}>✨ Powered by Live2D Cubism</span>
      </header>

      {/* Statistics Section */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>19+</div>
          <div className={styles.statLabel}>美少女模型</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>6</div>
          <div className={styles.statLabel}>角色类型</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>100%</div>
          <div className={styles.statLabel}>免费开源</div>
        </div>
      </div>

      <main className={styles.appMain}>
        <Live2D />
      </main>

      <footer className={styles.appFooter}>
        <p>Models from GitHub open source community • Built with React + Live2D</p>
      </footer>
    </div>
  );
}

export default App;
