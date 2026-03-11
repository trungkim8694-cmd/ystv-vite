export interface BlogPost {
  id: string;
  title: {
    vi: string;
    zh: string;
  };
  excerpt: {
    vi: string;
    zh: string;
  };
  content: {
    vi: string;
    zh: string;
  };
  image: string;
  date: string;
  category: {
    vi: string;
    zh: string;
  };
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: {
      vi: 'Cách phân biệt yến sào thật và giả chính xác nhất',
      zh: '如何最准确地辨别真假燕窝'
    },
    excerpt: {
      vi: 'Tìm hiểu các phương pháp đơn giản nhưng hiệu quả để nhận biết yến sào nguyên chất, tránh mua phải hàng kém chất lượng.',
      zh: '了解简单而有效的方法来识别纯正燕窝，避免购买劣质产品。'
    },
    content: {
      vi: 'Yến sào là thực phẩm quý giá, vì vậy trên thị trường xuất hiện nhiều loại yến giả, yến độn. Để phân biệt, bạn có thể dựa vào: 1. Độ giòn: Yến thật rất giòn, dễ gãy vụn. 2. Mùi vị: Yến thật có mùi tanh đặc trưng của lòng trắng trứng. 3. Khi ngâm nước: Yến thật không tan, không làm đổi màu nước...',
      zh: '燕窝是珍贵的食品，因此市场上出现了许多假燕窝、掺假燕窝。为了辨别，您可以根据：1. 脆度：真燕窝非常脆，容易破碎。2. 气味：真燕窝有独特的蛋清腥味。3. 浸泡时：真燕窝不溶解，不改变水的颜色...'
    },
    image: 'https://picsum.photos/seed/blog1/800/500',
    date: '2024-03-15',
    category: {
      vi: 'Kiến thức yến sào',
      zh: '燕窝知识'
    },
    author: 'Admin'
  },
  {
    id: '2',
    title: {
      vi: 'Công dụng tuyệt vời của yến sào đối với phụ nữ mang thai',
      zh: '燕窝对孕妇的卓越功效'
    },
    excerpt: {
      vi: 'Yến sào cung cấp dưỡng chất thiết yếu giúp mẹ bầu khỏe mạnh và thai nhi phát triển toàn diện.',
      zh: '燕窝提供必要的营养，帮助准妈妈保持健康，促进胎儿全面发育。'
    },
    content: {
      vi: 'Trong yến sào chứa nhiều protein và các acid amin thiết yếu. Đối với bà bầu, yến sào giúp giảm mệt mỏi, tăng cường hệ miễn dịch và hỗ trợ phát triển trí não cho bé ngay từ trong bụng mẹ...',
      zh: '燕窝含有丰富的蛋白质和必需氨基酸。对于孕妇来说，燕窝有助于减轻疲劳，增强免疫系统，并支持宝宝在腹中的大脑发育...'
    },
    image: 'https://picsum.photos/seed/blog2/800/500',
    date: '2024-03-10',
    category: {
      vi: 'Sức khỏe & Đời sống',
      zh: '健康与生活'
    },
    author: 'Chuyên gia dinh dưỡng'
  },
  {
    id: '3',
    title: {
      vi: 'Hướng dẫn chưng yến đường phèn giữ trọn dưỡng chất',
      zh: '冰糖炖燕窝指南：保留完整营养'
    },
    excerpt: {
      vi: 'Bí quyết chưng yến đúng cách để không làm mất đi các acid amin và khoáng chất quý giá.',
      zh: '正确炖煮燕窝的秘诀，以免流失宝贵的氨基酸和矿物质。'
    },
    content: {
      vi: 'Chưng yến là cách chế biến phổ biến nhất. Lưu ý quan trọng là không nên chưng ở nhiệt độ quá cao và thời gian quá lâu. Thời gian lý tưởng là khoảng 20-30 phút sau khi nước sôi...',
      zh: '炖燕窝是最常见的烹饪方式。重要的注意事项是不应在过高的温度下炖煮过长时间。理想的时间是水开后约20-30分钟...'
    },
    image: 'https://picsum.photos/seed/blog3/800/500',
    date: '2024-03-05',
    category: {
      vi: 'Ẩm thực',
      zh: '美食烹饪'
    },
    author: 'Đầu bếp Kim'
  },
  {
    id: '4',
    title: {
      vi: 'Thời điểm vàng để ăn yến sào đạt hiệu quả cao nhất',
      zh: '食用燕窝达到最高效果的黄金时间'
    },
    excerpt: {
      vi: 'Ăn yến sào vào lúc nào là tốt nhất? Buổi sáng hay buổi tối? Hãy cùng tìm hiểu ngay.',
      zh: '什么时候吃燕窝最好？早上还是晚上？让我们现在就来了解。'
    },
    content: {
      vi: 'Thời điểm tốt nhất để cơ thể hấp thụ dưỡng chất từ yến sào là khi bụng đói. Buổi sáng ngay sau khi ngủ dậy hoặc buổi tối trước khi đi ngủ 30 phút là hai thời điểm vàng...',
      zh: '身体吸收燕窝营养的最佳时间是空腹时。早起后或睡前30分钟是两个黄金时间...'
    },
    image: 'https://picsum.photos/seed/blog4/800/500',
    date: '2024-02-28',
    category: {
      vi: 'Cẩm nang sử dụng',
      zh: '使用手册'
    },
    author: 'Admin'
  },
  {
    id: '5',
    title: {
      vi: 'Tại sao yến huyết lại có giá trị cao hơn yến trắng?',
      zh: '为什么血燕的价值高于白燕？'
    },
    excerpt: {
      vi: 'Giải mã sự thật về yến huyết và lý do tại sao nó lại được săn đón đến vậy.',
      zh: '揭开血燕的真相以及为什么它如此受追捧。'
    },
    content: {
      vi: 'Yến huyết không phải do máu của chim yến mà là do sự tương tác giữa tổ yến và các khoáng chất trong hang đá. Quá trình này tạo nên hàm lượng khoáng chất cao vượt trội...',
      zh: '血燕不是因为燕子的血，而是因为燕窝与岩洞中矿物质的相互作用。这个过程创造了极高的矿物质含量...'
    },
    image: 'https://picsum.photos/seed/blog5/800/500',
    date: '2024-02-20',
    category: {
      vi: 'Kiến thức yến sào',
      zh: '燕窝知识'
    },
    author: 'Chuyên gia'
  }
];
