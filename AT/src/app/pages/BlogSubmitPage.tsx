import { FormEvent, useState } from 'react';
import { ArrowRight, ImagePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { submitBlog } from '../lib/api';
import { toast } from 'sonner';
import sectionBackground from '../../assets/back.jpg';

const categories = ['Stories', 'Spirituality', 'Self-Excellence', 'Sustainability', 'Community'];

export function BlogSubmitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'Stories',
    authorName: '',
    authorEmail: '',
    excerpt: '',
    content: '',
    tags: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const pageBackgroundStyle = {
    backgroundImage: `url(${sectionBackground})`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  } as const;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!imageFile) {
      toast.error('Please upload one image for your blog');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitBlog({
        ...form,
        image: imageFile,
      });
      setForm({
        title: '',
        category: 'Stories',
        authorName: '',
        authorEmail: '',
        excerpt: '',
        content: '',
        tags: '',
      });
      setImageFile(null);
      toast.success('Blog submitted successfully. It is now pending admin approval.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to submit blog';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16" style={pageBackgroundStyle}>
      <section className="mx-auto max-w-[1100px] px-4">
        <header className="mx-auto mb-8 max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-[#0f2d57] md:text-5xl">Share Your Story</h1>
          <p className="mt-4 text-lg leading-8 text-gray-700">
            Upload one image and write your blog. Our admin team will review, edit if needed, and publish after approval.
          </p>
        </header>

        <div className="rounded-3xl border border-[#d7e5dc] bg-white/75 p-6 shadow-sm backdrop-blur-sm md:p-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Blog Title</label>
                <Input
                  required
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter blog title"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Your Name</label>
                <Input
                  required
                  value={form.authorName}
                  onChange={(e) => setForm((prev) => ({ ...prev, authorName: e.target.value }))}
                  placeholder="Enter your name"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Email</label>
                <Input
                  required
                  type="email"
                  value={form.authorEmail}
                  onChange={(e) => setForm((prev) => ({ ...prev, authorEmail: e.target.value }))}
                  placeholder="Enter your email"
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">Short Excerpt (optional)</label>
              <Textarea
                value={form.excerpt}
                onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Short summary shown in blog cards"
                className="min-h-[90px] rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">Blog Content</label>
              <Textarea
                required
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Write your blog content here"
                className="min-h-[220px] rounded-xl"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Tags (comma separated)</label>
                <Input
                  value={form.tags}
                  onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                  placeholder="service, sustainability, youth"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Featured Image</label>
                <label className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-dashed border-[#4CAF50] bg-[#4CAF50]/5 px-3 text-sm text-[#2f7d46]">
                  <ImagePlus className="h-4 w-4" />
                  <span className="truncate">
                    {imageFile ? imageFile.name : 'Upload one image'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-[#4CAF50] px-7 py-2 text-white hover:bg-[#439746]"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Blog'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link
                to="/blog"
                className="inline-flex items-center rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Back to Blogs
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
