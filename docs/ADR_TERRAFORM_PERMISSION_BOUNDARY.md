# blog_deployを発行するトークンと、blog_deployが使うトークンを分離する

`infra/`(CIが`blog_deploy`で適用)と`permissions/`(人間がローカルで個人用Cloudflareユーザートークンで適用)は、別々のstateを持つ別々のTerraform rootとした。
`permissions/`が`blog_deploy`を作り、`infra/`とappのデプロイjobはそれを使う。
任意の権限を持つCloudflare APIトークンを発行できる権限(`Account API Tokens Write`)がGitHub Actionsのシークレットに置かれることが絶対にないようにするため、この2つを分離した。
CIの全実行に晒されるのは、狭い権限に絞られた`blog_deploy`だけになる。

## 検討して却下した案

### 単一のTerraform root + CI側に`Account API Tokens Write`と各種リソース権限を持つトークンを1つ置く案

もっとも単純な構成。
ただしトークンを発行できるトークンは、アカウントが許す任意の権限のトークンを作れてしまう。
CIのシークレットが漏洩すれば、Workers/R2どころかアカウント全体の乗っ取りにつながるため却下した。

### GitHub ActionsからのOIDCフェデレーション(AWS/GCP/Azure方式)でCI側の長期クレデンシャルそのものを無くす案

Cloudflareは現時点でOIDC/「trusted publishing」に対応しておらず、未実装のfeature requestのまま([cloudflare/workers-sdk Discussion #11434](https://github.com/cloudflare/workers-sdk/discussions/11434)、[wrangler-action Issue #402](https://github.com/cloudflare/wrangler-action/issues/402))。
選択肢として存在しないため却下した。

### infra applyを完全に手動運用にする案

CIでのinfra自動適用は維持したいという明確な要望があり、手動運用への後退になるため却下した。

### rootを分割せず、強い権限のトークンをGitHub EnvironmentのRequired reviewerでゲートするだけの案

誤操作や無許可実行は防げるが、シークレット自体が漏洩するケース(CI内の乗っ取られたActionなど)には無力。
権限の影響範囲(blast radius)そのものは減らせず、誤用対策にしかならないため却下した。

## この設計による帰結

- `permissions/`のapplyは人間がローカルで実行する手動ステップになる。
- `blog_deploy`に必要な権限が変わっても、誰かが忘れずに手動で適用しない限り反映されない。
- `blog_deploy`の権限セットが、CIがCloudflareに対してできることの事実上の上限になる(`infra/`とappデプロイjobはどちらも`blog_deploy`としてしか動かない)。
- `infra/`に新しいCloudflareリソース種別を追加する場合、まず`permissions/`経由で`blog_deploy`に権限を足す必要が出てくる。
- `blog_deploy`のポリシーはスコープ単位で分割する。アカウント全体にスコープする権限(`Workers Scripts Write`など)とアカウント配下の全zoneにスコープする権限(`Zone Write` / `DNS Write` / `SSL and Certificates Write` / `Workers Routes Write`)は別々の`policy`ブロックにする。Cloudflareの`resources`は同一policy内の全permission groupに一律で適用されるため。

## 変更履歴

- Workerへのカスタムドメイン割り当て(`infra/domain.tf`)のため、`blog_deploy`にzoneスコープの権限を追加。
  `permissions/`のapply → CIの`infra` apply、の順で反映する。
