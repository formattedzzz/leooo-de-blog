# nginx

## 不同系统下的 nginx 安装位置不一样

Ubuntu 下 apt-get 安装的

```yaml
/var/log/nginx # 日志目录
/usr/share/nginx # 安装目录
/etc/nginx # 配置目录
```

如果是下载安装包（可以下载比较新的版本）编译安装的

全部在 `/usr/local/nginx` 下

## 接口代理

## 单页应用部署的一般模式

- 单机的玩法

  一个主站 [https://www.nnleo.cn](https://www.nnleo.cn) 返回前端静态资源
  访问 nnleo.cn 就是访问静态资源根目录 如果你的后台也在同一台机子 那么后台本地一个端口 比如 7003
  将 /api 开头的请求转发到 7003 端口 同时这样也能对外提供服务
  这样的话 我们用 axios 请求接口的时候就不需要设置 baseURL nginx 这边完全代理了
  如果本地设置了 baseURL 去调第三方域名的 API 则要看有没有跨域问题 如果有也可以用 nginx 代理

  ```conf
  server {
    location /api {
      proxy_pass http://localhost:7003
    }
  }
  ```

## 支持 history 路由

`nginx` 解决 SPA `history` 刷新页面的问题 不管什么页面进来 一律返回 `index.html`

所有页面的路由跳转交给前端～

```conf
location / {
  try_files $uri $uri/ /index.html;
}
```

## 卸载

sudo apt-get purge nginx nginx-common
sudo apt-get autoremove
sudo apt-get remove nginx-full nginx-common

## 基本配置

```conf
# user www-data;
worker_processes auto;
# pid /run/nginx.pid;
# Basic Settings:
events {
  worker_connections 768;
  # multi_accept on;
}

http {

  ##
  # Basic Settings
  ##

  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 65;
  types_hash_max_size 2048;
  # server_tokens off;

  # server_names_hash_bucket_size 64;
  # server_name_in_redirect off;

  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  ##
  # SSL Settings
  ##
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
  ssl_prefer_server_ciphers on;

  ##
  # Logging Settings
  ##

  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  ##
  # Gzip Settings
  ##

  gzip on;
  gzip_disable "msie6";

  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_buffers 16 8k;
  gzip_http_version 1.1;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

  ##
  # Virtual Host Configs
  ##
  # server {
  #   listen 80 default_server;
  #   listen [::]:80 default_server;
  #   server_name wx.nnleo.cn;
  #   charset utf8;
  #   root /home/ubuntu/account-server;

  #   location / {
  #     proxy_pass http://127.0.0.1:7003;
  #     proxy_set_header X-Real-IP $remote_addr;
  #     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  #   }
  # }
  server {
    listen 443 ssl;
    server_name www.nnleo.cn;
    ssl_certificate 1_nnleo.cn_bundle.crt;
    ssl_certificate_key 2_nnleo.cn.key;
    location / {
      try_files $uri $uri/ /index.html;
      index index.html;
      root /home/ubuntu/dapp/dist/;
    }
    location /api {
      proxy_pass https://proof.service.baotawang.com;
    }
  }
  upstream nnleo {
    server 127.0.0.1:7003 weight=1;
  }
  map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
  }
  server {
    listen 443 ssl;
    server_name wx.nnleo.cn;
    #ssl on;
    ssl_certificate 1_wx.nnleo.cn_bundle.crt;
    ssl_certificate_key 2_wx.nnleo.cn.key;
    #ssl_password_file /etc/nginx/
    #ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers HIGH:!aNULL:!MD5;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    #ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HTGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    client_max_body_size 20m;
    location / {
      proxy_pass http://nnleo;
    }
  }
  include /etc/nginx/conf.d/*.conf;
  include /etc/nginx/sites-enabled/*;
}

# mail {
#   # See sample authentication script at:
#   # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
#   # auth_http localhost/auth.php;
#   # pop3_capabilities "TOP" "USER";
#   # imap_capabilities "IMAP4rev1" "UIDPLUS";
#   server {
#     listen localhost:110;
#     protocol pop3;
#     proxy on;
#   }
#   server {
#     listen localhost:143;
#     protocol imap;
#     proxy on;
#   }
# }
```

## 静态资源部署脚本

## 解压打包速查

```sh
# 01-.tar格式
解包：[＊＊＊＊＊＊＊]$ tar xvf FileName.tar
打包：[＊＊＊＊＊＊＊]$ tar cvf FileName.tar DirName（注：tar是打包，不是压缩！）

# 02-.gz格式
解压1：[＊＊＊＊＊＊＊]$ gunzip FileName.gz
解压2：[＊＊＊＊＊＊＊]$ gzip -d FileName.gz
压 缩：[＊＊＊＊＊＊＊]$ gzip FileName

# 03-.tar.gz格式
解压：[＊＊＊＊＊＊＊]$ tar zxvf FileName.tar.gz    （unix下不适合此命令）
压缩：[＊＊＊＊＊＊＊]$ tar zcvf FileName.tar.gz DirName

# 04-.bz2格式
解压1：[＊＊＊＊＊＊＊]$ bzip2 -d FileName.bz2
解压2：[＊＊＊＊＊＊＊]$ bunzip2 FileName.bz2
压 缩：[＊＊＊＊＊＊＊]$ bzip2 -z FileName

# 05-.tar.bz2格式
解压：[＊＊＊＊＊＊＊]$ tar jxvf FileName.tar.bz2
压缩：[＊＊＊＊＊＊＊]$ tar jcvf FileName.tar.bz2 DirName

# 06-.bz格式
解压1：[＊＊＊＊＊＊＊]$ bzip2 -d FileName.bz
解压2：[＊＊＊＊＊＊＊]$ bunzip2 FileName.bz

# 07-.tar.bz格式
解压：[＊＊＊＊＊＊＊]$ tar jxvf FileName.tar.bz

# 08-.Z格式
解压：[＊＊＊＊＊＊＊]$ uncompress FileName.Z
压缩：[＊＊＊＊＊＊＊]$ compress FileName

# 09-.tar.Z格式
解压：[＊＊＊＊＊＊＊]$ tar Zxvf FileName.tar.Z
压缩：[＊＊＊＊＊＊＊]$ tar Zcvf FileName.tar.Z DirName

# 10-.tgz格式
解压：[＊＊＊＊＊＊＊]$ tar zxvf FileName.tgz

# 11-.tar.tgz格式
解压：[＊＊＊＊＊＊＊]$ tar zxvf FileName.tar.tgz
压缩：[＊＊＊＊＊＊＊]$ tar zcvf FileName.tar.tgz FileName

# 12-.zip格式
解压：[＊＊＊＊＊＊＊]$ unzip FileName.zip
压缩：[＊＊＊＊＊＊＊]$ zip FileName.zip DirName

# 13-.lha格式
解压：[＊＊＊＊＊＊＊]$ lha -e FileName.lha
压缩：[＊＊＊＊＊＊＊]$ lha -a FileName.lha FileName

# 14-.rar格式
解压：[＊＊＊＊＊＊＊]$ rar a FileName.rar
压缩：[＊＊＊＊＊＊＊]$ rar e FileName.rar
```
