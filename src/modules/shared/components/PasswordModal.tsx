import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { APP_NAME } from '@/common/constants/const';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import BasicModal from '@/components/ModalCustom/BasicModal';

interface PasswordModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit: (password: string) => void;
  mode: 'create' | 'verify';
  title: string;
}

const PasswordModal = ({ isOpen, onClose, onSubmit, mode, title }: PasswordModalProps) => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'password' | 'forgot'>('password');

  const handleSubmit = () => {
    if (mode === 'create') {
      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }
    onSubmit(password);
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleForgotPasswordClick = () => {
    setStep('forgot');
  };

  const handleBack = () => {
    setStep('password');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <BasicModal
      open={isOpen}
      onClose={onClose}
      size="sm"
      className="p-0"
    >
      <div className="p-6">
        {step === 'password' ? (
          <>
            <div className="flex justify-center mb-8">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-16 w-16"
              />
            </div>

            <h2 className="text-xl font-semibold text-neutral text-center mb-8">{title}</h2>

            <div className="space-y-6">
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800 border-none rounded-lg p-4 text-neutral placeholder-gray-400"
                    placeholder="Enter your passcode"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>

                {mode === 'verify' && (
                  <button
                    onClick={handleForgotPasswordClick}
                    className="w-full text-primary text-sm mt-4 hover:text-primary/80"
                  >
                    Forgot your passcode
                  </button>
                )}
              </div>

              {mode === 'create' && (
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-gray-800 border-none rounded-lg p-4 text-neutral placeholder-gray-400"
                      placeholder="Confirm passcode"
                    />
                  </div>
                </div>
              )}

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>

            <div className="mt-8">
              <ButtonCustom
                onClick={handleSubmit}
                disabled={!password || (mode === 'create' && !confirmPassword)}
                className="w-full"
              >
                {mode === 'verify' ? 'Unlock' : 'Create'}
              </ButtonCustom>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center mb-6">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <IoChevronBack
                  size={24}
                  className="text-neutral"
                />
              </button>
              <h2 className="text-xl font-semibold text-neutral ml-2">Forgot your password?</h2>
            </div>

            <div className="flex justify-center my-12">
              <div className="bg-gray-800 p-8 rounded-lg">
                <FiLock
                  size={48}
                  className="text-gray-400"
                />
              </div>
            </div>

            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-neutral mb-4">Forgot your password?</h3>
              <p className="text-gray-400">
                You can reset your password by reset the wallet. {APP_NAME} wallet cannot recover
                your password for you.
              </p>
            </div>

            <ButtonCustom
              onClick={() => router.push('/dapp/restore-vault')}
              className="w-full"
            >
              Next
            </ButtonCustom>
          </>
        )}
      </div>
    </BasicModal>
  );
};

export default PasswordModal;
