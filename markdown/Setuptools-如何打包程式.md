---
title: 從寫Package到打包上傳PYPI
tags:
  - Python
categories:
  - Notes
date: 2021-07-31 16:33:19
preview: 為了讓後面流程順暢，我們先把需要的套件先安裝好，並且在[PYPI](https://pypi.org)以及[TestPYPI](https://test.pypi.org)申請帳號，等等上傳package到兩個網站上面
---


# Prerequisites

為了讓後面流程順暢，我們先把需要的套件先安裝好，並且在[PYPI](https://pypi.org)以及[TestPYPI](https://test.pypi.org)申請帳號，等等上傳package到兩個網站上面



```bash
pip install twine
pip install --upgrade setuptools
pip install build
```

<!--more-->

# 如何寫一個Package

Python有一定的package格式，我們舉簡單的例子
在你的package底下，會先有README.md以及setup.py，README.md是MarkDown格式寫下的文件，是GitHub上常見的手冊
setup.py我們在底下給一個範本，等下會使用setuptools夠過這個setup.py產出package封包，以便發布至PYPI。我們也需要一個pyproject.toml來告訴setuptools我們要用setuptools來建構這個package。

在main裡，放著就是主要package的內容，我這邊只有一個scripts.py來作為範例，而裡面的__init__.py會讓資料夾被python讀成是一個package，所以一定要產生一個__init__.py放在裡面，內容可以為空就好。

```bash
My project
	|_____setup.py
	|_____pyproject.toml
	|_____README.md
	|_____main
		   |_____scripts.py
		   |_____ __init__.py
```


```python
from setuptools import setup
setup(name='mypackage',
version='0.1',
description='This is my first package',
url='#',                			# your GitHub page or any description page can be included here
author='Tyler',
author_email='author@email.com',
license='MIT',
packages=['main']) 
```

在此刻你已經可以使用`python setup.py install`來做local全域安裝，也就是在python裡，你可以隨時做import，就如同import numpy as np一樣。

---

接下來就是要把你的程式寫成封包上傳，`python -m build`
就會產生相對應的封包e.g., .whl, .gz, .tar，到這一步就準備要上傳啦～

把封包上傳至TestPYPI
`python -m twine upload --repository-url https://test.pypi.org/legacy/ dist/*`
或者上傳至PYPI
`python -m twine upload dist/*`


# 實戰演練

實作一個摩斯密碼翻譯的package，在main底下，有__init__.py以及MorseDecode.py，也是主要功能的來源

![Files](Folder.png)

那我們在setup.py裡面設定如下，然後__init__.py保持空白


```python
from setuptools import setup
import setuptools

with open("README.md", "r") as rm:   # 使用GitHub的README檔案來當作PYPI上的Description
    long_description = rm.read()


setup(name='Morse Translator',    # 你的package名稱
version='0.1',				   # 版本序號
description='Trivial Package Testing',   #簡單敘述
url='https://github.com/Tylerastro/MorseCode',
long_description=long_description,              # 敘述本文，我使用上方導入的MD file
long_description_content_type="text/markdown",  # 告訴setup使用的是MarkDown語法
entry_points = {						 # 讓package可以直接call main的階段 --> 見reference
    "console_scripts": [					 # 我希望我可以直接在terminal call morse而不是python morse.py
        "morse = main.MorseDecode:main",
        ]
    },
author='Tylerastro',						# 作者資訊
python_requires='>=3',					# Python版本
classifiers=[							# PYPI上的分類，可以見https://pypi.org/classifiers/
	'Development Status :: 2 - Pre-Alpha'
	],
license='MIT',
packages= setuptools.find_packages())
```

我們在terminal輸入`python -m build`

在路徑下會產生對應的dist跟egg資料夾

![build](build.png)

之後我們在terminal輸入`python -m twine upload dist/*`上傳至PYPI上面，同時也會要求我們輸入使用者名稱與密碼。隨後就會看到上傳完成的訊息。

![upload](upload.png)

我們就可以在PYPI上看到我們的專案囉！

[本次專案網址](https://pypi.org/project/Morse-Translator/0.1/)

---

我們可以試著嘗試安裝回來使用看看，在terminal輸入`pip install Morse-Translator==0.1`

![result](result.png)

的確！我們安裝成功了，程式也可以運作。
如果往後要更新，記得把原本的dist以及egg資料夾刪除，並且更新setup.py裡面的版本，再重新做build以及上傳，因為PYPI不允許覆蓋更新。


# Reference:

https://medium.com/資工筆記/打包python-module-到pypi-上-aef1f73e1774
https://setuptools.readthedocs.io/en/latest/userguide/quickstart.html
https://www.freecodecamp.org/news/build-your-first-python-package/
https://www.tutorialsteacher.com/python/main-in-python
https://stackoverflow.com/questions/27784271/how-can-i-use-setuptools-to-generate-a-console-scripts-entry-point-which-calls