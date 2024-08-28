import {useTranslations} from 'next-intl';
 
export default function NotFoundPage() {
  console.log('Not Found');
  const t = useTranslations('NotFoundPage');
  return <div></div>;
}