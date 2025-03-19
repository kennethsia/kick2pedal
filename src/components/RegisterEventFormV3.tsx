'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import MindanaoQRImage from '@/public/gcash-qr-mindanao.jpg';
import NCRQRImage from '@/public/gcash-qr.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { QRCodeDialog } from './QRCodeDialog';
import { StrapiErrors } from './StrapiErrors';
import SubmitButton from './SubmitButton';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
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

const DISCOUNT = 0;

// Add this constant near other constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'application/pdf',
];

const TEAM_BATTLE_CATEGORY_ID = '28';

// Define steps for the multi-step form
const STEPS = {
  RULES: 0,
  WAIVER: 1,
  CATEGORIES: 2,
  PAYMENT: 3,
  RECEIPT: 4,
};

export function RegisterEventFormV3({ event, user }: RegisterEventFormProps) {
  const [fileError, setFileError] = useState<string | null>(null);
  const [state, formAction] = useActionState(createRegistrationAction, null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentStep, setCurrentStep] = useState(STEPS.RULES);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const categoryPricesMap = {
    '1st Victor Cup Race': {
      primary: 1500,
      additional: 350,
    },
    'Kick2Pedal Mindanao - Avia Estate - Sarangani Province': {
      primary: 750,
      additional: 200,
    },
    'Kick2Pedal Mindanao - Northtown - Davao City': {
      primary: 950,
      additional: 200,
    },
  };

  const imageMap = {
    '1st Victor Cup Race': {
      image: NCRQRImage,
    },
    'Kick2Pedal Mindanao - Avia Estate - Sarangani Province': {
      image: MindanaoQRImage,
    },
    'Kick2Pedal Mindanao - Northtown - Davao City': {
      image: MindanaoQRImage,
    },
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const categoryPrices = categoryPricesMap[event.title] || {
    primary: 1500,
    additional: 350,
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const image = imageMap[event.title]?.image || NCRImage;

  // State to store form values between steps
  const [formState, setFormState] = useState({
    category: '',
    additional_category_1: '',
    additional_category_2: '',
    proofOfPayment: null as File | null,
    rulesAgreed: false,
    waiverAgreed: false,
  });

  const calculateAmount = (formData: FormData | null = null) => {
    let amount = 0;

    // Use either the FormData passed in or the current formState
    const primaryCategory = formData
      ? formData.get('category')
      : formState.category;
    const additionalCategory1 = formData
      ? formData.get('additional_category_1')
      : formState.additional_category_1;
    const additionalCategory2 = formData
      ? formData.get('additional_category_2')
      : formState.additional_category_2;

    // Check primary category
    if (primaryCategory && primaryCategory !== TEAM_BATTLE_CATEGORY_ID) {
      amount += categoryPrices.primary;
    }

    // Check additional categories
    if (
      additionalCategory1 &&
      additionalCategory1 !== TEAM_BATTLE_CATEGORY_ID
    ) {
      amount += categoryPrices.additional;
    }

    if (
      additionalCategory2 &&
      additionalCategory2 !== TEAM_BATTLE_CATEGORY_ID
    ) {
      amount += categoryPrices.additional;
    }

    return amount - DISCOUNT;
  };

  // Update total amount when formState changes
  useEffect(() => {
    const newAmount = calculateAmount();
    setTotalAmount(newAmount);
  }, [formState]);

  const handleSubmit = (formData: FormData) => {
    // Reset file error
    setFileError(null);

    // Create the form data to submit
    const finalFormData = new FormData();

    // Add all form state values
    finalFormData.set('eventId', event.documentId.toString());
    finalFormData.set('userId', user?.data.id);
    finalFormData.set('category', formState.category);
    finalFormData.set('rulesAgreed', formState.rulesAgreed.toString());
    finalFormData.set('waiverAgreed', formState.waiverAgreed.toString());

    // if (formState.additional_category_1) {
    finalFormData.set('additional_category_1', formState.additional_category_1);
    // }

    // if (formState.additional_category_2) {
    finalFormData.set('additional_category_2', formState.additional_category_2);
    // }

    if (formState.proofOfPayment) {
      finalFormData.set('proofOfPayment', formState.proofOfPayment);
    }

    // Add the calculated amount
    finalFormData.set('amount', totalAmount.toString());

    // Validate the file if it exists
    if (formState.proofOfPayment) {
      // Validate file size
      if (formState.proofOfPayment.size > MAX_FILE_SIZE) {
        setFileError('File size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!ACCEPTED_FILE_TYPES.includes(formState.proofOfPayment.type)) {
        setFileError('File must be an image (JPEG, PNG) or PDF');
        return;
      }
    }

    // If validation passes, proceed with form submission
    return formAction(finalFormData);
  };

  // Handle form field changes and update state
  const handleFieldChange = (field: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error for this field if it exists
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError('File size must be less than 5MB');
      } else if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setFileError('File must be an image (JPEG, PNG) or PDF');
      } else {
        setFileError(null);
        handleFieldChange('proofOfPayment', file);
      }
    } else {
      handleFieldChange('proofOfPayment', null);
    }
  };

  // Validate current step before proceeding
  const validateCurrentStep = (): boolean => {
    const errors: { [key: string]: string } = {};

    switch (currentStep) {
      case STEPS.RULES:
        if (!formState.rulesAgreed) {
          errors.rulesAgreed =
            'You must agree to the Rules and Regulations to continue';
        }
        break;
      case STEPS.WAIVER:
        if (!formState.waiverAgreed) {
          errors.waiverAgreed = 'You must agree to the Waiver to continue';
        }
        break;
      case STEPS.CATEGORIES:
        if (!formState.category) {
          errors.category = 'You must select a primary category';
        }
        break;
      case STEPS.RECEIPT:
        if (!formState.proofOfPayment) {
          errors.proofOfPayment = 'You must upload a proof of payment';
        }
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < STEPS.RECEIPT) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > STEPS.RULES) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Progress indicator component
  const ProgressBar = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        <div className="w-full flex items-center">
          {Object.values(STEPS)
            .filter((v) => typeof v === 'number')
            .map((step, index) => (
              <div key={step} className="flex items-center w-full">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
                {index < 4 && (
                  <div
                    className={`h-1 w-full ${
                      currentStep > step ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    );
  };

  // Get step title
  const getStepTitle = () => {
    switch (currentStep) {
      case STEPS.RULES:
        return 'Rules and Regulations';
      case STEPS.WAIVER:
        return 'Waiver';
      case STEPS.CATEGORIES:
        return 'Race Categories';
      case STEPS.PAYMENT:
        return 'Amount to Pay';
      case STEPS.RECEIPT:
        return 'Proof of Payment';
      default:
        return 'Registration';
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="eventId" value={event.documentId} />
      <input type="hidden" name="userId" value={user?.data.id} />

      <ProgressBar />

      <Card>
        <CardHeader>
          <CardTitle>{getStepTitle()}</CardTitle>
          {currentStep === STEPS.PAYMENT && (
            <CardDescription>
              Primary category: ₱{categoryPrices.primary.toLocaleString()}
              <br />
              Additional categories: ₱
              {categoryPrices.additional.toLocaleString()} each <br />
              Team categories: ₱ 1,000 per team (payment will be on site)
            </CardDescription>
          )}
          {currentStep === STEPS.RECEIPT && (
            <CardDescription>
              <QRCodeDialog image={image} />
              <br />
              <Image
                src={image}
                alt="GCash QR Code"
                width={300}
                className="rounded-lg"
              />
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {/* Step 1: Rules and regulations */}
          {currentStep === STEPS.RULES && (
            <div className="space-y-6">
              <div className="text-sm text-muted-foreground">
                <p>
                  Please read our{' '}
                  <Link
                    href="/rules-and-regulations"
                    className="text-primary underline"
                    target="_blank"
                  >
                    Rules and Regulations
                  </Link>{' '}
                  before proceeding.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rulesAgreed"
                  name="rulesAgreed"
                  checked={formState.rulesAgreed}
                  onCheckedChange={(checked) => {
                    handleFieldChange('rulesAgreed', checked === true);
                  }}
                  required
                />
                <Label htmlFor="rulesAgreed" className="text-sm">
                  I have read and agree to the Rules and Regulations
                </Label>
              </div>
              {validationErrors.rulesAgreed && (
                <p className="text-sm text-destructive">
                  {validationErrors.rulesAgreed}
                </p>
              )}
            </div>
          )}

          {/* Step 2: Waiver */}
          {currentStep === STEPS.WAIVER && (
            <div className="space-y-6">
              <div className="text-sm text-muted-foreground border p-4 rounded-md bg-muted max-h-64 overflow-y-auto">
                <p className="mb-2 font-medium">Waiver</p>
                <p className="text-xs">
                  In consideration of my entry, I, my heirs, executors, and
                  administrators, do hereby grant the organizers the right to
                  use photographs, video, and audio recordings of me to all K2P
                  Runbike events, and do hereby release and forever discharge
                  the organizers, its officers, staff, sponsors, servants,
                  agents and subcontractors, instrumentalities, all voluntary
                  community groups, and all organizers assisting this event,
                  producers, their agents and representatives of all
                  liabilities, claims, damages or costs, which may have against
                  them arising out of, or any in any way connected with my
                  participation in this event. I understand this waiver includes
                  claims based on negligence, action, or inaction of any
                  parties, I fully recognize the difficulties of this event and
                  declare that I am physically fit and able to compete in this
                  event safely, and not have been told otherwise by a medically
                  qualified person. I have carefully read this form and agree to
                  abide by all rules and direction of all race officials on the
                  day of the race.
                </p>
                <p className="text-xs mt-2">
                  ** If any unforseen circumstances such as but not limited to
                  force majeure or anything that can harnes the safety of the
                  public, the organizer has right to cancel the event. Their
                  decision is final and non revocable
                </p>
                <p className="mb-2 mt-4 font-medium">Refund Rules</p>
                <p className="text-xs">
                  REGISTRATION IS NON-TRANSFERABLE
                  <br />
                  100% refund will be made if you ask for refund 7 days before
                  the activity:
                  <br />
                  If less than 7 days notice before the activity:
                  <br />
                  Total to be refunded is: 33% will be deducted from the total
                  payment
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="waiverAgreed"
                  name="waiverAgreed"
                  checked={formState.waiverAgreed}
                  onCheckedChange={(checked) => {
                    handleFieldChange('waiverAgreed', checked === true);
                  }}
                  required
                />
                <Label htmlFor="waiverAgreed" className="text-sm">
                  I have read and agree to the Waiver and Refund Rules
                </Label>
              </div>
              {validationErrors.waiverAgreed && (
                <p className="text-sm text-destructive">
                  {validationErrors.waiverAgreed}
                </p>
              )}
            </div>
          )}

          {/* Step 3: Categories */}
          {currentStep === STEPS.CATEGORIES && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="category">Primary Category</Label>
                <Select
                  name="category"
                  required
                  value={formState.category}
                  onValueChange={(value) =>
                    handleFieldChange('category', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary category" />
                  </SelectTrigger>
                  <SelectContent>
                    {event.categories.map((category: any) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state?.errors?.category && (
                  <p className="text-sm text-red-500">
                    {state.errors.category}
                  </p>
                )}
              </div>
              <div className="space-y-4">
                <Label htmlFor="additional_category_1">
                  Additional Category # 1
                </Label>
                <Select
                  name="additional_category_1"
                  value={formState.additional_category_1}
                  onValueChange={(value) =>
                    handleFieldChange('additional_category_1', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your additional category" />
                  </SelectTrigger>
                  <SelectContent>
                    {event.categories.map((category: any) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state?.errors?.category && (
                  <p className="text-sm text-red-500">
                    {state.errors.category}
                  </p>
                )}
              </div>
              <div className="space-y-4">
                <Label htmlFor="additional_category_2">
                  Additional Category # 2
                </Label>
                <Select
                  name="additional_category_2"
                  value={formState.additional_category_2}
                  onValueChange={(value) =>
                    handleFieldChange('additional_category_2', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your additional category" />
                  </SelectTrigger>
                  <SelectContent>
                    {event.categories.map((category: any) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state?.errors?.category && (
                  <p className="text-sm text-red-500">
                    {state.errors.category}
                  </p>
                )}
              </div>
              {validationErrors.category && (
                <p className="text-sm text-destructive">
                  {validationErrors.category}
                </p>
              )}
            </div>
          )}

          {/* Step 4: Payment Amount */}
          {currentStep === STEPS.PAYMENT && (
            <div>
              <input type="hidden" name="amount" value={totalAmount} />
              <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-muted px-3 py-2 text-sm">
                <span>₱</span>
                <span className="font-medium">
                  {totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Step 5: Receipt Upload */}
          {currentStep === STEPS.RECEIPT && (
            <div className="space-y-4">
              <Label htmlFor="proofOfPayment">Upload receipt</Label>
              <Input
                id="proofOfPayment"
                name="proofOfPayment"
                type="file"
                accept="image/jpeg,image/png,image/jpg,application/pdf"
                required
                onChange={handleFileChange}
              />
              <p className="text-sm text-muted-foreground">
                Maximum file size: 5MB. Accepted formats: JPEG, PNG, PDF
              </p>
              {fileError && (
                <p className="text-sm font-medium text-destructive">
                  {fileError}
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between pt-6">
          {currentStep > STEPS.RULES && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
          )}
          {currentStep < STEPS.RECEIPT ? (
            <Button type="button" className="ml-auto" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <SubmitButton
              text={'Complete Registration'}
              disabled={!!fileError}
            />
          )}
        </CardFooter>
      </Card>

      <StrapiErrors error={state?.strapiErrors} />
    </form>
  );
}
