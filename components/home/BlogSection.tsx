import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { mockPosts } from '@/lib/mock-data';
import { format } from 'date-fns';

export default function BlogSection() {
  const posts = mockPosts.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">Latest News & Insights</h2>
            <p className="text-gray-600">Stay informed with the Nigerian property market</p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1 text-primary font-semibold hover:underline"
          >
            View All Posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden">
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
                  <h3 className="font-bold text-gray-800 hover:text-primary transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(new Date(post.created_at), 'MMM dd, yyyy')}
                  {post.author && <span className="ml-2">by {post.author.full_name}</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
