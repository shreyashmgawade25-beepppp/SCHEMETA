export type User = { id: number; name: string; email: string; role: string; state?: string | null; district?: string | null; business_category?: string | null; preferred_language: string };
export type Scheme = { id: number; name: string; summary: string; category: string; state: string; eligibility: string; benefits: string; documents: string; application_steps: string; official_url?: string | null; source_name?: string | null; verification_status: string };
export type Lesson = { id: number; title: string; category: string; language: string; level: string; content: string };
