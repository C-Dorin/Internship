'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { authService } from '@/lib/services/api/auth.api';
import {
	SignInDto,
	SignUpDto,
	SignInWithOtpDto,
	VerifyOtpDto,
	ResetPasswordDto
} from '@/types/auth.type';
import { getUserFromLocalStorage } from '@/lib/store/local-storage.util';
import { toast } from 'sonner';

const handleError = (error: unknown) => {
	const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
	toast.error(errorMessage);
};

// Sign In Handler
export const signInHandler: SubmitHandler<SignInDto> = async (signInData) => {
	try {
		const { message } = await authService.signIn(signInData);
		toast.success(message);
	} catch (error: unknown) {
		handleError(error);
	}
};

// Sign Up Handler
export const signUpHandler: SubmitHandler<SignUpDto> = async (signInData) => {
	try {
		const { message } = await authService.signUp(signInData);
		toast.success(message);
	} catch (error: unknown) {
		handleError(error);
	}
};

// Sign In with OTP Handler
export const useSignInWithOtpHandler = (): SubmitHandler<SignInWithOtpDto> => {
	const router = useRouter();

	return async (signInWithOtpData): Promise<void> => {
		try {
			const { message } = await authService.signInWithOtp(signInWithOtpData);
			toast.success(message);
			router.push('/auth/resetPassword?step=otp');
		} catch (error: unknown) {
			handleError(error);
		}
	};
};

// Sign In with Google OAuth Handler
export const signInWithGoogleHandler = async (): Promise<void> => {
	try {
		await authService.signInWithGoogle();
	} catch (error: unknown) {
		handleError(error);
	}
};

// OTP Verification Handler
export const useVerifyOtpHandler = (): SubmitHandler<VerifyOtpDto> => {
	const router = useRouter();
	const userData = getUserFromLocalStorage();
	const email = userData?.email;

	return async (verifyOTPData): Promise<void> => {
		try {
			const { message } = await authService.verifyOtp({ email, otpCode: verifyOTPData.otpCode });
			toast.success(message);
			router.push('/auth/resetPassword?step=reset');
		} catch (error: unknown) {
			handleError(error);
		}
	};
};

// Resend OTP Handler
export const useResendOtpHandler = () => {
	const userData = getUserFromLocalStorage();
	const email = userData?.email ?? '';

	return async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		try {
			e.preventDefault();
			const { message } = await authService.signInWithOtp({ email });
			toast.success(message);
		} catch (error: unknown) {
			handleError(error);
		}
	};
};

// Reset Password Handler
export const useResetPasswordHandler = (): SubmitHandler<ResetPasswordDto> => {
	const router = useRouter();

	return async (passwordResetData): Promise<void> => {
		try {
			const { message } = await authService.resetPassword(passwordResetData);
			toast.success(message);
			router.push('/workspace');
		} catch (error: unknown) {
			handleError(error);
		}
	};
};
