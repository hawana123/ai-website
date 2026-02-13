// 教程页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 学习路径交互
    const pathSteps = document.querySelectorAll('.path-step');
    pathSteps.forEach(step => {
        step.addEventListener('click', function() {
            // 移除所有步骤的active类
            pathSteps.forEach(s => s.classList.remove('active'));
            // 为当前点击的步骤添加active类
            this.classList.add('active');

            const stepNumber = this.querySelector('.step-number').textContent;
            console.log(`切换到学习路径第 ${stepNumber} 阶段`);

            // 这里可以添加加载对应阶段内容的逻辑
            highlightTutorialsByStep(stepNumber);
        });
    });

    // 教程分类筛选
    const categoryCards = document.querySelectorAll('.category-card');
    const tutorialCards = document.querySelectorAll('.tutorial-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 防止点击链接时触发
            if (e.target.tagName === 'A') return;

            const category = this.getAttribute('data-category');

            // 筛选教程卡片
            tutorialCards.forEach(tutorial => {
                const tutorialCategory = tutorial.getAttribute('data-category');

                if (category === tutorialCategory) {
                    tutorial.style.display = 'block';
                    // 添加淡入动画
                    tutorial.style.opacity = '0';
                    tutorial.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        tutorial.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        tutorial.style.opacity = '1';
                        tutorial.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    tutorial.style.display = 'none';
                }
            });

            // 滚动到教程区域
            const tutorialsSection = document.querySelector('.popular-tutorials');
            if (tutorialsSection) {
                tutorialsSection.scrollIntoView({ behavior: 'smooth' });
            }

            // 更新URL哈希
            window.location.hash = `category-${category}`;
        });
    });

    // 教程卡片交互
    tutorialCards.forEach(card => {
        // 悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-xl)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });

        // 点击卡片（除了链接）
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                const tutorialTitle = this.querySelector('.tutorial-title').textContent;
                showTutorialPreview(tutorialTitle);
            }
        });

        // 进度条动画
        const progressBar = card.querySelector('.progress');
        if (progressBar) {
            const width = progressBar.style.width;
            progressBar.style.width = '0';

            setTimeout(() => {
                progressBar.style.transition = 'width 1s ease';
                progressBar.style.width = width;
            }, 300);
        }
    });

    // 学习路线图交互
    const roadmapPhases = document.querySelectorAll('.roadmap-phase');
    roadmapPhases.forEach(phase => {
        phase.addEventListener('click', function() {
            // 切换展开/收起状态
            this.classList.toggle('expanded');

            const phaseContent = this.querySelector('.phase-content');
            if (this.classList.contains('expanded')) {
                phaseContent.style.maxHeight = phaseContent.scrollHeight + 'px';
            } else {
                phaseContent.style.maxHeight = '0';
            }
        });

        // 初始化内容高度
        const phaseContent = phase.querySelector('.phase-content');
        phaseContent.style.maxHeight = '0';
        phaseContent.style.overflow = 'hidden';
        phaseContent.style.transition = 'max-height 0.3s ease';
    });

    // 资源链接点击处理
    const resourceLinks = document.querySelectorAll('.resource-link');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceName = this.textContent;
            showResourceInfo(resourceName);
        });
    });

    // 加入社区按钮
    const joinCommunityBtn = document.querySelector('.learning-community .btn');
    if (joinCommunityBtn) {
        joinCommunityBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCommunityForm();
        });
    }

    // 从URL哈希加载分类筛选
    const hash = window.location.hash;
    if (hash) {
        const category = hash.replace('#category-', '');
        const correspondingCard = document.querySelector(`.category-card[data-category="${category}"]`);

        if (correspondingCard) {
            correspondingCard.click();
        }
    }

    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        // 数字键1-5切换学习路径
        if (e.key >= '1' && e.key <= '5') {
            const index = parseInt(e.key) - 1;
            if (pathSteps[index]) {
                e.preventDefault();
                pathSteps[index].click();
            }
        }

        // ESC键重置筛选
        if (e.key === 'Escape') {
            tutorialCards.forEach(tutorial => {
                tutorial.style.display = 'block';
            });
        }
    });

    // 添加滚动动画
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('.category-card, .tutorial-card, .roadmap-phase').forEach(el => {
        observer.observe(el);
    });
});

// 根据学习路径阶段高亮教程
function highlightTutorialsByStep(stepNumber) {
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    const stepCategories = {
        '1': ['beginner'],
        '2': ['ml', 'beginner'],
        '3': ['dl', 'ml'],
        '4': ['nlp', 'dl'],
        '5': ['advanced']
    };

    const categories = stepCategories[stepNumber] || [];

    tutorialCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (categories.includes(cardCategory)) {
            card.style.border = '2px solid var(--primary-color)';
            card.style.boxShadow = 'var(--shadow-lg)';
        } else {
            card.style.border = 'none';
            card.style.boxShadow = 'var(--shadow-md)';
        }
    });
}

// 显示教程预览
function showTutorialPreview(tutorialTitle) {
    // 创建预览模态框
    const modal = document.createElement('div');
    modal.className = 'tutorial-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 1rem;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background-color: white;
        border-radius: var(--radius-lg);
        padding: 2rem;
        max-width: 600px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: var(--shadow-xl);
    `;

    modalContent.innerHTML = `
        <div class="modal-header">
            <h3>${tutorialTitle}</h3>
            <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
            <div class="tutorial-preview">
                <div class="preview-info">
                    <div class="info-item">
                        <i class="far fa-clock"></i>
                        <span>8小时课程</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-user-graduate"></i>
                        <span>5.2k学员</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-star"></i>
                        <span>4.9评分</span>
                    </div>
                </div>
                <div class="preview-content">
                    <h4>课程简介</h4>
                    <p>这是一门关于${tutorialTitle}的详细课程。课程内容涵盖从基础到进阶的知识点，通过实际案例帮助您掌握相关技能。</p>

                    <h4>学习目标</h4>
                    <ul>
                        <li>掌握核心概念和原理</li>
                        <li>学会实际应用技巧</li>
                        <li>完成实战项目练习</li>
                        <li>获得学习证书</li>
                    </ul>

                    <h4>课程大纲</h4>
                    <ol>
                        <li>基础知识介绍</li>
                        <li>核心概念讲解</li>
                        <li>实战项目练习</li>
                        <li>进阶技巧学习</li>
                    </ol>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary close-btn">关闭</button>
            <button class="btn btn-primary start-btn">开始学习</button>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // 关闭按钮功能
    const closeBtn = modalContent.querySelector('.modal-close');
    const closeBtn2 = modalContent.querySelector('.close-btn');

    [closeBtn, closeBtn2].forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    });

    // 开始学习按钮
    const startBtn = modalContent.querySelector('.start-btn');
    startBtn.addEventListener('click', () => {
        alert(`开始学习 "${tutorialTitle}" 课程！`);
        document.body.removeChild(modal);
    });

    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // ESC键关闭
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// 显示资源信息
function showResourceInfo(resourceName) {
    const notification = document.createElement('div');
    notification.className = 'resource-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle"></i>
            <span>正在加载 "${resourceName}" 资源信息...</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideUp 0.3s ease;
    `;

    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        notification.style.transform = 'translateY(100%)';
        notification.style.opacity = '0';

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// 显示社区加入表单
function showCommunityForm() {
    const modal = document.createElement('div');
    modal.className = 'community-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 1rem;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background-color: white;
        border-radius: var(--radius-lg);
        padding: 2rem;
        max-width: 500px;
        width: 100%;
        box-shadow: var(--shadow-xl);
    `;

    modalContent.innerHTML = `
        <div class="modal-header">
            <h3>加入AI学习社区</h3>
            <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
            <form class="community-form">
                <div class="form-group">
                    <label for="name">姓名</label>
                    <input type="text" id="name" placeholder="请输入您的姓名" required>
                </div>
                <div class="form-group">
                    <label for="email">邮箱</label>
                    <input type="email" id="email" placeholder="请输入您的邮箱" required>
                </div>
                <div class="form-group">
                    <label for="interest">学习兴趣</label>
                    <select id="interest" required>
                        <option value="">请选择学习方向</option>
                        <option value="beginner">入门基础</option>
                        <option value="ml">机器学习</option>
                        <option value="dl">深度学习</option>
                        <option value="nlp">自然语言处理</option>
                        <option value="cv">计算机视觉</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" required>
                        我同意社区服务条款和隐私政策
                    </label>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary close-btn">取消</button>
            <button type="submit" class="btn btn-primary submit-btn">提交申请</button>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // 表单提交处理
    const form = modalContent.querySelector('.community-form');
    const submitBtn = modalContent.querySelector('.submit-btn');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const interest = form.querySelector('#interest').value;

        if (!name || !email || !interest) {
            alert('请填写所有必填字段');
            return;
        }

        // 模拟提交
        submitBtn.textContent = '提交中...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert(`感谢 ${name} 加入AI学习社区！我们已向 ${email} 发送了确认邮件。`);
            document.body.removeChild(modal);
        }, 1500);
    });

    // 关闭按钮功能
    const closeBtn = modalContent.querySelector('.modal-close');
    const closeBtn2 = modalContent.querySelector('.close-btn');

    [closeBtn, closeBtn2].forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    });

    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // ESC键关闭
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}