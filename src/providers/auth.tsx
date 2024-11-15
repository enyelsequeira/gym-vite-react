import CryptoJS from 'crypto-js';
import { type PropsWithChildren, createContext, useCallback, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { z } from 'zod';

export type AuthenticatedUser = {
  id: number;
  username: string;
  name: string;
  lastName: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthenticationContext = {
  logout: () => void;
  login: (user: AuthenticatedUser) => void;
  session: {
    user?: Partial<AuthenticatedUser>;
  };
};

const ENCRYPTION_KEY = 'your-secret-key-here';
const COOKIE_EXPIRATION_HOURS = 24;
const COOKIE_NAME = 'gym-user';

// Update the schema to match the nested structure
const UserDataSchema = z.object({
  id: z.number(),
  username: z.string(),
  name: z.string(),
  lastName: z.string(),
  type: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const CookieDataSchema = z.object({
  user: UserDataSchema,
  message: z.string().optional(),
});

export type CookieData = z.infer<typeof UserDataSchema>;

const encryptData = (data: string): string => {
  try {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

const decryptData = (encryptedData: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      throw new Error('Decryption resulted in empty string');
    }
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

const AuthenticationContext = createContext<AuthenticationContext | null>(null);

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [cookies, setCookie, removeCookie] = useCookies([COOKIE_NAME]);

  const processStoredCookie = () => {
    const savedCookie = cookies[COOKIE_NAME];
    // console.log('Processing cookie:', {
    //   exists: !!savedCookie,
    //   sample: savedCookie ? savedCookie.substring(0, 50) + '...' : 'none',
    // });

    if (!savedCookie) {
      return undefined;
    }

    try {
      const decryptedData = decryptData(savedCookie);
      console.log('Raw decrypted data:', decryptedData);

      const parsedData = JSON.parse(decryptedData);
      console.log('Parsed cookie data:', parsedData);

      const result = CookieDataSchema.safeParse(parsedData);
      console.log('Schema validation:', {
        success: result.success,
        data: result.success ? result.data.user : 'validation failed',
        error: !result.success ? result.error.issues : 'none',
      });

      if (result.success) {
        return result.data.user; // Return just the user data
      }

      console.error('Schema validation failed:', result.error);
      return undefined;
    } catch (error) {
      console.error('Cookie processing error:', error);
      return undefined;
    }
  };

  const user = processStoredCookie();

  const login = useCallback(
    (userData: AuthenticatedUser) => {
      console.log('Login called with:', userData);
      try {
        // Create the nested structure before encrypting
        const dataToEncrypt = {
          user: userData,
          message: 'Login successful',
        };

        const stringifiedData = JSON.stringify(dataToEncrypt);
        const encryptedData = encryptData(stringifiedData);

        const expirationDate = new Date(
          new Date().getTime() + COOKIE_EXPIRATION_HOURS * 60 * 60 * 1000
        );

        setCookie(COOKIE_NAME, encryptedData, {
          expires: expirationDate,
          path: '/',
          maxAge: COOKIE_EXPIRATION_HOURS * 60 * 60,
          secure: true,
          sameSite: 'strict',
        });
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    [setCookie]
  );

  const logout = useCallback(() => {
    console.log('Logging out...');
    removeCookie(COOKIE_NAME, { path: '/' });
  }, [removeCookie]);

  return (
    <AuthenticationContext.Provider
      value={{
        logout,
        login,
        session: { user },
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('useSession must be used within an AuthenticationProvider');
  }
  return context;
};
