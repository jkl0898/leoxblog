/**
 * Pjax 初始化脚本
 * 实现无刷新页面切换，保持音乐播放器不中断
 */

(function($){
  // 检查是否支持 pjax
  if (typeof $.pjax === 'undefined') {
    console.warn('Pjax 库未加载，跨页面音乐播放功能不可用');
    return;
  }

  // pjax 配置 - 对所有站内链接启用
  $(document).pjax('a[href^="/"]', {
    container: '#container',
    fragment: '#container',
    timeout: 8000,
    cache: false,
    storage: true
  });

  // 同时支持完整域名链接
  $(document).pjax('a[href^="' + window.location.origin + '"]', {
    container: '#container',
    fragment: '#container',
    timeout: 8000,
    cache: false,
    storage: true
  });

  // 排除特殊链接
  $(document).on('click', 'a[target="_blank"], a[download], a[href^="javascript"], a[href^="#"], a[href*="mailto:"], a[href*="atom.xml"]', function(e) {
    e.stopPropagation();
  });

  // pjax 开始 - 显示加载动画
  $(document).on('pjax:start', function() {
    $('body').addClass('pjax-loading');
  });

  // pjax 结束 - 隐藏加载动画
  $(document).on('pjax:end', function() {
    $('body').removeClass('pjax-loading');
    
    // 重新初始化页面相关脚本
    if (typeof initFancybox === 'function') {
      initFancybox();
    }
    
    // 滚动到顶部
    window.scrollTo(0, 0);
    
    // 触发自定义事件，供其他脚本监听
    $(document).trigger('pjax:complete');
  });

  // pjax 错误处理
  $(document).on('pjax:error', function(e, xhr, err) {
    console.error('Pjax 加载失败:', err);
    // 如果加载失败，回退到正常页面跳转
    if (e.relatedTarget && e.relatedTarget.href) {
      window.location.href = e.relatedTarget.href;
    }
  });

  // pjax 超时处理
  $(document).on('pjax:timeout', function(e) {
    console.warn('Pjax 加载超时，回退到正常跳转');
    if (e.relatedTarget && e.relatedTarget.href) {
      window.location.href = e.relatedTarget.href;
    }
  });

  console.log('✅ Pjax 已初始化 - 跨页面音乐播放已启用');
})(jQuery);
