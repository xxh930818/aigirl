import { useEffect, useRef, useState } from 'react';
import styles from './Live2D.module.css';

export function Live2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let app: any = null;

    const initLive2D = async () => {
      try {
        const PIXI = await import('pixi.js');

        const canvas = canvasRef.current;
        if (!canvas) return;

        app = new PIXI.Application({
          view: canvas,
          width: canvas.width,
          height: canvas.height,
          backgroundColor: 0xffffff,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        });

        // Live2D 模型加载将在用户添加模型文件后工作
        // 请在 public/models 目录下放置你的 Live2D 模型
        console.log('Live2D 初始化完成，等待模型加载');

        setIsLoaded(true);
      } catch (err) {
        console.error('Live2D 初始化失败:', err);
        setError('Live2D 初始化失败');
      }
    };

    initLive2D();

    return () => {
      if (app) {
        app.destroy(true, { children: true, texture: true });
      }
    };
  }, []);

  return (
    <div className={styles.live2dContainer}>
      <canvas
        ref={canvasRef}
        width={400}
        height={500}
        className={styles.live2dCanvas}
      />
      {!isLoaded && !error && (
        <div className={styles.live2dLoading}>
          <p>加载中...</p>
        </div>
      )}
      {error && (
        <div className={styles.live2dError}>
          <p>{error}</p>
        </div>
      )}
      <div className={styles.live2dPlaceholder}>
        <p>Live2D 模型展示区域</p>
        <p className={styles.live2dHint}>
          请将 Live2D 模型文件放在 public/models 目录下
        </p>
      </div>
    </div>
  );
}