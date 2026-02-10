import { useEffect, useState, useRef } from 'react';
import styles from './Live2D.module.css';

// 可用的 Live2D 模型列表 - 全部为女性角色 - 使用 cdn.jsdelivr.net 避免 CORS 问题
const LIVE2D_MODELS = [
  // ========== 可爱少女系 ==========
  {
    id: 'shizuku',
    name: 'Shizuku (しずく・水滴)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json',
    scale: 0.15,
  },
  {
    id: 'wanko',
    name: 'Wanko (わんこ・猫耳少女)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json',
    scale: 0.2,
  },
  {
    id: 'koharu',
    name: 'Koharu (こはる・春)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json',
    scale: 0.15,
  },
  {
    id: 'chitose',
    name: 'Chitose (ちとせ・千歳)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-chitose@1.0.5/assets/chitose.model.json',
    scale: 0.15,
  },
  {
    id: 'unitychan',
    name: 'Unitychan (ユニちゃん)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-unitychan@1.0.5/assets/unitychan.model.json',
    scale: 0.2,
  },
  {
    id: 'epsilon',
    name: 'Epsilon 2.1 (エプシロン)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-epsilon2_1@1.0.5/assets/Epsilon2.1.model.json',
    scale: 0.15,
  },

  // ========== 成熟人妻系 ==========
  {
    id: 'hibiki',
    name: 'Hibiki (響・お姉様)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-hibiki@1.0.5/assets/hibiki.model.json',
    scale: 0.15,
  },
  {
    id: 'izumi',
    name: 'Izumi (いずみ・人妻)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-izumi@1.0.5/assets/izumi.model.json',
    scale: 0.15,
  },
  {
    id: 'hijiki',
    name: 'Hijiki (ひじき・奥さん)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-hijiki@1.0.5/assets/hijiki.model.json',
    scale: 0.15,
  },
  {
    id: 'tororo',
    name: 'Tororo (トラロロ)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-tororo@1.0.5/assets/tororo.model.json',
    scale: 0.12,
  },

  // ========== 兽娘猫耳系 ==========
  {
    id: 'tsumiki',
    name: 'Tsumiki (ツミキ・積木)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-tsumiki@1.0.5/assets/tsumiki.model.json',
    scale: 0.15,
  },

  // ========== 歌姬偶像系 ==========
  {
    id: 'nico',
    name: 'Nico (ニコ・歌姫)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-nico@1.0.5/assets/nico.model.json',
    scale: 0.15,
  },
  {
    id: 'miku',
    name: 'Miku (ミク・初音未来)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-miku@1.0.5/assets/miku.model.json',
    scale: 0.15,
  },

  // ========== 动漫角色系 ==========
  {
    id: 'umaru',
    name: 'Umaru (ウルル・干物妹)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-umaru@2.0.0/assets/umaru.model.json',
    scale: 0.18,
  },
  {
    id: 'rem',
    name: 'Rem (レム・Re:Zero)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-rem@1.0.1/assets/rem.model.json',
    scale: 0.15,
  },

  // ========== 其他美少女 ==========
  {
    id: 'z16',
    name: 'Z16 (美少女)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-z16@1.0.5/assets/z16.model.json',
    scale: 0.15,
  },
  {
    id: 'ni-j',
    name: 'Ni-J (ニジ・虹色)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-ni-j@1.0.5/assets/ni-j.model.json',
    scale: 0.15,
  },
  {
    id: 'nipsilon',
    name: 'Nipsilon (ニプシロン)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-nipsilon@1.0.5/assets/nipsilon.model.json',
    scale: 0.15,
  },
  {
    id: 'nito',
    name: 'Nito (ニト・仁人)',
    path: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-nito@1.0.5/assets/nito.model.json',
    scale: 0.15,
  },
];

export function Live2D() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const oml2dInstanceRef = useRef<any>(null);

  useEffect(() => {
    const loadLive2D = async () => {
      try {
        const { loadOml2d } = await import('oh-my-live2d');

        oml2dInstanceRef.current = await loadOml2d({
          dockedPosition: 'right',
          mobileDisplay: true,
          primaryColor: '#667eea',
          models: LIVE2D_MODELS.map((model) => ({
            name: model.id,
            path: model.path,
            scale: model.scale,
            position: [0, 50],
            mobileScale: model.scale * 0.8,
            mobilePosition: [0, 30],
          })),
        });

        setIsLoaded(true);
      } catch (err: any) {
        console.error('Live2D 加载失败:', err);
        setError('Live2D 加载失败，请刷新重试');
      }
    };

    loadLive2D();

    return () => {
      if (oml2dInstanceRef.current) {
        oml2dInstanceRef.current.destroy();
      }
    };
  }, []);

  const changeModel = async (index: number) => {
    if (!oml2dInstanceRef.current || isChanging) return;

    setIsChanging(true);
    try {
      await oml2dInstanceRef.current.loadModelByIndex(index);
      setCurrentModelIndex(index);
    } catch (err) {
      console.error('模型切换失败:', err);
    } finally {
      setIsChanging(false);
    }
  };

  const nextModel = () => {
    const nextIndex = (currentModelIndex + 1) % LIVE2D_MODELS.length;
    changeModel(nextIndex);
  };

  const prevModel = () => {
    const prevIndex = (currentModelIndex - 1 + LIVE2D_MODELS.length) % LIVE2D_MODELS.length;
    changeModel(prevIndex);
  };

  return (
    <div className={styles.live2dContainer}>
      {/* 模型控制面板 */}
      <div className={styles.modelSelector}>
        <div className={styles.modelSelectorHeader}>
          <h3>✨ 角色选择</h3>
          <p className={styles.subtitle}>19位美少女角色等你来探索</p>
        </div>
        <div className={styles.modelList}>
          {LIVE2D_MODELS.map((model, index) => (
            <button
              key={model.id}
              className={`${styles.modelButton} ${index === currentModelIndex ? styles.modelButtonActive : ''}`}
              onClick={() => changeModel(index)}
              disabled={isChanging}
            >
              <span>{model.name}</span>
            </button>
          ))}
        </div>
        <div className={styles.modelControls}>
          <button className={styles.controlButton} onClick={prevModel} disabled={isChanging}>
            ← 上一个
          </button>
          <span className={styles.modelCounter}>
            {currentModelIndex + 1} / {LIVE2D_MODELS.length}
          </span>
          <button className={styles.controlButton} onClick={nextModel} disabled={isChanging}>
            下一个 →
          </button>
        </div>
        {isChanging && (
          <div className={styles.changingIndicator}>
            模型切换中...
          </div>
        )}
      </div>

      {/* 加载状态 */}
      {!isLoaded && !error && (
        <div className={styles.live2dLoading}>
          <p>Live2D 看板娘加载中...</p>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}

      {/* 错误状态 */}
      {error && (
        <div className={styles.live2dError}>
          <p>{error}</p>
        </div>
      )}

      {/* 当前模型信息 */}
      {isLoaded && !error && (
        <div className={styles.live2dInfo}>
          <p>✨ {LIVE2D_MODELS[currentModelIndex].name}</p>
          <p className={styles.live2dHint}>点击右侧看板娘互动！</p>
        </div>
      )}
    </div>
  );
}
