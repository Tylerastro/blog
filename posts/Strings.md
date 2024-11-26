---
title: Python Handling Strings
tags:
  - Python
  - String
categories:
  - Notes
date: 2021-08-28 09:17:33
---


在Python處理數字或者print東西的時候，有時需要對於不同type的物件進行轉換，剛好今天在研究多線程的時候看到有不錯的寫法，這裡把一些方式給記錄下來，這篇文章也會同步有英文版在Medium上面。廢話不多說，直接開始！

# 舊式方法: %

這似乎跟以往C的寫法比較相像？因為我沒有寫過C，所以這是根據網路上的說法，而python的確也支援這種寫法。
基本的形式為： `print('Hello %s' % [string])`
- 使用%去表示佔位符(placeholder)
- 格式
  - %s: string 字串
  - %d: decimal 十進制
  - %o: octal 八進制
  - %x: octal 十六進制
  - %e: exponential 次方制
  - %f: floats 浮點數

<!--more-->

{% codeblock %的用法 lang:python %}
a = 1234567
print('a equals %d' % a)
--> a equals 1234567
print('a equals %10d' % a)
--> a equals    1234567

b = 23.7654
print('b equals %.2f' % b)
--> b equals 23.77
print('b equals %.2e' % b)
--> 2.38e+01

print('a equals %.3e and b equals %.1e' % (a,b))
--> a equals 1.235e+06 and b equals 2.4e+01
{% endcodeblock %}

# .format()

不同於舊式，format使用{}為佔位符，使用方法大同小異，但少掉了%，且可以給予變數名稱增強了閱讀性。

{% codeblock format的用法 lang:python %}
a = 1234567
print('a equals {}'.format(a))
--> a equals 1234567
print('a equals {:10d}'.format(a))
--> a equals    1234567

b = 23.7654
print('b equals {:.2f}'.format(b))
--> b equals 23.77
print('b equals {:.2e}'.format(b))
--> 2.38e+01

print('a equals {:.3e} and b equals {:.1e}'.format(a,b))
--> a equals 1.235e+06 and b equals 2.4e+01
{% endcodeblock %}

{% codeblock 使用變數名稱的用法 lang:python %}
print('My name is {name}'.format(name='Tyler'))
{% endcodeblock %}

# f-string

在Python 3.6以上的版本，Python本身提供Fancier Output Formatting。
{% codeblock 使用f-strings的範例 lang:python %}

name = 'Tyler'
age = 24
f"My name is {name} and I'm {age:.2f} years old."
--> "My name is Tyler and I'm 24.00 years old."

Percentage = 0.45
f"The vodka contains at least {Percentage:.1%} of alcohol." 
--> 'The vodka contains at least 45.0% of alcohol.'
{% endcodeblock %}






