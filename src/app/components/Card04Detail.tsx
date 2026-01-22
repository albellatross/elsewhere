import SketchIllustrationPage from './SketchIllustrationPage';
import imgProduct01 from '@/assets/Product Visuals/01.png';
import imgProduct02 from '@/assets/Product Visuals/02.png';
import imgProduct03 from '@/assets/Product Visuals/03.png';
import imgProduct04 from '@/assets/Product Visuals/04.png';

type Card04DetailProps = {
  onClose: () => void;
};

export default function Card04Detail({ onClose }: Card04DetailProps) {
  return (
    <SketchIllustrationPage
      onClose={onClose}
      title="Product Visuals"
      description="Clean, compelling images that sell."
      purposeVariant="product"
      purposeImagesOverride={{
        birthday: imgProduct01,
        newyear: imgProduct02,
        christmas: imgProduct03,
        halloween: imgProduct04,
      }}
      purposeConfigOverride={{
        birthday: { title: 'Cosmetics use', desc: 'Refined, premium, beauty-focused' },
        newyear: { title: 'Electronics use', desc: 'Minimal, innovative, product-first' },
        christmas: { title: 'Sportswear use', desc: 'Dynamic, bold, performance-driven' },
        halloween: { title: 'Food use', desc: 'Appetizing, clean, visually engaging' },
      }}
      purposeOrderOverride={['birthday', 'newyear', 'christmas', 'halloween']}
      showProductFields={true}
    />
  );
}

