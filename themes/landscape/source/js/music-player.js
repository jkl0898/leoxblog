/**
 * 音乐播放器配置
 * 支持 pjax 无刷新切换，保持播放状态
 */

(function($){
  // 检查播放器是否已初始化（支持 pjax）
  function initAPlayer() {
    // 如果播放器已存在，不重复初始化
    if (window.aplayer) {
      console.log('🎵 播放器已存在，跳过初始化');
      return;
    }

    const playerOptions = {
      container: document.getElementById('aplayer-fixed'),
      autoplay: false,
      loop: 'all',
      order: 'list',
      preload: 'auto',
      volume: 0.7,
      mutex: true,
      listFolded: true,
      lrcType: 3,
      listMaxHeight: '400px',
      
      // ⭐⭐⭐ 在这里配置你的音乐列表 ⭐⭐⭐
      // 
      // 💡 如何添加音乐：
      // 1. 购买或下载无版权音乐 MP3 文件
      // 2. 上传到阿里云 OSS 或其他 CDN
      // 3. 复制下面的模板添加歌曲
      //
      // 模板：
      // {
      //   name: '歌曲名称',
      //   artist: '艺术家',
      //   url: 'https://你的音乐链接.mp3',
      //   cover: 'https://封面图片链接.jpg',
      //   lrc: '歌词文件链接（可选）'
      // },
      audio: [
        // 👇 Canon in D - GitHub + jsDelivr CDN
        {
          name: 'Canon in D (Pachelbel)',
          artist: 'LAURENT BUCZEK',
          url: 'https://cdn.jsdelivr.net/gh/jkl0898/jkl0898.github.io@master/music/canon_in_d.mp3',
          cover: 'https://picsum.photos/300/300?random=2',
          lrc: ''
        }
        ,
        {
          name: 'Canon in D Pachelbel',
          artist: 'Classical',
          url: 'https://cdn.jsdelivr.net/gh/jkl0898/jkl0898.github.io@master/music/canon_in_d_pachelbel.mp3',
          cover: 'https://picsum.photos/300/300?random=2',
          lrc: ''
        }
        // 在这里添加更多歌曲...
      ]
    };

    try {
      window.aplayer = new APlayer(playerOptions);
      
      if (localStorage.getItem('aplayer-volume') !== null) {
        aplayer.volume(localStorage.getItem('aplayer-volume'), true);
      }

      aplayer.on('volumechange', function() {
        localStorage.setItem('aplayer-volume', aplayer.volume);
      });

      console.log('✅ 音乐播放器已就绪 - 共 ' + aplayer.list.audios.length + ' 首歌曲');
    } catch (error) {
      console.error('❌ 播放器初始化失败:', error);
    }
  }

  // 页面加载时初始化
  $(document).ready(function(){
    initAPlayer();
  });

  // pjax 完成后不重新初始化播放器（保持播放状态）
  $(document).on('pjax:complete', function() {
    // 播放器继续播放，不做任何操作
    console.log('🎵 Pjax 切换完成，播放器继续播放');
  });

  window.MusicPlayer = {
    play: function() {
      if (window.aplayer) aplayer.play();
    },
    pause: function() {
      if (window.aplayer) aplayer.pause();
    },
    setVolume: function(volume) {
      if (window.aplayer) aplayer.volume(volume, true);
    },
    addAudio: function(audio) {
      if (window.aplayer) aplayer.addAudio(audio);
    }
  };

})(jQuery);
