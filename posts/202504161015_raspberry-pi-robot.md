---
title: 再録 Raspberry Pi でラジコンを作った
date: 2025-04-16 10:15:41
ogimage: /img/posts/202504161015_raspberry-pi-robot.png
tags:
  - Tech
draft: true
---

知人の子供がロボットが好きらしくてロボット作りを教えてあげることになったので Raspberry Pi でラジコンを作ってみた。
以前からプログラミング教室みたいなことをやってみたいと思っていたのでよいトライアルになりそうだと思った。

[https://twitter.com/kbaba1001/status/1505791350582571009:embed]

## 背景・気持ち

### 世間のロボット教室とかプログラミング教室について思うことなど

Scratchとレゴ多すぎじゃなかろうか。いや、気持ちはわかる。指導しやすいと思う。Raspberry Pi で GPIO 出力だの Python だのやり始めると工具は必要になるし、はんだ付けを子供にやらせるのは不安だし、タイピングを習得してないかもしれないからPythonを書くところまでたどり着けないかもしれないし、色々と余計なことに気をとられるのは目に見えている。それにくらべてScratchとレゴはタイピングもいらないし工具も必要ないし完璧だ。ロボット作りやプログラミングに集中して指導できる。

しかしそれでいいんだろうか。ものづくりってそういうものだっけ？工具も使わずにレティメイドなものを組み合わせることが工作だったっけ？

いや、やっぱり違うだろう。ものづくりというのは、工作とは、とりあえずグルーガンでなんとかするとか丸鋸持ってないから手のこでなんとかするとか、なんかそういう雰囲気というかやっつけ感というか、行き当りばったりな要素が強いことなんじゃなかろうか。

いわば実験。試行錯誤。それこそがものづくりであり工作であり、いわゆる考える力みたいなものにつながるんじゃなかろうか。
最初から完成すること、成功することが見えているのは工作じゃない気がする。僕も昔から色々作ってるけど途中でうまくできなくて投げ出したものなんかたくさんあるし、でもそれも無駄じゃないかなと思う。

### なぜ Raspberry Pi なのか

* Raspberry Pi はもともと教育用なので子供でも十分使えるはず
* ノートパソコンなどに比べると安い。キーボード、マウスは安物で十分だし、モニターは家のテレビでも代用できる
* IoTできる。子供むけに指導するなら画面の中のプログラミングだけよりはモーターとかで実際に動くもののほうが良いのではないか
    * この辺が chrome book を選択しなかった理由
* Web上の資料・本などが多い。これは初心者には重要な要素
* 本人の技術力や年齢が上がっても使える
    * 特に Raspberry Pi 4 8GB モデルなら長く使えそう。400のもうちょっと性能いいやつが出ればそれがベストか？

### 参考図書

自分一人で作るだけならネットの情報だけで十分なのだが、今回は子供に教えるので参考図書を用意した。

https://amzn.asia/d/7SYsUXG

Raspberry Pi の基本的な使い方からモーター制御まで一通りのっているので良さそうだなと判断した。

## ラジコンづくり

### ロボット作りは物理的な工程が9割

ロボット作りにおいてプログラムを書く工程なんて最後の方にちょこっとあるくらいで、苦労するのは物理的なメカトロニクスの部分だ。
というわけで今回のロボット作りは

* 車体づくり
* 配線
* プログラミング

の手順で行った。

### 車体づくり

タミヤを信じろ。今まで何度買ったのかよくわからないくらいタミヤのモーターギヤーセットは買っているし、キャタピラも何度買ったかよくわからない。

タイヤじゃなくてキャタピラにしたのは、次の理由による

* 見た目が格好いい
* タイヤよりゆっくり動くので操縦しやすい
* モーター、ギアのトルクさえ出せればタイヤより安定して動く(気がする)

というわけで次を購入

モーターとギアのセット
[asin:B001Q119AC:detail]

土台となる部分
[asin:B001VZHRXG:detail]

キャタピラ
[asin:B001VZJDY2:detail]

単3の電池ボックス
[asin:B00FIXLH06:detail]

電池ボックスは2つ買った。はじめは3Vで十分だと思っていたけど動かしてみたら明らかに電力が足りなくて2つつなげて6Vにしたらうまく動いた。

さらに Raspberry Pi を取り付けるのに便利そうな金具があったのでこれも購入。

[asin:B07P4273LF:detail]

こういうのがないと地味に木材とかでごちゃごちゃやる羽目になるので安いし買ったほうがマシ。

で、この辺を組み立てたのがこちら。

<figure class="figure-image figure-image-fotolife" title="RaspberryPiラジコン">[f:id:kbaba1001:20220321191609j:plain:alt=RaspberryPiラジコン]<figcaption>RaspberryPiラジコン</figcaption></figure>

ここまでで軽く配線して走らせてみた。これはまだ電池とモーターをつないでるだけ。

[https://twitter.com/kbaba1001/status/1505635271898935296:embed]

### モーター制御

まだ必要なパーツがある。それは Raspberry Pi 用のバッテリーとモータードライバ。
そもそもなぜ Raspberry Pi 用のバッテリーとモーター用の単3電池に分ける必要があるのかということを意識する必要がある。

モーターというのは内部で電流が流れたり途絶えたりしながら回転している。そのため電気回路的にはモーターというのは電流のノイズ発生装置でしかなく Raspberry Pi のような精密機械に直接つなげるとこのノイズが悪影響を及ぼして最悪壊れてしまう。そのため Raspberry Pi の GPIO ピンに直接 DC モーターをつないではいけない (PWM制御するタイプのサーボモーターなどは別)。

そこでモーターの電流のノイズが Raspberry Pi に影響を与えないようにするために回路を分けてやる必要がある。
このための方法はいくつかあるが（簡単にやるならリレースイッチを使うとか）、モータードライバという回路を挟む方法がよく使われている。今回は次のモータードライバを使った。

[asin:B08YYRV61T:detail]
DRV8833

これにした理由は

* 5つ入りで800円程度という安さ
* Amazonに詳細な解説があった
* モーター2個制御可能
* 逆転も対応

という程度であまり深く考えずに買ったが、よく考えれば本に載っているの同じ基盤にすればよかった。
幸い動作は本に乗っているものとほぼ同じなので良しとする。

次は Raspberry Pi 用のバッテリーだが、車体にのる小さなもので電力が足りていればだいたい何でも良いはず。
もともと Raspberry Pi 4 用に買ってあったバッテリーがあるのでこれを使うことにした。

[asin:B09PY96ZGX:detail]

自分が持っているのは Aukey 製品だがどうみても同じものなので追加で1個購入した。
(中国だとこういう同じ商品をメーカーがラベルだけつけて売るというのが当たり前らしい。)

このバッテリーの良いところは、USB-A の端子と USB-C の端子が対面についていること。これにより USB-A 側を Raspberry Pi に向けて USB-C を外側に向けておけば USB-C で給電するときに楽。

今回使う Raspberry Pi は 3+ なので短めの micro USB 端子も必要だった。
まぁこの辺は 4 でも zero でも pico でもいいと思うので手元にある Raspberry Pi でやればいいと思う。
まだ Raspberry Pi を持ってないなら 4 の RAM 8GB モデルが一番性能が良いのでおすすめする。

### 配線

なるべくはんだ付けをしなくてすむように配線はブレッドボード上で行うことにした。

[asin:B0838VV2X3:detail]
激安ブレッドボード

流石にモーター、電池ボックス、モータードライバの足などははんだ付けしたが、回路の配線はブレッドボード上でピンを挿せばいいのでやり直しもきくし便利だ。

配線して Raspberry Pi OS を起動した様子。

<figure class="figure-image figure-image-fotolife" title="RaspberryPiOS起動">[f:id:kbaba1001:20220321194434j:plain:alt=RaspberryPiOS起動]<figcaption>RaspberryPiOS起動</figcaption></figure>

場所の都合でモバイルバッテリーとブレッドボードをモーターの上に両面テープで貼り付けることにした。丁寧に作るならもう少し台のようなものを作ればよいのだが。。。厚みのある強力両面テープをつかったので剥がすとき大変そう。。。

配線は次の図にしたがって行った。

<figure class="figure-image figure-image-fotolife" title="配線図">[f:id:kbaba1001:20220322041621p:plain:alt=配線図]<figcaption>配線図</figcaption></figure>

### プログラム

DRV8833 は IN1 に電流を流せば正転、 IN2 に電流を流せば逆転、両方に流す/流さない場合は動かないという挙動をする。これはA, B ともに同じ。
配線図をみてわかるように今回は GPIO 2〜5 を使ってモーターを制御することにしたので次のように電流を制御すればラジコンの動きを制御できることがわかる(Aが右側のモーターでBが左側)。

[f:id:kbaba1001:20220321195650p:plain:alt=]
Oは電流を流す、☓は電流を流さない

これを踏まえて作成したコードがこちら

```python
import pygame as pg, sys
import RPi.GPIO as GPIO
import time

pg.init()
screen = pg.display.set_mode((800, 600))
font = pg.font.Font(None, 50)
descriptionimg = font.render("Press cursor !!", True, pg.Color("Blue"))
upimg = font.render("UP", True, pg.Color("Blue"))
rightimg = font.render("RIGHT", True, pg.Color("Blue"))
leftimg = font.render("LEFT", True, pg.Color("Blue"))
downimg = font.render("DOWN", True, pg.Color("Blue"))

motorGpioA1 = 2
motorGpioA2 = 3
motorGpioB1 = 4
motorGpioB2 = 5

GPIO.setmode(GPIO.BCM)
GPIO.setup(motorGpioA1, GPIO.OUT)
GPIO.setup(motorGpioA2, GPIO.OUT)
GPIO.setup(motorGpioB1, GPIO.OUT)
GPIO.setup(motorGpioB2, GPIO.OUT)
GPIO.output(motorGpioA1, False)
GPIO.output(motorGpioA2, False)
GPIO.output(motorGpioB1, False)
GPIO.output(motorGpioB2, False)

while True:
	screen.fill(pg.Color("WHITE"))
	screen.blit(descriptionimg, (200, 100))
	key = pg.key.get_pressed()
	if(key[pg.K_UP]):
		screen.blit(upimg, (200, 150))
		GPIO.output(motorGpioA1, True)
		GPIO.output(motorGpioA2, False)
		GPIO.output(motorGpioB1, True)
		GPIO.output(motorGpioB2, False)
	elif(key[pg.K_RIGHT]):
		screen.blit(rightimg, (200, 150))
		GPIO.output(motorGpioA1, False)
		GPIO.output(motorGpioA2, True)
		GPIO.output(motorGpioB1, True)
		GPIO.output(motorGpioB2, False)
	elif(key[pg.K_LEFT]):
		screen.blit(leftimg, (200, 150))
		GPIO.output(motorGpioA1, True)
		GPIO.output(motorGpioA2, False)
		GPIO.output(motorGpioB1, False)
		GPIO.output(motorGpioB2, True)
	elif(key[pg.K_DOWN]):
		screen.blit(downimg, (200, 150))
		GPIO.output(motorGpioA1, False)
		GPIO.output(motorGpioA2, True)
		GPIO.output(motorGpioB1, False)
		GPIO.output(motorGpioB2, True)
	else:
		GPIO.output(motorGpioA1, False)
		GPIO.output(motorGpioA2, False)
		GPIO.output(motorGpioB1, False)
		GPIO.output(motorGpioB2, False)

	pg.display.update()
	pg.time.Clock().tick(60)

	for event in pg.event.get():
		if event.type == pg.QUIT:
			pg.quit()
			GPIO.cleanup()
			sys.exit()
```

キーボードの十字キーでラジコンが動くようにした。無線のキーボードを使えば自由自在にラジコンを制御できるのでこれで十分だろう。

キーボードイベントを取得するために pygame を使った。もっと他の適した方法もある気がするけど、プログラミングを教えるのに良さそうだと思って買った次の本で pygame が使われていたのでこれにした。

[asin:4839973563:detail]

自分が子供の頃にどうやってプログラムを書いていたかというのを思い出してみると、本に書いてあるサンプルコードを組み合わせて自分の作りたいものをなんとかでっち上げて動かしていた。型とかよくわかってなくて（当時使っていたのはVisualBasic 6.0 ）integer だと動かないけど long にしたら動いたから long にするみたいなそんな感じだった。なので子供にプログラムを書かせるなら理屈はわからなくてもサンプルコードをがちゃがちゃやればなんとなく動くというあたりをやってほしいわけで、 前述の 『ラズベリー・パイで電子工作入門ガイド』と合わせてこの本をもっていた場合、なんとか組み合わせてプログラムが書けるみたいな状態になるので pygame をつかうのがよいと判断した。

## 動かす

コードがかけたら HDMI ケーブルを抜けば動かして遊ぶことができる。やったね

[https://twitter.com/kbaba1001/status/1505791350582571009:embed]

