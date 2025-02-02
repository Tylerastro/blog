---
title: Loop
date: 2022-02-19 21:53:56
tags:
  - Python
categories:
  - 27 Master Journey
preview: 這是這系列的第二篇文章，第一篇文章[Built-in Functions](https://tylerastro.github.io/2022/01/16/Built-inFunctions/)從Python內建函數開始。
---



> 這是一系列關於我拿到天文碩士學位，我一路所學到的技能，以及我認為必須延伸的技能組的文章，技能主線會保留在Medium上，以中英文方式呈現，而技能支線，會以中文形式在GitHub.io，也就是這裡發表。
> 預計兩邊加起來會有27篇文章，透過這些文章來檢核天文學位帶來給我哪些影響。


這是這系列的第二篇文章，第一篇文章[Built-in Functions](https://tylerastro.github.io/2022/01/16/Built-inFunctions/)從Python內建函數開始。

在Python的語言當中，只有for loop跟while loop。
不像其他語言可能有do-while或者case等迴圈操作。

<!--more-->

# for loop

在for迴圈，這概念比較像是我們已經知道會跑幾次迴圈下，會使用for loop.
比如說：
- 我要電腦寫出99乘法，那我已經知道有81個組合要計算
- 對整個csv檔案寫出每一行值
- 對於迭代物件裡面的值做處理

最常見起手式就是`for i in range()`，因為range會回傳一個迭代物件，裡面就像是計數器一樣(0,1,2,3,4...)，代表著這個迴圈要跑幾次一樣。

```python
# 寫3次Hello world
for i in range(3):
	print("Hello world")
```


舉更常見的例子就是要對物件內的值做迭代處理：

```python
animal = ['horse','turtle','mouse','donkey','lion','dragon']

for i in animal:
	print(i)
```

而如果再做共同開發，其實不僅是協作開發，自己的程式碼也應該寫的explicitly。
什麼叫寫的explicitly呢？ 這其實跟寫作文的風格一樣，風格含有個人的主觀想法，但大方向上應該要有個準則。
在這邊除了個人註解外，在for loop裡面我想要強調的是用i來做變數算是一個習慣(！？)，因為大部分教學裡面都會用i來做變數，就像是我們的笛卡兒座標系一樣，我們習慣用x, y, z來稱呼，或者到大學後會使用i, j, k（i 也有個說法是來表示index。）

簡單或少量的的迴圈這樣處理可能沒問題，但當你要有兩個變數以上時，你的程式碼會越來越難讀，也就是readability會下降。


從下面這例子，你認為哪種方式在下週你回頭看，可以看得比較快呢？
```python
animals = ['horse','turtle','mouse','donkey','lion','dragon']
weights = [83,2,0.4,64,140,999]

# 只使用簡單變數
for i, j in zip(animals,weights):
	print(i,j)

# 明確變數內容
for animal, weight in zip(animals,weights):
	print(animal, weight)
```


另外在資料處理如果有用到pandas，pd.DataFrame()有個內建的iterrows()，如果要對每一列做迭代可以寫成：
`for index, row in df.iterrows():`

如果需要回傳物件的index,我們也可以搭配enumerate()使用
`for index, var in enumerate(['horse','turtle','mouse','donkey','lion','dragon'])`
這樣index就會是0,1,2,3,4,5而var會是裡面的動物名稱。


# while loop

相對於for loop，while loop比較是在一個條件下，不停地迴圈，直到條件達成。
相較於前面知道要跑幾次之下，while是有一個明確的目標底下在跑。

最常見讓迴圈持續不停的方法就是`while True`，由於預設是true，如果沒有特別設計就不會跳出迴圈。


```python
i = 0
while i < 5:
	print("Hello World")
	i = i+1

```



# pass continue 以及 break

這三個語句是Python在迴圈裡面常用的操作，可以讓我們裝沒事，跳過，以及跳出迴圈。

## pass

顧名思義什麼都不做。

可以是往後才要開發，所以先pass，不然程式無法編譯。
可以是本身遇到這個情況就是選擇繼續，而不做任何改變。

```python
animals = ['horse','turtle','mouse','donkey','lion','dragon']

for animal in animals:
    if animal == 'horse':
        print('neigh')
    elif animal == 'turtle':
        pass
    elif animal == 'mouse':
        print('squeak')
    else:
        pass
```

## continue

中文直翻為繼續，但不要與pass搞混了，continue會**跳過**這次迴圈，直接進入下次迴圈。

```python
animals = ['horse','turtle','mouse','donkey','lion','dragon']

for animal in animals:
    if animal == 'horse':
        print('neigh')
    elif animal == 'turtle':
        pass
    elif animal == 'mouse':
        print('squeak')
    elif animal == 'donkey':
        continue
    elif animal == 'lion':
        print('roar~ roar~ roar~')
    elif animal == 'dragon':
        pass

>>>neigh
squeak
roar~ roar~ roar~
```


## break

break會打破迴圈，直接**終止**迴圈。

```python
animals = ['horse','turtle','mouse','donkey','lion','dragon']

for animal in animals:
    if animal == 'horse':
        print('neigh')
    elif animal == 'turtle':
        pass
    elif animal == 'mouse':
        break
    elif animal == 'donkey':
        continue
    elif animal == 'lion':
        print('roar~ roar~ roar~')
    elif animal == 'dragon':
        pass

>>>
neigh
```


# 同場加映CS50 Mario More comfortable

> 小小Teaser提供在這裡，CS50上完之後，會有完整心得文。

在CS50 2021 Week 1的作業就是要用Ｃ寫來表現在馬力歐裡面的方塊。
我的答案裡面使用了兩種loop來達成我的目的，從中也可以比較不同語言當中，迴圈寫法有什麼差別。

![](mario.png)

這次的作業是將使用者輸入一個數字，然後做出類似馬力歐裡面磚塊的圖樣，並且做鏡像。

```c
#include <stdio.h>
#include <cs50.h>

void pyramid(int h)
// building blocks according to height h
{
    for (int i = 1; i <= h; i++)
    {
        // from first layer
        // put space at begining
        int counter = 0;
        while (counter < h && counter < (h - i))
        {
            printf(" ");
            counter++;
        }

        while (counter < h)
        {
            printf("#");
            counter++;
        }
        // finish left part
        printf("  ");
        // being right part
        counter = 0;

        while (counter < i)
        {
            printf("#");
            counter++;
        }
        while (counter < h)
        {
            printf("");
            counter++;
        }
        printf("\n");
    }
}

int main(void)
{
    int height;
    do
    {
        height = get_int("What's the height? ");
    }
    while (height < 1 || height > 8);

    pyramid(height);
}

```


