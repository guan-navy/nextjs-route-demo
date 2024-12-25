import sql from 'better-sqlite3';
import { News } from '@/src/types/news';
import { DUMMY_NEWS } from "@/dummy-news";

const db = sql('data.db');

export async function getAllNews(): Promise<News[]> {
  const news = db.prepare('SELECT * FROM news').all() as News[];
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}

export async function getNewsItem(slug: string): Promise<News | undefined> {
  const newsItem = db.prepare('SELECT * FROM news WHERE slug = ?').get(slug) as News | undefined;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return newsItem;
}

export async function getLatestNews(): Promise<News[]> {
  const latestNews = db.prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3').all() as News[];
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return latestNews;
}

export async function getAvailableNewsYears() {
  interface YearRow {
    year: string;
  }

  const rows = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all() as YearRow[];

  const years = rows.map((year) => year.year);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return years;
}

export function getAvailableNewsMonths(year: string) {
  interface MonthRow {
    month: string;
  }

  const months = db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year) as MonthRow[];

  return months.map((month) => month.month);
}

export async function getNewsForYear(year: string): Promise<typeof DUMMY_NEWS> {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year) as typeof DUMMY_NEWS;

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}

export async function getNewsForYearAndMonth(year: string, month: string): Promise<typeof DUMMY_NEWS> {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month) as typeof DUMMY_NEWS;

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}