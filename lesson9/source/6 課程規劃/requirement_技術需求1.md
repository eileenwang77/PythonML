# 技術需求文檔 - 卡片網格組件

## 概述
實現一個可重用的卡片網格組件，用於展示職能發展學院的課程或內容信息。組件包含多個水平排列的卡片，每個卡片包含圖標、標題和描述文字。

## 功能需求

### 基本功能
- **卡片網格展示**：以網格形式展示多個卡片
- **響應式佈局**：自動適應不同螢幕尺寸
- **動態內容**：支援 Jinja2 模板動態渲染
- **可重用性**：可在不同頁面中重複使用

### 卡片內容結構
每個卡片包含：
- **圖標**：32x32px 的 SVG 圖標
- **標題**：主要標題文字
- **描述**：詳細說明文字

## 視覺設計規範

### 整體容器
- **最大寬度**：1200px
- **內距**：64px（上下左右）
- **背景色**：#FFFFFF（白色）
- **卡片間距**：64px（水平間距）
- **容器間距**：48px（垂直間距）

### 卡片設計
#### 卡片尺寸
- **桌機版寬度**：301.33px（固定寬度）
- **高度**：自適應內容
- **內部間距**：24px（圖標與文字間距）

#### 圖標規範
- **尺寸**：32x32px
- **格式**：SVG
- **顏色**：#1E1E1E（深灰色）
- **描邊寬度**：3px
- **位置**：卡片左側

#### 文字樣式
##### 標題文字
- **字體**：Inter
- **字重**：600（Semi-bold）
- **字體大小**：24px
- **行高**：1.2em
- **字間距**：-2%
- **顏色**：#1E1E1E（深灰色）
- **對齊**：左對齊

##### 描述文字
- **字體**：Inter
- **字重**：400（Regular）
- **字體大小**：16px
- **行高**：1.4em
- **顏色**：#757575（中灰色）
- **對齊**：左對齊
- **與標題間距**：8px

## 響應式設計需求

### 桌機版 (≥1200px)
- 容器寬度：1200px
- 每行顯示：3-4 個卡片
- 卡片寬度：301.33px（固定）
- 內距：64px

### 平板版 (768px - 1199px)
- 容器寬度：100%
- 每行顯示：2-3 個卡片
- 卡片寬度：自適應（flex-grow）
- 內距：48px
- 卡片間距：48px

### 手機版 (<768px)
- 容器寬度：100%
- 每行顯示：1 個卡片
- 卡片寬度：100%
- 內距：24px
- 卡片間距：32px
- 標題字體大小：20px
- 描述字體大小：14px

## Jinja2 模板結構

### 資料結構需求
```python
cards_data = [
    {
        'icon': 'icon-name.svg',  # SVG 圖標檔名
        'title': '卡片標題',
        'description': '卡片描述文字內容...'
    },
    # 更多卡片資料...
]
```

### 模板變數
- `cards`: 卡片資料列表
- `container_class`: 容器額外 CSS 類別（可選）
- `card_limit`: 卡片顯示數量限制（可選）

## HTML 結構

### 基本結構
```html
<div class="card-grid-container">
  <div class="cards-wrapper">
    {% for card in cards %}
    <div class="card-item">
      <div class="card-icon">
        <svg class="icon">
          <!-- SVG 內容 -->
        </svg>
      </div>
      <div class="card-content">
        <div class="card-text">
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-description">{{ card.description }}</p>
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>
```

## CSS 關鍵實現

### 容器佈局
```css
.card-grid-container {
  max-width: 1200px;
  padding: 64px;
  background: #FFFFFF;
}

.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 64px;
  align-items: flex-start;
}
```

### 卡片樣式
```css
.card-item {
  display: flex;
  gap: 24px;
  flex: 0 0 301.33px;
  align-items: flex-start;
}

.card-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

## JavaScript 功能（可選）

### 動態載入
- 支援 AJAX 動態載入更多卡片
- 分頁或無限滾動功能

### 互動效果
- 卡片 hover 效果
- 點擊卡片展開詳細內容
- 圖標動畫效果

## 瀏覽器支援
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## 無障礙設計
- 語義化 HTML 結構
- 適當的 ARIA 標籤
- 鍵盤導航支援
- 充足的顏色對比度（標題：14.57:1，描述：4.51:1）
- 支援螢幕閱讀器

## 效能要求
- CSS 檔案大小 < 8KB
- 圖標 SVG 優化（每個 < 2KB）
- 首次載入時間 < 200ms
- 支援圖片懶載入

## SEO 考量
- 使用語義化 HTML 標籤（h3, p）
- 圖標包含適當的 alt 屬性
- 結構化資料標記（JSON-LD）

## 測試需求
- 跨瀏覽器相容性測試
- 響應式設計測試（多種裝置尺寸）
- 無障礙功能測試
- 效能測試
- Jinja2 模板渲染測試

## 部署注意事項
- SVG 圖標檔案路徑配置
- CSS 檔案快取策略
- 圖片 CDN 整合
- 模板快取設定

## 備註
- 此組件設計為可重用的模板片段
- 支援在不同頁面中通過 Jinja2 include 引用
- 卡片數量可通過模板變數動態控制
- 圖標系統需要統一的 SVG 圖標庫
- 建議實現卡片骨架屏效果以改善載入體驗