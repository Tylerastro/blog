---
title: "Threejs Journey 心得"
date: "2025-09-22"
tags:
  - Threejs
  - Frontend
  - Blender
  - R3F
draft: true
preivew: ...
---

- [Overview](#overview)
- [Shaders 著色器](#shaders-著色器)
  - [Vertex Shader 頂點著色器](#vertex-shader-頂點著色器)
    - [Attribute (屬性)](#attribute-屬性)
    - [Uniform (統一變數)](#uniform-統一變數)
    - [Template](#template)
  - [Fragment Shader 片段著色器](#fragment-shader-片段著色器)
    - [片段著色器的工作原理](#片段著色器的工作原理)
    - [紋理（Texture）的應用](#紋理texture的應用)
    - [程式碼精確度 (Precision)](#程式碼精確度-precision)
    - [Template](#template-1)
  - [Practice 實作練習](#practice-實作練習)

# Overview

Threejs一直是我想要學習的技能，不僅可以讓網站變得更活潑，也可以從中搭配Blender練習3D建模的技巧。
這篇文章會記錄我購買[three.js journey](https://threejs-journey.com/)之後學習的筆記，回著重在自己不熟悉，跟踩踏後的經歷。

# Shaders 著色器

**GLSL (OpenGL Shading Language)** 是用來撰寫著色器程式的語言，它直接在 GPU 上執行，負責所有圖形的最終渲染。無論Three.js 或 R3F 等函式庫，底層都依賴著預設的著色器來運作。

當需要實現客製化的效果，例如特殊的幾何變形或材質，你就必須自己撰寫 **Vertex Shader** 和 **Fragment Shader**。

## Vertex Shader 頂點著色器

我們會送很多資料的vertex shader, 像是geometry vertex coords, camera positions等等，Vertex shader會將這些資訊按照我們的邏輯，轉化到畫面上。

**Vertex Shader** 負責處理幾何體的每個頂點。它的主要任務是透過數學運算，將每個頂點的位置、顏色、法向量等資訊，轉換到最終的螢幕座標上。最核心的功能就是設定內建變數 `gl_Position`，它決定了頂點在畫面上的最終位置。

`gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);`

在頂點著色器中，我們主要會用到兩種關鍵的數據類型：`Attribute` 和 `Uniform`，它們都負責從 JavaScript 端傳遞資料給 GPU。

### Attribute (屬性)

`Attribute` 傳輸的是在幾何體的**每個頂點之間都會變化**的數據。它的值對於每個頂點都是獨一無二的，因此它只能在 **Vertex Shader** 中使用。

* **核心用途：** 處理幾何體本身的資訊。最常見的 `Attribute` 便是每個頂點的 **`position` (位置)**、**`uv` (紋理座標)** 和 **`normal` (法向量)**。
* **自訂應用：** 你也可以在 Three.js 的 `BufferGeometry` 中加入自訂的 `Attribute`。例如，為每個頂點設定一個隨機值，並在 Vertex Shader 中使用這個值來讓每個頂點產生不同的位移，從而實現物體表面的不規則抖動效果。

### Uniform (統一變數)

`Uniform` 傳輸的是在整個繪製過程中，對所有頂點和片段**都保持相同**的數據。

* **核心用途：** 傳遞整個網格或場景的通用資訊。例如，Three.js 會自動將用於座標轉換的關鍵矩陣傳輸為 `Uniform`：
    * **`modelMatrix`：** 控制網格本身的位置、旋轉與縮放。
    * **`viewMatrix`：** 應用攝影機的視角與位置。
    * **`projectionMatrix`：** 將 3D 座標轉換為 2D 螢幕座標。
* **自訂應用：** `Uniform` 也是從 JavaScript 控制著色器參數的主要方式。例如透過 `Uniform` 傳遞一個時間變數 `uTime`，讓 Vertex Shader 根據時間來改變頂點位置，實現物體隨風飄動的動畫。

總結來說，`Attribute` 是一張「每個頂點都不同的清單」，而 `Uniform` 則是一個「所有頂點共享的參數設定」。

### Template

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

void main()
{
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
```

## Fragment Shader 片段著色器

**Fragment Shader** 是著色器管線中的最後一個階段。它在頂點著色器執行後才開始工作，主要任務是為幾何體的每個可見**片段 (fragment)** 決定最終的顏色。

### 片段著色器的工作原理

你可以把 **Fragment Shader** 想像成一個著色工廠，它會為每個「像素」（但更精確的說法是「片段」）進行加工，最終產出一個顏色值。

1.  **關鍵輸出：`gl_FragColor`**
    所有 Fragment Shader 程式碼的最終目的，都是要賦值給一個內建變數 `gl_FragColor`。這個變數儲存了該片段的最終顏色，它是一個 `vec4` (四維向量)，分別代表 `(r, g, b, a)`，數值範圍從 `0.0` 到 `1.0`。
    
    * 舉例來說，`gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);` 會讓整個物體顯示為純紅色。

2.  **數據來源**
    Fragment Shader 主要透過兩種方式接收數據：
    
    * **Uniforms (統一變數)**：與 Vertex Shader 相同，`Uniform` 傳遞的是對所有片段都統一、不變的數據。例如，用來傳遞一個 `uColor` 顏色值，或是將 **`sampler2D`** 紋理傳輸進來。
    
    * **Varyings (可變變數)**：`Varying` 是一個非常特別的變數，它專門用來將數據從 **Vertex Shader** 傳遞到 **Fragment Shader**。它最核心的特性是「內插」(interpolated)，會自動將頂點之間的數據進行平滑過渡。例如，如果你在頂點著色器中傳遞 UV 座標或自訂的隨機值，這些值在到達片段著色器時，會自動在兩個頂點之間進行漸變。

### 紋理（Texture）的應用

紋理是 Fragment Shader 最常見也最重要的應用之一。它讓我們可以將一張圖片貼到 3D 物體上。

要實現這個效果，你必須同時使用到 `Uniform` 和 `Varying`：
1.  **Uniform**：首先，透過 `Uniform` 將紋理圖片傳入 Fragment Shader，其類型為 `sampler2D`。
2.  **Varying**：由於 UV 座標是每個頂點獨有的，它們必須先在 Vertex Shader 中以 `Attribute` 讀取，然後透過 `Varying` 傳遞給 Fragment Shader。
3.  **採樣**：在 Fragment Shader 中，我們使用內建函數 `texture2D(...)`，並傳入紋理 (`Uniform`) 和 UV 座標 (`Varying`) 進行**採樣**，即可取得該片段上對應的紋理顏色。

### 程式碼精確度 (Precision)

Fragment Shader 通常在開頭會加上一個精確度設定，例如：
`precision mediump float;`
這行程式碼會決定浮點數計算的精確度。`mediump` 是最常見的選擇，它在效能和精確度之間取得了平衡。如果沒有明確設定，某些設備可能會出現錯誤。

總結來說，**Vertex Shader** 可以想像成骨架，定義物體形狀；而 **Fragment Shader** 則像是皮膚和衣服，負責決定物體最終看起來是什麼樣子。

### Template

```glsl
precision mediump float;

void main()
{
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```


## Practice 實作練習
