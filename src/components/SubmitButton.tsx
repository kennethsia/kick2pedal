import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

function SubmitButton({ text }: { text: string }) {
  // ✅ `pending` will be derived from the form that wraps the Submit component
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : text}
    </Button>
  );
}

export default SubmitButton;
