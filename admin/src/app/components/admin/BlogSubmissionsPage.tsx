import { useMemo, useState } from 'react';
import { CheckCircle2, Eye, Pencil, Search, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import type { BlogSubmission } from '../../lib/types';

interface BlogSubmissionsPageProps {
  blogs: BlogSubmission[];
  onUpdateBlog: (
    id: string,
    payload: {
      title?: string;
      category?: string;
      authorName?: string;
      authorEmail?: string;
      excerpt?: string;
      content?: string;
      tags?: string;
      reviewNotes?: string;
      status?: 'pending' | 'approved' | 'rejected';
    },
  ) => void;
}

function statusBadge(status: BlogSubmission['status']) {
  if (status === 'approved') return 'bg-green-100 text-green-700 border-green-200';
  if (status === 'rejected') return 'bg-red-100 text-red-700 border-red-200';
  return 'bg-amber-100 text-amber-700 border-amber-200';
}

export function BlogSubmissionsPage({ blogs, onUpdateBlog }: BlogSubmissionsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BlogSubmission['status']>('all');
  const [selectedBlog, setSelectedBlog] = useState<BlogSubmission | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'Stories',
    authorName: '',
    authorEmail: '',
    excerpt: '',
    content: '',
    tags: '',
    reviewNotes: '',
  });

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.authorEmail.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [blogs, searchTerm, statusFilter]);

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, author, email..."
            className="h-11 rounded-xl border-gray-200 pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | BlogSubmission['status'])}
          className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Author</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog) => (
              <tr key={blog.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{blog.title}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{blog.authorName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{blog.category}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusBadge(blog.status)}`}>
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{blog.date}</td>
                <td className="px-6 py-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-[#4CAF50] hover:bg-[#4CAF50]/10"
                    onClick={() => {
                      setSelectedBlog(blog);
                      setIsEditing(false);
                      setForm({
                        title: blog.title,
                        category: blog.category,
                        authorName: blog.authorName,
                        authorEmail: blog.authorEmail,
                        excerpt: blog.excerpt,
                        content: blog.content,
                        tags: blog.tags.join(', '),
                        reviewNotes: blog.reviewNotes || '',
                      });
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={!!selectedBlog}
        onOpenChange={() => {
          setSelectedBlog(null);
          setIsEditing(false);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle>Blog Submission Review</DialogTitle>
            <DialogDescription>Review, edit, and approve or reject submitted blogs.</DialogDescription>
          </DialogHeader>

          {selectedBlog ? (
            <div className="space-y-4">
              <div className="flex items-center justify-end">
                <Button
                  size="sm"
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="h-8 rounded-md border border-green-300 bg-green-50 px-3 text-green-700 hover:bg-green-100"
                >
                  <Pencil className="mr-1 h-4 w-4" />
                  {isEditing ? 'Stop Edit' : 'Edit'}
                </Button>
              </div>

              {selectedBlog.featuredImageUrl ? (
                <img
                  src={selectedBlog.featuredImageUrl}
                  alt={selectedBlog.title}
                  className="h-52 w-full rounded-xl object-cover"
                />
              ) : null}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Title</label>
                  <Input
                    disabled={!isEditing}
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Category</label>
                  <Input
                    disabled={!isEditing}
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Author Name</label>
                  <Input
                    disabled={!isEditing}
                    value={form.authorName}
                    onChange={(e) => setForm((prev) => ({ ...prev, authorName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Author Email</label>
                  <Input
                    disabled={!isEditing}
                    value={form.authorEmail}
                    onChange={(e) => setForm((prev) => ({ ...prev, authorEmail: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Excerpt</label>
                <Textarea
                  disabled={!isEditing}
                  value={form.excerpt}
                  onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Blog Content</label>
                <Textarea
                  disabled={!isEditing}
                  value={form.content}
                  onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                  className="min-h-[220px]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Tags</label>
                  <Input
                    disabled={!isEditing}
                    value={form.tags}
                    onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="comma separated tags"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Review Notes</label>
                  <Input
                    value={form.reviewNotes}
                    onChange={(e) => setForm((prev) => ({ ...prev, reviewNotes: e.target.value }))}
                    placeholder="internal notes for this blog"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  onClick={() => {
                    onUpdateBlog(selectedBlog.id, {
                      title: form.title,
                      category: form.category,
                      authorName: form.authorName,
                      authorEmail: form.authorEmail,
                      excerpt: form.excerpt,
                      content: form.content,
                      tags: form.tags,
                      reviewNotes: form.reviewNotes,
                      status: 'approved',
                    });
                  }}
                  className="rounded-xl bg-green-600 text-white hover:bg-green-700"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button
                  onClick={() => {
                    onUpdateBlog(selectedBlog.id, {
                      title: form.title,
                      category: form.category,
                      authorName: form.authorName,
                      authorEmail: form.authorEmail,
                      excerpt: form.excerpt,
                      content: form.content,
                      tags: form.tags,
                      reviewNotes: form.reviewNotes,
                      status: 'rejected',
                    });
                  }}
                  className="rounded-xl bg-red-600 text-white hover:bg-red-700"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    onUpdateBlog(selectedBlog.id, {
                      title: form.title,
                      category: form.category,
                      authorName: form.authorName,
                      authorEmail: form.authorEmail,
                      excerpt: form.excerpt,
                      content: form.content,
                      tags: form.tags,
                      reviewNotes: form.reviewNotes,
                      status: selectedBlog.status,
                    });
                  }}
                  className="rounded-xl"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => {
                    setSelectedBlog(null);
                    setIsEditing(false);
                  }}
                  className="rounded-xl bg-red-600 text-white hover:bg-red-700"
                >
                  Close
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
