import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import { mockPosts } from '@/lib/mock-data';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Real estate news, tips, and market insights for Nigerian property seekers.',
};

export default function BlogPage() {
  const posts = mockPosts.filter((p) => p.published);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary mb-2">Blog & Insights</h1>
        <p className="text-gray-600">Expert advice and market updates for Nigerian property seekers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
            <Link href={`/blog/${post.slug}`} className="block relative h-52 overflow-hidden">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </Link>
            <div className="p-5">
              {post.category && (
                <span className="inline-block bg-primary-50 text-primary text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                  {post.category}
                </span>
              )}
              <Link href={`/blog/${post.slug}`}>
                <h2 className="font-bold text-gray-800 hover:text-primary transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(new Date(post.created_at), 'MMM dd, yyyy')}
                </span>
                {post.author && (
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {post.author.full_name}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
