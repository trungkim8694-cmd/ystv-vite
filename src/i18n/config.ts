import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  vi: {
    translation: {
      nav: {
        home: 'Trang Chủ',
        products: 'Sản Phẩm',
        about: 'Về Chúng Tôi',
        blog: 'Cẩm Nang',
        contact: 'Liên Hệ',
        b2b: 'Chính sách đại lý',
      },
      hero: {
        title: 'Yến Sào Thịnh Vượng',
        subtitle: 'Tinh hoa yến sào từ hệ thống nhà trải nghiệm dài từ Khánh Hòa đến Tây Ninh.',
        cta: 'Xem Sản Phẩm',
        b2b: 'Hợp Tác B2B',
      },
      contact: {
        quote: 'Liên hệ báo giá',
        zalo: 'Zalo',
        wechat: 'WeChat',
        title: 'Liên Hệ Với Chúng Tôi',
        subtitle: 'Hãy để lại lời nhắn, chúng tôi sẽ phản hồi bạn sớm nhất có thể.',
        info: {
          title: 'Thông Tin Liên Hệ',
          address: 'Địa chỉ: Hà Trì - Vĩnh Tường - Phú Thọ.',
          phone: 'Hotline: 0973 080 694',
          email: 'Email: info@yensaothinhvuong.com',
          workingHours: ''
        },
        form: {
          name: 'Họ và tên',
          email: 'Email',
          phone: 'Số điện thoại',
          subject: 'Chủ đề',
          message: 'Lời nhắn',
          submit: 'Gửi Lời Nhắn',
          sending: 'Đang gửi...',
          success: 'Cảm ơn bạn! Lời nhắn của bạn đã được gửi thành công.',
          error: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'
        }
      },
      products: {
        title: 'Sản Phẩm Nổi Bật',
        viewDetail: 'Xem chi tiết',
        weight: 'Trọng lượng',
        ingredients: 'Thành phần',
      },
      posts: {
        title: 'Bài Viết Mới Nhất',
        readMore: 'Đọc thêm',
      },
      about: {
        hero: {
          title: 'Về Chúng Tôi',
          subtitle: 'Yến Sào Thịnh Vượng - Tinh hoa từ thiên nhiên, tận tâm cho sức khỏe.'
        },
        story: {
          title: 'Câu Chuyện Của Chúng Tôi',
          content: 'Khởi nguồn từ niềm đam mê với sản vật quý giá của thiên nhiên, Yến Sào Thịnh Vượng (YSTV) đã hành trình qua nhiều năm để xây dựng hệ thống nhà yến trải dài từ Khánh Hòa đến Tây Ninh. Chúng tôi không chỉ bán yến sào, chúng tôi trao gửi sự thịnh vượng và sức khỏe đến từng gia đình.'
        },
        mission: {
          title: 'Sứ Mệnh & Tầm Nhìn',
          content: 'Sứ mệnh của chúng tôi là cung cấp những sản phẩm yến sào nguyên chất nhất, giữ trọn vẹn giá trị dinh dưỡng. Tầm nhìn trở thành thương hiệu yến sào hàng đầu Việt Nam, vươn tầm quốc tế với chất lượng thượng hạng.'
        },
        values: {
          title: 'Giá Trị Cốt Lõi',
          quality: {
            title: 'Chất Lượng Thượng Hạng',
            desc: 'Yến được tuyển chọn kỹ lưỡng từ hệ thống nhà yến riêng biệt.'
          },
          tradition: {
            title: 'Phương Pháp Truyền Thống',
            desc: 'Quy trình làm sạch thủ công, không hóa chất, giữ nguyên sợi yến.'
          },
          trust: {
            title: 'Niềm Tin Khách Hàng',
            desc: 'Sự hài lòng của khách hàng là thước đo thành công của chúng tôi.'
          }
        }
      }
    },
  },
  zh: {
    translation: {
      nav: {
        home: '首页',
        products: '产品中心',
        about: '关于我们',
        blog: '燕窝手册',
        contact: '联系我们',
        b2b: '代理政策',
      },
      hero: {
        title: '盛旺燕窝 (YSTV)',
        subtitle: '来自从庆和到西宁的体验屋系统的精华燕窝。',
        cta: '查看产品',
        b2b: 'B2B 合作',
      },
      contact: {
        quote: '联系报价',
        zalo: 'Zalo',
        wechat: '微信',
        title: '联系我们',
        subtitle: '请留言，我们会尽快回复您。',
        info: {
          title: '联系信息',
          address: '地址：富寿省 - 永祥县 - 河持',
          phone: '热线：0973 080 694',
          email: '电子邮件：info@yensaothinhvuong.com',
          workingHours: ''
        },
        form: {
          name: '姓名',
          email: '电子邮件',
          phone: '电话号码',
          subject: '主题',
          message: '留言',
          submit: '发送留言',
          sending: '发送中...',
          success: '谢谢！您的留言已成功发送。',
          error: '发生错误。请稍后再试。'
        }
      },
      products: {
        title: '精选产品',
        viewDetail: '查看详情',
        weight: '重量',
        ingredients: '成分',
      },
      posts: {
        title: '最新文章',
        readMore: '阅读更多',
      },
      about: {
        hero: {
          title: '关于我们',
          subtitle: '盛旺燕窝 - 大自然的精华，全心全意为健康服务。'
        },
        story: {
          title: '我们的故事',
          content: '源于对大自然珍贵产物的热爱，盛旺燕窝 (YSTV) 历经多年，建立了从庆和到西宁的燕窝屋系统。我们不仅销售燕窝，更将繁荣与健康传递给每一个家庭。'
        },
        mission: {
          title: '使命与愿景',
          content: '我们的使命是提供最纯净的燕窝产品，保留完整的营养价值。愿景是成为越南领先的燕窝品牌，以卓越的品质走向国际。'
        },
        values: {
          title: '核心价值',
          quality: {
            title: '卓越品质',
            desc: '从独立的燕窝屋系统中精心挑选。'
          },
          tradition: {
            title: '传统工艺',
            desc: '手工清洗流程，无化学添加，保留燕窝纤维。'
          },
          trust: {
            title: '客户信任',
            desc: '客户的满意是我们成功的衡量标准。'
          }
        }
      }
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
