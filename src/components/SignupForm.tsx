'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { registerUserAction } from '@/data/actions/authActions';
import { cn } from '@/lib/utils';
import { useActionState, useState } from 'react';
import { StrapiErrors } from './StrapiErrors';
import SubmitButton from './SubmitButton';
import { ZodErrors } from './ZodErrors';

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

// Add this constant near other constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'application/pdf',
];

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [fileError, setFileError] = useState<string | null>(null);
  const [formState, formAction] = useActionState(
    registerUserAction,
    INITIAL_STATE,
  );

  // Add this wrapper function for the form action
  const handleSubmit = async (formData: FormData) => {
    // Reset file error
    setFileError(null);

    // Get the file from the form data
    const file = formData.get('identificationDocument') as File;

    if (file) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError('File size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setFileError('File must be an image (JPEG, PNG) or PDF');
        return;
      }
    }

    // If validation passes, proceed with form submission
    return formAction(formData);
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Please fill in all the required information to register
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-8">
            {/* Account Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Information</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" type="text" required />
                  <ZodErrors error={formState?.zodErrors?.username} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                  <ZodErrors error={formState?.zodErrors?.email} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                  <ZodErrors error={formState?.zodErrors?.password} />
                </div>
              </div>
            </div>

            {/* Rider Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Rider Information</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                    />
                    <ZodErrors error={formState?.zodErrors?.firstName} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input id="middleName" name="middleName" type="text" />
                    <ZodErrors error={formState?.zodErrors?.middleName} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" type="text" required />
                    <ZodErrors error={formState?.zodErrors?.lastName} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input id="nickname" name="nickname" type="text" />
                    <ZodErrors error={formState?.zodErrors?.nickname} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      required
                    />
                    <ZodErrors error={formState?.zodErrors?.contactNumber} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      required
                    />
                    <ZodErrors error={formState?.zodErrors?.dateOfBirth} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="birthGender">Gender</Label>
                    <Select name="birthGender" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <ZodErrors error={formState?.zodErrors?.birthGender} />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="parentFullName">
                    Parent/Guardian Full Name
                  </Label>
                  <Input
                    id="parentFullName"
                    name="parentFullName"
                    type="text"
                    required
                  />
                  <ZodErrors error={formState?.zodErrors?.parentFullName} />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* <div className="grid gap-2">
                    <Label htmlFor="plateNumber">Plate Number</Label>
                    <Input id="plateNumber" name="plateNumber" type="text" />
                    <ZodErrors error={formState?.zodErrors?.plateNumber} />
                  </div> */}
                  <div className="grid gap-2">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input id="teamName" name="teamName" type="text" />
                    <ZodErrors error={formState?.zodErrors?.teamName} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="riderType">Rider Type</Label>
                    <Select name="riderType" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rider type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FILIPINO">Filipino</SelectItem>
                        <SelectItem value="FOREIGN">Foreign</SelectItem>
                      </SelectContent>
                    </Select>
                    <ZodErrors error={formState?.zodErrors?.riderType} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="foreignCountry">
                      Country (if foreign rider)
                    </Label>
                    <Input
                      id="foreignCountry"
                      name="foreignCountry"
                      type="text"
                    />
                    <ZodErrors error={formState?.zodErrors?.foreignCountry} />
                  </div>
                </div>

                <div className="grid gap-4">
                  {/* <div className="grid gap-2">
                    <Label htmlFor="racerPhoto">Racer Photo</Label>
                    <Input
                      id="racerPhoto"
                      name="racerPhoto"
                      type="file"
                      required
                      accept="image/*"
                    />
                    <ZodErrors error={formState?.zodErrors?.racerPhoto} />
                  </div> */}
                  <div className="grid gap-2">
                    <Label htmlFor="identificationDocument">
                      Identification Document
                      <p className="font-medium">
                        (Upload Birth Certificate or Passport)
                      </p>
                    </Label>

                    <Input
                      id="identificationDocument"
                      name="identificationDocument"
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                      required
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > MAX_FILE_SIZE) {
                            setFileError('File size must be less than 5MB');
                          } else if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
                            setFileError(
                              'File must be an image (JPEG, PNG) or PDF',
                            );
                          } else {
                            setFileError(null);
                          }
                        }
                      }}
                    />
                    <p className="text-sm text-muted-foreground">
                      Maximum file size: 5MB. Accepted formats: JPEG, PNG, PDF
                    </p>
                    {fileError && (
                      <p className="text-sm font-medium text-destructive">
                        {fileError}
                      </p>
                    )}
                    <ZodErrors
                      error={formState?.zodErrors?.identificationDocument}
                    />
                  </div>
                </div>
              </div>
            </div>

            <SubmitButton text={'Create account'} disabled={!!fileError} />

            <StrapiErrors error={formState?.strapiErrors} />
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking create account, you agree to our{' '}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
