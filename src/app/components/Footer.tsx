import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Templates', href: '#templates' },
        { name: 'Remix Ideas', href: '#remix' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Updates', href: '#updates' },
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About', href: '#about' },
        { name: 'Blog', href: '#blog' },
        { name: 'Careers', href: '#careers' },
        { name: 'Press', href: '#press' },
        { name: 'Contact', href: '#contact' },
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#docs' },
        { name: 'Help Center', href: '#help' },
        { name: 'Community', href: '#community' },
        { name: 'Tutorials', href: '#tutorials' },
        { name: 'API', href: '#api' },
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Privacy', href: '#privacy' },
        { name: 'Terms', href: '#terms' },
        { name: 'Security', href: '#security' },
        { name: 'Cookies', href: '#cookies' },
      ]
    }
  };

  return (
    <footer className="bg-[#0b0b0b] w-full">
      {/* 内容容器 - 锁定最大宽度 */}
      <div className="max-w-[var(--content-max-width)] mx-auto px-[var(--content-padding)] py-[clamp(60px,8vh,100px)]">
        <div className="max-w-[1660px] mx-auto">
          {/* Newsletter 订阅区域 */}
          <motion.div
            className="pb-8 md:pb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-[500px]">
                <h4 className="font-['Alexandria:SemiBold',sans-serif] font-semibold text-[16px] md:text-[18px] text-white mb-2">
                  Stay in the loop
                </h4>
                <p className="font-['Alexandria:Regular',sans-serif] font-normal text-[13px] md:text-[14px] text-[rgba(255,255,255,0.6)] leading-[1.5]">
                  Get the latest updates, feature releases, and creative inspiration delivered to your inbox.
                </p>
              </div>
              
              <div className="w-full md:w-auto flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-[280px] px-4 py-3 rounded-[12px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] font-['Alexandria:Regular',sans-serif] font-normal text-[14px] text-white placeholder:text-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[rgba(255,255,255,0.3)] focus:bg-[rgba(255,255,255,0.08)] transition-all duration-300"
                />
                <button className="px-6 py-3 rounded-[12px] bg-white hover:bg-[rgba(255,255,255,0.9)] font-['Alexandria:SemiBold',sans-serif] font-semibold text-[14px] text-[#0b0b0b] transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>

          {/* 底部版权信息 */}
          <motion.div
            className="border-t border-[rgba(255,255,255,0.1)] pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="font-['Alexandria:Regular',sans-serif] font-normal text-[12px] md:text-[13px] text-[rgba(255,255,255,0.4)] text-center md:text-left">
              © {currentYear} WorkFlow. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <a
                href="#privacy"
                className="font-['Alexandria:Regular',sans-serif] font-normal text-[12px] md:text-[13px] text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.7)] transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="font-['Alexandria:Regular',sans-serif] font-normal text-[12px] md:text-[13px] text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.7)] transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#cookies"
                className="font-['Alexandria:Regular',sans-serif] font-normal text-[12px] md:text-[13px] text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.7)] transition-colors duration-300"
              >
                Cookie Settings
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}