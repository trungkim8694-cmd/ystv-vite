import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(title: string, lang: 'vi' | 'zh' = 'vi'): string {
  if (!title) return '';
  
  let slug = title.toLowerCase();

  if (lang === 'vi') {
    // Remove Vietnamese accents
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    slug = slug.replace(/[đĐ]/g, 'd');
    
    // Replace special characters and spaces with hyphens
    slug = slug.replace(/([^0-9a-z-\s])/g, '');
  } else {
    // For Chinese, we keep the characters but remove special punctuation
    // This regex keeps alphanumeric characters and common CJK characters
    slug = slug.replace(/([^\u4e00-\u9fa5a-z0-9\s])/g, '');
  }

  // Replace spaces with hyphens
  slug = slug.replace(/(\s+)/g, '-');

  // Remove leading, trailing, and repeated hyphens
  slug = slug.replace(/-+/g, '-');
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}
