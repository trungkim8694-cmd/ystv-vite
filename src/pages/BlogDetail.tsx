import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon, Loader2 } from 'lucide-react';
import { SEO } from '@/src/components/SEO';
import { blogPosts as mockPosts } from '../data/blog';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/src/lib/supabase';
import { generateSlug } from '@/src/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Post {
  id: string;
  title_vi: string;
  title_zh: string;
  excerpt_vi: string;
  excerpt_zh: string;
  content_vi: string;
  content_zh: string;
  image_url: string;
  created_at: string;
  slug_vi: string;
  slug_zh: string;
  category?: string;
}

export default function BlogDetail() {
  const { id: slugOrId } = useParams();
  const { i18n } = useTranslation();
  const language = (i18n.language || 'vi').startsWith('zh') ? 'zh' : 'vi';
  const navigate = useNavigate();
  
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        
        // Try fetching by slug (either VI or ZH based on current language)
        const slugColumn = language === 'vi' ? 'slug_vi' : 'slug_zh';
        let { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq(slugColumn, slugOrId)
          .maybeSingle();

        // If not found by current language slug, try the other language slug
        if (!data && !error) {
          const otherSlugColumn = language === 'vi' ? 'slug_zh' : 'slug_vi';
          const { data: otherData, error: otherError } = await supabase
            .from('posts')
            .select('*')
            .eq(otherSlugColumn, slugOrId)
            .maybeSingle();
          data = otherData;
          error = otherError;
        }

        // If still not found, try by ID
        if (!data && !error) {
          const { data: idData, error: idError } = await supabase
            .from('posts')
            .select('*')
            .eq('id', slugOrId)
            .maybeSingle();
          data = idData;
          error = idError;
        }

        if (error) throw error;
        if (data) {
          setPost(data);
          
          // Fetch related posts
          const { data: relatedData } = await supabase
            .from('posts')
            .select('*')
            .neq('id', data.id)
            .limit(3);
          if (relatedData) setRelatedPosts(relatedData);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        // Fallback to mock data
        const mockPost = mockPosts.find(p => 
          p.id === slugOrId || 
          generateSlug(p.title.vi, 'vi') === slugOrId || 
          generateSlug(p.title.zh, 'zh') === slugOrId
        );
        if (mockPost) {
          const formattedPost = {
            id: mockPost.id,
            title_vi: mockPost.title.vi,
            title_zh: mockPost.title.zh,
            excerpt_vi: mockPost.excerpt.vi,
            excerpt_zh: mockPost.excerpt.zh,
            content_vi: mockPost.content.vi,
            content_zh: mockPost.content.zh,
            image_url: mockPost.image,
            created_at: new Date().toISOString(),
            slug_vi: generateSlug(mockPost.title.vi, 'vi'),
            slug_zh: generateSlug(mockPost.title.zh, 'zh'),
            category: mockPost.category[language]
          };
          setPost(formattedPost);
          
          setRelatedPosts(mockPosts.filter(p => p.id !== mockPost.id).slice(0, 3).map(p => ({
            id: p.id,
            title_vi: p.title.vi,
            title_zh: p.title.zh,
            excerpt_vi: p.excerpt.vi,
            excerpt_zh: p.excerpt.zh,
            content_vi: p.content.vi,
            content_zh: p.content.zh,
            image_url: p.image,
            created_at: new Date().toISOString(),
            slug_vi: generateSlug(p.title.vi, 'vi'),
            slug_zh: generateSlug(p.title.zh, 'zh'),
            category: p.category[language]
          })));
        }
      } finally {
        setLoading(false);
      }
    }

    if (slugOrId) fetchPost();
  }, [slugOrId, language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-600" size={48} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">
            {language === 'vi' ? 'Không tìm thấy bài viết' : '未找到文章'}
          </h2>
          <button 
            onClick={() => navigate(`/${language}/blog`)}
            className="text-amber-600 font-semibold flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'vi' ? 'Quay lại cẩm nang' : '返回手册'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <SEO 
        title={language === 'vi' ? post.title_vi : post.title_zh} 
        description={language === 'vi' ? post.excerpt_vi : post.excerpt_zh}
      />

      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[600px] w-full">
        <img 
          src={post.image_url} 
          alt={language === 'vi' ? post.title_vi : post.title_zh} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <span className="inline-block bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                {post.category || (language === 'vi' ? 'Kiến thức' : '知识')}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                {language === 'vi' ? post.title_vi : post.title_zh}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.created_at).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'zh-CN')}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Kim Bird's Nest
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <Link 
              to={`/${language}/blog`} 
              className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'vi' ? 'Quay lại danh sách' : '返回列表'}
            </Link>

            <article className="prose prose-lg max-w-none prose-slate prose-headings:font-serif prose-amber">
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8 italic border-l-4 border-amber-500 pl-6">
                {language === 'vi' ? post.excerpt_vi : post.excerpt_zh}
              </p>
              
              <div className="markdown-body text-slate-700 leading-loose">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {language === 'vi' ? post.content_vi : post.content_zh}
                </ReactMarkdown>
              </div>
            </article>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-slate-900">
                  {language === 'vi' ? 'Chia sẻ:' : '分享:'}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full bg-slate-100 hover:bg-sky-100 hover:text-sky-500 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-600 transition-colors">
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-12">
              {/* Related Posts */}
              <div>
                <h3 className="text-xl font-serif mb-6 pb-2 border-b-2 border-amber-500 inline-block">
                  {language === 'vi' ? 'Bài viết liên quan' : '相关文章'}
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map(p => (
                    <Link key={p.id} to={`/${language}/blog/${p.id}`} className="flex gap-4 group">
                      <div className="w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <img 
                          src={p.image_url} 
                          alt={language === 'vi' ? p.title_vi : p.title_zh} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors mb-1 text-sm">
                          {language === 'vi' ? p.title_vi : p.title_zh}
                        </h4>
                        <span className="text-xs text-slate-500">
                          {new Date(p.created_at).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'zh-CN')}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100">
                <h3 className="text-xl font-serif text-amber-900 mb-4">
                  {language === 'vi' ? 'Tư vấn miễn phí' : '免费咨询'}
                </h3>
                <p className="text-amber-800/80 text-sm mb-6">
                  {language === 'vi' 
                    ? 'Liên hệ ngay với chuyên gia để được tư vấn về cách sử dụng yến sào hiệu quả nhất.'
                    : '立即联系专家，获取有关如何最有效使用燕窝的建议。'}
                </p>
                <button className="w-full py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors">
                  {language === 'vi' ? 'Liên hệ Zalo' : '联系微信'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
