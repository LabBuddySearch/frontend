import { CreateCardRequest, CardResponse, CardData } from "@/types/card";

const API_BASE_URL = "http://localhost:8080/api/cards";

export const cardService = {
  async createCard(cardData: CreateCardRequest): Promise<CardResponse> {
    const authorId = localStorage.getItem("authorId");

    if (!authorId) {
      throw new Error("Не авторизован — войдите заново");
    }

    const payload = {
      ...cardData,
      authorId: authorId,
    };

    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ошибка от бэкенда:", response.status, errorText);
      throw new Error(`Ошибка создания карточки: ${response.status}`);
    }

    return response.json();
  },

  async getAllCards(): Promise<CardData[]> {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка загрузки карточек: ${response.status}`);
    }

    return response.json();
  },

  async getUserCards(): Promise<CardData[]> {
    const authorId = localStorage.getItem("authorId");

    if (!authorId) {
      throw new Error("Пользователь не авторизован");
    }

    const response = await fetch(`${API_BASE_URL}/user/${authorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Ошибка загрузки пользовательских карточек: ${response.status}`
      );
    }

    return response.json();
  },

  async updateCard(cardId: string, cardData: any): Promise<CardData> {
    const authorId = localStorage.getItem("authorId");

    if (!authorId) {
      throw new Error("Пользователь не авторизован");
    }

    const backendData = {
      id: cardId,
      type: cardData.workType,
      subject: cardData.subject,
      title: cardData.title,
      description: cardData.description,
      study: cardData.university,
      city: cardData.city,
      course: parseInt(cardData.course) || 1,
    };

    console.log("Отправка данных для обновления:", backendData);

    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ошибка обновления:", response.status, errorText);
      throw new Error(`Ошибка обновления карточки: ${response.status}`);
    }

    return response.json();
  },

  async deleteCard(cardId: string): Promise<void> {
    const authorId = localStorage.getItem("authorId");

    if (!authorId) {
      throw new Error("Пользователь не авторизован");
    }

    const response = await fetch(`${API_BASE_URL}/user/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ошибка удаления:", response.status, errorText);
      throw new Error(`Ошибка удаления карточки: ${response.status}`);
    }
  },

  async getLikedCards(): Promise<CardData[]> {
    const userId = localStorage.getItem("authorId");

    if (!userId) {
      throw new Error("Пользователь не авторизован");
    }

    const response = await fetch(`${API_BASE_URL}/user/${userId}/liked`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Ошибка загрузки лайкнутых карточек: ${response.status}`
      );
    }

    return response.json();
  },
};
