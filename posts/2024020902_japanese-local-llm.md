---
title: 【悲報】日本語ローカル LLM がアホすぎる件
date: 2024-02-09
description:
ogimage: /img/posts/2024020902_japanese-local-llm.png
tags:
  - Tech
  - AI
---

ChatGPT を活用した Chatbot 制作の話はよく聞くのだが、それならローカル LLM
でも作れるんじゃないかと思ってやってみた話。

## ローカル LLM の世界

ローカルで動作する LLM は色々あるっぽいけど今回は Meta 社が作っている
[Llama 2](https://llama.meta.com) 系で実験することにした。

Llama 2 は gpt-3.5 レベルの性能があるらしい。

しかし、日本語対応してないので東工大が作っている
[Swallow](https://huggingface.co/tokyotech-llm) を使うことにした。
詳しいドキュメント:
[Zenn - Swallow: LLaMA-2 日本語継続事前学習モデル](https://zenn.dev/tokyotech_lm/articles/d6cb3a8fdfc907)

## ローカル LLM の実行

[Swallow の README](https://huggingface.co/tokyotech-llm/Swallow-7b-hf)
にあるように Python でコードを書いてローカル LLM を動かしても良いのだが、
少々煩雑だと思う。

できれば Web API の形で呼び出したい。調べたらちょうどよいのがあった。

- [TinyLLM](https://github.com/jasonacox/TinyLLM)

これは Llama 2 系のローカル LLM を Chatbot として動くように少々手を加えたもの。

実質内部で使っているのは

- [llama-cpp-python](https://llama-cpp-python.readthedocs.io/en/latest/)
- [vLLM](https://docs.vllm.ai/en/latest/)

なので、詳しくなってきたらこの辺を直接使うつもり。 似たようなプロジェクトで
[Ollama](https://ollama.ai) というのもある。

## TinyLLM (llama-cpp-python) を動かすための準備

TinyLLM (というか llama-cpp-python ) でモデルを使うために Swallow
のリポジトリから gguf ファイルを作る必要がある。

変換器を作ってくれている人がいたのでこれを使うことにした。

- [cherry-py](https://github.com/3eeps/cherry-py) の convert_hf_to_gguf.py

```bash
pip install gguf numpy torch sentencepiece
python convert_hf_to_gguf.py ../Swallow-7b-hf/ 0
```

みたいな感じで動かすことができる。

## TinyLLM (llama-cpp-python) を動かす

llama-cpp-python を動かす用の docker-compose.yml
を書いたりしてよしなに動かした。

TinyLLM には [chat.py](https://github.com/jasonacox/TinyLLM/blob/main/chat.py)
という動作確認用のファイルが用意されているのでこれを日本語にして使うことにした。

で、実行結果がこちら：

![swallow-llm.png](/img/posts/2024020902/swallow-llm.png)

<div class="post-learge-font">
Σ(･ω･ﾉ)ﾉ ！？
</div>

いや、2 ちゃんねるじゃねぇか。。。

事前にベースのプロンプトとして次の文字を入れてある。

```
"あなたの名前はポピンズです。あなたは非常に知的なアシスタントです。
回答は簡潔かつ正確に答えてください。現在時刻は2024年02月09日です。"
```

その上で、 `あなたの名前はなんですか？`
と聞いた際の回答が上記なのでひどすぎる。。。 会話になってないし。

今回使用している
[Swallow-7b-hf](https://huggingface.co/tokyotech-llm/Swallow-7b-hf)
は一番頭が悪いモデルではあるものの、この結果はちょっと残念すぎる。。。
もう少しまともに動いてほしかった。

というか思いっきり 2 ちゃんねるの ID
とか投稿日とか見えてるけどいいのかこれは。。。

色々と思うことがあるけど残念な気持ちだ。

## 次はどうするか

- 一番頭のいいモデルである
  [Swallow-70b-hf](https://huggingface.co/tokyotech-llm/Swallow-70b-hf)
  を試す予定
- 動作が早くなるらしいので vLLM も試したい
- Python に詳しくないので JavaScript から実行するのも試したい

続き:
[日本語ローカル LLM 「ELYZA」と vLLM を試す](/posts/2024021301_japanese-local-llm2/)
