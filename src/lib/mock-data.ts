export type SafetyLevel = "매우좋음" | "좋음" | "보통" | "나쁨";
export type WeatherIcon = "sunny" | "rainy" | "cloudy";

export interface City {
  slug: string;
  name: string;
  region: string;
  rank: number;
  score: number;
  monthlyCost: number;
  internetSpeed: number;
  workspaceCount: number;
  safety: SafetyLevel;
  weather: { temp: number; icon: WeatherIcon };
  tags: string[];
  rating: number;
  reviewCount: number;
  nomadCount: number;
  ktxTime: string;
  subsidy: string;
}

export const MOCK_CITIES: City[] = [
  {
    slug: "jeju",
    name: "제주시",
    region: "제주특별자치도",
    rank: 1,
    score: 91,
    monthlyCost: 150,
    internetSpeed: 450,
    workspaceCount: 42,
    safety: "매우좋음",
    weather: { temp: 18, icon: "sunny" },
    tags: ["#바다뷰", "#카페많음", "#자연풍경"],
    rating: 4.8,
    reviewCount: 234,
    nomadCount: 89,
    ktxTime: "없음(비행기 1시간)",
    subsidy: "제주 워케이션 지원금 있음",
  },
  {
    slug: "gangneung",
    name: "강릉",
    region: "강원도",
    rank: 2,
    score: 87,
    monthlyCost: 120,
    internetSpeed: 500,
    workspaceCount: 28,
    safety: "매우좋음",
    weather: { temp: 15, icon: "sunny" },
    tags: ["#바다뷰", "#커피거리", "#조용함"],
    rating: 4.7,
    reviewCount: 187,
    nomadCount: 62,
    ktxTime: "서울에서 2시간",
    subsidy: "강원 워케이션 프로그램 운영",
  },
  {
    slug: "busan",
    name: "부산",
    region: "부산광역시",
    rank: 3,
    score: 85,
    monthlyCost: 140,
    internetSpeed: 600,
    workspaceCount: 65,
    safety: "좋음",
    weather: { temp: 20, icon: "sunny" },
    tags: ["#해운대", "#대도시", "#맛집"],
    rating: 4.6,
    reviewCount: 312,
    nomadCount: 115,
    ktxTime: "서울에서 2.5시간",
    subsidy: "없음",
  },
  {
    slug: "gyeongju",
    name: "경주",
    region: "경상북도",
    rank: 4,
    score: 82,
    monthlyCost: 100,
    internetSpeed: 350,
    workspaceCount: 18,
    safety: "매우좋음",
    weather: { temp: 17, icon: "sunny" },
    tags: ["#역사유적", "#조용함", "#자전거"],
    rating: 4.5,
    reviewCount: 98,
    nomadCount: 34,
    ktxTime: "서울에서 2시간",
    subsidy: "경주 역사문화 체험 지원",
  },
  {
    slug: "yeosu",
    name: "여수",
    region: "전라남도",
    rank: 5,
    score: 80,
    monthlyCost: 110,
    internetSpeed: 380,
    workspaceCount: 22,
    safety: "좋음",
    weather: { temp: 19, icon: "sunny" },
    tags: ["#야경", "#해산물", "#케이블카"],
    rating: 4.5,
    reviewCount: 143,
    nomadCount: 48,
    ktxTime: "서울에서 3시간",
    subsidy: "여수 워케이션 지원 사업",
  },
  {
    slug: "sokcho",
    name: "속초",
    region: "강원도",
    rank: 6,
    score: 78,
    monthlyCost: 115,
    internetSpeed: 420,
    workspaceCount: 20,
    safety: "매우좋음",
    weather: { temp: 14, icon: "cloudy" },
    tags: ["#설악산", "#바다뷰", "#청정"],
    rating: 4.4,
    reviewCount: 89,
    nomadCount: 31,
    ktxTime: "서울에서 2.5시간(고속버스)",
    subsidy: "속초 관광 워케이션 패키지",
  },
  {
    slug: "jeonju",
    name: "전주",
    region: "전라북도",
    rank: 7,
    score: 76,
    monthlyCost: 95,
    internetSpeed: 400,
    workspaceCount: 25,
    safety: "좋음",
    weather: { temp: 16, icon: "cloudy" },
    tags: ["#한옥마을", "#맛집", "#문화"],
    rating: 4.3,
    reviewCount: 112,
    nomadCount: 42,
    ktxTime: "서울에서 1.5시간",
    subsidy: "전주 스마트워크 지원",
  },
  {
    slug: "tongyeong",
    name: "통영",
    region: "경상남도",
    rank: 8,
    score: 74,
    monthlyCost: 105,
    internetSpeed: 300,
    workspaceCount: 15,
    safety: "좋음",
    weather: { temp: 20, icon: "sunny" },
    tags: ["#섬", "#해산물", "#한국의나폴리"],
    rating: 4.3,
    reviewCount: 76,
    nomadCount: 28,
    ktxTime: "서울에서 3.5시간",
    subsidy: "없음",
  },
];

export const MOCK_REVIEWS = [
  {
    id: 1,
    userName: "김노마드",
    cityName: "제주시",
    duration: "3개월",
    rating: 5,
    tags: ["#카페", "#자연", "#추천"],
    summary: "제주도는 노마드의 천국입니다. 카페가 넘쳐나고 인터넷도 빠릅니다.",
    avatar: "김",
  },
  {
    id: 2,
    userName: "이원격",
    cityName: "강릉",
    duration: "1개월",
    rating: 4,
    tags: ["#바다뷰", "#조용함"],
    summary: "파도 소리 들으며 코딩하는 경험, 강릉에서만 가능합니다.",
    avatar: "이",
  },
  {
    id: 3,
    userName: "박재택",
    cityName: "부산",
    duration: "2개월",
    rating: 4,
    tags: ["#대도시", "#편의시설"],
    summary: "대도시 인프라와 바다를 동시에 누릴 수 있는 최고의 선택.",
    avatar: "박",
  },
];

export const SEASONAL_CITIES = {
  spring: [
    { name: "경주", reason: "벚꽃과 유적지 산책", avgTemp: "14~20°C", score: 82 },
    { name: "전주", reason: "한옥마을 봄 축제", avgTemp: "12~18°C", score: 76 },
    { name: "제주시", reason: "유채꽃과 한라산 트레킹", avgTemp: "12~18°C", score: 91 },
  ],
  summer: [
    { name: "강릉", reason: "경포대 해수욕장", avgTemp: "24~30°C", score: 87 },
    { name: "속초", reason: "설악산 계곡과 바다", avgTemp: "22~28°C", score: 78 },
    { name: "여수", reason: "밤바다 야경", avgTemp: "26~32°C", score: 80 },
  ],
  autumn: [
    { name: "경주", reason: "단풍과 역사 유적", avgTemp: "14~20°C", score: 82 },
    { name: "통영", reason: "쪽빛 바다와 가을 하늘", avgTemp: "18~24°C", score: 74 },
    { name: "전주", reason: "가을 한옥마을 감성", avgTemp: "12~18°C", score: 76 },
  ],
  winter: [
    { name: "제주시", reason: "따뜻한 겨울, 동백꽃", avgTemp: "8~14°C", score: 91 },
    { name: "부산", reason: "온화한 기후와 따뜻한 음식", avgTemp: "6~12°C", score: 85 },
    { name: "여수", reason: "겨울 바다와 야경", avgTemp: "4~10°C", score: 80 },
  ],
};
