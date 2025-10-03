---
title: "Docker 零到六十"
date: "2025-10-02"
tags:
  - Docker
  - Dockerfile
draft: true
---

只會抄Dockerfile的我已經受不了了，這篇文章主要是給想擺脫只會使用，到理解每個配置概念的我！

# Storage 

> Data written to the container layer doesn't persist when the container is destroyed. This means that it can be difficult to get the data out of the container if another process needs it.

## Storage mount options

> No matter which type of mount you choose to use, the data looks the same from within the container. It is exposed as either a directory or an individual file in the container's filesystem.

> 不論你選擇哪一種掛載方式，從容器內部來看，資料的形式都是一樣的。它會以一個目錄或單一檔案的形式，出現在容器的檔案系統中。

### Volume mounts (資料卷掛載)

> When you create a volume, it's stored within a directory on the Docker host. When you mount the volume into a container, this directory is what's mounted into the container. This is similar to the way that bind mounts work, except that volumes are managed by Docker and are isolated from the core functionality of the host machine.

`Volumes` 是由 Docker 管理的、用來持久化容器資料的最佳方式。你可以把它想像成一個由 Docker 維護的專用資料儲存區。這個儲存區存在於主機的檔案系統中（通常在一個特定的路徑下，如 `/var/lib/docker/volumes/`），但使用者不應該直接操作這個路徑下的檔案，而是透過 Docker 的指令來管理。

**特性：**

  * **由 Docker 管理生命週期**：你可以透過 `docker volume create`, `docker volume rm`, `docker volume ls` 等指令來獨立於任何容器之外，管理 Volume 的生命週期。
  * **平台無關性**：無論 Docker 運行在 Linux、Windows 還是 macOS 上，Volume 的行為都是一致的。
  * **易於備份與遷移**：因為 Volume 由 Docker 統一管理，備份或遷移資料卷比尋找散落在主機各處的綁定目錄要容易得多。
  * **效能佳**：在多數情況下，Volume 能提供接近原生檔案系統的 I/O 效能。
  * **容器間共享**：多個容器可以同時掛載並讀寫同一個 Volume，這是在容器間共享資料的常用方法。
  * **預先填充資料**：當你掛載一個空的 Volume 到容器內一個已存在內容的目錄時，Docker 會自動將該目錄的內容複製到 Volume 中。這對於初始化資料庫等場景非常有用。

**使用時機：**

  * **需要持久化儲存應用程式資料時**：例如資料庫檔案、使用者上傳的內容、應用程式的日誌等。
  * **需要在多個容器間共享資料時**。
  * 當你不希望容器的資料與主機檔案系統的特定路徑緊密耦合時。

**指令範例：**

```bash
# 建立一個名為 my-data 的 Volume
docker volume create my-data

# 使用 --mount
docker run --mount type=volume,src=<volume-name>,dst=<mount-path>

# 使用 -v
docker run -d --name dev-test -v my-data:/app/data nginx
```

```bash
# 若目標Volume還沒建立，Docker會自動建立myvol2
docker run -d \
  --name devtest \
  --mount source=myvol2,target=/app \
  nginx:latest
```

**docker compose**的情況下，若是Volume在docker compose以外建立
```bash
services:
  frontend:
    image: node:lts
    volumes:
      - myapp:/home/node/app
volumes:
  myapp:
    external: true
```
標記成external，會讓這個volume的生命週期不被此docker compose管理，若volume找不到，docker compose也不會自動建立，而是會回傳錯誤。
且此情況下所有Volume參數都會被無視，代表此Volume是被外在所控管。

#### Volume backup

先創立一個現有的容器，後續會將這容器上的Volume做備份。這邊使用`/bin/bash`只是維持容器存活，不會自動關閉。

`docker run -v /dbdata --name dbstore ubuntu /bin/bash`

創建完容器後，我們再開一個容器，從dbstore這個容器上的Volume相同掛載上來。

`docker run --rm --volumes-from dbstore -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /dbdata`

這邊使用bind mount將backup底下內容映射到本地端，並且執行tar進行備份，備份完`--rm`會將容器刪除，也就是這容器類似於tmp的角色。

### Bind mounts (綁定掛載)

> Containers with bind mounts are strongly tied to the host.

`Bind mounts` 是將主機上的一個**已存在的檔案或目錄**，直接掛載到容器內的指定路徑，主機與容器對這個檔案/目錄的任何修改都會即時雙向同步。

**特性：**

  * **直接存取主機檔案**：容器內的應用程式可以直接讀寫主機上的檔案，就像在操作本地檔案一樣。
  * **依賴主機檔案結構**：這種方式高度依賴主機上特定的檔案路徑，如果路徑變更，容器就無法啟動。
  * **高效能**：因為它直接映射主機檔案系統，所以讀寫效能非常好。
  * **潛在的安全性風險**：容器內的程序（甚至是惡意程序）可能會修改、刪除主機上的重要檔案，包括系統檔案，因此需要謹慎授與權限。

**使用時機：**

  * **開發環境**：這是 `Bind mounts` 最經典的應用場景。你可以將專案的原始碼目錄掛載到容器中，這樣在主機上修改程式碼後，容器內的服務（如網頁伺服器）能立刻反應變更，無需重新建置映像檔 (Image)。
  * **共享設定檔**：將主機上的設定檔（如 `nginx.conf`）掛載到容器中，方便修改設定而不用進入容器。
  * **存取主機上的工具或日誌**：例如，將 Docker 的 socket (`/var/run/docker.sock`) 掛載到容器中，讓容器可以執行 Docker 指令。

**指令範例：**

```bash
# 將主機當前目錄下的 `sourcecode` 子目錄，掛載到容器內的 /app 路徑
# 使用 --mount (more explicit)
$ docker run -d --name dev-test --mount type=bind,source="$(pwd)"/sourcecode,target=/app nginx

# 或是使用 -v
$ docker run -d --name dev-test -v "$(pwd)"/sourcecode:/app nginx
```



### tmpfs mounts (記憶體檔案系統掛載)

**核心概念：**
`tmpfs mounts` 是一種**非持久化**的儲存方式，它將資料直接儲存在主機的**記憶體**中，而不會寫入到硬碟。當容器停止時，`tmpfs` 掛載點中的所有資料都會被清除。

**特性：**

  * **極致的效能**：因為資料的讀寫都在記憶體中進行，所以速度非常快，遠超過任何基於磁碟的儲存。
  * **暫時性**：資料是暫時的，容器一旦停止，資料就會消失。
  * **安全性**：適用於儲存不想在任何地方留下痕跡的敏感性資料，如臨時的密碼或金鑰。
  * **平台限制**：`tmpfs` 是 Linux 核心的功能，因此這個選項**只在 Linux 上的 Docker 有效**。

**使用時機：**

  * 當應用程式需要頻繁讀寫大量臨時檔案，且這些檔案不需要被持久化時，例如快取、Session 資料等。
  * 儲存執行期間的敏感性資料，避免其被寫入磁碟。
  * 保護容器的效能，避免大量的寫入操作污染容器的可寫層 (Writable Layer)。

**指令範例：**

```bash
# 在容器內建立一個位於 /app 的 tmpfs 掛載點
# 使用 --mount (推薦)
$ docker run -d --name temp-test --mount type=tmpfs,destination=/app nginx

# 或是使用 --tmpfs (較簡潔，但功能選項較少)
$ docker run -d --name temp-test --tmpfs /app nginx

# 使用 --mount 可以指定更多選項，例如大小限制
$ docker run -d --name temp-test --mount type=tmpfs,destination=/app,tmpfs-size=64m nginx
```


### 比較

| 特性 | Volume Mounts (資料卷掛載) | Bind Mounts (綁定掛載) | tmpfs Mounts (記憶體掛載) |
| :--- | :--- | :--- | :--- |
| **持久性** | ✅ **是** (容器停止後資料保留) | ✅ **是** (資料存在於主機) | ❌ **否** (容器停止後資料消失) |
| **管理方** | Docker | 使用者/主機 | 記憶體 |
| **主機位置** | Docker 管理的特定區域 | 主機檔案系統的任意位置 | 主機記憶體 |
| **主要用途** | 持久化應用程式資料 (如資料庫) | 開發時同步程式碼、共享設定檔 | 高效能的臨時儲存、敏感資料 |
| **平台** | 所有平台 | 所有平台 | 僅限 Linux |
| **安全性** | 較高，與主機檔案系統隔離 | 較低，可直接影響主機系統 | 較高，資料不落地 |

# Container

## Restart policy

容器重啟只有在成功運行之後，才會套用，這也避免了陷入restart loop當中。

| Flag | 說明 |
| :--- | :--- |
| `no` | 不自動重新啟動容器。(預設值) |
| `on-failure[:最大嘗試次數]` | 在容器發生錯誤時重新啟動。`:最大嘗試次數` 來限制重啟嘗試次數。 |
| `always` | 無論容器為何停止，一律重新啟動。如果容器是手動停止的，則只有在 Docker daemon 重新啟動或容器本身被手動重啟時，才會再次啟動。 |
| `unless-stopped` | 與 `always` 相似，但當容器被停止後 (無論是手動還是其他原因)，即使 Docker daemon 重新啟動，它也不會被重新啟動。 |

## Resource constraints



# Appendix

[Volumes](https://docs.docker.com/engine/storage/volumes/)