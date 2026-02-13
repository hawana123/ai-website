# AI前沿 - 人工智能资讯与学习平台

一个专注于人工智能资讯、模型介绍和知识教程的学习平台，助力您掌握AI技术前沿。

## 🌟 项目特色

- 📰 **最新AI资讯** - 实时追踪人工智能领域的最新动态、研究成果和行业新闻
- 🤖 **主流AI模型** - 详细介绍国内外主流AI模型的特点、能力和应用场景
- 📚 **AI知识教程** - 从基础到进阶，系统学习机器学习、深度学习等AI核心技术
- 🎨 **现代化UI** - 响应式设计，完美适配桌面和移动端
- ⚡ **丰富交互** - 分类筛选、表格排序、动画效果

## 🚀 项目结构

```
ai-website/
├── index.html          # 首页
├── css/
│   └── style.css      # 主样式文件
├── js/
│   ├── main.js         # 通用JavaScript
│   ├── news.js         # 新闻页面JavaScript
│   ├── models.js       # 模型页面JavaScript
│   └── tutorials.js    # 教程页面JavaScript
├── pages/
│   ├── news.html       # 新闻页面
│   ├── models.html     # AI模型页面
│   └── tutorials.html  # AI教程页面
├── images/            # 图片目录
└── README.md          # 项目说明
```

## 🛠 技术栈

- **HTML5** - 语义化标签，良好的可访问性
- **CSS3** - CSS变量、Grid布局、Flexbox、动画
- **JavaScript (ES6)** - 原生JavaScript，无框架依赖
- **Font Awesome** - 图标库
- **Google Fonts** - Inter、Roboto Mono字体

## 📱 页面功能

### 首页 (index.html)
- 导航栏（响应式）
- 英雄区域（动画效果）
- 功能展示卡片
- 资讯预览
- 模型预览
- 完整页脚

### AI资讯 (pages/news.html)
- 分类筛选（研究进展、行业动态、技术应用、政策法规）
- 详细新闻卡片
- 阅读更多/收起功能
- 分页功能
- 邮箱订阅表单

### AI模型 (pages/models.html)
- 模型分类筛选（大语言模型、多模态模型、代码模型、图像模型）
- 国家/地区筛选（美国、中国、其他地区）
- 模型对比表格（支持排序）
- 详细模型介绍卡片
- 模型选择指南

### AI教程 (pages/tutorials.html)
- 学习路径展示
- 教程分类（入门基础、机器学习、深度学习、自然语言处理）
- 热门教程（带进度条）
- AI学习路线图
- 学习社区介绍

## 🌍 国际化支持

- 🇺🇸 **美国模型**：GPT-4、Claude 3、Gemini、Llama 3
- 🇨🇳 **中国模型**：文心一言、通义千问、智谱GLM-4、腾讯混元、昆仑万维天工、月之暗面Kimi、零一万物Yi

## 🚀 快速开始

### 本地预览

1. 克隆项目到本地
```bash
git clone https://github.com/your-username/ai-website.git
cd ai-website
```

2. 使用HTTP服务器预览
```bash
# 使用Python 3
python3 -m http.server 8000

# 或使用Python 2
python -m SimpleHTTPServer 8000

# 或使用Node.js的http-server
npx http-server -p 8000
```

3. 在浏览器中访问
```
http://localhost:8000
```

## 🎨 自定义配置

### 主题颜色

在 `css/style.css` 中修改CSS变量：

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #10b981;
    --dark-color: #1f2937;
    --light-color: #f9fafb;
    /* ... */
}
```

### 内容更新

直接编辑对应的HTML文件即可：
- 首页：`index.html`
- 资讯：`pages/news.html`
- 模型：`pages/models.html`
- 教程：`pages/tutorials.html`

## 📄 部署

### GitHub Pages

1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择源分支（通常为 `main` 或 `master`）
4. 访问 `https://your-username.github.io/ai-website/`

### Netlify

1. 在Netlify中导入GitHub仓库
2. 配置构建设置
3. 自动部署完成

### Vercel

1. 在Vercel中导入GitHub仓库
2. 配置构建设置
3. 自动部署完成

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 LICENSE 文件了解详情

## 👥 联系方式

- Email: contact@aifrontier.com
- GitHub: [项目仓库](https://github.com/your-username/ai-website)

---

**注意**：这是一个演示项目，部分功能（如表单提交）是模拟的，不会实际发送数据。

Made with ❤️ by AI前沿团队
