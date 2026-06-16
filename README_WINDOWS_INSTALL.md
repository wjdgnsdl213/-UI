# Windows 실행 팁

이 프로젝트는 Node.js 18 이상을 기준으로 실행합니다.

## 기본 실행

```powershell
npm install
npm run dev
```

의존성을 lockfile 기준으로 정확히 설치하려면 아래 명령을 사용할 수 있습니다.

```powershell
npm ci
npm run dev
```

## 설치 오류가 날 때

기존 `node_modules`가 꼬였거나 npm 캐시 문제로 설치가 실패하면 아래 순서로 정리한 뒤 다시 설치하세요.

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
npm cache verify
npm install
npm run dev
```

그래도 문제가 계속되면 npm 캐시를 강제로 정리한 뒤 다시 설치합니다.

```powershell
npm cache clean --force
npm install
```

## pnpm을 사용할 경우

```powershell
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
pnpm dev
```
