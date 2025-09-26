import { Button } from "@/components/ui/button";
import { useLanguage, type Language } from "@/hooks/useLanguage";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="text-xs px-3 py-1 h-auto"
      >
        EN
      </Button>
      <Button
        variant={language === 'lv' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('lv')}
        className="text-xs px-3 py-1 h-auto"
      >
        LV
      </Button>
    </div>
  );
};

export default LanguageToggle;