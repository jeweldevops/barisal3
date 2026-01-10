
export interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
}

export interface ManifestoPoint {
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
