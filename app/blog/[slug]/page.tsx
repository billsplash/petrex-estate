import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { mockPosts } from '@/lib/mock-data';
import { format } from 'date-fns';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = mockPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = mockPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = mockPosts.filter((p) => p.slug !== slug && p.published).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="flex items-center gap-2 text-primary hover:underline mb-6 text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      {post.category && (
        <span className="inline-block bg-primary-50 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
          {post.category}
        </span>
      )}

      <h1 className="text-3xl font-bold text-primary mb-4">{post.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {format(new Date(post.created_at), 'MMMM dd, yyyy')}
        </span>
        {post.author && (
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {post.author.full_name}
          </span>
        )}
      </div>

      <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-8">
        <Image
          src={post.cover_image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
          priority
        />
      </div>

      <div
        className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {related.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.id} href={`/blog/${r.slug}`} className="group">
                <div className="relative h-36 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={r.cover_image}
                    alt={r.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 30vw"
                  />
                </div>
                <p className="font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-2 text-sm">
                  {r.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
