# Windows 실행 팁

기존 폴더에서 npm 오류가 나면 아래 순서로 정리 후 다시 설치하세요.

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
npm install
npm run dev
```

npm 자체 오류가 계속되면 pnpm을 사용해도 됩니다.

```powershell
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
pnpm dev
```
