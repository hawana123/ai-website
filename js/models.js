// 模型页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 模型分类筛选功能
    const categoryButtons = document.querySelectorAll('.category-btn');
    const modelCards = document.querySelectorAll('.model-card.detailed');
    const tableRows = document.querySelectorAll('.comparison-table tbody tr');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');

            // 筛选模型卡片
            modelCards.forEach(card => {
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

            // 筛选表格行
            tableRows.forEach(row => {
                const rowCategory = row.getAttribute('data-category');

                if (selectedCategory === 'all' || rowCategory === selectedCategory) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });

            // 更新URL哈希
            if (selectedCategory !== 'all') {
                window.location.hash = `category-${selectedCategory}`;
            } else {
                window.location.hash = '';
            }
        });
    });

    // 国家/地区筛选功能
    const countryButtons = document.querySelectorAll('.country-filter-btn');

    countryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有国家按钮的active类
            countryButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            this.classList.add('active');

            const selectedCountry = this.getAttribute('data-country');

            // 筛选模型卡片
            modelCards.forEach(card => {
                const cardCountry = card.getAttribute('data-country') || 'us'; // 默认美国

                if (selectedCountry === 'all' ||
                    (selectedCountry === 'us' && (!cardCountry || cardCountry === 'us')) ||
                    (selectedCountry === 'cn' && cardCountry === 'cn') ||
                    (selectedCountry === 'other' && cardCountry && cardCountry !== 'us' && cardCountry !== 'cn')) {
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

            // 筛选表格行
            tableRows.forEach(row => {
                const rowCountry = row.getAttribute('data-country') || 'us'; // 默认美国

                if (selectedCountry === 'all' ||
                    (selectedCountry === 'us' && (!rowCountry || rowCountry === 'us')) ||
                    (selectedCountry === 'cn' && rowCountry === 'cn') ||
                    (selectedCountry === 'other' && rowCountry && rowCountry !== 'us' && rowCountry !== 'cn')) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });

            // 更新URL哈希
            if (selectedCountry !== 'all') {
                const currentHash = window.location.hash;
                const newHash = currentHash ? `${currentHash}-country-${selectedCountry}` : `country-${selectedCountry}`;
                window.location.hash = newHash;
            }
        });
    });

    // 表格排序功能
    const tableHeaders = document.querySelectorAll('.comparison-table th');
    let currentSort = { column: null, direction: 'asc' };

    tableHeaders.forEach((header, index) => {
        // 跳过第一列（模型名称）的排序
        if (index > 0) {
            header.style.cursor = 'pointer';
            header.style.position = 'relative';

            // 添加排序指示器
            const sortIndicator = document.createElement('span');
            sortIndicator.className = 'sort-indicator';
            sortIndicator.innerHTML = '↕';
            sortIndicator.style.cssText = `
                margin-left: 0.5rem;
                opacity: 0.5;
                font-size: 0.8em;
            `;
            header.appendChild(sortIndicator);

            header.addEventListener('click', function() {
                sortTable(index, header.textContent.trim());
            });
        }
    });

    // 模型卡片交互效果
    modelCards.forEach(card => {
        // 悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-xl)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });

        // 点击展开详细信息
        const modelLinks = card.querySelectorAll('.model-link');
        modelLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                    const modelName = card.querySelector('.model-name').textContent;
                    showModelDetails(modelName);
                }
            });
        });
    });

    // 从URL哈希加载筛选状态
    const hash = window.location.hash;
    if (hash) {
        // 解析哈希，支持格式：#category-llm 或 #category-llm-country-cn
        const hashParts = hash.replace('#', '').split('-');

        // 查找分类部分
        if (hashParts.includes('category')) {
            const categoryIndex = hashParts.indexOf('category');
            if (categoryIndex + 1 < hashParts.length) {
                const category = hashParts[categoryIndex + 1];
                const categoryButton = document.querySelector(`.category-btn[data-category="${category}"]`);

                if (categoryButton) {
                    categoryButton.click();
                }
            }
        }

        // 查找国家部分
        if (hashParts.includes('country')) {
            const countryIndex = hashParts.indexOf('country');
            if (countryIndex + 1 < hashParts.length) {
                const country = hashParts[countryIndex + 1];
                const countryButton = document.querySelector(`.country-filter-btn[data-country="${country}"]`);

                if (countryButton) {
                    // 等待分类筛选完成后再执行国家筛选
                    setTimeout(() => {
                        countryButton.click();
                    }, 100);
                }
            }
        }
    }

    // 添加表格行悬停效果
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--light-color)';
        });

        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // 模型比较功能
    const comparisonCheckboxes = document.querySelectorAll('.model-card input[type="checkbox"]');
    if (comparisonCheckboxes.length > 0) {
        comparisonCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateComparison();
            });
        });
    }

    // 搜索功能
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '搜索模型...';
    searchInput.className = 'model-search';
    searchInput.style.cssText = `
        display: block;
        width: 100%;
        max-width: 400px;
        margin: 2rem auto;
        padding: 0.75rem 1rem;
        border: 1px solid var(--gray-light);
        border-radius: var(--radius-md);
        font-size: 1rem;
    `;

    const modelDetailsSection = document.querySelector('.model-details .container');
    if (modelDetailsSection) {
        modelDetailsSection.insertBefore(searchInput, modelDetailsSection.querySelector('.models-grid'));
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();

        modelCards.forEach(card => {
            const modelName = card.querySelector('.model-name').textContent.toLowerCase();
            const modelCompany = card.querySelector('.model-company').textContent.toLowerCase();
            const modelDescription = card.querySelector('.model-description').textContent.toLowerCase();

            if (searchTerm === '' ||
                modelName.includes(searchTerm) ||
                modelCompany.includes(searchTerm) ||
                modelDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 表格排序函数
function sortTable(columnIndex, columnName) {
    const table = document.querySelector('.comparison-table tbody');
    const rows = Array.from(table.querySelectorAll('tr'));

    // 确定排序方向
    let direction = 'asc';
    if (currentSort.column === columnIndex && currentSort.direction === 'asc') {
        direction = 'desc';
    }

    currentSort = { column: columnIndex, direction };

    // 更新排序指示器
    document.querySelectorAll('.sort-indicator').forEach(indicator => {
        indicator.innerHTML = '↕';
        indicator.style.opacity = '0.5';
    });

    const currentHeader = document.querySelectorAll('.comparison-table th')[columnIndex];
    const currentIndicator = currentHeader.querySelector('.sort-indicator');
    currentIndicator.innerHTML = direction === 'asc' ? '↑' : '↓';
    currentIndicator.style.opacity = '1';

    // 排序行
    rows.sort((a, b) => {
        const aCell = a.cells[columnIndex].textContent.trim();
        const bCell = b.cells[columnIndex].textContent.trim();

        // 处理数字
        const aNum = parseFloat(aCell);
        const bNum = parseFloat(bCell);

        if (!isNaN(aNum) && !isNaN(bNum)) {
            return direction === 'asc' ? aNum - bNum : bNum - aNum;
        }

        // 处理文本
        if (direction === 'asc') {
            return aCell.localeCompare(bCell);
        } else {
            return bCell.localeCompare(aCell);
        }
    });

    // 重新插入行
    rows.forEach(row => table.appendChild(row));
}

// 显示模型详细信息
function showModelDetails(modelName) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'model-modal';
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
            <h3>${modelName} 详细信息</h3>
            <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
            <p>这里是 ${modelName} 的详细技术规格、性能指标和使用案例。</p>
            <p>在实际应用中，这里会从API获取详细的模型信息。</p>
            <div class="modal-features">
                <h4>技术特点</h4>
                <ul>
                    <li>先进的架构设计</li>
                    <li>优秀的性能表现</li>
                    <li>广泛的应用场景</li>
                    <li>活跃的社区支持</li>
                </ul>
            </div>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // 关闭按钮功能
    const closeBtn = modalContent.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--gray-color);
    `;

    closeBtn.addEventListener('click', () => {
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

// 更新模型比较
function updateComparison() {
    const selectedModels = Array.from(document.querySelectorAll('.model-card input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.closest('.model-card'));

    if (selectedModels.length >= 2) {
        console.log(`比较 ${selectedModels.length} 个模型`);
        // 这里可以添加实际的比较逻辑
    }
}

// 添加键盘快捷键
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

    // Ctrl + F 聚焦搜索框
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.querySelector('.model-search');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // ESC键重置筛选
    if (e.key === 'Escape') {
        const allButton = document.querySelector('.category-btn[data-category="all"]');
        if (allButton) {
            allButton.click();
        }

        const searchInput = document.querySelector('.model-search');
        if (searchInput) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
    }
});