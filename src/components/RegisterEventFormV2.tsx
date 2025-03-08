'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createRegistrationAction } from '@/data/actions/registerActions';
import QR from '@/public/gcash-qr.jpg';
import Image from 'next/image';
import { useActionState, useState } from 'react';
import { QRCodeDialog } from './QRCodeDialog';
import { StrapiErrors } from './StrapiErrors';
import SubmitButton from './SubmitButton';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface RegisterEventFormProps {
  user: any;
  event: {
    documentId: number;
    title: string;
    categories: Category[];
  };
}

const BikeBrands = [
  'PAPA_BIKE',
  'BIKE8',
  'XPUSH',
  'MARU',
  'CISCO',
  'ROCKFISH',
  'ZOOMI',
  'OTHERS',
] as const;

const WheelsetBrands = [
  'DATI',
  'MOSTSPORT',
  'SKAIDI',
  'GIPSY',
  'ROCKFISH',
  'FU_JIN',
  'TOMORROW',
  'OTHERS',
] as const;

const CATEGORY_PRICES = {
  primary: 1500,
  additional: 350,
} as const;

const DISCOUNT = 300;

export function RegisterEventFormV2({ event, user }: RegisterEventFormProps) {
  const [state, formAction] = useActionState(createRegistrationAction, null);
  const [totalAmount, setTotalAmount] = useState(0);

  // Add onChange handlers for category selections
  const handleCategoryChange = (formData: FormData) => {
    let amount = 0;

    // Check primary category
    if (formData.get('category')) {
      amount += CATEGORY_PRICES.primary;
    }

    // Check additional categories
    if (formData.get('additional_category_1')) {
      amount += CATEGORY_PRICES.additional;
    }
    if (formData.get('additional_category_2')) {
      amount += CATEGORY_PRICES.additional;
    }

    setTotalAmount(amount - DISCOUNT);
  };

  // Create a wrapper for the server action that updates amount
  const formActionWithAmount = async (formData: FormData) => {
    handleCategoryChange(formData);
    return formAction(formData);
  };
  return (
    <form
      action={formActionWithAmount}
      onChange={(e) => handleCategoryChange(new FormData(e.currentTarget))}
      className="space-y-6"
    >
      <input type="hidden" name="eventId" value={event.documentId} />
      <input type="hidden" name="userId" value={user?.data.id} />

      <Card>
        <CardHeader>
          <CardTitle>Race Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="category">Primary Category</Label>
            <Select name="category" required>
              <SelectTrigger>
                <SelectValue placeholder="Select your primary category" />
              </SelectTrigger>
              <SelectContent>
                {event.categories.map((category: any) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state?.errors?.category && (
              <p className="text-sm text-red-500">{state.errors.category}</p>
            )}
          </div>
          <div className="space-y-4">
            <Label htmlFor="additional_category_1">
              Additional Category # 1
            </Label>
            <Select name="additional_category_1">
              <SelectTrigger>
                <SelectValue placeholder="Select your additional category" />
              </SelectTrigger>
              <SelectContent>
                {event.categories.map((category: any) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state?.errors?.category && (
              <p className="text-sm text-red-500">{state.errors.category}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="additional_category_2">
              Additional Category # 2
            </Label>
            <Select name="additional_category_2">
              <SelectTrigger>
                <SelectValue placeholder="Select your additional category" />
              </SelectTrigger>
              <SelectContent>
                {event.categories.map((category: any) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state?.errors?.category && (
              <p className="text-sm text-red-500">{state.errors.category}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bike Specs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="bikeBrand">Bike Brand</Label>
            <Select name="bikeBrand" required>
              <SelectTrigger>
                <SelectValue placeholder="Select your bike brand" />
              </SelectTrigger>
              <SelectContent>
                {BikeBrands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label htmlFor="wheelsetBrand">Bike Brand</Label>
            <Select name="wheelsetBrand" required>
              <SelectTrigger>
                <SelectValue placeholder="Select your wheelset brand" />
              </SelectTrigger>
              <SelectContent>
                {WheelsetBrands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Amount to pay</CardTitle>
          <CardDescription>
            Primary category: ₱{CATEGORY_PRICES.primary.toLocaleString()} |
            Additional categories: ₱
            {CATEGORY_PRICES.additional.toLocaleString()} each <br />
            (₱{DISCOUNT} Early Bird Discount )
          </CardDescription>
        </CardHeader>
        <CardContent>
          <input type="hidden" name="amount" value={totalAmount} />
          <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-muted px-3 py-2 text-sm">
            <span>₱</span>
            <span className="font-medium">{totalAmount.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proof of payment</CardTitle>
          <CardDescription>
            <QRCodeDialog />
            <br />
            <Image
              src={QR}
              alt="GCash QR Code"
              width={300}
              className="rounded-lg"
            />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label htmlFor="proofOfPayment">Upload receipt</Label>
            <Input
              id="proofOfPayment"
              name="proofOfPayment"
              type="file"
              accept="image/*"
              required
            />
            <p className="text-sm text-muted-foreground">
              Please upload a clear photo of your payment receipt. Max file
              size: 5MB
            </p>
          </div>
        </CardContent>
      </Card>

      <SubmitButton text={'Complete Registration'} />
      <StrapiErrors error={state?.strapiErrors} />
    </form>
  );
}
