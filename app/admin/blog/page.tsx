import { Metadata } from 'next';
import Image from 'next/image';
import { mockPosts } from '@/lib/mock-data';
import Badge from '@/components/ui/Badge';
import { Edit, Trash2, Plus } from 'lucide-react';

export const metadata: Metadata = { title: 'Blog Management | Admin' };

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
          <p className="text-gray-500 text-sm">Create and manage blog posts</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockPosts.map(post => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
              <Image src={post.cover_image} alt={post.title} fill className="object-cover" sizes="64px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{post.title}</p>
              <p className="text-gray-400 text-xs mt-0.5">
                {post.category} &bull; {new Date(post.created_at).toLocaleDateString('en-NG')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={post.published ? 'green' : 'gray'}>
                {post.published ? 'Published' : 'Draft'}
              </Badge>
              <button className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Edit className="h-4 w-4" /></button>
              <button className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
