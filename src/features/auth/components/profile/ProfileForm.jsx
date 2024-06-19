'use client';

import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { updateUser } from '@/features/auth';
import {
  downloadImage,
  getLogoUrl,
  handleSubmissionError,
  handleSubmissionSuccess,
} from '@/lib/utils';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MAX_FILE_SIZE = 5000000;

export const ProfileSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z
    .string()
    .min(3, {
      message: 'Password must be at least 3 characters long',
    })
    .max(60, {
      message: 'Password must be at most 60 characters long',
    }),
  user_name: z.string().min(3, {
    message: 'Name must be at least 3 characters long',
  }),
  company: z.string().optional(),
  logo: z
    .any()
    .optional()
    .refine(
      (file) => file === null || file[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (file) => file === null || ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
});

export const ProfileForm = ({ session, userData }) => {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const fileInputRef = useRef(null);

  console.log({ userData });
  console.log({ fileUrl });

  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    mode: 'onChange',
    defaultValues: {
      email: userData.email,
      user_name: userData.user_name,
      company: userData.company,
      logo: getLogoUrl(userData.logo),
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    watch,
    getValues,
  } = form;

  const values = getValues();

  console.log({ values });

  async function downloadAndSetImageAsFile(imageUrl) {
    try {
      const imageFile = await downloadImage(imageUrl);

      form.setValue('logo', [imageFile]);

      const fileUrl = URL.createObjectURL(imageFile);
      setFileUrl(fileUrl);
    } catch (error) {
      console.error('Error downloading or setting image:', error);
    }
  }

  useEffect(() => {
    if (userData.logo) {
      downloadAndSetImageAsFile(getLogoUrl(userData.logo));
    }
  }, []);

  useEffect(() => {
    if (watch('logo')) {
      const file = watch('logo')[0];
      if (file instanceof File) {
        const fileUrl = URL.createObjectURL(file);
        setFileUrl(fileUrl);
      }
    }
  }, [watch('logo')]);

  const onSubmit = async (data) => {
    const { email, password, user_name, logo, company } = data;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('user_name', user_name);
    formData.append('company', company);

    if (logo) {
      formData.append('logo', logo[0]);
    }

    try {
      const data = await updateUser(session?.accessToken, formData);
      if (data.status === 'success') {
        toast.success('Profile updated');
      } else {
        throw new Error(data.response);
      }

      handleSubmissionSuccess('Logged in successfully');
      router.refresh();
    } catch (error) {
      setError('Error updating profile');
      handleSubmissionError(error, 'Could not login');
    }
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    form.setValue('logo', null);
    setFileUrl(null);
  };

  return (
    <Container className="flex h-full w-full flex-col px-6 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="col-md-4 col-md-offset-4 section-title row"
        encType="multipart/form-data"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            {!fileUrl && !values.logo ? (
              <div className="flex h-32 w-32 items-center justify-center overflow-auto rounded-full border border-input object-cover">
                <span className="absolute">No image</span>
              </div>
            ) : (
              <Image
                src={fileUrl || values.logo || ''}
                alt="logo"
                width={100}
                height={100}
                className="flex h-32 w-32 items-center justify-center overflow-auto rounded-full border border-input object-cover"
              />
            )}
          </div>
          <Input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                form.setValue('logo', [file]);
              }
            }}
          />
          <div className="flex items-center gap-4">
            <Button
              className="mt-2 bg-muted"
              as="label"
              htmlFor="logo"
              variant="outline"
              size="sm"
              onClick={handleUploadClick}
            >
              Upload New Picture
            </Button>
            <Button className="mt-2" size="sm" onClick={handleRemoveImage}>
              Remove
            </Button>
          </div>
        </div>
        <ErrorMessage
          errors={errors}
          name="logo"
          render={({ message }) => (
            <span className="text-sm text-destructive">{message}</span>
          )}
        />

        <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 sm:gap-y-8">
          <div>
            <Input
              label="Name"
              labelClassName="mb-1"
              placeholder="Enter your name"
              autoFocus
              {...register('user_name')}
            />
            <ErrorMessage
              errors={errors}
              name="user_name"
              render={({ message }) => (
                <span className="text-sm text-destructive">{message}</span>
              )}
            />
          </div>
          <div>
            <Input
              label="Email"
              labelClassName="mb-1"
              placeholder="Enter your email address"
              {...register('email')}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <span className="text-sm text-destructive">{message}</span>
              )}
            />
          </div>
          <div>
            <Input
              label="Company Name"
              labelClassName="mb-1"
              placeholder="Enter your company name"
              {...register('company')}
            />
            <ErrorMessage
              errors={errors}
              name="company"
              render={({ message }) => (
                <span className="text-sm text-destructive">{message}</span>
              )}
            />
          </div>
          <div>
            <Input
              label="Password"
              labelClassName="mb-1"
              autoComplete="new-password"
              placeholder="Choose a password"
              type="password"
              {...register('password')}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <span className="text-sm text-destructive">{message}</span>
              )}
            />
          </div>
        </div>

        <Button
          className="mb-2 ml-auto mt-4 flex"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          type="submit"
        >
          Update
        </Button>
        {error && (
          <Alert className="mt-4" type="danger">
            <strong>{error}</strong>
          </Alert>
        )}
      </form>
    </Container>
  );
};
