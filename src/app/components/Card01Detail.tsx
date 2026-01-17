import SketchIllustrationPage from './SketchIllustrationPage';

type Card01DetailProps = {
  onClose: () => void;
};

export default function Card01Detail({ onClose }: Card01DetailProps) {
  return (
    <SketchIllustrationPage
      onClose={onClose}
      title="Pet Portrait"
      description="Beautiful portraits of the ones you love."
      purposeVariant="pet"
    />
  );
}

