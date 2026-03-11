-- ========================================================
-- THIẾT LẬP CẤU TRÚC DATABASE YẾN SÀO THỊNH VƯỢNG (YSTV)
-- Phiên bản: 2.0 (Hỗ trợ Đa ngôn ngữ, Slug SEO, Markdown)
-- ========================================================

-- 1. BẢNG SẢN PHẨM (PRODUCTS)
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_vi TEXT NOT NULL,
    name_zh TEXT NOT NULL,
    slug_vi TEXT UNIQUE,
    slug_zh TEXT UNIQUE,
    description_vi TEXT, -- Hỗ trợ Markdown
    description_zh TEXT, -- Hỗ trợ Markdown
    price NUMERIC NOT NULL DEFAULT 0,
    image_url TEXT,
    category TEXT,
    is_active BOOLEAN DEFAULT true,
    weight_vi TEXT,
    weight_zh TEXT,
    ingredients_vi TEXT,
    ingredients_zh TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Đảm bảo các cột tồn tại nếu bảng đã được tạo từ trước
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug_vi TEXT UNIQUE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug_zh TEXT UNIQUE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS description_vi TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS description_zh TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS price NUMERIC NOT NULL DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE products ADD COLUMN IF NOT EXISTS weight_vi TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS weight_zh TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS ingredients_vi TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS ingredients_zh TEXT;

-- 2. BẢNG BÀI VIẾT / CẨM NANG (POSTS)
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title_vi TEXT NOT NULL,
    title_zh TEXT NOT NULL,
    excerpt_vi TEXT,
    excerpt_zh TEXT,
    content_vi TEXT, -- Hỗ trợ Markdown
    content_zh TEXT, -- Hỗ trợ Markdown
    image_url TEXT,
    slug_vi TEXT UNIQUE,
    slug_zh TEXT UNIQUE,
    category TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Đảm bảo các cột tồn tại cho bảng posts
ALTER TABLE posts ADD COLUMN IF NOT EXISTS slug_vi TEXT UNIQUE;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS slug_zh TEXT UNIQUE;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS excerpt_vi TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS excerpt_zh TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS content_vi TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS content_zh TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;

-- 3. TẠO INDEX ĐỂ TỐI ƯU TRUY VẤN SLUG
CREATE INDEX IF NOT EXISTS idx_products_slug_vi ON products(slug_vi);
CREATE INDEX IF NOT EXISTS idx_products_slug_zh ON products(slug_zh);
CREATE INDEX IF NOT EXISTS idx_posts_slug_vi ON posts(slug_vi);
CREATE INDEX IF NOT EXISTS idx_posts_slug_zh ON posts(slug_zh);

-- 4. THIẾT LẬP BẢO MẬT (ROW LEVEL SECURITY)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép đọc công khai (Public Read)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'products' AND policyname = 'Allow public read access on products'
    ) THEN
        CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'posts' AND policyname = 'Allow public read access on posts'
    ) THEN
        CREATE POLICY "Allow public read access on posts" ON posts FOR SELECT USING (true);
    END IF;
END $$;

-- 5. CHÚ THÍCH DỮ LIỆU
COMMENT ON TABLE products IS 'Danh sách sản phẩm yến sào đa ngôn ngữ';
COMMENT ON COLUMN products.description_vi IS 'Mô tả sản phẩm (Markdown - Tiếng Việt)';
COMMENT ON COLUMN products.description_zh IS 'Mô tả sản phẩm (Markdown - Tiếng Trung)';
COMMENT ON TABLE posts IS 'Danh sách bài viết cẩm nang yến sào đa ngôn ngữ';
COMMENT ON COLUMN posts.content_vi IS 'Nội dung bài viết (Markdown - Tiếng Việt)';
COMMENT ON COLUMN posts.content_zh IS 'Nội dung bài viết (Markdown - Tiếng Trung)';
