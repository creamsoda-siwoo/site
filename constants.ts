
import { Site, Category } from './types';

export const CATEGORIES: Category[] = [
  '전체',
  '즐겨찾기',
  'AI/도구',
  '공공/민원',
  '생활/편의',
  '금융/부동산',
  '쇼핑/여행',
  '취업/직장',
  '미디어/정보',
  '개발/IT',
  '디자인/이미지',
  '학습/자기계발',
  '기타'
];

export const SITES: Site[] = [
  // AI/도구 (New Category)
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI의 대화형 AI, 글쓰기, 코딩, 번역 등 다용도 활용',
    url: 'https://chat.openai.com/',
    category: 'AI/도구',
    tags: ['AI', '챗봇', 'GPT'],
    popular: true
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google의 멀티모달 AI, 텍스트, 이미지, 영상 처리',
    url: 'https://gemini.google.com/',
    category: 'AI/도구',
    tags: ['구글', 'AI', '바드'],
    popular: true
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic의 AI, 자연스러운 한국어 대화와 긴 문맥 이해',
    url: 'https://claude.ai/',
    category: 'AI/도구',
    tags: ['AI', '글쓰기', '요약']
  },
  {
    id: 'deepl',
    name: 'DeepL',
    description: '세계에서 가장 정확한 AI 번역기',
    url: 'https://www.deepl.com/',
    category: 'AI/도구',
    tags: ['번역', '영어', 'AI'],
    popular: true
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: '출처를 제공하는 실시간 AI 검색 엔진',
    url: 'https://www.perplexity.ai/',
    category: 'AI/도구',
    tags: ['검색', '질문', 'AI']
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: '고품질 AI 이미지 생성 툴 (디스코드 기반)',
    url: 'https://www.midjourney.com/',
    category: 'AI/도구',
    tags: ['그림', '생성', '예술']
  },
  {
    id: 'gamma',
    name: 'Gamma',
    description: 'AI로 만드는 PPT, 문서, 웹사이트 자동 생성',
    url: 'https://gamma.app/',
    category: 'AI/도구',
    tags: ['PPT', '발표', '문서']
  },
  {
    id: 'liner',
    name: 'Liner',
    description: 'AI 검색 및 하이라이트, 리서치 보조 도구',
    url: 'https://getliner.com/',
    category: 'AI/도구',
    tags: ['검색', '공부', '논문']
  },
  {
    id: 'wrtn',
    name: '뤼튼',
    description: '한국어 특화 생성형 AI 포털 서비스',
    url: 'https://wrtn.ai/',
    category: 'AI/도구',
    tags: ['한국어', '챗봇', '창작']
  },

  // 공공/민원
  {
    id: 'gov24',
    name: '정부24',
    description: '주민등록등본, 전입신고 등 24시간 민원 서비스',
    url: 'https://www.gov.kr/',
    category: '공공/민원',
    tags: ['등본', '행정', '민원'],
    popular: true
  },
  {
    id: 'hometax',
    name: '국세청 홈택스',
    description: '세금 신고/납부, 연말정산, 현금영수증 조회',
    url: 'https://www.hometax.go.kr/',
    category: '공공/민원',
    tags: ['세금', '연말정산', '사업자']
  },
  {
    id: 'efine',
    name: '경찰청 이파인',
    description: '교통범칙금, 과태료 조회 및 납부, 운전면허 조회',
    url: 'https://www.efine.go.kr/',
    category: '공공/민원',
    tags: ['경찰', '과태료', '면허']
  },
  {
    id: 'internet-post',
    name: '인터넷우체국',
    description: '우편번호 검색, 택배 예약, 등기 조회',
    url: 'https://www.epost.go.kr/',
    category: '공공/민원',
    tags: ['우편', '택배', '배송']
  },
  {
    id: 'scourt',
    name: '대법원 인터넷등기소',
    description: '부동산 등기부등본 열람 및 발급, 법인 등기',
    url: 'http://www.iros.go.kr/',
    category: '공공/민원',
    tags: ['등기', '부동산', '법원']
  },
  {
    id: 'safekorea',
    name: '국민재난안전포털',
    description: '재난 발생 시 행동요령, 민방위 대피소 위치 확인',
    url: 'https://www.safekorea.go.kr/',
    category: '공공/민원',
    tags: ['안전', '재난', '민방위']
  },
  {
    id: 'worknet',
    name: '워크넷',
    description: '고용노동부 운영 채용정보 및 직업심리검사',
    url: 'https://www.work.go.kr/',
    category: '공공/민원',
    tags: ['취업', '국가', '채용']
  },

  // 생활/편의
  {
    id: 'naver-map',
    name: '네이버 지도',
    description: '길찾기, 대중교통 정보, 내비게이션, 거리뷰',
    url: 'https://map.naver.com/',
    category: '생활/편의',
    tags: ['지도', '교통', '길찾기'],
    popular: true
  },
  {
    id: 'kakao-map',
    name: '카카오맵',
    description: '실시간 버스/지하철 위치, 로드뷰, 맛집 리뷰',
    url: 'https://map.kakao.com/',
    category: '생활/편의',
    tags: ['지도', '내비', '교통']
  },
  {
    id: 'papago',
    name: '파파고',
    description: 'AI 기반 다국어 번역 (한국어-영어-일어-중국어)',
    url: 'https://papago.naver.com/',
    category: '생활/편의',
    tags: ['번역', '어학', '영어'],
    popular: true
  },
  {
    id: 'naver-clock',
    name: '네이버 시계',
    description: '수강신청, 티켓팅 필수! 초 단위 서버 시간',
    url: 'https://time.naver.com/',
    category: '생활/편의',
    tags: ['시계', '티켓팅', '시간']
  },
  {
    id: 'kma',
    name: '기상청 날씨누리',
    description: '공식 일기예보, 태풍, 지진, 미세먼지 정보',
    url: 'https://www.weather.go.kr/',
    category: '생활/편의',
    tags: ['날씨', '기상', '예보']
  },
  {
    id: 'customs',
    name: '관세청 유니패스',
    description: '해외직구 통관 조회, 개인통관고유부호 발급',
    url: 'https://unipass.customs.go.kr/',
    category: '생활/편의',
    tags: ['직구', '통관', '관세']
  },
  {
    id: 'koroad',
    name: '안전운전 통합민원',
    description: '운전면허 발급/갱신, 국제면허 신청',
    url: 'https://www.safedriving.or.kr/',
    category: '생활/편의',
    tags: ['면허', '운전', '경찰']
  },

  // 금융/부동산
  {
    id: 'hogangnono',
    name: '호갱노노',
    description: '아파트 실거래가, 시세 지도, 입주민 이야기',
    url: 'https://hogangnono.com/',
    category: '금융/부동산',
    tags: ['부동산', '아파트', '시세'],
    popular: true
  },
  {
    id: 'naver-land',
    name: '네이버 부동산',
    description: '부동산 매물 확인, 분양 정보, 시세 조회',
    url: 'https://land.naver.com/',
    category: '금융/부동산',
    tags: ['매물', '전세', '월세']
  },
  {
    id: 'fine',
    name: '파인 (금융소비자포털)',
    description: '잠자는 내 돈 찾기, 카드 포인트 통합 조회',
    url: 'https://fine.fss.or.kr/',
    category: '금융/부동산',
    tags: ['금융', '예금', '보험']
  },
  {
    id: 'kb-land',
    name: 'KB부동산',
    description: 'KB시세, 매물, 통계, 세금 계산기',
    url: 'https://kbland.kr/',
    category: '금융/부동산',
    tags: ['은행', '시세', '대출']
  },
  {
    id: 'bok',
    name: '한국은행 경제통계',
    description: '환율, 금리, 물가 등 주요 경제 지표 확인',
    url: 'https://ecos.bok.or.kr/',
    category: '금융/부동산',
    tags: ['경제', '환율', '통계']
  },
  {
    id: 'card-point',
    name: '카드포인트 통합조회',
    description: '여신금융협회 카드 포인트 통합 조회 및 계좌 입금',
    url: 'https://www.cardpoint.or.kr/',
    category: '금융/부동산',
    tags: ['카드', '돈', '포인트']
  },

  // 쇼핑/여행
  {
    id: 'danawa',
    name: '다나와',
    description: '컴퓨터, 가전, 자동차 등 최저가 가격비교',
    url: 'https://www.danawa.com/',
    category: '쇼핑/여행',
    tags: ['가격비교', '쇼핑', '최저가'],
    popular: true
  },
  {
    id: 'ppomppu',
    name: '뽐뿌',
    description: '가성비 정보, 핫딜, 휴대폰 포럼',
    url: 'https://www.ppomppu.co.kr/',
    category: '쇼핑/여행',
    tags: ['커뮤니티', '핫딜', '정보']
  },
  {
    id: 'korail',
    name: '레츠코레일',
    description: 'KTX, 새마을, 무궁화호 기차 예매',
    url: 'https://www.letskorail.com/',
    category: '쇼핑/여행',
    tags: ['기차', 'KTX', '여행'],
    popular: true
  },
  {
    id: 'srt',
    name: 'SRT 예매',
    description: '수서고속철도 SRT 승차권 예약',
    url: 'https://etk.srail.kr/',
    category: '쇼핑/여행',
    tags: ['기차', 'SRT', '교통']
  },
  {
    id: 'skyscanner',
    name: '스카이스캐너',
    description: '전 세계 항공권, 호텔, 렌터카 최저가 비교',
    url: 'https://www.skyscanner.co.kr/',
    category: '쇼핑/여행',
    tags: ['항공권', '여행', '해외']
  },
  {
    id: 'joonggonara',
    name: '중고나라',
    description: '대한민국 최대 중고 거래 플랫폼',
    url: 'https://web.joongna.com/',
    category: '쇼핑/여행',
    tags: ['중고', '거래', '장터']
  },
  {
    id: 'agoda',
    name: '아고다',
    description: '전 세계 호텔 및 숙소 예약 최저가',
    url: 'https://www.agoda.com/',
    category: '쇼핑/여행',
    tags: ['호텔', '숙박', '여행']
  },

  // 취업/직장
  {
    id: 'saramin',
    name: '사람인',
    description: '채용 공고, 연봉 정보, 이력서 컨설팅',
    url: 'https://www.saramin.co.kr/',
    category: '취업/직장',
    tags: ['취업', '채용', '구인'],
    popular: true
  },
  {
    id: 'jobkorea',
    name: '잡코리아',
    description: '취업, 알바, 채용 정보 및 기업 분석',
    url: 'https://www.jobkorea.co.kr/',
    category: '취업/직장',
    tags: ['취업', '이직', '공채']
  },
  {
    id: 'wanted',
    name: '원티드',
    description: '디지털 직군 추천 채용, 연봉 데이터',
    url: 'https://www.wanted.co.kr/',
    category: '취업/직장',
    tags: ['스타트업', '개발', '이직']
  },
  {
    id: 'blind',
    name: '블라인드',
    description: '직장인 익명 커뮤니티, 회사 리뷰',
    url: 'https://www.teamblind.com/kr/',
    category: '취업/직장',
    tags: ['커뮤니티', '리뷰', '연봉']
  },
  {
    id: 'ei-go',
    name: '고용보험',
    description: '실업급여 신청, 모성보호, 고용안정 지원금',
    url: 'https://www.ei.go.kr/',
    category: '취업/직장',
    tags: ['보험', '실업급여', '지원금']
  },

  // 미디어/정보
  {
    id: 'namuwiki',
    name: '나무위키',
    description: '한국어 위키, 다양한 분야의 정보와 지식',
    url: 'https://namu.wiki/',
    category: '미디어/정보',
    tags: ['위키', '백과', '정보'],
    popular: true
  },
  {
    id: 'youtube',
    name: '유튜브',
    description: '동영상 공유 플랫폼, 강의, 엔터테인먼트',
    url: 'https://www.youtube.com/',
    category: '미디어/정보',
    tags: ['영상', '강의', '음악']
  },
  {
    id: 'riss',
    name: 'RISS',
    description: '학술연구정보서비스, 논문 검색 및 열람',
    url: 'http://www.riss.kr/',
    category: '미디어/정보',
    tags: ['논문', '학술', '연구']
  },
  {
    id: 'bigkinds',
    name: '빅카인즈',
    description: '한국언론진흥재단 뉴스 빅데이터 분석',
    url: 'https://www.bigkinds.or.kr/',
    category: '미디어/정보',
    tags: ['뉴스', '데이터', '신문']
  },

  // 개발/IT
  {
    id: 'github',
    name: 'GitHub',
    description: '세계 최대의 오픈소스 코드 저장소',
    url: 'https://github.com/',
    category: '개발/IT',
    tags: ['개발', '코드', '오픈소스']
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    description: '개발자들의 질문답변 커뮤니티',
    url: 'https://stackoverflow.com/',
    category: '개발/IT',
    tags: ['개발', '질문', '버그']
  },
  {
    id: 'programmers',
    name: '프로그래머스',
    description: '개발자 채용, 코딩 테스트 연습',
    url: 'https://programmers.co.kr/',
    category: '개발/IT',
    tags: ['코딩', '테스트', '교육']
  },
  {
    id: 'dev-kr',
    name: 'Dev.to (Korea)',
    description: '글로벌 개발자 커뮤니티',
    url: 'https://dev.to/',
    category: '개발/IT',
    tags: ['블로그', '기술', '트렌드']
  },

  // 디자인/이미지
  {
    id: 'miricanvas',
    name: '미리캔버스',
    description: '저작권 걱정 없는 무료 디자인 툴 (PPT, 썸네일)',
    url: 'https://www.miricanvas.com/',
    category: '디자인/이미지',
    tags: ['디자인', 'PPT', '템플릿'],
    popular: true
  },
  {
    id: 'pinterest',
    name: '핀터레스트',
    description: '전 세계 디자이너들의 레퍼런스 및 아이디어',
    url: 'https://www.pinterest.co.kr/',
    category: '디자인/이미지',
    tags: ['영감', '이미지', '참고']
  },
  {
    id: 'removebg',
    name: 'Remove.bg',
    description: '이미지 배경 제거(누끼 따기) 자동화 툴',
    url: 'https://www.remove.bg/ko',
    category: '디자인/이미지',
    tags: ['이미지', '편집', '배경']
  },
  {
    id: 'flaticon',
    name: 'Flaticon',
    description: '무료 벡터 아이콘 다운로드 사이트',
    url: 'https://www.flaticon.com/',
    category: '디자인/이미지',
    tags: ['아이콘', '벡터', '디자인']
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    description: '고해상도 무료 이미지 스톡 사이트',
    url: 'https://unsplash.com/',
    category: '디자인/이미지',
    tags: ['사진', '배경', '무료']
  },

  // 학습/자기계발
  {
    id: 'inflearn',
    name: '인프런',
    description: 'IT, 프로그래밍, 업무 스킬 온라인 강의',
    url: 'https://www.inflearn.com/',
    category: '학습/자기계발',
    tags: ['강의', 'IT', '공부'],
    popular: true
  },
  {
    id: 'kmooc',
    name: 'K-MOOC',
    description: '국가평생교육진흥원 운영 한국형 온라인 공개강좌',
    url: 'http://www.kmooc.kr/',
    category: '학습/자기계발',
    tags: ['무료', '대학', '강의']
  },
  {
    id: 'class101',
    name: '클래스101',
    description: '취미부터 커리어까지 다양한 온라인 클래스',
    url: 'https://class101.net/',
    category: '학습/자기계발',
    tags: ['취미', '부업', '클래스']
  },
  {
    id: 'smallpdf',
    name: 'SmallPDF',
    description: 'PDF 변환, 합치기, 압축 등 PDF 관련 툴',
    url: 'https://smallpdf.com/kr',
    category: '학습/자기계발',
    tags: ['PDF', '문서', '변환']
  },
  {
    id: 'korea-history',
    name: '한국사능력검정시험',
    description: '국사편찬위원회 한국사 시험 접수',
    url: 'https://www.historyexam.go.kr/',
    category: '학습/자기계발',
    tags: ['자격증', '역사', '시험']
  }
];
