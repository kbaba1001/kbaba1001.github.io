---
title: 日本語ローカル LLM 「ELYZA」と vLLM を試す
date: 2024-02-13
description:
ogimage: /img/posts/2024021301_japanese-local-llm2.png
tags:
  - Tech
  - AI
---

前回の
[【悲報】日本語ローカル LLM がアホすぎる件](/posts/2024020902_japanese-local-llm/)
から次のことを試した。

- 一番頭のいいモデルである
  [Swallow-70b-hf](https://huggingface.co/tokyotech-llm/Swallow-70b-hf) を試す
- [elyza/ELYZA-japanese-Llama-2-13b-fast-instruct](https://huggingface.co/elyza/ELYZA-japanese-Llama-2-13b-fast-instruct)
  を試す
- [vLLM](https://github.com/vllm-project/vllm) を試す

## Swallow-70b-hf

自分の GPU (GeForce GTX 1080 Ti)
では重すぎて１時間待っても3文字くらいしか応答がなかった。
ちょっと実用性がないので採用を諦めた。

## ELYZA-japanese-Llama-2-13b-fast-instruct

Swallow は前回かなり残念な感じだったので別のモデルを試すことにした。 そこで
ELYZA 社の上記のモデル。

![ELYZA](/img/posts/2024021301/elyza.png)

<div class="post-large-font">
まともな回答してる！

これだよ、これ！！

</div>

前回の Swallow は何だったのかと思うほどきちんとした回答が返ってきた。
応答速度も数分かかるものの許容範囲レベル。 ひとまずモデルとしては
ELYZA-japanese-Llama-2-13b-fast-instruct で決定することにした。

## vLLM による高速化

vLLM はローカル LLM を高速化できるライブラリ。

[vllm/vllm-openai](https://docs.vllm.ai/en/latest/serving/deploying_with_docker.html)
という Docker イメージがあるので試しに使ってみたが、 GPU
メモリーリークを起こして動かなかった。 自分の GPU
が貧弱なためか、設定を変える必要があるのかいまいちよくわからない。

ノート PC の GPU でもメモリーリークしたので多分設定を変える必要がある。

引き続き試すとして、一旦は llama-cpp-python で動かすことにする。
