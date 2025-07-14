import NotePreview from './NotePreview.client';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api/api';

interface Props {
  params: Promise<{ id: string }>;
}

const Preview = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(Number(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={Number(id)} />
    </HydrationBoundary>
  );
};

export default Preview;
