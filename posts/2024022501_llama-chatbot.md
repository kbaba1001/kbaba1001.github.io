---
title: ローカル LLM を自宅サーバーで動かして Chatbot を作る
date: 2024-02-25 14:15:00
description:
ogimage: /img/posts/2024022501_llama-chatbot.png
tags:
  - Tech
  - AI
---

今までローカル LLM を色々と試してきたわけだが、ついに集大成として Chatbot
を作るに至った。

![Poppins1](/img/posts/2024022501/poppins1.png)

結局、結論としては、

- モデル:
  [elyza/ELYZA-japanese-Llama-2-13b-fast-instruct](https://huggingface.co/elyza/ELYZA-japanese-Llama-2-13b-fast-instruct)
  を使う
  - 正確には GGUF がほしいので
    [こちら](https://huggingface.co/mmnga/ELYZA-japanese-Llama-2-13b-fast-instruct-gguf)
    の `ELYZA-japanese-Llama-2-13b-fast-instruct-q4_K_S.gguf` を使うことにした
- サーバー: [llama-cpp-python](https://github.com/abetlen/llama-cpp-python) を
  docker で動かす。
  - [TinyLLM](https://github.com/jasonacox/TinyLLM/tree/main/llmserver)
    をめちゃくちゃ参考にした
  - [vLLM](https://github.com/vllm-project/vllm) は設定が悪いのか GPU
    メモリエラーになるのでひとまず諦めた
- クライアント: [nlux](https://nlux.dev) というのが React で動くチャットボットの
  UI をすぐに作れるので採用した

## 動かしてみる

![Poppins2](/img/posts/2024022501/poppins2.png)

そこそこまともに回答してくれる。

## ソースコードサンプル

そのうち作る。
