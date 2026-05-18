export type Budget = "under100" | "100to200" | "over200";
export type RegionFilter = "수도권" | "경상도" | "전라도" | "강원도" | "제주도" | "충청도";
export type Environment = "자연친화" | "도심선호" | "카페작업" | "코워킹 필수";
export type Season = "봄" | "여름" | "가을" | "겨울";

export interface City {
  slug: string;
  name: string;
  region: string;
  budget: Budget;
  regionFilter: RegionFilter;
  environment: Environment[];
  bestSeason: Season;
  likes: number;
  dislikes: number;
}

export const MOCK_CITIES: City[] = [
  {
    slug: "jeju",
    name: "제주시",
    region: "제주특별자치도",
    budget: "100to200",
    regionFilter: "제주도",
    environment: ["자연친화", "카페작업"],
    bestSeason: "봄",
    likes: 234,
    dislikes: 12,
  },
  {
    slug: "gangneung",
    name: "강릉",
    region: "강원도",
    budget: "100to200",
    regionFilter: "강원도",
    environment: ["자연친화", "카페작업"],
    bestSeason: "여름",
    likes: 187,
    dislikes: 8,
  },
  {
    slug: "busan",
    name: "부산",
    region: "부산광역시",
    budget: "100to200",
    regionFilter: "경상도",
    environment: ["도심선호", "카페작업"],
    bestSeason: "가을",
    likes: 312,
    dislikes: 15,
  },
  {
    slug: "gyeongju",
    name: "경주",
    region: "경상북도",
    budget: "under100",
    regionFilter: "경상도",
    environment: ["자연친화"],
    bestSeason: "봄",
    likes: 98,
    dislikes: 5,
  },
  {
    slug: "yeosu",
    name: "여수",
    region: "전라남도",
    budget: "100to200",
    regionFilter: "전라도",
    environment: ["자연친화", "카페작업"],
    bestSeason: "여름",
    likes: 143,
    dislikes: 9,
  },
  {
    slug: "sokcho",
    name: "속초",
    region: "강원도",
    budget: "100to200",
    regionFilter: "강원도",
    environment: ["자연친화", "코워킹 필수"],
    bestSeason: "여름",
    likes: 89,
    dislikes: 4,
  },
  {
    slug: "jeonju",
    name: "전주",
    region: "전라북도",
    budget: "under100",
    regionFilter: "전라도",
    environment: ["카페작업", "코워킹 필수"],
    bestSeason: "봄",
    likes: 112,
    dislikes: 7,
  },
  {
    slug: "tongyeong",
    name: "통영",
    region: "경상남도",
    budget: "100to200",
    regionFilter: "경상도",
    environment: ["자연친화"],
    bestSeason: "가을",
    likes: 76,
    dislikes: 6,
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
