import { redirect } from 'next/navigation';

export default function Home() {
  /* Redirects to main feed for now */
  /* TODO: have a main landing page / sign-in */
  redirect('/pages/login');
}