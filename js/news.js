// 新闻页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 分类筛选功能
    const categoryButtons = document.querySelectorAll('.category-btn');
    const newsCards = document.querySelectorAll('.news-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');

            // 筛选新闻卡片
            newsCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                    // 添加淡入动画
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            });

            // 更新URL哈希（可选）
            if (selectedCategory !== 'all') {
                window.location.hash = `category-${selectedCategory}`;
            } else {
                window.location.hash = '';
            }
        });
    });

    // 阅读更多按钮功能
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const newsCard = this.closest('.news-card');
            const newsContent = newsCard.querySelector('.news-content');
            const newsExcerpt = newsCard.querySelector('.news-excerpt');

            // 切换显示/隐藏完整内容
            if (newsContent.style.display === 'block') {
                newsContent.style.display = 'none';
                newsExcerpt.style.display = 'block';
                this.innerHTML = '阅读全文 <i class="fas fa-arrow-right"></i>';
            } else {
                newsContent.style.display = 'block';
                newsExcerpt.style.display = 'none';
                this.innerHTML = '收起 <i class="fas fa-arrow-up"></i>';

                // 平滑滚动到展开的内容
                newsContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // 分页功能
    const pageNumbers = document.querySelectorAll('.page-number');
    pageNumbers.forEach(number => {
        number.addEventListener('click', function(e) {
            e.preventDefault();

            // 移除所有页码的active类
            pageNumbers.forEach(n => n.classList.remove('active'));
            // 为当前点击的页码添加active类
            this.classList.add('active');

            // 这里可以添加加载对应页面内容的逻辑
            console.log(`切换到第 ${this.textContent} 页`);

            // 模拟加载动画
            const newsGrid = document.querySelector('.news-grid');
            newsGrid.style.opacity = '0.5';

            setTimeout(() => {
                newsGrid.style.opacity = '1';
                newsGrid.style.transition = 'opacity 0.3s ease';
            }, 300);
        });
    });

    // 订阅表单处理
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!email) {
                showNotification('请输入有效的邮箱地址', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('邮箱格式不正确', 'error');
                return;
            }

            // 模拟订阅请求
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = '订阅中...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = '订阅成功！';
                submitBtn.style.backgroundColor = 'var(--success-color)';

                showNotification('订阅成功！请检查您的邮箱确认订阅。', 'success');

                // 重置表单
                emailInput.value = '';

                // 3秒后恢复按钮状态
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // 从URL哈希加载分类筛选
    const hash = window.location.hash;
    if (hash) {
        const category = hash.replace('#category-', '');
        const correspondingButton = document.querySelector(`.category-btn[data-category="${category}"]`);

        if (correspondingButton) {
            correspondingButton.click();
        }
    }

    // 添加新闻卡片悬停效果
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-xl)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });

    // 初始化新闻内容为隐藏状态
    const newsContents = document.querySelectorAll('.news-content');
    newsContents.forEach(content => {
        content.style.display = 'none';
    });
});

// 辅助函数：验证邮箱格式
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 辅助函数：显示通知
function showNotification(message, type = 'info') {
    // 移除现有的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 创建新的通知
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'error' ? 'var(--danger-color)' : type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
        color: white;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;

    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Alt + 数字键切换分类
    if (e.altKey && e.key >= '1' && e.key <= '5') {
        const index = parseInt(e.key) - 1;
        const categoryButtons = document.querySelectorAll('.category-btn');

        if (categoryButtons[index]) {
            e.preventDefault();
            categoryButtons[index].click();
        }
    }

    // ESC键重置筛选
    if (e.key === 'Escape') {
        const allButton = document.querySelector('.category-btn[data-category="all"]');
        if (allButton) {
            allButton.click();
        }
    }
});