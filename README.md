# 90-99

課題用リポジトリ

https://github.com/miyu1027/100nock_90-99_render

# 92 シンプルなNode.js＋Expressアプリ（「Hello, Render!」を返す等）をGitHubにpushし，Renderにデプロイして公開

手順1.ローカルでNode.js + Expressアプリ作成

```
#(新規ディレクトリを作る)
npm init -y
npm install express
```

index.jsの中身
```
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello, Render!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

package.jsonのscriptsを以下のように変更
```
"scripts": {
  "start": "node index.js"
}
```

その後、
```
npm start
```
```
node index.js
```
と出ればok

ブラウザでは

<img width="539" height="308" alt="スクリーンショット 2026-02-03 011729" src="https://github.com/user-attachments/assets/40d17c99-c681-4e75-98d5-3a23da1f7a6b" />

手順2.GitHubにPush

.gitignore追加
```
node_modules
.env
```

Git初期化＆push
```
git init
git add .
git commit -m "Initial commit: Hello Render app"
```
githubで新しいリポジトリ作成(今回の名前は100nock_90-99_render)
```
git remote add origin https://github.com/miyu1027/100nock_90-99_render.git
git branch -M main
git push -u origin main
```
新しいリポジトリはこちら

https://github.com/miyu1027/100nock_90-99_render

手順3.renderにデプロイ

Renderにログイン → Dashboardを開く → +newでweb service → githubリポジトリ連携 → create new service

完了時画面

<img width="1919" height="1069" alt="スクリーンショット 2026-02-03 014054" src="https://github.com/user-attachments/assets/b1689996-c161-44a8-9e75-7b76187709b8" />

Available at your primary URL https://one00nock-90-99-render.onrender.com ←このリンクにアクセス

<img width="671" height="321" alt="スクリーンショット 2026-02-03 014114" src="https://github.com/user-attachments/assets/321333d4-4069-4e60-8a42-656012ad904f" />

こうなれば成功


# 93. Webアプリの自動デプロイ（CI/CD）を設定せよ

自動デプロイ設定確認(この画面ではauto deployがon commitになっているのでok)
<img width="1919" height="569" alt="image" src="https://github.com/user-attachments/assets/3ed77a66-8d2c-47d8-91b0-c348ec975e0c" />

ソースコード修正(ここでは、表示される言葉を変更)
```
app.get("/", (req, res) => {
    res.send("Hello, Render! Auto deploy works!");
});
```

githubへ再push
```
git add index.js
git commit -m "Update message for auto deploy test"
git push
```

renderのlogを見ると2:09(再pushの時間)のあたりで自動的にDeploying...になっている

<img width="1919" height="1059" alt="image" src="https://github.com/user-attachments/assets/9535b774-e23a-4f49-be8a-077b9a0bcce7" />

先ほどのhttps://one00nock-90-99-render.onrender.comを更新して再アクセス → 文字が変わっている

<img width="660" height="257" alt="image" src="https://github.com/user-attachments/assets/5d34b1ff-8e81-4529-8601-08b195a5ed08" />

RenderのGitHub連携機能を有効化し，リポジトリ更新時に自動的に再デプロイされることを確認した。ソースコードを変更してpushしたところ，Render側で新しいデプロイが実行され，公開ページの表示が更新された。

# 94. 環境変数（Environment Variables）を設定せよ
renderのenvironmentのページで作成

<img width="1919" height="776" alt="image" src="https://github.com/user-attachments/assets/a44e3d5d-f289-4864-8bca-4a9787674aac" />

ローカルのindex.jsを以下のように変更
```
app.get("/", (req, res) => {
  const msg = process.env.MESSAGE || "No env variable set";
  res.send(`ENV MESSAGE: ${msg}`);
});
```
githubに再push
```
git add index.js
git commit -m "Read env var from Render"
git push
```
自動デプロイするので、renderのlogからブラウザに再アクセスするとこの表示になる → 成功

<img width="665" height="233" alt="image" src="https://github.com/user-attachments/assets/1c010a20-e865-49aa-b8f1-52d66020491c" />

# 95. ルート以外のエンドポイントの公開
/api/helloや/aboutなど複数のエンドポイントを持つWebアプリをRenderに公開すること．

index.jsを以下のように変更(/api/helloや/aboutなど複数のエンドポイントを作成)
```
app.get("/", (req, res) => {
  res.send("Top page");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello API!" });
});

app.get("/about", (req, res) => {
  res.send("This is the about page.");
});
```
※再起動してnpm startで更新して確認

http://localhost:3000(/api/hello, /about)にアクセス

<img width="538" height="208" alt="image" src="https://github.com/user-attachments/assets/3a9e0082-4611-4127-a9a0-1f3c036a1b55" />

<img width="536" height="230" alt="image" src="https://github.com/user-attachments/assets/0371e12e-c6d8-49cb-8508-4ab6a30e0eee" />

<img width="533" height="204" alt="image" src="https://github.com/user-attachments/assets/c5474f0e-02fc-4ef8-b723-125561234fc5" />

その後githubに再push

<img width="816" height="361" alt="image" src="https://github.com/user-attachments/assets/040f3687-cc90-4915-9021-57a274820133" />

renderからブラウザにアクセス(/,/api/hello, /about) → エンドポイント公開成功

<img width="657" height="211" alt="image" src="https://github.com/user-attachments/assets/7983f249-a682-4076-aef7-7624c9a96262" />

<img width="704" height="212" alt="image" src="https://github.com/user-attachments/assets/4997923c-7c39-423b-9189-18fb4b16b24f" />

<img width="696" height="186" alt="image" src="https://github.com/user-attachments/assets/52e7d804-1134-41fc-9607-7abb2e10c0c0" />


# 96. チーム開発用にリポジトリをfork・clone
他のメンバーのGitHubリポジトリをforkし，ローカルにcloneして開発環境を整えること．

※今回は同じBグループの惣門君のリポジトリをお借りします。https://github.com/Shintaro0330/100nocks/tree/main

Forkと書かれているところをクリック → 「Forkを作成する」クリック → 自分のアカウントにコピーされる(forked from Shintaro0330/100nocks と表示される)これでFork完了！

<img width="1919" height="1054" alt="image" src="https://github.com/user-attachments/assets/6b7885a6-d61b-43cd-a6a1-170084f01fc4" />

forkしたリポジトリのURLをコピーしてローカルにclone(作業したいフォルダ(今回は課題用に作った100nock_90-99フォルダ)に移動してからターミナルでgit clone)これでclone完了！

→ cloneしたフォルダに移動して、npm install(依存関係インストール)

<img width="935" height="481" alt="image" src="https://github.com/user-attachments/assets/36c3a77b-0a52-48a2-a12e-3e3d3445fabd" />

npm startしてmain.jsが実際に働くか確認(私が動かしたときはエラーが出て動かなかったので、あらかじめ少しだけ変更を加えています(package.jsonの"type": "module" を消す))

<img width="668" height="158" alt="image" src="https://github.com/user-attachments/assets/5d7360ff-31f6-40b9-8110-e3cca8542e8e" />

ブラウザで http://localhost:3000/api/me を確認

<img width="535" height="249" alt="image" src="https://github.com/user-attachments/assets/82529556-0798-4aa7-9489-0b3f187574fc" />


# 97. Pull Requestを利用した開発
forkしたリポジトリで機能追加や修正を行い，元リポジトリにPull Requestを送り，レビュー・マージまでの流れを体験すること．

githubにこのフォルダもpushしていく。(96で行った変更も含める)
<img width="966" height="424" alt="image" src="https://github.com/user-attachments/assets/31f6c8f2-5e46-44a6-b089-874170e60622" />

<img width="1000" height="443" alt="image" src="https://github.com/user-attachments/assets/3f0eadf1-2ce1-49b0-957c-4d0840fe16ae" />

この結果、ちゃんと更新されている(私の画面、4 minutes agoと書かれているところ。"Add .gitignore and update dependencies"が書かれている)

<img width="1919" height="1049" alt="image" src="https://github.com/user-attachments/assets/608aba2a-f724-4b8a-9b9c-89e08d79a9c9" />

contribute → open pull request → create pull request をクリック

<img width="1852" height="609" alt="image" src="https://github.com/user-attachments/assets/600920de-b6f4-4cae-a29b-2a41ac49e538" />

<img width="1919" height="926" alt="image" src="https://github.com/user-attachments/assets/7e106966-fd06-4415-b390-db366985e6a8" />


# 98. デプロイ時のエラーの解決
ソースコードやRender設定を意図的に誤り，デプロイエラーを発生させ，原因を調査して修正・再デプロイすること．
エラー発生例と解決までの手順を記録すること．

package.jsonを意図的に書き換える
```
  "scripts": {
    "start": "node missdayo.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
これを保存 → commit → push

<img width="981" height="419" alt="image" src="https://github.com/user-attachments/assets/1ec82a08-e369-491a-a92e-fc73d4269f35" />

render を確認する → エラー

<img width="1919" height="1057" alt="image" src="https://github.com/user-attachments/assets/9b8b6722-7635-4bbc-86e8-8494841c5a97" />


■ エラー発生方法

package.json の start スクリプトを
node missdayo.js に変更して push した。

■ 発生したエラー

Deployログに
Error: Cannot find module '/opt/render/project/src/missdayo.js'
と表示され、起動に失敗した。

■ 原因

存在しない JavaScript ファイルを起動しようとしたため。

■ 解決方法

start スクリプトを node index.js に戻して commit / push し、
再デプロイしたところ正常に起動した。
```
git add package.json
git commit -m "Fix start command"
git push origin main
```
<img width="1914" height="1072" alt="image" src="https://github.com/user-attachments/assets/cbdbabce-da2f-433b-9967-200af394e80a" />


# 99. チーム開発のふりかえりと成果
Renderでの公開・チーム開発の流れ，課題・工夫点・学びなどをMarkdownでまとめること．

## Renderでの公開(90-95)
- Node.js + Express アプリを作成し GitHub に push
- Render と GitHub を連携して自動デプロイを設定
- 環境変数（PORT 等）を設定しアプリ内で参照できることを確認
- /api/hello や /about など複数エンドポイントを追加
- forkしたリポジトリも Render にデプロイ可能なことを確認

## チーム開発の流れ(96, 97)
- 同じグループの人のリポジトリを fork
- fork したリポジトリを clone
- ローカルで npm start により動作確認
- 修正内容を commit / push
- 元リポジトリに Pull Request を作成
- レビューを受けてマージされたことを確認(まだできていないです)

## 苦労した点・課題
- グループの人の協力を要するのでもっと計画的に行うべきだった
- 今回は、過去の簡単な課題についてprしたが、もっと大規模な開発を協力して行う時などに活用できるようにしたい
- 今までの課題のgithubリポジトリでの整理がうまくできていないので整理する

## 工夫した点
- git status 確認 → フォルダ内がどんな状態か(変更をcommitしていないファイルはどれか)をチェック
- .gitignore を追加して不要ファイルを除外した
- こまめに commit した → 変更が保存される

## 学んだこと
- GitHub と Render を連携させることで CI(Continuous Integration：継続的インテグレーション(git pushでコードを頻繁に統合する仕組み))/CD(Continuous Delivery / Deployment(自動で本番に反映する仕組み。今回のrender)) の流れを体験できた
- fork と Pull Request によるチーム開発の基本を理解できた
- デプロイエラーはログを確認することが重要だと分かった
- 環境変数の設定の重要性を学んだ