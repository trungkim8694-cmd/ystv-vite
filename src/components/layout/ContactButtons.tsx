import { useTranslation } from 'react-i18next';
import { MessageCircle, PhoneCall } from 'lucide-react';

export function ContactButtons() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-6 md:hidden">
      <div className="flex gap-3">
        <a
          href="https://zalo.me/0973080694"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 text-white py-3 rounded-full flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
        >
          <MessageCircle size={20} />
          <span className="font-bold">{t('contact.zalo')}</span>
        </a>
        {currentLang === 'zh' ? (
          <button
            onClick={() => {
              navigator.clipboard.writeText('0973080694');
              alert('WeChat ID: 0973080694 đã được sao chép vào bộ nhớ tạm. Vui lòng dán vào WeChat để kết bạn.');
            }}
            className="flex-1 bg-[#07C160] text-white py-3 rounded-full flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
          >
            <MessageCircle size={20} />
            <span className="font-bold">{t('contact.wechat')}</span>
          </button>
        ) : (
          <a
            href="https://wa.me/84973080694"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-3 rounded-full flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
          >
            <MessageCircle size={20} />
            <span className="font-bold">WhatsApp</span>
          </a>
        )}
      </div>
    </div>
  );
}
