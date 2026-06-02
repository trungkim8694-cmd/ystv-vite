export interface Product {
  id: string;
  slug: {
    vi: string;
    zh: string;
  };
  name: {
    vi: string;
    zh: string;
  };
  description: {
    vi: string;
    zh: string;
  };
  rawPrice: number;
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
    "id": "ec90948c-eee2-478e-b710-241b7c917112",
    "slug": {
      "vi": "yen-tinh-che-soi",
      "zh": "jingzhi-changsi-yanwo"
    },
    "name": {
      "vi": "Yến tinh chế sợi",
      "zh": "精制长丝燕窝"
    },
    "description": {
      "vi": "Dòng tổ yến thu hoạch từ các nhà yến trên 10 năm tuổi, tuyển chọn theo tỷ lệ 10:3, có sợi dài. Được sơ chế bằng phương pháp nhặt ướt, loại bỏ hoàn toàn tạp chất. Tổ có 01 lớp sợi.",
      "zh": "采自10年以上老燕屋，经10选3严格筛选。采用湿法清理工艺，完全去除杂质。燕盏包含一层长纤维。"
    },
    "rawPrice": 3300000,
    "price": "3.300.000đ",
    "image": "/images/products/tinh-che-to-yen-soi-dai.webp",
    "category": {
      "vi": "Yến Tinh Chế",
      "zh": "Yến Tinh Chế"
    },
    "weight": {
      "vi": "100g",
      "zh": "100克"
    },
    "ingredients": {
      "vi": "Nguyên chất 100%, không đường, không độn, không hóa chất tẩy trắng.",
      "zh": "100%纯天然，无糖，无添加，无化学漂白剂。"
    }
  },
  {
    "id": "4b782791-a0e7-4b92-a5df-73fbbce42f68",
    "slug": {
      "vi": "yen-chung-san-duong-an-kieng-70ml",
      "zh": "jishi-daitang-yanwo-70ml"
    },
    "name": {
      "vi": "Yến chưng sẵn đường ăn kiêng (Hũ 70ml)",
      "zh": "即食代糖燕窝 (70毫升)"
    },
    "description": {
      "vi": "Đóng trong hũ thủy tinh tiệt trùng hút chân không dung tích 70ml. Mỗi hũ chứa 0.5gr yến khô nguyên chất, sử dụng đường ăn kiêng lành mạnh.",
      "zh": "采用70毫升真空无菌玻璃瓶包装。每瓶含有0.5克纯干燕窝，使用健康代糖调味，适合忌糖人士。"
    },
    "rawPrice": 88000,
    "price": "88.000đ",
    "image": "/images/products/yen-chung-san-duong-kieng.webp",
    "category": {
      "vi": "Yến Chưng Sẵn",
      "zh": "Yến Chưng Sẵn"
    },
    "weight": {
      "vi": "70ml",
      "zh": "70毫升"
    },
    "ingredients": {
      "vi": "Yến tươi nguyên chất, đường ăn kiêng (Isomalt), nước tinh khiết.",
      "zh": "纯天然燕窝，代糖 (益寿糖)，纯净水。"
    }
  },
  {
    "id": "47eb92ff-1503-4a95-a0f6-a1d26e6bf34d",
    "slug": {
      "vi": "yen-chung-san-hat-chia-70ml",
      "zh": "jishi-qiyazi-yanwo-70ml"
    },
    "name": {
      "vi": "Yến chưng sẵn hạt chia (Hũ 70ml)",
      "zh": "即食奇亚籽燕窝 (70毫升)"
    },
    "description": {
      "vi": "Đóng trong hũ thủy tinh tiệt trùng hút chân không dung tích 70ml. Mỗi hũ chứa 0.5gr yến khô nguyên chất kết hợp cùng hạt chia giàu dinh dưỡng.",
      "zh": "采用70毫升真空无菌玻璃瓶包装。每瓶含有0.5克纯干燕窝，并加入富含营养的奇亚籽。"
    },
    "rawPrice": 88000,
    "price": "88.000đ",
    "image": "/images/products/yen-chung-san-hat-chia.webp",
    "category": {
      "vi": "Yến Chưng Sẵn",
      "zh": "Yến Chưng Sẵn"
    },
    "weight": {
      "vi": "70ml",
      "zh": "70毫升"
    },
    "ingredients": {
      "vi": "Yến tươi nguyên chất, hạt chia, đường phèn, nước tinh khiết.",
      "zh": "纯天然燕窝，奇亚籽，冰糖，纯净水。"
    }
  },
  {
    "id": "6aaa8ab9-badd-4cdf-aefa-a3d49ebbf82a",
    "slug": {
      "vi": "yen-sao-nguyen-to-con-long-nguyen-ban",
      "zh": "tianran-yuanzhan-maoyanwo"
    },
    "name": {
      "vi": "Yến Sào Nguyên Tổ (Còn lông nguyên bản)",
      "zh": "天然原盏毛燕窝 (带毛)"
    },
    "description": {
      "vi": "Dòng tổ yến thô nguyên bản còn lông, thu hoạch từ các nhà yến trên 10 năm tuổi, được tuyển chọn nghiêm ngặt theo tỷ lệ 10:5 để chọn ra những tổ đẹp và sạch nhất.",
      "zh": "天然原生态带毛燕窝，采自10年以上老燕屋。经10选5严格筛选，仅保留形状最美、杂质最少的优质燕盏。"
    },
    "rawPrice": 2300000,
    "price": "2.300.000đ",
    "image": "/images/products/yen-tho-nguyen-to.webp",
    "category": {
      "vi": "Yến Thô",
      "zh": "Yến Thô"
    },
    "weight": {
      "vi": "100g",
      "zh": "100克"
    },
    "ingredients": {
      "vi": "Nguyên chất 100%, không đường, không độn, không hóa chất tẩy trắng.",
      "zh": "100%纯天然，无糖，无添加，无化学漂白剂。"
    }
  },
  {
    "id": "a34904be-3cd9-4ded-ba0c-de0b2fed60c7",
    "slug": {
      "vi": "yen-tuoi-so-che-sach-long-cap-dong",
      "zh": "jishi-xian-yanwo-lengdong"
    },
    "name": {
      "vi": "Yến tươi sơ chế sạch lông (Cấp đông)",
      "zh": "即食鲜燕窝 (冷冻独立包装)"
    },
    "description": {
      "vi": "Là dòng sản phẩm yến thô nguyên bản được làm sạch lông, chia túi zip nhỏ và cấp đông để giữ trọn độ tươi ngon. Định lượng gồm 30 túi zip nhỏ.",
      "zh": "原生态毛燕经手工清洗干净，分装入自封袋并冷冻处理，以锁 hù 原始鲜味。每份包含30个独立小包装。"
    },
    "rawPrice": 2600000,
    "price": "2.600.000đ",
    "image": "/images/products/tinh-che-yen-tuoi-cap-dong-tui-zip.webp",
    "category": {
      "vi": "Yến Tinh Chế",
      "zh": "Yến Tinh Chế"
    },
    "weight": {
      "vi": "100g",
      "zh": "100克"
    },
    "ingredients": {
      "vi": "Yến tươi nguyên chất 100% đã làm sạch lông, không chất bảo quản, cấp đông ngay sau khi sơ chế.",
      "zh": "100%纯天然鲜燕窝，人工除毛，无防腐剂，加工后立即冷冻。"
    }
  },
  {
    "id": "6c2821e1-7f6c-4a11-8b61-f80e21c51dd6",
    "slug": {
      "vi": "set-yen-chung-san-18-hu-mix-vi",
      "zh": "jishi-yanwo-lihe-18-ping"
    },
    "name": {
      "vi": "Set Yến Chưng Sẵn (18 hũ mix vị)",
      "zh": "即食燕窝礼盒 (18瓶装 - 多种口味)"
    },
    "description": {
      "vi": "Set quà tặng quy mô lớn gồm 18 hũ yến chưng sẵn với nhiều hương vị đa dạng. Lựa chọn tuyệt vời cho gia đình đông người hoặc làm quà tặng doanh nghiệp trang trọng.",
      "zh": "大容量礼盒装，内含18瓶多种口味的即食燕窝。是大家庭享用或商务馈赠的体面之选。"
    },
    "rawPrice": 2200000,
    "price": "2.200.000đ",
    "image": "/images/products/set-qua-18-hu.webp",
    "category": {
      "vi": "Set Quà Tặng",
      "zh": "Set Quà Tặng"
    },
    "weight": {
      "vi": "1 set",
      "zh": "1套"
    },
    "ingredients": {
      "vi": "18 hũ yến chưng sẵn nguyên chất mix nhiều vị theo yêu cầu khách hàng.",
      "zh": "18瓶根据客户要求混合多种口味的纯天然即食燕窝。"
    }
  },
  {
    "id": "c4272f78-709d-4493-ac20-6dc51679cfd0",
    "slug": {
      "vi": "set-qua-y-nghia-luxury-gift-set",
      "zh": "yiyi-shenyuan-lihe"
    },
    "name": {
      "vi": "Set Quà Ý Nghĩa (Luxury Gift Set)",
      "zh": "意义深远礼盒 (豪华燕窝礼盒)"
    },
    "description": {
      "vi": "Set quà tặng sang trọng bao gồm 100g yến tinh chế sợi dài cao cấp, đi kèm đường phèn, táo đỏ và hoa hồng sáp trang trí. Đây là món quà hoàn hảo để tri ân đối tác và người thân.",
      "zh": "豪华礼盒装，内含100克特级精制长丝燕窝、冰糖、红枣以及精美装饰皂花。是表达谢意、赠送合作伙伴或亲友的完美之选。"
    },
    "rawPrice": 5000000,
    "price": "5.000.000đ",
    "image": "/images/products/set-hop-qua-y-nghia.webp",
    "category": {
      "vi": "Set Quà Tặng",
      "zh": "Set Quà Tặng"
    },
    "weight": {
      "vi": "1 set",
      "zh": "1套"
    },
    "ingredients": {
      "vi": "100g yến tinh chế sợi dài + đường phèn + táo đỏ + hoa hồng sáp.",
      "zh": "100克精制长丝燕窝 + 冰糖 + 红枣 + 装饰皂花。"
    }
  },
  {
    "id": "60aa2f2e-8df0-472d-9802-43e61ca48a61",
    "slug": {
      "vi": "set-yen-chung-san-hop-vuong-cao-cap",
      "zh": "zunxiang-fanghe-jishi-yanwo"
    },
    "name": {
      "vi": "Set Yến Chưng Sẵn Hộp Vuông Cao Cấp",
      "zh": "尊享方盒即食燕窝礼盒 (限量版)"
    },
    "description": {
      "vi": "Phiên bản quà tặng giới hạn với thiết kế hộp vuông sang trọng, đẳng cấp. Bao gồm 6 hũ yến chưng sẵn hàm lượng cao, mix các vị thượng hạng, dành riêng cho những dịp đặc biệt.",
      "zh": "限量版方盒尊贵礼盒设计。内含6瓶高含量、多种顶级口味混合的即食燕窝，专为重要场合和贵宾定制。"
    },
    "rawPrice": 800000,
    "price": "800.000đ",
    "image": "/images/products/set-yen-chung-tuoi-hop-vuong.webp",
    "category": {
      "vi": "Set Quà Tặng",
      "zh": "Set Quà Tặng"
    },
    "weight": {
      "vi": "1 set",
      "zh": "1套"
    },
    "ingredients": {
      "vi": "6 hũ yến chưng sẵn tinh khiết mix vị thượng hạng.",
      "zh": "6瓶顶级配方混合口味纯天然即食燕窝。"
    }
  },
  {
    "id": "1aa5354c-1216-4804-9598-ea36e1ff5c40",
    "slug": {
      "vi": "set-yen-qua-tang-3-tang-premium",
      "zh": "sanceng-haohua-yanwo-lihe"
    },
    "name": {
      "vi": "Set Yến Quà Tặng 3 Tầng (Premium)",
      "zh": "三层豪华燕窝礼盒 (尊享系列)"
    },
    "description": {
      "vi": "Set quà tặng đẳng cấp thiết kế 3 tầng sang trọng. Bao gồm 100g yến tinh chế sợi dài thượng hạng kết hợp cùng 6 hũ yến chưng sẵn mix vị, đường phèn, táo đỏ và hoa hồng sáp nghệ thuật.",
      "zh": "极致尊享三层礼盒设计。内含100克特级精制长丝燕窝、6瓶多种口味即食燕窝、冰糖、红枣及精美手工皂花。"
    },
    "rawPrice": 6600000,
    "price": "6.600.000đ",
    "image": "/images/products/set-yen-3-tang.webp",
    "category": {
      "vi": "Set Quà Tặng",
      "zh": "Set Quà Tặng"
    },
    "weight": {
      "vi": "1 set (3 tầng)",
      "zh": "1套 (三层设计)"
    },
    "ingredients": {
      "vi": "100g yến tinh chế sợi dài + 6 hũ yến chưng sẵn mix vị + đường phèn + táo đỏ + hoa hồng sáp.",
      "zh": "100克精制长丝燕窝 + 6瓶即食燕窝 + 冰糖 + 红枣 + 装饰皂花。"
    }
  },
  {
    "id": "3b0e6ee6-12ca-401b-9a90-dd411ef92b81",
    "slug": {
      "vi": "yen-tinh-che-soi-ngan",
      "zh": "jingzhi-duansi-yanwo"
    },
    "name": {
      "vi": "Yến tinh chế sợi ngắn",
      "zh": "精制短丝燕窝"
    },
    "description": {
      "vi": "Dòng tổ yến nguyên chất sợi ngắn phù hợp cho trẻ em hoặc người lớn tuổi có cơ quan tiêu hóa kém. Giá thành hợp lý, tiết kiệm mà vẫn đảm bảo đầy đủ hàm lượng dinh dưỡng.",
      "zh": "纯天然短纤维燕窝，非常适合儿童或消化系统较弱的老年人。价格合理，经济实惠，且仍能确保完整的营养含量。"
    },
    "rawPrice": 3000000,
    "price": "3.000.000đ",
    "image": "/images/products/tinh-che-to-yen-soi-ngan.webp",
    "category": {
      "vi": "Yến Tinh Chế",
      "zh": "Yến Tinh Chế"
    },
    "weight": {
      "vi": "100g",
      "zh": "100克"
    },
    "ingredients": {
      "vi": "Nguyên chất 100%, không đường, không độn, không hóa chất tẩy trắng.",
      "zh": "100%纯天然，无糖，无添加，无化学漂白剂。"
    }
  },
  {
    "id": "ee3f5260-1f85-4a0c-bcd0-093772439a1b",
    "slug": {
      "vi": "yen-rut-long-nguyen-to-cao-cap",
      "zh": "teji-gantiao-yuanzhan-yanwo"
    },
    "name": {
      "vi": "Yến rút lông nguyên tổ cao cấp",
      "zh": "特级干挑原盏燕窝"
    },
    "description": {
      "vi": "Dòng tổ yến thu hoạch từ các nhà yến trên 10 năm tuổi, được tuyển chọn nghiêm ngặt theo tỷ lệ 10:1 và làm sạch bằng phương pháp nhặt lông khô kỹ thuật cao, giữ trọn hình dáng nguyên bản.",
      "zh": "采自10年以上老燕屋，经10选1严格筛选。采用高难度干挑工艺清理，完全保留燕盏的原始天然形状。"
    },
    "rawPrice": 6200000,
    "price": "6.200.000đ",
    "image": "/images/products/tinh-che-to-yen-rut-long-nguyen-to.webp",
    "category": {
      "vi": "Yến Tinh Chế",
      "zh": "Yến Tinh Chế"
    },
    "weight": {
      "vi": "100g",
      "zh": "100克"
    },
    "ingredients": {
      "vi": "Nguyên chất 100%, không đường, không độn, không hóa chất tẩy trắng.",
      "zh": "100%纯天然，无糖，无添加，无化学漂白剂。"
    }
  },
  {
    "id": "efb45b40-e951-4057-b869-280aefce9b24",
    "slug": {
      "vi": "hong-yen-tinh-che",
      "zh": "精制红燕"
    },
    "name": {
      "vi": "Hồng yến tinh chế",
      "zh": "精制红燕"
    },
    "description": {
      "vi": "Là dòng sản phẩm quý hiếm có màu vàng cam nhạt, chỉ có trong tự nhiên được sơ chế bằng phương pháp nhặt ướt, lông mịn và bụi bẩn li ti cũng gần như được loại bỏ hoàn toàn.",
      "zh": "一种稀有的自然产品，呈浅橙黄色。采用湿法清理工艺，细毛和微小杂质几乎完全清除。"
    },
    "rawPrice": 6800000,
    "price": "6.800.000đ",
    "image": "/images/products/tinh-che-hong-yen.webp",
    "category": {
      "vi": "Yến Tinh Chế",
      "zh": "Yến Tinh Chế"
    },
    "weight": {
      "vi": "100g",
      "zh": "100克"
    },
    "ingredients": {
      "vi": "Nguyên chất 100%, không đường, không độn, không hóa chất tẩy trắng.",
      "zh": "100%纯天然，无糖，无添加，无化学漂白剂。"
    }
  },
  {
    "id": "ec642f7e-ea08-42af-b6f7-9993c51165d5",
    "slug": {
      "vi": "set-yen-chung-san-10-hu-mix-vi",
      "zh": "jishi-yanwo-lihe-10-ping"
    },
    "name": {
      "vi": "Set Yến Chưng Sẵn (10 hũ mix vị)",
      "zh": "即食燕窝礼盒 (10瓶装 - 多种口味)"
    },
    "description": {
      "vi": "Set quà tặng cao cấp gồm 10 hũ yến chưng sẵn với nhiều hương vị khác nhau (táo đỏ, hạt sen, hạt chia...). Phù hợp làm quà biếu sang trọng và ý nghĩa.",
      "zh": "高端礼盒装，内含10瓶不同口味的即食燕窝（红枣、莲子、奇亚籽等）。是高贵且有意义的送礼佳品。"
    },
    "rawPrice": 1200000,
    "price": "1.200.000đ",
    "image": "/images/products/set-10-hu-ycs-vali.webp",
    "category": {
      "vi": "Set Quà Tặng",
      "zh": "Set Quà Tặng"
    },
    "weight": {
      "vi": "1 set",
      "zh": "1套"
    },
    "ingredients": {
      "vi": "10 hũ yến chưng sẵn nguyên chất mix nhiều vị theo yêu cầu.",
      "zh": "10瓶根据要求混合多种口味的纯天然即食燕窝。"
    }
  },
  {
    "id": "658415ce-baaa-46f9-a187-809d54f82ed9",
    "slug": {
      "vi": "yen-chung-san-duong-phen-70ml",
      "zh": "jishi-bingtang-yanwo-70ml"
    },
    "name": {
      "vi": "Yến chưng sẵn đường phèn (Hũ 70ml)",
      "zh": "即食冰糖燕窝 (70毫升)"
    },
    "description": {
      "vi": "Đóng trong hũ thủy tinh tiệt trùng hút chân không dung tích 70ml. Mỗi hũ chứa 0.5gr yến khô nguyên chất, chưng cùng đường phèn thanh mát.",
      "zh": "采用70毫升真空无菌玻璃瓶包装。每瓶含有0.5克纯干燕窝，配以清爽冰糖炖 m制。"
    },
    "rawPrice": 88000,
    "price": "88.000đ",
    "image": "/images/products/yen-chung-san-duong-phen.webp",
    "category": {
      "vi": "Yến Chưng Sẵn",
      "zh": "Yến Chưng Sẵn"
    },
    "weight": {
      "vi": "70ml",
      "zh": "70毫升"
    },
    "ingredients": {
      "vi": "Yến tươi nguyên chất, đường phèn, nước tinh khiết.",
      "zh": "纯天然燕窝，冰糖，纯净水。"
    }
  },
  {
    "id": "e7c9e17f-5f1a-43dc-9e20-d4078d707b2e",
    "slug": {
      "vi": "yen-chung-san-tao-do-70ml",
      "zh": "jishi-hongzao-yanwo-70ml"
    },
    "name": {
      "vi": "Yến chưng sẵn táo đỏ (Hũ 70ml)",
      "zh": "即食红枣燕窝 (70毫升)"
    },
    "description": {
      "vi": "Đóng trong hũ thủy tinh tiệt trùng hút chân không dung tích 70ml. Mỗi hũ chứa 0.5gr yến khô nguyên chất kết hợp cùng táo đỏ bổ huyết, tăng cường sức đề kháng.",
      "zh": "采用70毫升真空无菌玻璃瓶包装。每瓶含有0.5克纯干燕窝，配以优质红枣，具有补 khí 养血、增强免疫力的功效。"
    },
    "rawPrice": 88000,
    "price": "88.000đ",
    "image": "/images/products/yen-chung-san-tao-do.webp",
    "category": {
      "vi": "Yến Chưng Sẵn",
      "zh": "Yến Chưng Sẵn"
    },
    "weight": {
      "vi": "70ml",
      "zh": "70毫升"
    },
    "ingredients": {
      "vi": "Yến tươi nguyên chất, táo đỏ, đường phèn, nước tinh khiết.",
      "zh": "纯天然燕窝，红枣，冰糖，纯净水。"
    }
  },
  {
    "id": "654f9fa9-26a4-4c10-b53a-512f3e1ce31f",
    "slug": {
      "vi": "yen-chung-san-hat-sen-70ml",
      "zh": "jishi-lianzi-yanwo-70ml"
    },
    "name": {
      "vi": "Yến chưng sẵn hạt sen (Hũ 70ml)",
      "zh": "即食莲子燕窝 (70毫升)"
    },
    "description": {
      "vi": "Đóng trong hũ thủy tinh tiệt trùng hút chân không dung tích 70ml. Mỗi hũ chứa 0.5gr yến khô nguyên chất kết hợp cùng hạt sen bùi ngậy, giúp ngủ ngon và an thần.",
      "zh": "采用70毫升真空无菌玻璃瓶包装。每瓶含有0.5克纯干燕窝，配以清甜粉糯的莲子，具有助眠安神功效。"
    },
    "rawPrice": 88000,
    "price": "88.000đ",
    "image": "/images/products/yen-chung-san-huong-sen.webp",
    "category": {
      "vi": "Yến Chưng Sẵn",
      "zh": "Yến Chưng Sẵn"
    },
    "weight": {
      "vi": "70ml",
      "zh": "70毫升"
    },
    "ingredients": {
      "vi": "Yến tươi nguyên chất, hạt sen, đường phèn, nước tinh khiết.",
      "zh": "纯天然燕窝，莲子，冰糖，纯净水。"
    }
  }
];
