---
title: 'Django + Docker -> Deployment with Nginx, Gunicorn and PostgreSQL'
tags:
  - Django
  - Docker
  - Deployment
  - Web Development
categories:
  - Notes
date: 2023-07-03 21:15:13
---



## 前言

想像天文事件都是一瞬間發生的，像是Blackhole merger, Supernova, flare events and so on. 這些事件的紀錄都是很難能可貴的資料，若是要完整紀錄更是稀有，我們只能在接到通知後盡量去做follow-up observation。此時若有個系統可以接收並且立刻發送到各個天文台，那麼這些難能可貴的現象我們就可以進一步了解。

[TOM](https://tom-toolkit.readthedocs.io/en/stable/)就是為了處理這些目標與觀測的平台，藉由Python知名的Django框架來做處理。這篇文章目標涵蓋從寫HTML的模板開始，藉由Django架設測試用伺服器，接著利用Docker把整個打包起來放到伺服器上運行。

<!--more-->

## HTML 模板

本身並非做設計或CS出身，這部分我都是藉由[Mimo](https://play.google.com/store/apps/details?id=com.getmimo&hl=zh_TW&gl=US)以及Youtube來做學習網頁開發。我一直認為學習程式都是興趣導向，有一個想完成的事情，然後去學習需要的工具。

----

廢話那麼多，我會建議如果沒經驗的人或初學者，可以跟我一樣先找Youtube影片，比如說這種[How To Make Responsive Website Design Using HTML And CSS Step By Step](https://youtu.be/lAOkx2yZESY)。透過抄作業的過程你會慢慢了解每一步驟在做什麼。藉由大量抄作業的過程你也會慢慢知道要如何拼湊出自己想要的網頁。

### HTML

如何建構一個網站？一個網站會由一個HTML檔案搭配CSS以及JavaScript組成，後兩者是選修。

1. HTML -> 存放網頁大量文本，以及排版資訊。
2. CSS  -> 根據**tag**來做修飾，論及顏色，大小，背景，動作等等。
3. JS   -> JavaScript處理互動式介面，任何有互動，有回應的功能。部分功能可能由JS以及CSS兩者都可以達成。

在HTML裡面，我們會以開頭`<!DOCTYPE html>`宣告文件類型，但現在其實不太需要管，記得在開頭擺上就好。
接著我們會以各式各樣的標籤來存放我們的內容。像是我們要在網頁上呈現的內容就會放在`html`標籤上，標籤會以`<html>`,`</html>`表示開頭及結束。
舉一反三，我們也可以用`title`標籤來存放我們要在網頁tab上所呈現的網頁名稱：`<title>This is my page</title>`。

然而也不是全部標籤都會有開頭及結束，以下的例子也就說明了像是`img`就沒有結束標籤。
在使用VScode寫入HTML文件時，標籤會自動產生一對，減少不必要的debug環節。

```yaml
<!DOCTYPE html>
<html>
  <head>
    <title>This is my page</title>
  </head>
  <body>
    <img src="myPicture.jpeg" alt="My image">
  </body>
</html>
```

### CSS 

[30個你必須記住的CSS選擇器](https://code.tutsplus.com/zh-hant/tutorials/the-30-css-selectors-you-must-memorize--net-16048)

CSS，為將整篇網頁的風格另外寫成檔案，在HTML裡面會插入`<link rel="stylesheet" href="style.css">`來導入我們的風格。
那麼導入模式會參考我們在HTML裡所給的標籤以及class. 畢竟如果只參考標籤，我不一定整篇的h1標題都想要一樣的風格，有可能在某章節裡面我們想要不同的背景顏色或動畫等等。

我們參考一篇有著class的HTML file.
```yaml
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>NCU Target manager</title>
        <link rel="stylesheet" href="style.css">
    </head>

    <body>
        <div class="background">
            <h1 class="slide-left">Look up to the sky</h1>
            <h1 class="slide-left">Gaze at the spectacles</h1>
            <h1 class="slide-left">Analyze the cosmos</h1>
            <h1 class="slide-left">Think how it began</h1>
            <h2 class="slide-left">Welcome to the world of Astronomy</h2>
            <p class="start-button"><a {% raw %}href="{% url 'tom_home' %}">Explore</a></p> {% endraw %}
        </div>        
    </body>
</html>
```

1. 整個文檔可以切成3部分：html, head, 以及body
2. html 涵括整份檔案的通則
3. head會儲存我們的簡介資訊，類同header
4. body則是我們主文部分，當中又可以切成section, div, h1, p等等小標。

接著我們可以看如何用style.css來做裝飾。

```css
*{
  padding: 0;
  margin: 0;
}
html{
  scroll-behavior: smooth;
  background-color: #020108;
}
body{
  margin: 0;
}
.background{
  height: 100vh;
  width: 100%;
  /* display: flex; */
  /* flex-wrap: wrap; */
  overflow-x: hidden;
  justify-content: space-between;
  text-align: center;
  background-image: url(background.jpg);
  background-size: cover;
  background-position: center;
}
.background h1:nth-child(1){
  font-size: 100px;
  color: #d6d6d6;
  display: flex;
  font-weight:100;
  opacity: 0;
  padding-left: 50px;
}
```

1. *號表示任何物件，我們要求padding, margin為０，避免空白邊產生。
2. 每項開頭表明了針對的標籤物件，然後以{}寫入所要風格。

CSS就是你的畫筆，要如何創作在一張空白頁面上面，就要靠大家的想像力了。
如果一開始沒頭緒如何創作，底下是一些網站可以帶給人想像空間及工具。

- Creations
  - [CSS Design Awards](https://www.cssdesignawards.com)
  - [CSS Winner](https://www.csswinner.com)
  - [Web Awards](https://webawards.com)
  - [Web Design Inspiration](https://www.webdesign-inspiration.com)
  - [awwwards](https://www.awwwards.com)
  - [FWA](https://thefwa.com)
  - [muuuuu](https://muuuuu.org)
  - [Bridge](https://bridgelanding.qodeinteractive.com)
  - [w-storage](https://w-storage.net/?type=corporate-site)
  - [WebDesignClip](https://webdesignclip.com)
  - [RWDJP](https://responsive-jp.com)
  - [IO](https://io3000.com)
  - [HTML5up free templates](https://html5up.net)
- CSS animation tools
  - [Animate.css](https://animate.style)
  - [Animista](https://animista.net)
  - [CSS bud](https://cssbud.com)
  - [Glassmorphism](https://ui.glass/generator/)
  - [Neumorphism.io](https://neumorphism.io/#e0e0e0)


#### SASS/SCSS

如果你開始有接觸到codepen的內容，很常看到大家並非寫傳統的css，而是sass/scss，那這兩個東西是什麼呢？
剛開始寫CSS，其實難度沒有到很高因爲很視覺化，寫什麼很快就會在網頁上看到，但是當網頁內容越來越複雜，CSS本身的架構其實不容易維護，尤其是在共用的設定以及網狀結構上沒有太多支援性，導致常常要寫很大量的選擇器，也間接導致維護性降低以及重複性提高。

SASS/SCSS就是處理css的高階語言，有著類似程式語言的寫法，可以提出variable等概念，再由轉譯器轉譯成css讓網頁讀取

概略上來講，sass不使用括號，分號，而scss較貼近於原本css寫法，保有大括號以及分號，使用:來作為assignment等等。端看你常使用的語言較貼近哪種寫法，再來選擇要使用sass或者scss就可以了。
[Sass Basics](https://sass-lang.com/guide)官網上提供了Sass/Scss的一些比較寫法，有興趣可以深入一些。使用上可以終端開著`sass --watch input.scss output.css`隨時做compile。

----

## Docker

![Official Docker Logo](Moby-logo.png)

我是大約碩士畢業後在應地所開發程式接觸到Docker，當時要處理MDB檔案，使用windows系統並不好處理，然而要將軟體移植過去又要花費太多精力，所幸發現Docker可以讓我將作業系統容器化，達到類似虛擬機的效果。

Docker是什麼時候開始紅的呢？Docker於2013年正式發行第一版本，到近5年來才算是真正崛起。
最常見的情況是在伺服器端解決各個使用者開發環境不同所造成的影響，想像A開發者使用MacOS搭配Python3.6以及Django3.8搭配SQlite3來做網頁規劃，然而B開發者使用CentOS安裝Python3.9搭配Cpython以及PostgreSQL在做後端處理，兩者鐵定打架。

此時使用Docker把各自環境包裝起來，形成兩個獨立系統就不會互相干擾。
目前使用Docker的著名網站有Adobe, Netlifx, PayPal, Yale, etc.

如果你有程式經驗可以參考[docker-tutorial](https://github.com/twtrubiks/docker-tutorial)。

### Installation

通常Installation這一部分不會多講，但Docker要注意的是由於它核心架構還是需要Linux的基礎，在Windows上安裝需要起用WSL2或者Hyper-V，而且Docker的版本也可能會影響到啟動與否。
在我個人PC上我就遇到`failed to initialize. Docker is shutting down`的狀況，降到4.0版本搭配WSL2才有辦法使用。然而確切問題在哪裡我仍然不清楚😅

> 在Docker版本上，目前在24版遇到Arm64架構有問題⚠️，需在build時候或者在Docker file或者Docker-compose裡加入`--platform linux/amd64`來完成


### Images

在Docker世界裡大致可以分成Images以及Containers，Images就是俗稱映像檔，如果以前玩過虛擬機，像是VMware, VirtualBox等等，或者使用DaemonTool來掛載虛擬硬碟~~玩盜版遊戲~~，可能比較清楚。

映像檔就像是一個作業系統一樣，可以透過虛擬機來模擬映像檔中的作業系統，宛如我們打開Minecraft進到裡面世界一樣。
可以想像映像檔宛如另外一台電腦，有著不同的作業系統以及環境變數，甚至是各式各樣已經裝好的套件。

而這份映像檔可以被Docker啟用，變成Containers，每啟用一次就像多了一組電腦一樣，獨立的環境，獨立的資料，但有相同的基礎設定。

在Image層級，我們常用的指令如下：
- `docker images -a -q`顯示現有映像檔，a: 顯示全部, q:只顯示id。
- `docker rmi [Image name]`, remove images，刪除映像檔。
- `docker rmi $(docker images -a -q)`，刪除所有映像檔。
- `docker save -o [output file name] [image]`，輸出映像壓縮檔。
- `docker load -I [Image file]`，讀取映像壓縮檔。
- `docker history [Image]`，查詢映像檔案寫入歷史。

### Containers

容器Containers為我們啟用後會產生的物件，可以想像是一台一台的電腦，隨開隨用XD
打開容器後，我們可以進到裡頭的command line interface，也就是我們習慣的terminal來進行操作。

不過主要我們會把服務寫在Images裡頭，一打開就是可以準備上線的狀態。

在Container層級，我們常用的指令如下：
- `dockers ps -a -q`，顯示容器，a: 顯示全部, q:只顯示id。
- `docker cp [src file] [containerID:[destination]]`
- `docker rm [container name]`，移除容器。
- `docker exec -it [container name] bash`，在容器中打開bash。`exec`為執行指令，後面可接指令作為操作。
- `docker logs [container name]`，觀看容器日誌資料。
- `docker run [IMAGE NAME]`，開始新的容器，當中有許多options，參考[docker run](https://docs.docker.com/engine/reference/commandline/run/)，42mins的閱讀時間🤣
- `docker run <image-name> /etc/*release*`，查看容器作業系統版本。
- `docker start [container name]`，開始容器運作。
- `docker pause [container name]`，暫停容器運作。
- `docker stop [container name]`，停止容器運作。
- `docker kill [container name]`，移除容器。

### Volumes

Volume我想不到中譯叫什麼XD，可以想像成是硬碟的概念。
在Docker的Container以及運行的Host machine通常是不共用空間的，也就是無法把檔案共享並且保存，此時我們就需要指定Volume來存放資料，並且可以被host甚至是其他container所使用。

在待會的Django當中，靜態檔案要如何被nginx以及web container共用就會用到volume。

這邊Volume先不多解釋，我沒用很多，大致上都會在docker-compose寫好。

### Dockerfile

說了那麼多好處跟功能，那要如何製造出一的我們想要的映像檔案呢？重點就在於撰寫我們的Dockerfile.
沒錯，這個Dockerfile是沒有副檔名(extension)的，不要忘記自己多加奇怪的檔名進去哦😆

關於撰寫，可以參考官網的[Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)，以及實作[Language-specific guides](https://docs.docker.com/language/)

我們先在官網範例上做說明
```
# syntax=docker/dockerfile:1
FROM ubuntu:18.04
COPY . /app
RUN make /app
CMD python /app/app.py
```
1. FROM: 導引docker從官網docker images裡面導入官方映像檔案作為基礎。
2. COPY: 複製檔案進到我們映像檔，後面是接[source] [destinaiton].
3. RUN: 組成image圖層，後面接的指令會在當中的終端機中執行。
4. CMD: 預設啟動時的指令。

這邊要注意的是每一個RUN都會添加一層在我們的image上面，檔案也會因此越來越大，最好方法是RUN後的指令可以疊加再一起就疊加，而CMD只有最後一條會被採用。

----

還有常用的就是WORKDIR以及ENV，分別設定工作目錄為何，以及環境變數。

當Dockerfile寫好之後，在終端輸入`docker build -t [image name] .`就會開始組image檔案囉。

### Docker example

接下來我們實戰一組Dockerfile，網路上大部分可能是node.js等專案來實作，我們這邊以數據處理來做範例，假設我們有一個叫做analyzer的專案，並且在Python 3.6底下運作。
目前檔案會像這樣：
```
├── Dockerfile
└── analyzer
```

我們目標是把環境處理好，並一打開就開啟analyzer底下的app.py。

第一步是要調用基底圖檔，你可以從ubuntu, CentOS等從基底開始安裝，當然也有更快方法就是從Python圖層開始運作，建議是採用後者，降低最後的檔案大小，要記住每一個RUN都會使得最終image檔加大。

我們從[Docker hub](https://hub.docker.com/_/python)找尋我們要的Python image, 後面各種tag表示這個Image構成時的詳細狀況，建議選用-slim版本就可以，減少不必要的套件安裝, e.g., `FROM python:3.7-slim`

接著要選擇我們要加到這個image的檔案以及環境。
我們藉由`WORKDIR /app`來指定我們在app底下操作，`COPY ./analyzer /app/analyzer/`將我們底下的analyzer資料夾複製進app底下。

當我們的package/module打包進去後，相關的dependencies仍然還沒安裝，我們應熟悉`pip freeze > requirements.txt`，將相關的套件記錄下來。
接著可以用`RUN pip install -r /app/analyzer/requirements.txt`來安裝我們紀錄好的需求套件。

假使你沒有其他參數或者套件需要安裝，那麼最後一步就是`CMD python /app/analyzer/app.py`啟動你的application as the start。
這樣就完成一個最簡單的Dockerfile囉。

```
FROM python:3.7-slim

WORKDIR /app

COPY ./analyzer /app/analyzer/

RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install -r /app/analyzer/requirements.txt
CMD python /app/analyzer/app.py
```

----

當然實際上操作並不是這麼快速上手，你必須習慣在Dockerfile裡面所用的格式以及路徑，有時候會遇到可能套件裝不上去或者需要更新的問題，這些情況時常導致你build的次數增加，進而使得花在這上面時間增長許多。
Docker是門藝術，有時候必須細心領會，才能駕輕就熟。😅

## Django
終於來到我們熱門的Django框架，在Python語言裡面要做網頁架構，最常見的有streamlit, flask以及Django。

Streamlit是裡面最簡便的架構，可以快速呈現、部署資料科學成果，當中不乏直接呈現ML等結果，但當中用許多decorator的技巧，不易更改其內容，彈性相較於flask以及django較為低，但若是處理資料呈現，不失為一個快速的手段。

Flask以及Django都是Python使用者常用的框架，兩者各有優缺點，對於簡單的應用，使用Flask可以達到事半功倍的效果，很快可以建出一個原始模型出來，而Django提供更好的performance，若是大型專案，有資安顧慮以及效能需求，使用Django客製化會是較好的選擇。

以上都是淺談，畢竟我只使用過streamlit以及django，對於flask我並沒有深入研究，有時間可能在對streamlit而外寫一篇。

### Installation

在任何的project我強烈建議要使用一個新的環境，不管你是要用`virtuallenv -p python3 .`或者`conda create --name myenv python=3.8`，確保你的環境是乾淨的，避免版本問題去污染你原本的環境。
這裡建議你參考[Python版本支援](https://docs.djangoproject.com/en/4.1/faq/install/)，以及[Django版本差異](https://www.djangoproject.com/download/)來選擇適合的版本作為開發環境。

安裝沒什麼難的，就是使用pip安裝即可：`python -m pip install Django`
如果你要使用的Database不是預設的SQLite，那麼就有額外的套件需要安裝，端看你使用哪一種資料庫。

安裝完可以`python -m django --version`確認自己的版本，網路上很多教學已經是4以前的版本，很有可能會跟你現在使用的有所出入。

### Start your project

當我們確認完安裝後，`django-admin startproject mysite`就可以開始我們的專案，輸入完後會有一系列資料夾產生，那就是你專案裡面的東西。
我的版本為4.0.6，每個版本之間可能會有所不同。
底下的資料結構會長成這樣：
```bash
├── mysite
│   ├── manage.py
│   └── mysite
│       ├── __init__.py
│       ├── asgi.py
│       ├── settings.py
│       ├── urls.py
│       └── wsgi.py
```
在manage.py這層會是我們主要的作業地方，試著使用`python manage.py runserver`嘗試啟動內建的debug伺服器，接著在http://127.0.0.1:8000/應該就可以看到
雖然會跳出我們沒有做migration等警告，不過不影響我們啟動，以後作業會開著伺服器，每次存檔就會更新，藉此對伺服器做調整以及debug。

如果你要挑選其他的port來連接，可以在`runserver`後面加上你要使用的port，比如說：`python manage.py runserver 8080`或者`python manage.py runserver 0:8080`來聆聽全部的port。
![server rocket](runserver.png)

### Settings

在開發我們的網頁之前，我想要先講解我們底下的5個檔案各自的功用，在往後開發調用時才懂的流程為何。

#### manage.py

`manage.py`可以想像成是目前網頁的主控核心，裡面沒什麼需要做修改，但啟動伺服器等等都會透過它來呼叫。

#### asgi.py

ASGI如同WSGI，是對於網路服務的接口，定義網路上的請求要如何與Server端做處理，我們接下來都會使用WSGI，所以這部分我們也不用處理。

#### settings.py

在settings.py裡頭就有很多事情需要我們去完成，基本上大部分都有註解寫好在上頭。
值得我們注意的是`ALLOWED_HOSTS`以及`DEBUG`，在開發時期測試我們都會將DEBUG開啟，方便我們偵錯，如過要將網站上線記得要關掉，避免出現像是[連勝文競選網頁遭駭!?](https://www.storm.mg/article/35009/2)的糗況。
將`DEBUG`關閉之後，系統會要求`ALLOWED_HOSTS`設定要正確，若還不確定自己的網域，先用`*`替代，但會降低安全性。

----

其他很常動到的設定包括`TEMPLATES`，稍後會管理你的靜態模組網頁檔案，`DATABASES`牽涉到往後你的資料庫管理，是要用Sqlite呢？還是要用Postgresql呢？
那你的css,js,或是圖片檔案資料夾名稱會由`Static`來管理路徑。當我們開始創建app時，你會漸漸熟悉這些功能。
> 在Django裡面，整個網站稱作為Project，也就是我們一開始所使用的`django-admin startproject mysite`，而app所指的是網站各個功能組件，可以想像是一台車子，而裡面的輪子，方向盤，導航就是app的意義。

#### urls.py

`url`顧名思義會管理所有網頁路徑的名稱以及導向，最常使用的是`path()`來導路徑。主要會有三個參數，路徑顯示名稱，內容，以及程式內索引名稱。
路徑顯示名稱即是在網址欄所看到的，除了原本網域名稱外，後啜即是相對路徑，好比說instagram/login，來表示登入的網頁，instagram/story來表示限時內容。
而內容可以是render html所出來的view，也可以是包含另外一個`urls.py`，來產生子路徑。
索引名稱是Django內部溝通時的快速管道，我們可以不用透過import或者輸入絕對路徑來擷取網頁，而透過這名稱可以直接表示出絕對網址。
`path('login/', views.login , name="login_page")`

### Start your Apps

現在我們裡面還沒有任何功能，只有預設的首頁。在開發其他功能頁面同時我們也會時不時回到settings.py進行參數修改，讓我們得設定可以接收到我們新的頁面資訊。
要開始一個新的功能我們使用`python manage.py startapp [AppName]`，那麼Django就會在底下生成一個`AppName`的資料夾，而底下會有許多檔案等著我們去開發。

你會發現你的App底下並沒有`templates`,`static`,`urls.py`，這些要自行創建上去，由於他們很常用，建議是先創建，如果沒有用到再刪除也可以。
接下來我們會一個一個檔案走過，描述大致上的功用，坐穩囉！

```bash
├── __init__.py
├── admin.py
├── apps.py
├── migrations
├── models.py
├── templates
│   └── repos
│       └── index.html
├── static
│   └── repos
│       └── css
│           └── index.css
├── tests.py
├── urls.py
└── views.py
```

#### views.py

作為網頁對於使用者最直接的就是畫面的呈現，`views.py`顧名思義會處理畫面的渲染(render)，而這裡的渲染並不指單單將寫好的html,css,js輸出至前端，包括後端處理表單資料，資料庫聯繫以及用戶的操作回應等等，都會在這裡完成。

我們這邊做幾個例子，看完例子應該會對view的功能更熟悉。如果要看見成果，可以跳到url的部分搭配操作。

##### HttpResponse

最為簡單的方法為回應一個簡單的httpresponse，我們可以創建一個簡單的view作為網頁回應。

```python
def simpleResonse(request):
    return HttpResponse("It's a simple response.")
```

##### render

`render`是最常見的方法，藉由呼叫寫好的html,css等檔案，送進參數，直接輸出成網頁回傳到使用者端。
render會處理第一個就是用戶發出的request，第二項參數會放入我們的html檔案，官方建議是放`app/templates/app/index.html`，重複兩次app名稱的資料夾，來作為存放地點，這樣呼叫時可以使用底下的格式，第三個參數`context`則是選擇性輸入字典，輸入參數到我們的模板中。

```python
def renderResponse(request):
    return render(request, "[appName]/index.html", context)
```

##### Handling form post

除非我們是只發布消息，否則我們一定會處理到使用者發出的form，這邊我們示範如何處理一個使用者發出的POST，並把裡面的資料傳達到資料庫裡面。
這裡的`NewTargetForm`是我們待會再`forms.py`裡面定義的一個class，可以想像是一個表單物件。

```python
def standardform(request):
    # 確認使用者發出的為POST
    if request.method == 'POST':
        form = NewTargetForm(request.POST)
        if form.is_valid():
            Target.objects.create(
                name = form.cleaned_data.get('name'),
                ra = form.cleaned_data.get('ra'),
                dec = form.cleaned_data.get('dec'),
                )
            return HttpResponse("You're doing great")
        else:
            form = NewTargetForm({'form':form})
            return render(request, "form.html", {'form':form})
    elif request.method == 'GET':
        form = NewTargetForm()
    return render(request, "form.html", {'form':form})
```

#### urls.py

在url裡面我們會告訴網站要如何傳導我們的網址，我們使用`path`，來放入我們要顯示的路徑，對應到的view，以及在Django內部我們如何呼叫的名稱。


```python
from django.urls import path
from . import views

app_name = '[appName]'
urlpatterns = [
    path('', views.home, name='home'),
    path('standardform/',views.standardform,name="standardform"),
]
```


#### models.py

在每一個App底下，你可以創建需要的資料模型，假設是account app，你可以在models裡面創立不同的account model，for instance: 學生、老師、助理等等，各自的model有不同的field attribute以及權限等等。

我們可以看一個關於observation的範例，每一個attribute等同於這個model在你的資料庫裡面的column name，換句話說，我們資料庫就會有一個table叫做Observations，並且有owner, start_date等等的columns。

每個field在models裡面必須先確立field types，在[Model field reference](https://docs.djangoproject.com/en/4.2/ref/models/fields/)可以找到支援的field類型，不論是date, date time, char,或者是boolean等。


```python
from django.db import models

class Observations(models.Model):

    owner = models.ForeignKey(
        User,on_delete=models.CASCADE,
        null=False,blank=False
    )
    
    start_date = models.DateTimeField(
    null = True, blank=False,
    auto_now_add=False, verbose_name='Start of the observation',
    help_text='The time when the observation starts'
    )

    end_date = models.DateTimeField(
    null = True, blank=False,
    auto_now_add=False, verbose_name='End of the observation',
    help_text='The time when the observation ends'
    )

    created = models.DateTimeField(
    auto_now_add=True, verbose_name='Time Created',
    help_text='The time which this campaign was created in the TOM database.'
    )

    modified = models.DateTimeField(
    null=True, blank=True,
    auto_now=True, verbose_name='Last Modified',
    help_text='The time which this campaign was changed in the TOM database.'
    )

    completed_time = models.DateTimeField(
    null=True, blank=True,
    auto_now=False, verbose_name='Time completed',
    help_text='The time which this campaign was finished in the TOM database.'
    )
    
    campaign = models.ForeignKey(to = Campaign , on_delete=models.CASCADE ,related_name="observations", null = False, blank=False)

    target = models.ForeignKey(to = Target, on_delete=models.CASCADE ,related_name="observations", null=False,blank=False)

    comments = models.CharField(
        max_length=150, default="", unique=False,null=True,blank=True,verbose_name="Description of the campaign",
        help_text="Write down descriptions of this campaign to remind yourself or the PI"
    )

    airmass = models.FloatField(
        null=True, blank=True,
        verbose_name='Max airmass', help_text='Maximum airmass',
    )

    exposure = models.FloatField(
        null=True, blank=True,
        verbose_name='Exposure time', help_text='Exposure time',
    )

    bin = models.IntegerField(
        null=True, blank=True, default=1,
        verbose_name='Bin number', help_text='merge pixel array, 2 mean 2x2 merger',
    )

    frame = models.IntegerField(
        null=False, blank=False, default=1,
        verbose_name='Number of frames', help_text='Number of frames is requested',
    )


    priority = models.CharField(
    max_length=5,
    null=False, blank=False,
    choices= [
        ('S', 'Target of opportunity'),
        ('H', 'High'),
        ('M', 'Medium'),
        ('L', 'Low'),
        ('N', 'None')
    ],
    verbose_name='Priority', help_text='Observation priority.',
    default='N'
    )
```

## Deployment

部署環節主要參考底下文章[Dockerizing Django with Postgres, Gunicorn, and Nginx](https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/), [django-tutorial-for-programmers](https://github.com/uranusjr/django-tutorial-for-programmers/blob/1.8/25-deploy-to-ubuntu-server.md)。
前篇文章大致上網路上抄來抄去，來源不可考，後篇文章有點過時，裡面的有些方法已經deprecated，不過想要了解大部分流程很推薦第二篇文章。

### Django setup

`django-admin startproject deployment` 創建我們的專案資料夾。
進入資料夾後，我們先`python manage.py runserver`來看看是否成功。正常應該會顯示以下畫面並且資料夾多了一個db.sqlite3檔案。

![伺服器啟動頁面](runserver.png)

目前的檔案應該會長得像這樣

```
├── db.sqlite3
├── deployment
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── manage.py
```

### Docker file

接這我們要撰寫Dockerfile來打包我們的Deployment。
這邊很多人會用alphine的版本來縮減最終檔案大小，但你如果搜尋alpine會出現2020一堆人不推薦使用，原因出在在安裝很多軟體時，Alpine Linux Project需要特別調教才可以安裝，這在除錯過程會花你很多時間，這邊我建議使用slim版本就可以，這會使dockerize過程好很多。

```
FROM python:3.9-slim

# set work directory
WORKDIR /app

# copy project
# 這邊會將Dockerfile所在位置的檔案全部複製一份到/app底下，注意如果要複製資料夾要用COPY ./deployment  /app/deployment/
COPY . .

# set environment variables

# Prevents Python from writing pyc files to disc (equivalent to python -B option)
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdout and stderr (equivalent to python -u option)
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
```


### Docker-compose

寫好dockerfile之後我們要寫一個docker-compose.yml，docker-compose的主要目的在我們可以把元件分開，想像我們要有網頁也要有資料庫，我們可以藉由docker-compose來分別管理各自的container。

> The Compose file is a YAML file defining services, networks, and volumes for a Docker application. For (more information)[https://docs.docker.com/compose/compose-file/]

```
# Deprecated. only informative now.
version: '3.8'

services:
  web:
    # build should point to a directory containing the Dockerfile
    build: ./
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./app/:/usr/src/app/
    ports:
      - 8000:8000
```

----

至此與原先runserver其實沒什麼不一樣，只是導入docker-compose來執行而已，而裡面也只有執行web service。
接下來我們會將資料庫Postgres導入，目前檔案看起來應該會像這樣。

```
├── Dockerfile
├── db.sqlite3
├── deployment
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── docker-compose.yml
└── manage.py
```

這邊可以試跑`docker-compose build`建立我們的images，接這用`docker-compose up -d`來看是否成功。成功的話應該會顯示
```
Creating network "deployment_default" with the default driver
Creating deployment_web_1 ... done
```
在瀏覽器輸入`http://localhost:8000`應該可以得到如一開始的畫面。


### Postgres service

#### docker-compose services

等下要輸入的參數可以參考[postgres DOCKER OFFICIAL IMAGE](https://hub.docker.com/_/postgres)。

> Postgres裡，除了`POSTGRES_PASSWORD `以外都是optional。



我們要把Postgres加入到我們的service裡頭，所以我們要對剛寫好的docker-compose.yml進行修改。
這裡面的volume會指出可以被不同container共享的位址。

```yaml
# Deprecated. only informative now.
version: '3.8'

services:
  web:
    # build should point to a directory containing the Dockerfile
    build: ./
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./app/:/usr/src/app/
    ports:
      - 8000:8000
  db:
    image: postgres:14
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    environment:
      - POSTGRES_USER=Tyler
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=deploy_test_db

volumes:
  postgres_data:
```

#### settings.py

現在我們要更新我們原本使用的database設定，將/deployment/settings.py底下的DATABASES做一下更改。
這邊我們開始將參數輸入至環境變數中，而不直接存放在code裡面，再藉由os.environ.get去存取環境變數，第二個參數是存取不到時的預設值。
這裡記得要`import os`在最前面。))像我就忘記，dockerize之後才又要重跑😝

```Python
# Before

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# After
DATABASES = {
    "default": {
        "ENGINE": os.environ.get("SQL_ENGINE", "django.db.backends.sqlite3"),
        "NAME": os.environ.get("SQL_DATABASE", BASE_DIR / "db.sqlite3"),
        "USER": os.environ.get("SQL_USER", "user"),
        "PASSWORD": os.environ.get("SQL_PASSWORD", "password"),
        "HOST": os.environ.get("SQL_HOST", "localhost"),
        "PORT": os.environ.get("SQL_PORT", "5432"),
    }
}
```


#### Update Dockerfile

這邊我們將很多東西存進環境變數裡，但我們可不想要每次都要export這些變數，在Dockerfile裡面我們可以藉由`ENV`去設定環境變數。

```Dockerfile
# set environment variables
ENV SQL_ENGINE=django.db.backends.postgresql
ENV SQL_DATABASE=deployment_db
ENV SQL_USER=tyler
ENV SQL_PASSWORD=password
ENV SQL_HOST=db
ENV SQL_PORT=5432
```

接著將python與postgresql溝通的套件:`psycopg2-binary==2.9.1`給加入我們`requirements.txt`中。
並且安裝相關的dependencies.

```Dockerfile
## install psycopg2 dependencies
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install postgresql postgresql-contrib libpq-dev nginx supervisor vim -y
```

----


我們接著試著跑跑看`docker-compose build`並且將它`builder-compose up -d`看看是否一切正常。
此時進到localhost:8000應該依然會看到火箭升空的畫面。

#### Django Migrate

我們此時先不將`docker-compose down -v`，我們輸入`docker-compose exec web python manage.py migrate --noinput`來將我們新的設定做migrations.

依然先不做down的動作，我們`docker-compose exec db psql --username=tyler --dbname=deployment_db`來測試是否可以進入postgresql的database裡頭。


```Bash
docker-compose exec db psql --username=tyler --dbname=deployment_db
psql (14.5 (Debian 14.5-1.pgdg110+1))
Type "help" for help.

deployment_db=# \l
                               List of databases
     Name      | Owner | Encoding |  Collate   |   Ctype    | Access privileges
---------------+-------+----------+------------+------------+-------------------
 deployment_db | tyler | UTF8     | en_US.utf8 | en_US.utf8 |
 postgres      | tyler | UTF8     | en_US.utf8 | en_US.utf8 |
 template0     | tyler | UTF8     | en_US.utf8 | en_US.utf8 | =c/tyler         +
               |       |          |            |            | tyler=CTc/tyler
 template1     | tyler | UTF8     | en_US.utf8 | en_US.utf8 | =c/tyler         +
               |       |          |            |            | tyler=CTc/tyler
(4 rows)

deployment_db=# \c deployment_db
You are now connected to database "deployment_db" as user "tyler".
deployment_db=# \dt
                  List of relations
 Schema |            Name            | Type  | Owner
--------+----------------------------+-------+-------
 public | auth_group                 | table | tyler
 public | auth_group_permissions     | table | tyler
 public | auth_permission            | table | tyler
 public | auth_user                  | table | tyler
 public | auth_user_groups           | table | tyler
 public | auth_user_user_permissions | table | tyler
 public | django_admin_log           | table | tyler
 public | django_content_type        | table | tyler
 public | django_migrations          | table | tyler
 public | django_session             | table | tyler
(10 rows)

deployment_db=# \q
```

到這邊應該是沒問題了，但我們仍然在藉由Docker來確認一遍。
`docker volume ls`來看我們現有的volume有哪些，這裡應該會看到`local     deployment_postgres_data`。
我們用inspect來看裡頭資訊`docker volume inspect deployment_postgres_data`，如果有跑出相關內容，那就代表我們成功將postgresql裝進我們Django裡面了。


#### Flow control

在docker-compose.yml檔案裡頭雖然depends on db，但實際執行時並不會等db啟動接著啟動web，是有可能發生web啟動了但db還沒啟動，造成資料庫連不上的情況。
在[Control startup and shutdown order in Compose](https://docs.docker.com/compose/startup-order/)裡頭有詳細說明，主要是container的啟動，而不是偵測容器的ready，才會造成這種現象。

解決方法就是我們自己寫一個bash script來處理

### Gunicorn

到目前為止我們都還在用runserver來啟動伺服器，但是自帶的伺服器並不適合來對外，只適合做為開發時使用，畢竟我們需要更多功能且資安上要更安全的接口。

#### docker-compose.yml

我們將web service底下的`python manage.py runserver 0.0.0.0:8000`替換成`gunicorn deployment.wsgi:application --bind 0.0.0.0:8000`。

> 在重新將伺服器上線時，我遇到`gunicorn: command not found`以及`wsgi: No module named 'settings'`，在requirements.txt裡面確認有`gunicorn==20.1.0`，而非在Dockerfile裡面`RUN apt-get install gunicorn -y`裡面，我們啟用的服務是python裡面的gunicorn而非從apt-get安裝的，若呼叫錯會導致python裡面的module讀不到。

----

### Nginx

接下來我們要將nginx加入至我們的django當中，他會扮演一個處理requests的橋樑。

#### docker-compose

我們將這個service加入到我們的compose，並將web service的ports更改為expose.

```yaml
  web:
    # build should point to a directory containing the Dockerfile
    build: ./
    command: gunicorn deployment.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - ./app/:/usr/src/app/
    expose:
      - 8000
    depends_on:
      - db
```

```yaml
nginx:
  build: ./nginx
  ports:
    - 1337:80
  depends_on:
    - web
```
#### conf files

當我們加進nginx卻沒有設定檔怎麼行呢，我們在底下建立一個nginx資料夾，並在裡頭新增Dockerfile以及nginx.conf


##### Dockerfile

```yaml
FROM nginx:1.23

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
```

##### nginx.conf

```yaml
upstream deployment {
    server web:8000;
}

server {

    listen 80;

    location / {
        proxy_pass http://deployment;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_redirect off;
    }

}
```

----

到這邊我們在試著啟動看看，`docker-compose up -d --build`將兩個環節合併再一起，此時輸入localhost:1337就可以看到我們的火箭升空囉。

### Get online

到目前為止我們使用了postgresql, gunicorn, 以及nginx來跑我們的伺服器，但如果這時候去跑內建的檢查`python manage.py check --deploy`會發現滿滿的security warning🤔


#### Debug

第一步會是將debug給關掉，也就是改成`False`，這會使得我們裡面的靜態檔案需要被收集起來，不然gunicorn並不會去主動生成收集。此時也要將我們`ALLOWED_HOSTS = ['*']`，否則是會得到bad request的哦。
往後可以將裡頭做更改，上線時不應該使用`['*']`

我們進到settings.py，把`DEBUG = False`，並在最下面靜態檔加上`STATIC_ROOT = BASE_DIR / "staticfiles"`

這時後伺服器會呈現找不到reponse資料，在我們收集之前，我們將共用資料夾先寫入docker-compose裡。

```yaml
# Deprecated. only informative now.
version: '3.8'

services:
  web:
    # build should point to a directory containing the Dockerfile
    build: ./
    command: gunicorn deployment.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - static_volume:/home/app/web/staticfiles
    expose:
      - 8000
    depends_on:
      - db
  db:
    image: postgres:14
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    environment:
      - POSTGRES_USER=tyler
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=deployment_db
  nginx:
    build: ./nginx
    volumes:
      - static_volume:/home/app/web/staticfiles
    ports:
      - 1337:80
    depends_on:
      - web
volumes:
  postgres_data:
  static_volume:
```

我們新增了static_volume在web以及nginx裡面，確保靜態物件可以被share使用。
接著我們建立資料夾存放，在Dockerfile我們加入底下這段並在nginx.conf新增路徑
```Dockerfile
# create the appropriate directories
ENV HOME=/home/app
ENV APP_HOME=/home/app/web
RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles
WORKDIR $APP_HOME
```

```yaml
upstream deployment {
    server web:8000;
}

server {

    listen 80;

    location / {
        proxy_pass http://deployment;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_redirect off;
    }
    location /static/ {
        alias /home/app/web/staticfiles/;
    }

}
```


----

先恭喜各位，如果中間沒有差錯走到這裡已經成功了哦🎉🎉

- 試著用`docker-compose up -d --build`重先建立我們image檔案並且啟動
- 此時打開`localhost:1337`應該會呈現失敗畫面
- 執行`docker-compose exec web python manage.py migrate --noinput`將更改migrate進來
- 執行`docker-compose exec web python manage.py collectstatic --no-input --clear`收集靜態檔
- 重新整理就會得到成功的網站囉


## References
[加速你的 Django 網站開發 - Django 的好用套件系列](https://ithelp.ithome.com.tw/users/20012434/ironman/3357)<br>
[Introduction to class-based views](https://docs.djangoproject.com/en/4.1/topics/class-based-views/intro/)<br>
[TemplateHTMLRenderer](https://www.django-rest-framework.org/api-guide/renderers/)<br>
[django-allauth](https://django-allauth.readthedocs.io/en/latest/)
[[Python] Unit Testing(單元測試)](https://dysonma.github.io/2021/01/27/Python-Unit-Testing-單元測試/)<br>
[how to disable the Browsable API in production](https://testdriven.io/tips/9aee5b07-bf7a-475b-91cc-d46e8f5c512a/)