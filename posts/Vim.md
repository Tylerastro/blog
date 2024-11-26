---
title: Vim
tags:
  - Text Editor
categories:
  - Notes
date: 2021-12-24 12:09:16
---



在不同電腦上所安裝的Text Editor或者code editor, 亦或是IDE 都不盡相同，如果是要在別人電腦或者是伺服器管理員，如果要多方管理，選擇使用預設安裝的編輯器就會方便許多。Vim是很多系統上原有的文字編輯器，透過`vim file_name`可以快速編輯內容，然而vim的學習成本並不低，直接有一張cheetsheet也無法直接幫助沒基礎的人，這些原因催促了這篇文章來快速上手。

# What/Why is Vim

Vim 是一種文字編輯器，就像是你打開電腦使用的記事本、leafpad、或者是TextEdit，但是Vim強調的是解放雙手，讓雙手可以維持在鍵盤上，保持輸出的狀態。
我是對維持在鍵盤上保持保留態度，畢竟在打code時，很多時間是思考跟查資料，這些動作都會離開Vim的環境裡，對我而言他最大的好處是在於有大量的快捷鍵，可以大量處理相同動作，對於格式化一份文件特別有用。

第二點是可以在終端機裡面快速完成修改，大部分時間會在VSCode工作，但如果是連伺服器等狀況，在只有CLI情況下，總不能每次都修修改改然後上傳覆蓋，這樣效率太低了。尤其是在做輕量修改時，還要打開編輯器，其實花費時間更多。這種情況下在終端機裡面使用Vim就比較合宜。

<!--more-->

# 常用操作

>還記得自己第一次使用時，是在完全不懂的情況下，跟著網路上指令開啟檔案，造就了自己不知道如何離開，一直被困在Vim的窘境😂

## 檔案開啟與關閉

開啟檔案： `vim path_to_file` 就會進入到編輯頁面，如果檔案不存在，會主動建立一個相同檔名的檔案。
要注意的是當開啟時，使用者是在**指令模式**，此時無論如何打字都不會出現在螢幕上，只有游標會隨著指令移動。

當時的我就很慌亂，想著要如何離開這個鬼地方，要結束vim環境，需要輸入指令`:q`離開
但如果檔案已經被修改到，又會跳出`E37: No write since last change (add ! to override)`

![](vim.png)


![](q.png)

真的慌了我的媽呀，不小心把文件改掉還離不開，後來才發現，原來vim裡面要存檔離開，不存檔離開有好多種指令方式

- 離開 `:q`
- 不存檔，強制離開： `:q!`
- 存檔：`:w`
- 強制存檔：`:w!`
- 另存新檔：`:w new_file_name`
- 存檔離開：`:wq`
- 有更改存檔離開，無改變直接離開：`ZZ`

## 寫入檔案

當我們需要寫入資料時，可以輸入`i`，進入**插入模式**，在插入模式就會比較是平常打開文字編輯器的操作，輸入什麼就會顯示在上面，然後自由換行等操作。
然而進入輸入模式方法有很多種，離開則只需要Esc。

- 在游標之前進入輸入模式：`i`
- 在游標之後進入輸入模式：`a`
- 在游標下面新增一行進入輸入模式：`o`
- 在游標上面新增一行進入輸入模式：`o`
- 刪除當前文字並進入輸入模式：`s`
- 刪除當前行並進入輸入模式：`S`

> 當不同模式切換時，底下都會顯示目前正在處於什麼模式當中。



## 移動游標

當然不可能每次都進入插入模式然後才移動游標，或者靠著滑鼠移動之後才進入插入模式，這邊我們得學習如何快速的移動游標，達到解放滑鼠的功能

### 段落移動

- 上：`k`
- 下：`j`
- 左：`h`
- 右：`l`
- 檔案開頭：`gg`
- 檔案結尾：`G`
- 置中文件：`zz`
- 頁面開頭：`H`
- 頁面中間：`M`
- 頁面結尾：`L`
- 往下移動n行：`n + Enter`

![段落移動](para.gif)


### 行間移動

- 句首：`^`
- 句首：`0`
- 句尾：`$`
- 到特定字母前：`t + 字母`
- 到特定字母上：`f + 字母`
- 往後移動一個詞：`w`
- 往前移動一個詞：`b`
- 到括號另一端：`%`

![句首差別](move_around.gif)

> 在單行裡面移動有很多種方式，像是句首就有兩種分別，要達成`^`也可以使用`0`＋`w`，也會到達第一個字 



# 進階操作

在基本操作熟悉後，大致上在vim裡面已經暢行無阻，至少不會卡住動彈不得🤣<br>
但熟悉上面的操作只能帶給你到與一般編輯器一樣的功能而已，並沒有加強我們的編寫速度，所以進階班要開課囉！

## 組合鍵

還熟悉我們基本指令的話，就會發現我要移動游標一次一行有點慢，或者我要刪除我的code一次只能`dd`一行，此時組合鍵就能派上用場。<br>
假設我要往下移動5行，可以輸入`5j`，要刪除10行，輸入`10dd`，要增加7行，輸入`7o`等等。

## 移動段落

熟悉組合鍵之後，我們要在程式碼之間更快速的移動，使用`{}`可以一次移動一個段落，通常是以一個function來移動，不過這會根據你使用的程式語言而有所不同。

## 編輯內容

### 更改內容

在基礎篇，我們只談到如何進入插入模式，如果要改變括號裡的內容，或者一個變數，而這個變數很長時，我們有更快的做法。<br>
要改變變數，我們可以使用`c`，加上`w`或`b`，改變下一個或上一個詞。

![change word](cw.gif)

然而很多時候不是要改變變數，而是要改變method之類，括號中的內容，`ci[`或者`ci{`，看你使用的是哪種括號。<br>
也可以刪除段落，使用`d{`。
使用`C` 可以更改游標後的所有內容。

### 更快的移動

在使用`{}`以及`t`和`f`後，我們已經可以快速的移動，但如果要找尋第二次出現，可以使用`;`在`t`和`f`之後。

## Macros

如果要重複同一動作，寫一套巨集來重複使用是很好的方式。
要開啟錄製巨集，`q`+要儲存的按鍵，假設我要儲存在b，我就輸入`qb`，就會開始錄製接下來的內容，再輸入一次`q`結束錄製。<br>
接下來要使用只要輸入@b，就會操作剛剛錄製的內容，假設要使用10次，`10@b`就會幫你重複10次，這功能在格式化你的內容時非常好用。


## 搜尋與取代

在一般編輯器常常看到有取代，在vim裡面我們必須使用command形式。
這些指令並不好記，我會喜歡用macros，自己寫巨集方式來處理。

這邊可以參考：[Search and Replace](https://vim.fandom.com/wiki/Search_and_replace)

```
:s/foo/bar/g
Find each occurrence of 'foo' (in the current line only), and replace it with 'bar'.

:%s/foo/bar/g
Find each occurrence of 'foo' (in all lines), and replace it with 'bar'.

:%s/foo/bar/gc
Change each 'foo' to 'bar', but ask for confirmation first.

:%s/\<foo\>/bar/gc
Change only whole words exactly matching 'foo' to 'bar'; ask for confirmation.

:%s/foo/bar/gci
Change each 'foo' (case insensitive due to the i flag) to 'bar'; ask for confirmation.
:%s/foo\c/bar/gc is the same because \c makes the search case insensitive.
This may be wanted after using :set noignorecase to make searches case sensitive (the default).

:%s/foo/bar/gcI
Change each 'foo' (case sensitive due to the I flag) to 'bar'; ask for confirmation.

:%s/foo\C/bar/gc is the same because \C makes the search case sensitive.
This may be wanted after using :set ignorecase to make searches case insensitive.

```


# 小結

使用Vim在各個平台上可以更快速的編輯，也可以使用巨集達到重複性的功能。學習成本雖然高一些，不過使用下來在某些場合的確派得上用場，而且可以不用滑鼠快速的修改，整個就是帥。😎





# References

[Wiki 原始碼編輯器](https://zh.wikipedia.org/zh-tw/源代码编辑器)
[鳥哥的Linux私房菜](http://linux.vbird.org/linux_basic/0310vi.php)
[Vim tutorial](https://www.youtube.com/watch?v=IiwGbcd8S7I&list=WL&index=29&t=2592s)
[wellle/targets.vim](https://github.com/wellle/targets.vim)
[Search and Replace](https://vim.fandom.com/wiki/Search_and_replace)
