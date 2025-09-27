import React from "react";
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface RabbitButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const RabbitButton = ({ onClick, loading = false, disabled = false, className = "" }: RabbitButtonProps) => {
  const { t } = useLanguage();

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={`absolute bottom-4 right-4 w-16 h-16 rounded-full p-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 ${className}`}
      aria-label={t('demo.askRabbit')}
      title={t('demo.askRabbit')}
    >
      {loading ? (
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <Sparkles className="h-8 w-8 text-white animate-pulse" />
      )}
    </Button>
  );
};

export default RabbitButton;