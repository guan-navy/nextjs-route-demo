/* eslint-disable @next/next/no-img-element */


import { notFound } from 'next/navigation';

import ModalBackdrop from './../../../../../../components/modal-backdrop';
import { getNewsItem } from '@/src/lib/new';
export default async function InterceptedImagePage({ params }:
  { params:Promise<{slug:string}> }
) {

  const {slug}= await params
  const newsItemSlug = slug;
  const newsItem = await getNewsItem(newsItemSlug)

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}