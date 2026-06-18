# 경영진단 웹 UI

소상공인 경영진단 리포트 화면을 React와 Tailwind CSS로 구현한 프론트엔드 프로젝트입니다. 인턴십 기간에 진행한 경영진단 페이지 개선 작업을 바탕으로, 공개 가능한 샘플 데이터와 UI 구조만 남겨 개인 포트폴리오용 데모로 정리했습니다.

실제 기관 내부 데이터, 운영 API, 인증 정보는 포함하지 않았습니다.

## 주요 기능

- 탭 기반 상세 탐색 UI
- 좌측 LOC(List of Contents) 내비게이션을 포함한 리포트형 UI
- 상단 요약 고정 바를 포함한 리포트형 UI
- `다음 액션` 항목 클릭 시 관련 지표로 이동하는 앵커 내비게이션
- 기준이 모호하지 않도록 `전월 대비`, `최근 6개월 평균 대비`, `경쟁권 기준`을 함께 노출하는 요약 문구 구조

## 화면 버전

| 버전 | 컴포넌트 | 설명 |
| --- | --- | --- |
| 탭형 하이브리드 | `DiagnosisTabbedHybridPage` | 상단 요약과 탭으로 상세 정보 탐색 |
| LOC 기본형 | `DiagnosisLocReportPage` | 기존 스크롤 구조에 좌측 LOC 내비게이션 추가 |
| LOC 요약 고정형 | `DiagnosisLocReportStickySummaryPage` | 좌측 LOC와 상단 요약 바를 함께 고정 |
| 아코디언형 | `DiagnosisAccordionPage` | 섹션별 내용을 접고 펼치는 구조 |

## 기술 스택

- React 18
- TypeScript
- Vite
- Tailwind CSS

## 폴더 구조

```text
src/
  App.tsx
  main.tsx
  index.css
  components/
    data/          # 공개용 샘플 경영진단 데이터
    hooks/         # 섹션 활성 상태 추적 훅
    layout/        # 리포트 공통 레이아웃
    navigation/    # LOC, 화면 버전 스위처
    pages/         # 화면 버전별 페이지 컴포넌트
    panels/        # 상세 진단 패널
    summary/       # 요약 영역, 다음 액션 보조 패널
    ui/            # 카드, 차트, 뱃지 등 공통 UI
    utils/         # className 병합, 스크롤 유틸
    types.ts       # 경영진단 데이터 타입
```

## 실행 방법

```bash
npm install
npm run dev
```

빌드 확인:

```bash
npm run build
```

빌드 결과 미리보기:

```bash
npm run preview
```

Windows 환경에서 npm 설치 문제가 발생하면 [README_WINDOWS_INSTALL.md](./README_WINDOWS_INSTALL.md)를 참고하세요.

## 데이터 연결 방식

현재 프로젝트는 `src/components/data/mockDiagnosisData.ts`의 공개용 샘플 데이터를 사용합니다. 실제 API와 연결할 때는 동일한 `DiagnosisData` 타입에 맞춰 데이터를 주입하면 됩니다.

```tsx
import { DiagnosisTabbedHybridPage, type DiagnosisData } from './components';

export function Page({ data }: { data: DiagnosisData }) {
  return <DiagnosisTabbedHybridPage data={data} />;
}
```

`summary.actionPath[].targetId`와 상세 지표 컴포넌트의 `targetId`를 맞추면 `다음 액션` 클릭 이동 기능이 그대로 동작합니다.

## 유지보수 포인트

- 샘플 데이터와 요약 문구: `src/components/data/mockDiagnosisData.ts`
- 다음 액션 보조 패널: `src/components/summary/PriorityActionAside.tsx`
- LOC 내비게이션: `src/components/navigation/LocNav.tsx`
- 스크롤 위치 보정: `src/components/utils/scroll.ts`
- 화면별 레이아웃: `src/components/pages/`

## 공개 저장소 정리 기준

- `node_modules`, `dist`, 로컬 설정 파일은 Git에 포함하지 않습니다.
- 실제 기관 데이터, 내부 API 주소, 인증 정보는 저장소에 포함하지 않습니다.
- 이 저장소의 데이터는 화면 구조 설명을 위한 샘플 데이터입니다.
