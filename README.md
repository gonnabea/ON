# Our Now (ON)

## 간략 소개

- 카카오톡과 같이 실시간 채팅 기능을 중심으로 다양한 기능을 담은 웹앱입니다.

## 사용 기술 스택

- [x] MySQL Sequlize 💎
- [x] Express.js
- [x] React.js (Styled-Components, Hooks, Context-API)
- [x] Node.js
- [x] Socket.io (Node.js, Flask-Socket.io)
- [x] Passport.js
- [x] WebRTC (Peerjs)
- [x] Flask
- [x] OpenCV
- [x] Heroku (for Node.js API)
- [ ] AWS (for Flask API)

- 본 프로젝트의 **주 목적은 RDBMS: MySQL, webSocket에 대한 학습**이며,
  Express.js + React.js의 조합에 익숙해지기 위해 구상한 사이드 프로젝트입니다.

## 기본 기능

- [x] 로그인
- [x] Peer to Peer 채팅방
- [x] 채팅
- [x] 접속상태 표시
- [x] 상태 메세지 설정
- [x] 단톡방 구현
- [x] 배포
- [x] 화상채팅 (WebRTC) 💎
- [ ] 유저 프로필 사진 (📌진행중)
- [x] 얼굴인식
- [ ] 메세지 읽음 숫자
- [ ] 공지
- [ ] 파일 전송 (이미지, 영상)

## 추가 기능

- [ ] 유저 차단기능
- [ ] 이모티콘 전송
- [ ] 친한 친구 설정
- [ ] 실시간 채팅방 배경음 설정
- [ ] 채팅방 메세지 내역 다운로드

## 보너스

- [ ] 챗봇

#### 현재 해결할 문제

- [x] ~~메세지를 보낼 때마다 전체를 갱신하지 않고 송수신 처리된 부분만 갱신하는 방식으로 수정하기~~
- [x] ~~origin 메세지 시간순으로 정렬하기 (필수)~~
- [x] ~~메세지가 글로벌 소켓으로 전송되는 문제 (필수)~~
- [x] ~~모든 api 정리하기~~
- [x] ~~반응형 구현으로 모바일에서 사용 가능하게 만들기~~
- [ ] 화상채팅 룸 구별

#### 참고 자료

- 소켓 룸 생성 \
  https://gist.github.com/crtr0/2896891
- MySQL 데이터 수정 \
  https://stackoverflow.com/questions/8158244/how-to-update-a-record-using-sequelize-for-node
- MySQL Many-to-Many Relationship \
  https://bezkoder.com/sequelize-associate-many-to-many/

## 사용 스택에 대한 설명 / 정리

### 1. 왜 MySQL을 사용했는가?

저는 처음 접한 DB가 mongoDB였고 이 프로젝트 이전에는 다른 DB를 사용해본 적이 없었습니다
그런데 이번에 이 프로젝트에서는 DB형태가 SNS형식 (스키마간의 관계가 복잡하게 맺어져 있음) 이므로
RDBMS가 적합할 것 같아 MySQL을 사용해보기로 했습니다

--

mongoDB와 같은 경우, 데이터를 연결할 때 테이블에 테이블을 통째로 붙여 하나의 테이블로 만들어버리는 구조를 가지고 있습니다
이는 RDBMS에 비해 용량을 많이 차지하지만, 쿼리를 수행할 때 RDBMS에 비해 빠른 속도를 낼 수 있습니다.

반면 MySQL과 같은 RDBMS는 용량을 적게 차지하지만 쿼리 속도가 느리겠죠.

--

또한 RDBMS는 엄격한 스키마 구조를 가지고 있습니다
엄격한 스키마 구조란, 한 번 스키마를 생성하고 나서는 마음대로 수정할 수 없는 것을 뜻합니다
이것은 원본 스키마 구조를 지켜줄 수 있는 안정성을 가지고 있지만, 유연성이 떨어지죠.

반면 mongoDB는 이 부분에서 자유로워 스키마를 생성하고 난 후에도 마음대로 **붙였다 땠다** 할 수 있습니다
(이것을 join, partition-tolerance 라고 하는데, mongoDB에서는 join이라는 개념이 없습니다. )

이말은 즉슨, RDBMS는 유연성이 낮지만 안정성이 좋고, mongoDB는 안정성은 비교적 낮지만 유연한 스키마 구조를 가지고 있다는 것을 뜻합니다.

--

이 프로젝트는 사실 실시간 데이터 교환이 활발하지만 테이블간의 관계가 많아 무엇을 선택해야 할 지 잘 몰랐습니다

제가 내린 결론은, 자주 변경되지 않는 스키마 구조를 가지고 있고, 스키마간의 관계가 많을 때 유리한 RDBMS가 더 적합하다고 생각헀습니다.
(물론 정답이라고 확신할 수는 없습니다)

그리고 프로젝트가 커질 수록 용량을 덜 차지하게 되는 RDBMS가 더 적합하다고 판단했습니다.

### 2. Node.js 사용 이유

본 프로젝트는 실시간 채팅, 영상 스트리밍이 주기능인 어플리케이션이므로 Node.js의 장점을 잘 살릴 수 있습니다.
Node.js는 event-driven, non-blocking I/O model을 사용하여 실시간 서비스에 유리합니다

아래는 노드 js의 특징입니다:

- Event-Based Server
  Real-time applications deal with many real-time users. Node.js development supports response depending on the event-driven server that assists in non-blocking functioning.

- Data Sync
  A Node.js developer makes the proper use of the non-blocking I/O feature. Data transmission between server and client shifts quickly.

- Scalable and Fast
  Since Node is a JavaScript-based program, it pulls the application faster like JS. Therefore, an application with the single-threaded model and the event loop can deal with several client requests easily.

- Sharing and Reusing
  Node.js is a real-time programming language that assists the microservice architecture. It allows developers to use the library code package again and share it in many projects. Moreover, it helps developers in fostering enhanced productivity and saving time.

- SEO Friendliness
  SEO is necessitous to exist in the digital world. In case you don’t want to lose out on SEO, then you should incorporate the Node in the app development tech stack. Node.js’s backend rendering increases engagement and provides the site more visibility.

The applications receive not just user experience and high speed but also a high-end performance that is important for ranking according to SEO features decided by Google.

- Proxy Server
  Node is also the best option where intermediary admins are needed. For using Node.js server as a proxy server, a developer requires adding a 20-line code and your app will become an ideal fir for assisting for streaming data from different sources.

Suitability of Node.js for Real-Time Application Development
The relevant framework can be Feather.JS or Express.JS. In Feather.JS, you will find good Socket.IO integration. Socket.IO library and Express.JS framework are required for developing an easy chat app by using Node.js.

Socket.IO
With real-time web apps, it performs like the top-notch JavaScript library. Between server and web clients, it creates a bi-directional and real-time connection by assisting developers. There is a client-side library in the browser, and for Node.js, there is a server-side library.

Both elements feature the same API. Like Node.js, it is event-driven. The Socket.IO offers the capacity of carrying out binary streaming, document collaboration, instant messaging, and real-time analytics.

Express.JS
It performs like a Node.js framework that utilizes many effective features that help organize the routing of the app. It can simply deal with any templating solution. Node.js’s basic functionality is increased by it. Moreover, it allows a better code organization.

### 3. WebRTC란?

- 실시간 스트리밍 기능을 구현하고 싶어 WebRTC 오픈소스를 찾게 되었습니다.

- 기존에 알고 있던 webSocket과 유사하다는 느낌 ( 클라이언트간의 실시간 데이터 교환 )을 받았고 차이점이 궁금하였습니다.

- 대표적인 차이점은, webSocket은 클라이언트가 요청을 보내면 "중계서버를 통하여" 해당 요청에 대한 응답을 타 모든 클라이언트에게 전달해주는 방식입니다.
  그러나 WebRTC는 클라이언트와 클라이언트가 "서버를 통하지 않고" 서로 연결되어 (Peer to Peer) 빠른 응답속도를 낼 수 있는 것입니다.

- 유튜브에서 본 WebRTC를 설명하는 내용, 흥미롭게도 영상에서 webSocket과 비교해주며 설명해줍니다.
  https://www.youtube.com/watch?v=2Z2PDsqgJP8&t=421s

WebRTC에 대한 기타 내용 정리

- 어떻게 서버를 통하지 않고 클라이언트끼리 연결을 하는가?
  최초에 서버가 각각 클라이언트들에게 연결하는 과정을 진행하고 그 후에는 관여하지 않습니다. 해당 프로젝트에서는 최초에 socket.io로 도움을 받아 클라이언트끼리 연결해주는 과정을 거칩니다

- 중계과정

- [x] Indentify (클라이언트 인식, 검증)
- [x] Type of Data (전송받은 데이터의 타입을 체크: 비디오인지 오디오인지 등등)
- [x] NAT traversal (Peer to Peer 컨넥션: 클라이언트간 연결해주는 기술이라고 하는데 자세히는 모름)
- [x] Security (데이터 Encrypt 과정)
- [x] Codec (데이터 압축)

- 특징

- [x] 주로 UDP를 사용: TCP와 UDP의 차이는 속도와 데이터 전송의 안정성에 주로 있는데, UDP는 안정성보다는 속도에 특화된 프로토콜이다 따라서 스트리밍 서비스나 액션 게임등에 적합합니다 (webSocket은 TCP를 사용)
- [x] 표준 프로토콜이 없습니다
- [x] 일부 브라우저에서 지원이 되지 않습니다 (ex) Firefox
      -> 그러나 adapter.js 라는 것을 이용하면 호환성을 개선할 수 있는 것으로 보입니다.

#### 결론

webSocket과 WebRTC의 특성을 비교하여 용도에 맞게 사용해주면 됩니다.

webSocket은 안정성
WebRTC는 속도
에 각각 무게가 실려있다는 것을 알 수 있습니다.

WebSocket으로도 영상 스트리밍을 구현할 수 있으나 WebRTC를 선호하는 것은 이 때문입니다.

- 참고자료

https://velog.io/@ehdrms2034/WebRTC-%EC%9B%B9%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EB%A1%9C-%ED%99%94%EC%83%81-%EC%B1%84%ED%8C%85%EC%9D%84-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EB%8B%A4%EA%B3%A0

### 4. React를 사용한 이유

실시간 채팅은 당연히 화면 렌더링을 자주할 수 밖에 없습니다.

채팅을 하나 보낼 때마다 화면에 변화된 것을 나타내주어야 하기 때문이죠.

리액트는 컴포넌트의 활용, api json data 처리, SPA 와 같은 유용한 특성을 가지고 있으나,
이 프로젝트에서 가장 유리한 점은
리액트는 리렌더링을 자주 해주기 용이한 구조를 가지고 있다는 것이라고 생각합니다.
