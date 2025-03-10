import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Whatsapp from '@/public/whatsapp-support.jpg';
import { Clock, MessageCircle } from 'lucide-react';
import Image from 'next/image';
export default function SupportPage() {
  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Support Hours */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Available: Monday - Friday, 9AM - 6PM</span>
          </div>

          {/* WhatsApp QR Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-medium">WhatsApp Support</h3>
            </div>
            <div className="relative aspect-square w-48 mx-auto">
              <Image
                src={Whatsapp}
                alt="WhatsApp QR Code"
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Scan this QR code with your phones camera to connect with our
              support team on WhatsApp
            </p>
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-muted-foreground pt-4 border-t">
            <p>For urgent inquiries, please message us on WhatsApp.</p>
            <p>Average response time: Within 2 hours during business hours</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
