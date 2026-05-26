URL: https://search-github-repository-five.vercel.app
(Vercelにデプロイ　CLIで)

## Getting Started
1.install
```bash
# npm の場合
npm install prisma --save-dev
npm install @prisma/client

# pnpm の場合
pnpm add -D prisma
pnpm add @prisma/client
```
2. env.sampleをコピーし.env.local（使用する環境変数記載ファイル）作成
```bash
cp env.sample .env.local
```
3.supabase(postgresSql)データベースにテーブル作成
```bash
npx prisma migrate dev --name init
```


# 重視した１点
実務内では状態管理等カスタムフックのみかzustandのみで実装することが多いと考えるが、使用できるということをアピールすることを重視したため似たような機能でも複数用いてアプリを構成

##　工夫した点
- CI実装、\->何度も保守した関係で、毎回npm run testを実行するのが手間なため。
- 指示がなかったが、初期表示で何も表示されないとUX上問題と感じ、人気順でリポジトリを表示
  - リポジトリを検索する際人気順(starが多い順)になっており統一するため
  - リポジトリを検索する目的として便利なものを流用したい、技術を把握したいのが目的->人気順で検索
- routeHandlerを用いることでブラウザから環境変数であるgithubtokenを見えなくし、セキュリティ上問題が内容に考慮
- honoを用いようとしたが、フロントバックエンドどちらもNext.jsである点と、エンドポイント少ないため
  - フロントバックエンドで型共有
  - エンドポイント省略
  のメリットが薄いと同時に、routeHandlerを実務レベルで扱えると提示するため使用せず
- 詳細画面で開いたリポジトリをgithubで見たいと思った際ユーザービリティ向上のためリンクを用意
- 初期表示から詳細画面までISR(SSG->データ更新を考慮し不採用)　更新頻度が少ないアプリのため　６０秒はキャッシュを利用
- Zustand->repositoriesはすべての画面で使用しているなどバケツリレーが起きにくいと感じ現在は使用していない
- suspenseを導入しスケルトンコードを使用していることで、接続しどのような要素を読み込んでいるかユーザーに伝える

## routehandler,serveraction使い分け
- routehandler fetchを使う場合やフォーム関係でもＰＯＳＴしなくＧＥＴリクエストの場合使用
- serveraction お気に入り登録した際POSTリクエストのため使用


## 苦労した点
- デザイン周りの調整
- 自分が使用したいと思う機能、アプリとして実用性が高いものであり他アプリと似たように寄せる点
- prismaClientがversion7だと使用できないエラーに時間がかかり、version6にダウングレード->修正ができたためupdate
- お気に入り登録の機能を用いるためのログイン機能->github,googleのリダイレクトurl等の問題で長時間試行錯誤
- 

## AI使用に関して
- 使用したAI　gemini 3 flash
-  用途
  -  読み取り実行権限等のOS関係の部分等に関するシステム側のエラーの修正
  -  デザインの修正
  -  NextAuthの修正->初使用のため
  -  Card表示の際の言語の表示iconの処理
  -  エラー修正
-  工夫した点　自分のローカル上のプロジェクトより上のファイルは触らないようにmdファイルで指定
