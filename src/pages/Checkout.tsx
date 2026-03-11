import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ShoppingBag, MessageCircle, ArrowLeft, CheckCircle2, User, Phone, MapPin } from 'lucide-react';

export function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const currentLang = (i18n.language || 'vi').startsWith('zh') ? 'zh' : 'vi';
  
  const product = location.state?.product;
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">
          {currentLang === 'vi' ? 'Giỏ hàng trống' : '购物车为空'}
        </h2>
        <button 
          onClick={() => navigate(`/${currentLang}/products`)}
          className="text-gold hover:underline font-bold"
        >
          {currentLang === 'vi' ? 'Quay lại mua sắm' : '返回购物'}
        </button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateMessage = () => {
    return `ĐƠN HÀNG MỚI (YSTV)
--------------------------
Sản phẩm: ${product.name[currentLang]}
Giá: ${product.price}
--------------------------
Khách hàng: ${formData.name}
SĐT: ${formData.phone}
Địa chỉ: ${formData.address}
Ghi chú: ${formData.note || 'Không có'}
--------------------------
Vui lòng xác nhận đơn hàng giúp tôi.`;
  };

  const handleOrderZalo = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(generateMessage());
    window.open(`https://zalo.me/0973080694?text=${message}`, '_blank');
  };

  const handleOrderWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(generateMessage());
    window.open(`https://wa.me/84973080694?text=${message}`, '_blank');
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-gold transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {currentLang === 'vi' ? 'Quay lại' : '返回'}
        </button>

        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-10">
          {currentLang === 'vi' ? 'Xác nhận đơn hàng' : '确认订单'}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-gold" />
                {currentLang === 'vi' ? 'Thông tin giao hàng' : '收货信息'}
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 ml-1">
                      {currentLang === 'vi' ? 'Họ và tên' : '姓名'}
                    </label>
                    <input 
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={currentLang === 'vi' ? 'Nhập họ tên' : '输入姓名'}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 ml-1">
                      {currentLang === 'vi' ? 'Số điện thoại' : '电话号码'}
                    </label>
                    <input 
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={currentLang === 'vi' ? 'Nhập số điện thoại' : '输入电话号码'}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">
                    {currentLang === 'vi' ? 'Địa chỉ nhận hàng' : '收货地址'}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder={currentLang === 'vi' ? 'Số nhà, tên đường, phường/xã...' : '门牌号，街道，乡镇...'}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">
                    {currentLang === 'vi' ? 'Ghi chú (không bắt buộc)' : '备注（可选）'}
                  </label>
                  <textarea 
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows={3}
                    placeholder={currentLang === 'vi' ? 'Ví dụ: Giao giờ hành chính...' : '例如：办公时间送货...'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </motion.div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-emerald-900 mb-1">
                  {currentLang === 'vi' ? 'Thanh toán khi nhận hàng (COD)' : '货到付款 (COD)'}
                </h3>
                <p className="text-sm text-emerald-700">
                  {currentLang === 'vi' 
                    ? 'Bạn chỉ cần gửi đơn hàng qua Zalo/WhatsApp, chúng tôi sẽ gọi điện xác nhận và giao hàng tận nơi.'
                    : '您只需通过 Zalo/WhatsApp 发送订单，我们将致电确认并送货上门。'}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-28"
            >
              <h2 className="text-lg font-bold text-slate-900 mb-6 pb-4 border-b border-slate-50">
                {currentLang === 'vi' ? 'Tóm tắt đơn hàng' : '订单摘要'}
              </h2>
              
              <div className="flex gap-4 mb-6">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                  <img src={product.image} alt={product.name[currentLang]} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1 leading-snug">
                    {product.name[currentLang]}
                  </h3>
                  <div className="text-gold font-bold">{product.price}</div>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">{currentLang === 'vi' ? 'Tạm tính' : '小计'}</span>
                  <span className="font-medium text-slate-900">{product.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">{currentLang === 'vi' ? 'Phí vận chuyển' : '运费'}</span>
                  <span className="text-emerald-600 font-medium">{currentLang === 'vi' ? 'Miễn phí' : '免费'}</span>
                </div>
                <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
                  <span className="font-bold text-slate-900">{currentLang === 'vi' ? 'Tổng cộng' : '总计'}</span>
                  <span className="text-xl font-bold text-gold">{product.price}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleOrderZalo}
                  disabled={!formData.name || !formData.phone || !formData.address}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-100"
                >
                  <MessageCircle className="w-5 h-5" />
                  {currentLang === 'vi' ? 'Gửi đơn qua Zalo' : '通过 Zalo 发送订单'}
                </button>
                <button
                  onClick={handleOrderWhatsApp}
                  disabled={!formData.name || !formData.phone || !formData.address}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-100"
                >
                  <MessageCircle className="w-5 h-5" />
                  {currentLang === 'vi' ? 'Gửi qua WhatsApp' : '通过 WhatsApp 发送'}
                </button>
              </div>
              
              <p className="text-[10px] text-slate-400 text-center mt-4 px-4">
                {currentLang === 'vi' 
                  ? 'Bằng cách nhấn gửi, bạn đồng ý với các điều khoản mua hàng của YSTV.'
                  : '点击发送即表示您同意 YSTV 的购买条款。'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
