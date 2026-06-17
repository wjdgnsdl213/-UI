# 경영진단 웹 UI v2 - React/Tailwind 모듈형 프로젝트

소상공인 경영진단 리포트를 위한 React/Tailwind 기반 UI 프로젝트입니다. 동일한 `DiagnosisData`를 기준으로 4가지 레이아웃 버전을 비교해볼 수 있도록 구성되어 있습니다.

## 실행 방법

```bash
npm install
npm run dev
```

빌드 확인:

```bash
npm run build
```

## 포함된 4가지 레이아웃 버전

`src/App.tsx`의 `VersionSwitcher`로 전환할 수 있습니다.

| 버전 | 컴포넌트 | 설명 |
|---|---|---|
| 1. 탭형 하이브리드 | `DiagnosisTabbedHybridPage` | 상단 요약 고정 + 탭으로 카테고리별 상세 탐색 |
| 2. LOC 기본형 | `DiagnosisLocReportPage` | 좌측 목차(LOC) 제공, 요약은 고정하지 않고 스크롤 |
| 3. LOC 요약 고정형 | `DiagnosisLocReportStickySummaryPage` | 좌측 LOC + 상단 요약/우선확인 바 고정 |
| 4. 아코디언형 | `DiagnosisAccordionPage` | 전체 카테고리를 한 화면에서 스캔 후 선택 펼침 |

## 핵심 기능

### 우선 확인 항목 클릭 이동

요약 영역의 "우선 확인"은 클릭 가능한 링크 버튼이며, 클릭 시 해당 탭을 활성화하고 `targetId` 위치로 스크롤 이동합니다.

관련 데이터: `src/components/data/mockDiagnosisData.ts`의 `summary.actionPath`
스크롤 로직: `src/components/utils/scroll.ts`

### 기준 명확형 요약

요약 문구의 변화/평가가 어떤 기준인지 모호하지 않도록 `전월 대비`, `최근 6개월 평균 대비`, `경쟁권 기준` 등을 함께 노출합니다.

## 폴더 구조

```text
src/
  App.tsx
  main.tsx
  index.css
  components/
    data/          # mockDiagnosisData
    hooks/         # useActiveSection
    layout/        # ReportShell, TopBar
    navigation/    # LocNav, VersionSwitcher
    pages/         # 4가지 레이아웃 페이지 + ReportSections
    panels/        # 카테고리/매출/메뉴/SNS/고객 패널
    summary/       # SummaryHero, ActionPathLinks, StickySummaryBar, PriorityActionAside
    ui/            # 카드, 차트, 뱃지
    utils/         # cn, scroll
    types.ts       # DiagnosisData 타입 정의
```

## 실제 API 연결 방법

각 페이지 컴포넌트는 동일한 `DiagnosisData` 타입을 받습니다.

```tsx
import { DiagnosisTabbedHybridPage, type DiagnosisData } from './components';

export function Page({ data }: { data: DiagnosisData }) {
  return <DiagnosisTabbedHybridPage data={data} />;
}
```

백엔드에서 `summary.actionPath[].targetId`와 실제 지표 컴포넌트의 `targetId`만 맞춰주면 클릭 이동 기능이 그대로 동작합니다.

## 유지보수 포인트

- 요약 문구/기준/우선확인 경로 수정: `src/components/data/mockDiagnosisData.ts`
- 우선확인 링크 UI 수정: `src/components/summary/ActionPathLinks.tsx`
- LOC 동작 수정: `src/components/navigation/LocNav.tsx`
- 스크롤 offset 수정: `src/components/utils/scroll.ts`
- 페이지별 레이아웃 수정: `src/components/pages/*`

## 주의사항

- 같은 화면 안에서 `targetId`는 중복되면 안 됩니다.
- 상세 패널/지표 카드의 `id`와 `actionPath.targetId`가 일치해야 합니다.
- Pretendard는 `src/index.css`에서 웹폰트로 import했습니다. 실제 서비스에서는 프로젝트 공통 폰트 설정에 맞게 교체하세요.
