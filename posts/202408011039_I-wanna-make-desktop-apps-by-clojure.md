---
title: Clojureで漫画制作用のデスクトップアプリを作りたい
date: 2024-08-01 10:39:13
ogimage: /img/posts/202408011039_I-wanna-make-desktop-apps-by-clojure.png
tags:
  - Tech
---

デスクトップアプリを作りたいと前々から思っているのだが、 Web ばかりやっていて実際に作ったことはない。

最近、紙とペンで漫画を書いていて、写植やトーンなどの仕上げだけ PC でやっているのだが
GIMP と Inkscape だけでは若干不便なので Clojure でツールを開発したくなってきた。

漫画制作ツールと言えば ClipStudio をアマチュアからプロまで使っている。
ClipStudioは良いツールなのだが基本的にアナログで書いている自分にはオーバースペック気味。

### 案1: GIMP Plugin

GIMP の Plugin 開発ツールである Script Fu は Lisp である。
短期間の開発であればとりあえず必要な機能を Script Fu で作るのが良さそう。

集中線とか縦書きツールとか作ってる人がいたけど、今ググったらサイトが消えていた。。。悲しい

### 案2: Humble UI

Clojure の GUI 開発で調べたら次のライブラリが面白そうだった。

[HumbleUI](https://github.com/HumbleUI/HumbleUI)

JVM なので自然とクロスプラットフォームになるはず。

### 案3: Tauri + Qwik + Squint (or Cherry)

[Tauri](https://tauri.app/) という Electron Alternative として良さそうなツールがある。
本体は Rust で書かれていて、GUI部分は HTML/CSS/JS で構築できる。

オフィシャルに Next.js や Qwik をサポートしているのだが、
Next.js を Vercel 以外で動かすことを一切信用していないので、
やるとしたら Qwik を採用する。
(Vite で preact とか突っ込んでもいいけど)

最近の ClojureScript はやや進歩していて、 TypeScript みたいに npm 上だけで動く環境を作るプロジェクトがある。
それが次：

* [squint](https://github.com/squint-cljs/squint)
* [cherry](https://github.com/squint-cljs/cherry)

squint と cherry は細かい違いはあれどほぼ同じ。

これが Tauri + Qwik 構成で使えれば悪くなさそう。

（ただ、誰もやってない未踏の環境にはなるので、変な動きしても自力でなんとかする必要がある…）

### おわりに

まぁそもそも個人開発やる時間があんまないんだけど。

[FAM](/tags/FAM/) の開発も進められてないし。

やらないといけないことと、やりたいことが多すぎる。
