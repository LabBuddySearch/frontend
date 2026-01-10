import { CreateCardRequest, CardResponse, CardData } from "@/types/card";

const API_BASE_URL = "http://localhost:8080/api/cards";

export const cardService = {
   async createCard(cardData: CreateCardRequest): Promise<CardResponse> {
  const authorId = localStorage.getItem("authorId");

  if (!authorId) {
    throw new Error("Не авторизован — войдите заново");
  }

  const params = new URLSearchParams();
  params.append("authorId", authorId);
  params.append("type", cardData.type);
  params.append("subject", cardData.subject);
  params.append("title", cardData.title);
  params.append("course", cardData.course.toString());
  
  if (cardData.description) {
    params.append("description", cardData.description);
  }
  if (cardData.study) {
    params.append("study", cardData.study);
  }
  if (cardData.city) {
    params.append("city", cardData.city);
  }

  const url = `${API_BASE_URL}/user?${params.toString()}`;
  
  if (cardData.files && cardData.files.length > 0) {
    const formData = new FormData();
    
    cardData.files.forEach((file: any) => {
      if (file instanceof File) {
        formData.append("files", file);
      } else if (typeof file === 'string') {
        const blob = new Blob([], { type: 'application/octet-stream' });
        const fakeFile = new File([blob], file, { type: 'application/octet-stream' });
        formData.append("files", fakeFile);
      }
    });
    
    console.log("Отправка с файлами");
    
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка создания карточки: ${response.status} - ${errorText}`);
    }

    return response.json();
    
  } else {
    console.log("Отправка без файлов");
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка создания карточки: ${response.status} - ${errorText}`);
    }

    return response.json();
  }
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

    const formData = new FormData();
    formData.append("id", cardId);

    if (cardData.type) formData.append("type", cardData.type);
    if (cardData.subject) formData.append("subject", cardData.subject);
    if (cardData.title) formData.append("title", cardData.title);
    if (cardData.description) formData.append("description", cardData.description);
    if (cardData.study) formData.append("study", cardData.study);
    if (cardData.city) formData.append("city", cardData.city);
    if (cardData.course) formData.append("course", cardData.course.toString());
    
    if (cardData.files && cardData.files.length > 0) {
      cardData.files.forEach((file: any) => {
        if (file instanceof File) {
          formData.append("files", file);
        }
      });
    }

    console.log("Отправка данных для обновления через FormData");

    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "PATCH",
      body: formData,
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
