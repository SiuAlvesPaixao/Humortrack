export type Mood = 1 | 2 | 3 | 4 | 5;

export interface MoodEntry {
  id?: number;
  date: string;   // YYYY-MM-DD
  mood: Mood;     // 1-5
  tags: string[];
  note?: string;
}
