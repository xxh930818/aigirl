import { useEffect, useRef, useState } from 'react';
import styles from './Live2D.module.css';

export function Live2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    let app: any = null;
    let model: any = null;

    const initLive2D = async () => {
      try {
        // 动态导入 pixi.js 和 pixi-live2d-display
        const PIXI = await import('pixi.js');

        const canvas = canvasRef.current;
        if (!canvas) return;

        // 创建 PIXI 应用
        app = new PIXI.Application({
          view: canvas,
          width: canvas.width,
          height: canvas.height,
          backgroundColor: 0xffffff,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        });

        // 加载 Live2D 插件
        const { Live2DModel } = await import('pixi-live2d-display');

        // 加载 Haru 模型
        try {
          model = await Live2DModel.from('/models/haru/haru_greeter_t03.moc3');

          // 调整模型大小和位置
          const scale = Math.min(
            (canvas.width * 0.8) / model.width,
            (canvas.height * 0.9) / model.height
          );
          model.scale.set(scale);
          model.x = canvas.width / 2;
          model.y = canvas.height / 2;
          model.anchor.set(0.5, 0.5);

          app.stage.addChild(model);
          setModelReady(true);
        } catch (modelError) {
          console.error('模型加载失败:', modelError);
          setError('模型加载失败');
        }

        setIsLoaded(true);
      } catch (err) {
        console.error('Live2D 初始化失败:', err);
        setError('Live2D 初始化失败');
      }
    };

    initLive2D();

    return () => {
      if (model) {
        model.destroy();
      }
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
      {isLoaded && !modelReady && !error && (
        <div className={styles.live2dPlaceholder}>
          <p>Live2D 模型展示区域</p>
          <p className={styles.live2dHint}>
            模型: Haru (示例)
          </p>
        </div>
      )}
    </div>
  );
}