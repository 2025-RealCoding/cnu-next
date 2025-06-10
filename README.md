# CNU 실전코딩 FE 과제

### 과제 1. Mypage 구현 (각 1점, 결과 화면 강의 자료 참고)

#### 1.1. UserContext를 활용한 Mypage 구현 

- UserContext에 추가되어야 할 프로퍼티
  - 아이디(userId: string)
  - 나이(age: number)
  - 핸드폰번호(phoneNumber: string)

#### 1.2. Header Component를 재활용하여 Mypage Header 구현

- (title: 마이페이지)

#### 1.3. 홈으로 가기 버튼 구현

- Link or Router 활용

### 과제2. 검색(SearchInput), 상품리스트(ProductCart), 장바구니(CartList) (총 4점, 결과 화면 강의 자료 참고)

#### 2.1. 장바구니에 아이템이 없을 때, 장바구니 영역이 보이지 않는 기능 (useEffect 활용) (0.5점)

- cart, setShowCart를 활용해 구현

#### 2.2. SearchInput 컴포넌트가 최초 렌더링 될 때, input tag에 포커스 되는 기능 (0.5점)

- 2주차 useRef 실습활용

#### 2.3. 카트 아이템 지우기(handleRemoveFromCart) (1점)

- setCart를 사용해 cart에 담긴 item을 삭제한다
- tip: Object.entries() 활용

#### 2.4. 결제하기 기능 구현 (2점)

- 설명: "결제하기" 버튼을 클릭하면, 현재 장바구니에 담긴 상품을 확인해 **localStorage**에 저장 후, 결제완료(/checkout) 페이지로 이동한다.
  - 과정
    - 장바구니에 담긴 item 객체들 찾기
    - localStorage를 사용한 저장
    - 페이지 이동
- 저장해야 할 프로퍼티는 과제3 참고
- 참고 링크 [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

### 과제 3. 결제완료 (총 3점, 결과 화면 강의 자료 참고)

#### 3.1. 결제 완료 페이지 구현(2점)

- /search에서 /checkout으로 이동 후, 데이터를 꺼내 결과 화면에 보여준다
  - ProductItem의 title, lprice 필수 포함. 제품 별 quantity와 총 금액이 포함되어야 함
  - 결제 완료되어 화면에 보여진 item들은 **localStrage에서 지워야한다** (결제완료 후, 확인했을 때 localStorage에 없어야 한다)
  - **주의: 결제된 아이템이 없으면, "결제된 아이템이 없습니다" 라는 텍스트를 보여준다**
- 방법: useEffect, localStorage 활용

#### 3.2. 홈 화면으로 돌아가기(1점)

- 설명: 홈 화면으로 돌아가기 버튼을 만들고, 클릭하면 메인 화면으로 돌아간다
- Link or router 활용

### 과제 관련 공지사항

- /api 이외의 디렉토리(component, context, interface, types ...)는 /src 아래에 배치가 맞아서 변경해뒀습니다
- 과제는 README에 올라온 과제1~3이 기준입니다.
- 제출 방법: PR 제목을 학번 이름(ex. 2025**\*** 장은정)으로 설정하여 제출
- 기간: **6/16(월) 자정** (일요일 제출에서 월요일 제출로 변경했습니다.)
- 문의사항은 slack dm으로 요청주세요!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
