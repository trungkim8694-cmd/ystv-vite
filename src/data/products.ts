export interface Product {
  id: string;
  name: {
    vi: string;
    zh: string;
  };
  description: {
    vi: string;
    zh: string;
  };
  price: string;
  image: string;
  category: {
    vi: string;
    zh: string;
  };
  weight?: {
    vi: string;
    zh: string;
  };
  ingredients?: {
    vi: string;
    zh: string;
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: {
      vi: 'Yến Sào Tinh Chế Thượng Hạng',
      zh: '顶级精制燕窝',
    },
    description: {
      vi: 'Yến sào đã được làm sạch lông và tạp chất, giữ trọn vẹn giá trị dinh dưỡng.',
      zh: '燕窝已去除羽毛和杂质，保留完整的营养价值。',
    },
    price: '3.500.000đ / 100g',
    image: 'https://images.unsplash.com/photo-1626120033076-2f44f77019be?auto=format&fit=crop&q=80&w=800',
    category: {
      vi: 'Yến Tinh Chế',
      zh: '精制燕窝',
    },
    weight: {
      vi: '100g',
      zh: '100克',
    },
    ingredients: {
      vi: '100% Yến sào nguyên chất',
      zh: '100% 纯天然燕窝',
    },
  },
  {
    id: '2',
    name: {
      vi: 'Yến Thô Nguyên Tổ',
      zh: '原盏毛燕',
    },
    description: {
      vi: 'Tổ yến nguyên bản, còn nguyên lông, dành cho khách hàng muốn tự tay chế biến.',
      zh: '原始燕窝，保留羽毛，适合想要亲手加工的客户。',
    },
    price: '2.800.000đ / 100g',
    image: 'https://images.unsplash.com/photo-1590005354167-6da97870c91d?auto=format&fit=crop&q=80&w=800',
    category: {
      vi: 'Yến Thô',
      zh: '毛燕',
    },
    weight: {
      vi: '100g',
      zh: '100克',
    },
    ingredients: {
      vi: '100% Yến sào thô nguyên tổ',
      zh: '100% 原始燕窝盏',
    },
  },
  {
    id: '3',
    name: {
      vi: 'Yến Chưng Đường Phèn',
      zh: '冰糖炖燕窝',
    },
    description: {
      vi: 'Sản phẩm tiện lợi, chưng sẵn với đường phèn, bổ dưỡng and thơm ngon.',
      zh: '方便产品，加入冰糖炖制，营养美味。',
    },
    price: '150.000đ / hũ',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    category: {
      vi: 'Yến Chưng Sẵn',
      zh: '即食燕窝',
    },
    weight: {
      vi: '70ml',
      zh: '70毫升',
    },
    ingredients: {
      vi: 'Yến tươi (25%), Đường phèn, Nước tinh khiết',
      zh: '鲜燕窝 (25%), 冰糖, 纯净水',
    },
  },
  {
    id: '4',
    name: {
      vi: 'Hồng Yến Tinh Chế',
      zh: '精制红燕',
    },
    description: {
      vi: 'Loại yến quý hiếm với hàm lượng khoáng chất cao, màu cam nhạt tự nhiên.',
      zh: '稀有燕窝，矿物质含量高，天然淡橙色。',
    },
    price: '4.500.000đ / 100g',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d019cb5?auto=format&fit=crop&q=80&w=800',
    category: {
      vi: 'Hồng Yến',
      zh: '红燕',
    },
    weight: {
      vi: '100g',
      zh: '100克',
    },
    ingredients: {
      vi: '100% Hồng yến nguyên chất',
      zh: '100% 纯天然红燕',
    },
  },
  {
    id: '5',
    name: {
      vi: 'Yến Sào Rút Lông Định Hình',
      zh: '挑毛定型燕窝',
    },
    description: {
      vi: 'Sản phẩm cao cấp nhất, giữ nguyên hình dáng tổ yến sau khi rút lông.',
      zh: '最高端产品，挑毛后保持燕窝原始形状。',
    },
    price: '5.000.000đ / 100g',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800',
    category: {
      vi: 'Yến Cao Cấp',
      zh: '高端燕窝',
    },
    weight: {
      vi: '100g',
      zh: '100克',
    },
    ingredients: {
      vi: '100% Yến sào rút lông thượng hạng',
      zh: '100% 顶级挑毛燕窝',
    },
  },
];
