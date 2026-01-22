import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SketchIllustrationPage from '../../../components/SketchIllustrationPage';

export default function AdminCosPlayPreviewPage() {
  const navigate = useNavigate();
  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-[#f5f5f5]">
      <SketchIllustrationPage
        onClose={handleClose}
        title="Pet Cosplay Preview"
        description="Review the current pet cosplay configuration as editors would see it in the user app."
        purposeVariant="pet"
      />
    </div>
  );
}
