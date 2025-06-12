# Accordion 元件技術需求規格

## 1. 總覽 (Overview)
本文件定義了一個可折疊/展開的 Accordion UI 元件的技術需求。此元件用於顯示項目列表，每個項目包含標題、日期和詳細內容。使用者可以點擊項目標題來展開或收合其詳細內容。

## 2. 功能需求 (Functional Requirements)
- **FR1**: 元件必須以 Accordion 形式展示資訊，允許使用者展開和收合各個項目。
- **FR2**: 每個 Accordion 項目的標頭（Header）必須同時顯示「標題 (Title)」和「日期 (Date)」。
- **FR3**: 預設情況下，第一個 Accordion 項目應為展開狀態，顯示其內容。
- **FR4**: 同一時間只應有一個 Accordion 項目可以處於展開狀態。當一個項目展開時，其他已展開的項目應自動收合。
- **FR5**: 標題內容可能較長，需要支援多行顯示。
- **FR6**: 內容區域（Content）應具有固定的高度，並限制顯示的行數。超出部分應被隱藏。
- **FR7**: 所有顯示的資料（標題、日期、內容）將從資料庫獲取。HTML 結構需易於動態填入資料。
- **FR8**: 需提供一個基本的 HTML 頁面，包含此 Accordion 功能，以便於獨立測試和未來手動整合至容器頁面。
- **FR9**: 此元件未來將手動套用至 Jinja 模板格式的頁面。

## 3. 設計與視覺需求 (Design and Visual Requirements)
- **DVR1**: 整體外觀需參考 `accordion.png` 圖片。由於無法直接檢視 `accordion.png`，以下 CSS 樣式基於對常見 Accordion 設計和所提供文字描述的理解。實際顏色、邊框、間距等細節可能需要根據圖片進行調整。
- **DVR2**: 項目標頭：
    - 包含左對齊的標題和右對齊的日期。
    - 點擊標頭可切換內容的展開/收合狀態。
    - 當項目展開時，其標頭應有不同的背景色以示區分（參考圖片，活動項目的標頭背景較深）。
- **DVR3**: 項目內容：
    - 預設為收合狀態（第一個項目除外）。
    - 展開時，內容顯示在標頭下方。
    - 元件必須是響應式的 (Responsive Web Design)，在桌面和行動裝置上均能良好顯示。佈局應能適應不同的螢幕寬度。
    - 內容區域具有固定高度，超出內容應被截斷或隱藏。
- **DVR4**: 標題文字過長時應能自動換行。
- **DVR5**: 每個項目應有清晰的邊界。

## 4. HTML 結構 (HTML Structure)
以下為建議的 HTML 結構。此結構設計考慮了 Jinja 模板的整合性。

```html
<div class="accordion-container">
    <!-- 單個 Accordion 項目 (可由 Jinja 循環產生) -->
    <div class="accordion-item">
        <div class="accordion-header">
            <span class="accordion-title">這是第一個標題，這個標題可能會非常長，長到需要換行顯示才能完整呈現所有文字內容。</span>
            <span class="accordion-date">2023-10-26</span>
        </div>
        <div class="accordion-content">
            <p>這是第一個項目的內容。這段內容將會被限制在一個固定的高度內，如果內容過多，超出的部分將會被隱藏起來，以保持版面的整潔。</p>
            <p>更多內容行...</p>
            <p>更多內容行...</p>
            <p>更多內容行...</p>
            <p>更多內容行...</p>
        </div>
    </div>

    <div class="accordion-item">
        <div class="accordion-header">
            <span class="accordion-title">第二個項目的標題</span>
            <span class="accordion-date">2023-10-25</span>
        </div>
        <div class="accordion-content">
            <p>這是第二個項目的詳細內容。同樣地，這裡的內容也會受到固定高度的限制。</p>
        </div>
    </div>

    <div class="accordion-item">
        <div class="accordion-header">
            <span class="accordion-title">第三個標題</span>
            <span class="accordion-date">2023-10-24</span>
        </div>
        <div class="accordion-content">
            <p>這是第三個項目的內容。</p>
        </div>
    </div>
</div>
```

## 5. CSS 樣式 (CSS Styling)
以下為建議的 CSS 樣式，用於實現設計需求。

```css
body {
    font-family: Arial, sans-serif;
    margin: 20px;
    background-color: #f4f4f4;
}

.accordion-container {
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden; /* For rounded corners on items */
}

.accordion-item {
    border-bottom: 1px solid #ccc;
}

.accordion-item:last-child {
    border-bottom: none;
}

.accordion-header {
    background-color: #f9f9f9; /* Light background for non-active */
    padding: 15px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: flex-start; /* Align items to top for multi-line title */
    border-bottom: 1px solid transparent; /* Placeholder for active border or consistency */
}

.accordion-header:hover {
    background-color: #efefef;
}

.accordion-title {
    font-weight: bold;
    color: #333;
    margin-right: 15px; /* Space between title and date */
    flex-grow: 1; /* Allow title to take available space */
    line-height: 1.4; /* Adjust for better multi-line spacing */
}

.accordion-date {
    font-size: 0.9em;
    color: #666;
    white-space: nowrap; /* Prevent date from wrapping */
    padding-top: 2px; /* Minor adjustment to align better with first line of title, if needed */
}

.accordion-content {
    padding: 0 15px; /* Horizontal padding always, vertical padding applied when open */
    background-color: #fff;
    max-height: 0; /* Initially hidden */
    overflow: hidden;
    transition: max-height 0.3s ease-out, padding-top 0.3s ease-out, padding-bottom 0.3s ease-out;
    border-top: 1px solid #e0e0e0; /* Separator line as in image */
}

.accordion-content p {
    margin: 0 0 10px 0;
    line-height: 1.6;
}
.accordion-content p:last-child {
    margin-bottom: 0;
}

/* Active state for accordion item */
.accordion-item.active .accordion-header {
    background-color: #e0e0e0; /* Darker background for active header */
}

.accordion-item.active .accordion-content {
    /* FR6: Fixed height for content. Adjust '120px' as needed. */
    /* This value represents the height of the content area itself. */
    /* Example: If a line is ~20px high and you want to show 5 lines, content height = 100px. */
    /* The 'max-height' here should be that desired content height. */
    max-height: 120px; /* Example: for approx 5-6 lines. ADJUST THIS VALUE. */
    padding-top: 15px;
    padding-bottom: 15px;
}

/* RWD Adjustments */
@media (max-width: 768px) { /* Tablet and larger mobile */
    body {
        margin: 10px; /* Reduce body margin for smaller screens */
    }
    .accordion-header {
        padding: 12px 10px; /* Adjust padding */
    }
    .accordion-content {
        /* Horizontal padding for non-active state, vertical padding is 0 */
        padding: 0 10px;
    }
    .accordion-item.active .accordion-content {
        padding-top: 12px;
        padding-bottom: 12px;
        /* If font sizes were made responsive, this max-height might also need adjustment
           to maintain the same number of visible lines. */
    }
}

@media (max-width: 480px) { /* Smaller mobile */
    .accordion-header {
        padding: 10px 8px; /* Further reduce padding */
    }
    .accordion-content {
        padding: 0 8px;
    }
     .accordion-item.active .accordion-content {
        padding-top: 10px;
        padding-bottom: 10px;
    }
}
```
**關於內容高度 (FR6) 的注意事項:**
`.accordion-item.active .accordion-content` 中的 `max-height` 應根據您希望顯示的固定行數進行調整。例如，如果一行文字大約 20px 高，您希望顯示 5 行，那麼內容區域的高度（不包括上下 `padding`）應為 100px。此處的 `max-height: 120px;` 是一個示例值，請務必根據實際需求調整。`overflow: hidden;` 將確保超出此高度的內容被隱藏。

## 6. JavaScript 行為 (JavaScript Behavior)
以下 JavaScript 程式碼用於控制 Accordion 的行為。

```javascript
document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');

    // Function to close all items
    function closeAllItems() {
        accordionItems.forEach(item => {
            item.classList.remove('active');
            // CSS will handle resetting max-height when 'active' class is removed
        });
    }

    accordionItems.forEach((item, index) => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', function () {
            const wasActive = item.classList.contains('active'); // Check state *before* closing all

            // FR4: Close all items first
            closeAllItems();

            if (!wasActive) {
                // If it wasn't active before, open it now
                item.classList.add('active');
            }
            // If it *was* active, it's now closed by closeAllItems(), and we don't re-open it.
            // This means clicking an open item closes it.
        });

        // FR3: Open the first item by default
        if (index === 0) {
            item.classList.add('active');
            // The 'active' class in CSS will set the appropriate max-height for the content
        }
    });
});
```

## 7. 資料整合 (Data Integration)
- **DI1**: Accordion 的所有內容（標題、日期、詳細說明）均來自後端資料庫。
- **DI2**: 提供的 HTML 結構是靜態範例。在實際應用中，`.accordion-item` 元素及其內部內容將由伺服器端模板引擎（如 Jinja）根據從資料庫查詢到的資料動態生成。

   **Jinja 模板範例片段:**
   ```jinja
   <div class="accordion-container">
       {% for item in items_from_database %}
       <div class="accordion-item">
           <div class="accordion-header">
               <span class="accordion-title">{{ item.title }}</span>
               <span class="accordion-date">{{ item.date_str }}</span> {# Assuming date is formatted as string #}
           </div>
           <div class="accordion-content">
               <p>{{ item.content_text_or_html | safe }}</p> {# Use |safe if content contains HTML #}
           </div>
       </div>
       {% endfor %}
   </div>
   ```

## 8. 測試頁面 (Test Page)
將提供一個 `accordion_test.html` 檔案（如下方範例所示），其中包含上述 HTML 結構、CSS 樣式（嵌入於 `<style>` 標籤內）和 JavaScript 邏輯（嵌入於 `<script>` 標籤內）。此頁面可用於：
- 獨立測試 Accordion 的功能和外觀。
- 作為將此元件整合到現有 Jinja 頁面時的參考。

**`accordion_test.html` 內容範例:**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accordion Test Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
        }
        .accordion-container {
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid #ccc;
            border-radius: 4px;
            overflow: hidden;
        }
        .accordion-item {
            border-bottom: 1px solid #ccc;
        }
        .accordion-item:last-child {
            border-bottom: none;
        }
        .accordion-header {
            background-color: #f9f9f9;
            padding: 15px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 1px solid transparent;
        }
        .accordion-header:hover {
            background-color: #efefef;
        }
        .accordion-title {
            font-weight: bold;
            color: #333;
            margin-right: 15px;
            flex-grow: 1;
            line-height: 1.4;
        }
        .accordion-date {
            font-size: 0.9em;
            color: #666;
            white-space: nowrap;
            padding-top: 2px;
        }
        .accordion-content {
            padding: 0 15px;
            background-color: #fff;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out, padding-top 0.3s ease-out, padding-bottom 0.3s ease-out;
            border-top: 1px solid #e0e0e0;
        }
        .accordion-content p {
            margin: 0 0 10px 0;
            line-height: 1.6;
        }
        .accordion-content p:last-child {
            margin-bottom: 0;
        }
        .accordion-item.active .accordion-header {
            background-color: #e0e0e0;
        }
        .accordion-item.active .accordion-content {
            max-height: 120px; /* 請調整此值以符合固定行數需求 */
            padding-top: 15px;
            padding-bottom: 15px;
        }
    </style>
</head>
<body>

    <h1>Accordion 功能測試</h1>

    <div class="accordion-container">
        <div class="accordion-item">
            <div class="accordion-header">
                <span class="accordion-title">這是第一個標題，這個標題可能會非常長，長到需要換行顯示才能完整呈現所有文字內容，確保它能正確地換行。</span>
                <span class="accordion-date">2023-10-26</span>
            </div>
            <div class="accordion-content">
                <p>這是第一個項目的內容。這段內容將會被限制在一個固定的高度內，如果內容過多，超出的部分將會被隱藏起來，以保持版面的整潔。</p>
                <p>這是第二行內容。</p>
                <p>這是第三行內容。</p>
                <p>這是第四行內容。</p>
                <p>這是第五行內容。</p>
                <p>這是第六行內容，如果 max-height 設定正確，此行應部分或完全隱藏。</p>
            </div>
        </div>

        <div class="accordion-item">
            <div class="accordion-header">
                <span class="accordion-title">第二個項目的標題</span>
                <span class="accordion-date">2023-10-25</span>
            </div>
            <div class="accordion-content">
                <p>這是第二個項目的詳細內容。同樣地，這裡的內容也會受到固定高度的限制。</p>
                <p>多一行看看。</p>
                <p>再多一行。</p>
                <p>再多一行。</p>
                <p>再多一行。</p>
                <p>再多一行，測試是否會超出高度。</p>
            </div>
        </div>

        <div class="accordion-item">
            <div class="accordion-header">
                <span class="accordion-title">第三個標題，這是一個比較短的標題。</span>
                <span class="accordion-date">2023-10-24</span>
            </div>
            <div class="accordion-content">
                <p>這是第三個項目的內容。</p>
                <p>只有一行。</p>
            </div>
        </div>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', function () {
        const accordionItems = document.querySelectorAll('.accordion-item');

        function closeAllItems() {
            accordionItems.forEach(item => {
                item.classList.remove('active');
            });
        }

        accordionItems.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');

            header.addEventListener('click', function () {
                const wasActive = item.classList.contains('active');
                closeAllItems();
                if (!wasActive) {
                    item.classList.add('active');
                }
            });

            if (index === 0) {
                item.classList.add('active');
            }
        });
    });
    </script>

</body>
</html>
```

## 9. Jinja 整合注意事項 (Jinja Integration Notes)
- **JINJA1**: HTML 結構中的 `.accordion-item` 及其內容應使用 Jinja 的 `for` 迴圈進行迭代生成，數據源自後端傳遞的列表。
- **JINJA2**: 標題 (`{{ item.title }}`), 日期 (`{{ item.date_str }}`), 和內容 (`{{ item.content_text_or_html }}`) 應使用 Jinja 變數替換。
- **JINJA3**: 如果內容 (`item.content_text_or_html`) 包含 HTML 標籤且需要被渲染，應使用 `| safe` 過濾器 (例如 `{{ item.content_text_or_html | safe }}`) 以正確渲染 HTML。若內容為純文字，則不需要 `| safe`。
- **JINJA4**: CSS 和 JavaScript 可以作為靜態資源引入，或者根據專案結構嵌入到 Jinja 模板中。建議將 CSS 和 JavaScript 外部化到單獨的檔案中，以便於管理和快取。