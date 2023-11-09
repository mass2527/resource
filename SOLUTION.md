## 라이브러리 사용 배경

실제로 비슷한 기능을 구현해야 한다고 가정했을 때, 리소스를 데이터베이스에 저장할 필요가 있습니다. 이를 위해 [msw](https://www.npmjs.com/package/msw)라는 API mocking 라이브러리를 사용하여 비슷한 환경을 재현했습니다. 또한, 실제로는 많은 리소스 관련 API가 필요할 것으로 예상되며, 이러한 서버 상태를 효과적으로 관리하기 위해 [@tanstack/react-query](https://tanstack.com/query/latest)를 도입하였습니다.

## 리소스 추가 기능 구현

### 리소스 인터페이스

```typescript
type Resource = {
  id: string;
  type: "url" | "image";
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};
```

사용자가 리소스의 이름을 변경하더라도 이전의 리소스를 계속해서 표시해야 했기 때문에, 사용자에게 표시되는 이름은 `name`으로 정의하였고, 실제 URL 또는 이미지 리소스의 URL은 `url`로 정의하였습니다. 또한, 최신순으로 정렬하기 위해 `createdAt`을 추가하였습니다.

### url 리소스

정규식을 활용하여 요구 사항을 구현하였으며, 중복된 URL을 허용하지 않도록 기능을 추가하였습니다. 관련 로직은 `UrlResourceCreateButton.tsx`에서 자세히 확인할 수 있습니다.

### image 리소스

사용자가 `.png` 또는 `.jpg` 이미지만 선택할 수 있도록 `input` 요소의 `accept` 속성을 활용하였고, 이를 지원하지 않는 브라우저를 위해 `onChange` 이벤트가 발생할 때 추가 검증을 진행하였습니다. 여러 이미지를 입력할 수 있도록 `input` 요소의 `multiple` 속성도 활용하였으며, 관련 로직은 `ImageResourceCreateButton.tsx`에서 자세히 확인할 수 있습니다.

### 리소스 등록 validation

랜덤 딜레이 기능을 구현하기 위해 `delay`와 `getRandomIntInclusive` 함수를 구현하였으며, 이를 활용한 로직은 `handlers.ts`의 36번 라인에서 확인할 수 있습니다. 성공과 실패 토스트를 `alert`을 통해 구현하였습니다.

### 리소스 뷰어

리소스를 클릭하면 해당 리소스를 뷰어에서 표시해야 하며, 요구 사항을 고려할 때 선택된 리소스의 URL만 필요하다고 판단했습니다. 이 상태는 사이드바 및 뷰어에서 공유되는 등 여러 컴포넌트에서 사용되므로 전역 상태로 관리하는 것이 유지보수에 도움이 될 것이라고 판단했습니다. 따라서, 이 상태를 jotai의 `atom`을 사용하여 관리하였습니다.
