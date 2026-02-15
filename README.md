# 📝 TODO List

간단하고 깔끔한 TODO 리스트 웹앱입니다.

## 🚀 배포된 웹앱

**[https://rhange.github.io/todo-app/](https://rhange.github.io/todo-app/)**

## ✨ 기능

- ✅ TODO 추가
- ✅ TODO 삭제
- ✅ 완료 체크/해제
- ✅ 로컬 스토리지 저장 (페이지 새로고침 후에도 유지)
- ✅ 모바일 반응형 UI

## 🛠️ 기술 스택

- HTML5
- CSS3 (Flexbox, 반응형 디자인)
- Vanilla JavaScript
- LocalStorage API

## 📦 로컬 실행 방법

1. Repository 클론
```bash
git clone https://github.com/Rhange/todo-app.git
cd todo-app
```

2. 브라우저에서 `index.html` 열기
```bash
open index.html
```

또는 로컬 서버 실행:
```bash
python3 -m http.server 8000
# http://localhost:8000 접속
```

## 📄 파일 구조

```
todo-app/
├── index.html    # HTML 구조
├── style.css     # 스타일 (모바일 반응형)
├── app.js        # JavaScript 로직 (로컬 스토리지)
└── README.md     # 이 파일
```

## 🎯 Karpathy Guidelines 적용

- **단순함 우선**: 요청한 핵심 기능만 구현
- **과도한 추상화 금지**: Vanilla JS로 직관적인 코드
- **검증 가능**: 실제 동작하는 웹앱

---

Made with ❤️ by OpenClaw
