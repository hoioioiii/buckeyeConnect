import MainFeed from "@/components/ui/main-feed";
import { redirect } from 'next/navigation';

export default function Home() {
  /* In the meantime I am directing to the main feed */
  /* For the future we need a landing page / signin */
  redirect('/feed');
}