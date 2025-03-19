import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

export function QRCodeDialog({ image }: { image: any }) {
  return (
    <Dialog>
      <DialogTrigger className="text-primary underline underline-offset-4 hover:text-primary/80">
        View payment details
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            Scan this QR code or use the account details below to complete your
            payment
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <Image
            src={image}
            alt="GCash QR Code"
            width={300}
            className="rounded-lg"
          />
          {/* <div className="text-center space-y-2">
            <p className="font-medium">GCash Account Details</p>
            <p className="text-sm text-muted-foreground">
              Name: Juan Dela Cruz
            </p>
            <p className="text-sm text-muted-foreground">
              Number: 0917 123 4567
            </p>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
