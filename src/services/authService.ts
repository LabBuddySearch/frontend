import { AuthRequest, AuthResponse, RegisterResponse, UserRegisterDto } from '@/types/auth';

const API_BASE_URL = 'http://localhost:8080/api/users';

export const authService = {
  async login(credentials: AuthRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Ошибка авторизации');
    }

    const authResponse = await response.json();
    
    localStorage.setItem('user', JSON.stringify(authResponse));
    localStorage.setItem('authorId', authResponse.id);
    
    return authResponse;
  },

  async register(userData: UserRegisterDto): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Ошибка регистрации');
    }

    return response.json();
  },
};