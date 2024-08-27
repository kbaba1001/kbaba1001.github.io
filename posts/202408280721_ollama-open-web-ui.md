---
title: Ollama と Open WebUI でローカルLLMを動かす
date: 2024-08-28 07:21:23
ogimage: /img/posts/202408280721_ollama-open-web-ui.png
tags:
  - Tech
  - AI
---

[ollama_and_open-webui_sample](https://github.com/kbaba1001/ollama_and_open-webui_sample)

こんなリポジトリを作ってみた。

* [Ollama](https://github.com/ollama/ollama)
    * いろいろな LLM モデルを同じインタフェースで動かせるようにするためのサーバー
    * llama-cpp-python と似たようなものという理解
* [open-webui](https://github.com/open-webui/open-webui)
    * ollama の web ui
    * ChatGPT っぽい画面が立ち上がる
* [elyza/Llama-3-ELYZA-JP-8B-GGUF](https://huggingface.co/elyza/Llama-3-ELYZA-JP-8B-GGUF)
    * llama 3 ベースで ELYZA が日本語対応してくれたモデル。
    * 8B なので家庭用のグラボでも動かせる（目安としては 8B なら 8GB 以上の RAM を積んだグラボ）

今までの実験から ELYZA のモデルは信用しているので Llama3 対応モデルはありがたい。

動かしてみた様子はこんな感じ。

![スクショ1](/img/posts/202408280721/llama3-elyza-1.png)

![スクショ2](/img/posts/202408280721/llama3-elyza-2.png)

やはり llama2 系に比べると段違いに賢い。会話が成り立っている。

画像生成っぽいことをしてほしいという無茶ぶりにもなんとか答えていていじらしい。

ローカルLLMは面白いのでなんかもっと活用できないか考えたいところ。
codellama というのもあるので vs code と組み合わせて使っても良さそう。
