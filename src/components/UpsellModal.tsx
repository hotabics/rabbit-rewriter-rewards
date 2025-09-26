import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import ComparisonTable from "./ComparisonTable";
import { useState } from "react";

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const UpsellModal = ({ isOpen, onClose, onUpgrade }: UpsellModalProps) => {
  const { t } = useLanguage();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpgrade = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onUpgrade();
      onClose();
      setShowSuccess(false);
    }, 2000);
  };

  const handleStayFree = () => {
    onClose();
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2 text-primary">
              {t('upsell.upgradeSuccess')}
            </h2>
            <p className="text-muted-foreground">
              All premium features are now unlocked!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            {t('upsell.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              <strong>{t('upsell.freeFeatures')}</strong>
            </p>
            <p className="text-primary font-medium">
              <strong>{t('upsell.premiumFeatures')}</strong>
            </p>
          </div>
          
          <ComparisonTable 
            showUpgrade={true}
            onUpgrade={handleUpgrade}
            onStayFree={handleStayFree}
            compact={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpsellModal;