
export type Category = 
  | '전체' 
  | '즐겨찾기'
  | 'AI/도구'
  | '공공/민원' 
  | '생활/편의' 
  | '금융/부동산'
  | '쇼핑/여행'
  | '취업/직장'
  | '미디어/정보'
  | '디자인/이미지' 
  | '개발/IT' 
  | '학습/자기계발'
  | '기타';

export interface Site {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category; // Simply use Category type
  tags: string[];
  popular?: boolean;
  isCustom?: boolean; // Flag for user-added sites
}
