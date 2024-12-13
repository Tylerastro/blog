---
title: What are *args and **kwargs?
tags:
  - Python
categories:
  - Notes
date: 2021-10-04 12:45:58
---


第一次看到\*args和\*\*kwargs是在使用matplotlib時候，參考方法(method)所看到的，當時還不懂這所代表的意義，但在後面畫圖過程，的確發現一些不在document裡面的參數，可以透過給予Keyword Argument的方法進行細部的調整。當下察覺到，或許文件給的\*\*kwargs代表的就是可以給這些細部參數。

![](kwargs.png)

<!--more-->

之後在地質所做RA時，因為需要寫一套程式幫助資料處理，需要從yaml寫入地質材料代碼，在stackoverflow爬完文後，決定使用class搭配dict的方式寫入。當下一直在想要如何把字典的結構轉化成class的形式，所以可以很直覺的使用config.Tex, config.plot等來增加程式碼可讀性。

這時候問題就來了，這邊的\*\*到底是什麼意思呢？很明顯的kwargs或者args並不是寫死的，而是\*以及\*\*這兩個operator在作用。

{% codeblock Attribute Dictionary lang:python %}

class AttrDict:

    def __init__(self, **entries):
        self.__dict__.update(entries)

{% endcodeblock %}

# What do \* and \*\* do?

從[What does \*\* (double star/asterisk) and \* (star/asterisk) do for parameters?](https://stackoverflow.com/questions/36901/what-does-double-star-asterisk-and-star-asterisk-do-for-parameters)來看，stack overflow上已經有問過很多次類似問題，也算是很常見的問題。
從幾個想法來切入，就可以了解*和**的使用時機了。

## 不確定我的function要有幾個argument時

以簡單的加法為例，add的寫法只能對兩個輸入進行加法運算，但如果我有10個數字要相加，難道我要輸入9次嗎？我當然會想要一次輸入，然後回傳加總值。

{% codeblock Addition lang:python %}

def add(a,b):
    return a+b

{% endcodeblock %}


這時候就需要仰賴\*args的寫法，為了將屬性了解得更明白，我們再加上`print(type(args))`和`print(args)`來看將args帶入function，他們到底以什麼形式存在。
很明顯的使用\*args，會把所有參數寫成是一個tuple，但注意，這邊所指的是non-keyword argument，也就是不是帶入add(a=1,b=2)，帶有keyword的參數。

因為是tuple的形式，他在function裡面可以進行迭代，這樣可以在不確定有幾個arguments底下，把所有arguments讀進來。

{% codeblock Addition lang:python %}

def add(*args):
    print(type(args))  -->  <class 'tuple'>
    print(args)        -->  (2, 3, 4)
    return sum(args)

{% endcodeblock %}


假設今天在上課分組，三人為一組，有兩人已經找好了，那第三人所湊成的組合是長怎樣？
透過group，我們可以把第三人的排列組合寫出來，這邊要注意的是arguments在function裡面的順序。

>這邊的原因在於有default值的參數必須放在後面，以程式來寫，`def group(a = 'Lisa', b )`的寫法會得到<font color=#FF0000> SyntaxError</font> non-default argument follows default argument，正確寫法要把兩者顛倒過來`def group(b, a = 'Lisa')`

如果對於f-string還不熟悉，可以參考我之前所寫的[Python Handling Strings](https://tylerastro.github.io/2021/08/28/Strings/)

{% codeblock Grouping lang:python %}

def group(*args, a = 'Lisa', b = 'Jessie'):
    for name in args:
        print(f'{a}, {b} and {name}')

{% endcodeblock %}

```
group('Tyler','Ken','Siri')

Lisa, Jessie and Tyler
Lisa, Jessie and Ken
Lisa, Jessie and Siri
```


## 針對keyword arguments做unpacking

{% codeblock Grouping lang:python %}

def icecream(**kwargs):
    if kwargs['cone']:
        print(f'Here is your {kwargs["flavour"]} icecream with a honey cone')
    else:
        print(f'Here is your {kwargs["flavour"]} icecream in cup')

{% endcodeblock %}

```
icecream(flavour = 'chocolate',cone=False)

--> Here is your chocolate icecream in cup

icecream(flavour = 'vanilla',cone=True)

--> Here is your vanilla icecream with a honey cone
```

看一下上面賣冰淇淋的範例，其實我們就知道同樣身為unpacking operator的\*和\*\*，差別只有在對於positional argument轉成tuple形式或者將keyword argument做成字典形式，針對不同樣的情形，可以把兩者合併在一個function裡面。


# How did it help my class function?

再度回到我最原始的初衷，利用class來快速呼叫我的設定值字典。

{% codeblock Attribute Dictionary lang:python %}

class AttrDict:
    def __init__(self, **entries):
        self.__dict__.update(entries)

{% endcodeblock %}



```
looking = AttrDict(cool='Yes',handsome='No')

looking.cool  --> 'Yes'
```

或者帶入字典

```
person = dict(cool='Yes',handsome='No')
looking = AttrDict(person)

looking.cool  --> 'Yes'
```

















