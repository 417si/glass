let observer;

const createObserver = () => {
  // すでに監視中であれば一旦解除する
  if (observer) observer.disconnect();

  // 画面幅が 750px 以下かどうかを判定
  const isMobile = window.matchMedia("(max-width: 750px)").matches;

  const options = {
    root: null,
    rootMargin: "0px",
    // 750px以下なら 0.5、それ以外なら 0.1
    threshold: isMobile ? 0.5 : 0.1
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const btnId = entry.target.getAttribute('data-button');
      const targetBtn = document.getElementById(btnId);
      if (!targetBtn) return;

      if (entry.isIntersecting) {
        targetBtn.classList.add('is-show');
      } else {
        targetBtn.classList.remove('is-show');
      }
    });
  }, options);

  // 全ての要素を監視開始
  document.querySelectorAll('.trigger').forEach(el => observer.observe(el));
};

// 1. 初回読み込み時に実行
createObserver();

// 2. 画面サイズが変わった時に再実行（リサイズ監視）
window.addEventListener('resize', () => {
  // 頻繁に実行されないよう、必要に応じてデバウンス（間引き）を検討してもOK
  createObserver();
});