import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getBaseUrl(){
  return process.env.NEXT_PUBLIC_BASE_URL ?? 'https://ckdoestech.com';
}