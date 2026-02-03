import { useEffect, useRef, useState } from 'react';
import styles from './Live2D.module.css';

export function Live2D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 使用简单 Live2D 库
    const loadLive2D = async () => {
      try {
        // 加载 PIXI.js
        const PIXI = await import('pixi.js');

        if (!containerRef.current) return;

        const app = new PIXI.Application({
          background: '#ffffff',
          width: 400,
          height: 500,
        });

        containerRef.current.appendChild(app.view as HTMLCanvasElement);

        // 使用简单图片作为演示
        const texture = await PIXI.Assets.load('https://live2d.github.io/assets/haru/haru.1024/texture_00.png');
        const sprite = new PIXI.Sprite(texture);

        sprite.anchor.set(0.5);
        sprite.x = app.screen.width / 2;
        sprite.y = app.screen.height / 2;

        // 缩放图片以适应画布
        const scale = Math.min(
          (app.screen.width * 0.8) / sprite.width,
          (app.screen.height * 0.8) / sprite.height
        );
        sprite.scale.set(scale);

        app.stage.addChild(sprite);

        // 添加简单的悬浮动画
        let time = 0;
        app.ticker.add(() => {
          time += 0.02;
          sprite.y = app.screen.height / 2 + Math.sin(time) * 10;
        });

        setIsLoaded(true);
      } catch (err: any) {
        console.error('加载失败:', err);
        setError('加载失败: ' + err.message);
      }
    };

    loadLive2D();
  }, []);

  return (
    <div className={styles.live2dContainer}>
      <div ref={containerRef} className={styles.live2dCanvas} />
      {!isLoaded && !error && (
        <div className={styles.live2dLoading}>
          <p>加载中...</p>
        </div>
      )}
      {error && (
        <div className={styles.live2dError}>
          <p>{error}</p>
          <p className={styles.live2dHint}>
            Live2D 需要额外的 SDK 配置，目前显示静态图片
          </p>
        </div>
      )}
    </div>
  );
}