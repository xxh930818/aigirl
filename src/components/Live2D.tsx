import { useEffect, useState } from 'react';
import styles from './Live2D.module.css';

export function Live2D() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let oml2dInstance: any = null;

    const loadLive2D = async () => {
      try {
        // 动态导入 oh-my-live2d
        const { loadOml2d } = await import('oh-my-live2d');

        // 初始化 Live2D - 使用 CDN 上的 Shizuku 模型
        oml2dInstance = await loadOml2d({
          dockedPosition: 'right',
          mobileDisplay: true,
          primaryColor: '#ff6b9d',
          models: [
            {
              name: 'shizuku',
              path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json',
              scale: 0.15,
              position: [0, 50],
              mobileScale: 0.12,
              mobilePosition: [0, 50],
            },
          ],
        });

        setIsLoaded(true);
      } catch (err: any) {
        console.error('Live2D 加载失败:', err);
        setError('Live2D 加载失败，请刷新重试');
      }
    };

    loadLive2D();

    return () => {
      if (oml2dInstance) {
        oml2dInstance.destroy();
      }
    };
  }, []);

  return (
    <div className={styles.live2dContainer}>
      {!isLoaded && !error && (
        <div className={styles.live2dLoading}>
          <p>Live2D 看板娘加载中...</p>
        </div>
      )}
      {isLoaded && (
        <div className={styles.live2dInfo}>
          <p>Shizuku 看板娘已激活 ✨</p>
        </div>
      )}
    </div>
  );
}