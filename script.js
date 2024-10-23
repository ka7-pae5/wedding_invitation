document.addEventListener('DOMContentLoaded', () => {
    // 既存のSwiperや動画の処理（そのまま）
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                coverflowEffect: {
                    depth: 100,
                    modifier: 1,
                },
            },
            768: {
                slidesPerView: 2,
                coverflowEffect: {
                    depth: 150,
                    modifier: 1.2,
                },
            },
            1024: {
                slidesPerView: 3,
                coverflowEffect: {
                    depth: 200,
                    modifier: 1.5,
                },
            },
        },
    });

    const video = document.getElementById('door-video');
    const topImage = document.getElementById('top-image');
    const invitationText = document.getElementById('invitation-text');

    // 動画の再生進行を監視するイベントリスナー関数
    const handleVideoTimeUpdate = () => {
        if (video.currentTime >= video.duration * 0.9) {
            video.style.transition = 'opacity 1s ease';
            video.style.opacity = '0';
            topImage.style.transition = 'opacity 1s ease, transform 1.5s ease';
            topImage.style.opacity = '1';
            topImage.style.transform = 'scale(1.1)';
            setTimeout(() => {
                invitationText.style.opacity = '1';
            }, 1000);
            video.removeEventListener('timeupdate', handleVideoTimeUpdate);
        }
    };

    video.addEventListener('timeupdate', handleVideoTimeUpdate);

    const form = document.getElementById('rsvp-form');
        form.addEventListener('submit', function(event) {
          event.preventDefault(); // デフォルトの送信動作を無効化
          
          const formData = new FormData(form);
          const data = new URLSearchParams();
          formData.forEach((value, key) => {
            data.append(key, value);
          });

          fetch(form.action, {
            method: 'POST',
            body: data,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .then(response => {
            if (!response.ok) {
              console.error('フォーム送信に失敗しました:', response.statusText);
              throw new Error('フォーム送信に失敗しました。');
            }
            return response.text();
          })
          .then(() => {
            // 送信成功後に別ページにリダイレクト
            window.location.href = 'confirmation.html';
          })
          .catch(error => {
            console.error('エラーが発生しました:', error);
            alert('エラーが発生しました。再度お試しください。');
          });
        });
    
});
