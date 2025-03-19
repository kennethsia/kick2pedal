'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { QRCodeDialog } from './QRCodeDialog';

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

const formSchema = z.object({
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  additional_category_1: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  additional_category_2: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  bikeBrand: z.enum(BikeBrands),
  wheelsetBrand: z.enum(WheelsetBrands),
  registration_status: z
    .enum(['registered', 'waitlisted', 'confirmed'])
    .default('registered'),
  amount: z.number(),
});

type FormValues = z.infer<typeof formSchema>;

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

const CATEGORY_PRICES = {
  primary: 1500,
  additional: 350,
} as const;

const getDocumentID = (categories: any[], id: any) => {
  return categories.find((category) => id === category.id).documentId;
};

export function RegisterEventForm({ event, user }: RegisterEventFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const categories = event.categories;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registration_status: 'registered',
      amount: 0,
    },
  });

  // Update the useEffect hook
  useEffect(() => {
    const subscription = form.watch((values) => {
      let calculatedAmount = 0;

      // Add primary category amount
      if (values.category) {
        calculatedAmount += CATEGORY_PRICES.primary;
      }

      // Add additional category amounts
      if (values.additional_category_1) {
        calculatedAmount += CATEGORY_PRICES.additional;
      }
      if (values.additional_category_2) {
        calculatedAmount += CATEGORY_PRICES.additional;
      }

      setTotalAmount(calculatedAmount);
      // Avoid using setValue inside watch to prevent infinite loops
      if (calculatedAmount !== form.getValues('amount')) {
        form.setValue('amount', calculatedAmount, {
          shouldDirty: true,
          shouldTouch: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    const input = {
      data: {
        registration_status: 'registered' as const,
        amount: data.amount,
        // Connect relations using 'connect' array
        event: {
          connect: [event.documentId],
        },
        // User will come from auth context in production
        user: {
          connect: [user?.data.id],
        },
        bikeBrand: data.bikeBrand,
        wheelsetBrand: data.wheelsetBrand,
        // Connect primary category
        category: {
          connect: [getDocumentID(categories, data.category.id)],
        },
        // Connect optional categories if they exist
        ...(data.additional_category_1 && {
          additional_category_1: {
            connect: [getDocumentID(categories, data.additional_category_1.id)],
          },
        }),
        ...(data.additional_category_2 && {
          additional_category_2: {
            connect: [getDocumentID(categories, data.additional_category_2.id)],
          },
        }),
      },
    };

    // const response = await api.registration.create(input);
    // if (response) router.push('/dashboard');
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Race Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Category</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(JSON.parse(value))}
                    value={
                      field.value ? JSON.stringify(field.value) : undefined
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {event.categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={JSON.stringify(category)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additional_category_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Category (Optional)</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(JSON.parse(value))}
                    value={
                      field.value ? JSON.stringify(field.value) : undefined
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select additional category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {event.categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={JSON.stringify(category)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additional_category_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Category (Optional)</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(JSON.parse(value))}
                    value={
                      field.value ? JSON.stringify(field.value) : undefined
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select additional category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {event.categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={JSON.stringify(category)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bike Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="bikeBrand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bike Brand</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your bike brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BikeBrands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand.replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wheelsetBrand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wheelset Brand</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your wheelset brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {WheelsetBrands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand.replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amount to pay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount</FormLabel>
                  <FormDescription className="flex items-center justify-between">
                    <span>
                      Primary category: ₱1,500 | Additional categories: ₱350
                      each
                    </span>
                    {/* <QRCodeDialog /> */}
                  </FormDescription>
                  <FormControl>
                    <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-muted px-3 py-2 text-sm">
                      <span>₱</span>
                      <span className="font-medium">
                        {totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Complete Registration'
          )}
        </Button>
      </form>
    </Form>
  );
}
