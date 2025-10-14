import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato - Fractalverse',
  description: 'Entre em contato conosco para dúvidas, sugestões ou colaborações. Estamos sempre abertos para ouvir a comunidade de entusiastas de fractais.',
  keywords: ['contato', 'suporte', 'colaboração', 'fractais', 'feedback'],
  openGraph: {
    title: 'Contato - Fractalverse',
    description: 'Entre em contato conosco para dúvidas, sugestões ou colaborações.',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
